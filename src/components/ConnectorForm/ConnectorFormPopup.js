import React from 'react';
import './ConnectorFormPopup.scss';

import { FormInput } from "../../UI/Inputs/FormInput";
import { Button } from "../../UI/Button/Button";
import { FirebaseContext } from "../../firebase/firebaseContext";
import { useFormik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { validate } from './сonnectorFormValidate'
import { setEditItem } from "../../redux/actions/data-actions";
import { toggleIsLoading, togglePopup } from "../../redux/actions/ui-actions";

import { getCablesPartNumbersById } from "../../utils/utility_functions";
import { Select } from "../../UI/Inputs/Select";
import { TextArea } from "../../UI/Inputs/TextArea";
import { SelectFile } from "../../UI/Inputs/InputFile";
import { Loader } from "../../UI/Loader/Loader";
import { MultipleSelect } from "../../UI/Inputs/MultipleSelect";
import { CloseIcon } from "../../UI/CloseIcon/CloseIcon";

export const ConnectorFormPopup = ({ closeHandler, title }) => {


    const [message, setMessage] = React.useState('');
    const [selectedImageFile, setSelectedImageFile] = React.useState(null);

    const { firebase } = React.useContext(FirebaseContext);
    // const isOnline = useSelector(state => state.ui.isOnline);
    const isLoading = useSelector(state => state.ui.isLoading);

    const cables = useSelector(state => state.data.cables);
    const cablesMappedObj = useSelector(state => state.data.cablesMappedObj);

    const cableTypes = useSelector(state => state.data.cableTypes);
    const producers = useSelector(state => state.data.producers);


    const dispatch = useDispatch();

    const editItem = useSelector(state => state.data.editItem);


    let initialValues = {
        partNumber: '',
        type: '',
        producer: '',
        desc: '',
        descFull: '',
        price: 0,
        compatibleCables: []
    };

    if (editItem) {
        initialValues = { ...editItem }
    }

    const connectorForm = useFormik({
        initialValues,
        onSubmit: handleSubmit,
        validate
    });


    async function addConnector() {
        if (Object.keys(connectorForm.errors).length > 0) {
            setMessage('Please check all fields');
            return
        }
        dispatch(toggleIsLoading(true));
        try {
            let imageUrl = null;
            let filePath = null;
            if (selectedImageFile) {
                let { imageUrl: url, filePath: path } = await firebase.addImageToStorage(selectedImageFile);
                imageUrl = url;
                filePath = path;
            }

            await firebase.addItemToDatabase('connectors',
                { ...connectorForm.values, filePath, imageUrl, createdAt: Date.now() });

            dispatch(toggleIsLoading(false));
            connectorForm.resetForm();
            setMessage('Connector was added successfully');
            setTimeout(() => setMessage(''), 2500)
        } catch (e) {
            dispatch(toggleIsLoading(false));
            setMessage(e.message)
        }
    }

    async function updateConnector() {
        //delete table field and id
        try {
            dispatch(toggleIsLoading(true))

            delete connectorForm.values.table;
            delete connectorForm.values.id;
            //update text fields
            await firebase.db.collection('connectors')
                .doc(editItem.id)
                .update(connectorForm.values);
            //update image
            if (selectedImageFile) {
                try {
                    let { imageUrl, filePath } = await firebase.addImageToStorage(selectedImageFile);
                    await firebase.db.collection('connectors')
                        .doc(editItem.id)
                        .update({ filePath, imageUrl });

                } catch (e) {
                    dispatch(toggleIsLoading(false))

                    setMessage(e.message)
                }
            }
            dispatch(toggleIsLoading(false))
            dispatch(setEditItem(null));
            dispatch(togglePopup())


        } catch (e) {
            dispatch(toggleIsLoading(false))
            setMessage(e.message)
        }
    }


    async function handleSubmit(e) {
        e.preventDefault();
        if (editItem)
            await updateConnector();
        else
            await addConnector()
    }

    function handleSelectFile(e) {

        // const file = selectFileInputRef.current.files[0];
        const file = e.currentTarget.files[0];
        if (file)
            setSelectedImageFile(file);
    }



    return (
        <>

            <div className="popup-content">
                <div className='flex items-center p-2 mb-2'>

                    <h3 className='pl-2 text-lg font-bold mr-auto'>
                        {title}
                    </h3>

                    <CloseIcon closeHandler={closeHandler} />

                </div>
                <div className='mx-5'>
                    <form onSubmit={connectorForm.handleSubmit}>
                        <div className='flex'>
                            <div className='w-1/3'>
                                <FormInput value={connectorForm.values.partNumber}
                                    autoComplete='off'
                                    type="text"
                                    id="partNumber"
                                    label='PN'
                                    name='partNumber'
                                    error={connectorForm.errors.partNumber}
                                    touched={connectorForm.touched.partNumber}
                                    onBlur={connectorForm.handleBlur}
                                    handleChange={connectorForm.handleChange} />

                                <Select value={connectorForm.values.type}
                                    id="type"
                                    label='Type'
                                    name='type'
                                    items={cableTypes.map(c => {
                                        return { value: c.id, displayText: c.type }
                                    })}
                                    error={connectorForm.errors.type}
                                    touched={connectorForm.touched.type}
                                    onBlur={connectorForm.handleBlur}
                                    handleChange={connectorForm.handleChange} />

                                <Select value={connectorForm.values.producer}
                                    id="producer"
                                    label='Producer'
                                    name='producer'
                                    multiple={false}
                                    items={producers.map(p => {
                                        return { value: p.id, displayText: p.name }
                                    })}
                                    error={connectorForm.errors.producer}
                                    touched={connectorForm.touched.producer}
                                    onBlur={connectorForm.handleBlur}
                                    handleChange={connectorForm.handleChange} />

                                <FormInput value={connectorForm.values.price}
                                    type="number"
                                    id="price"
                                    label='Price'
                                    name='price'
                                    error={connectorForm.errors.price}
                                    touched={connectorForm.touched.price}
                                    onBlur={connectorForm.handleBlur}
                                    handleChange={connectorForm.handleChange} />
                            </div>

                            <div className='ml-2 w-2/3'>
                                <TextArea value={connectorForm.values.desc}
                                    type="text"
                                    id="desc"
                                    label='Short description'
                                    name='desc'
                                    rows={3}
                                    error={connectorForm.errors.desc}
                                    touched={connectorForm.touched.desc}
                                    onBlur={connectorForm.handleBlur}
                                    handleChange={connectorForm.handleChange} />

                                <TextArea value={connectorForm.values.descFull}
                                    type="text"
                                    id="desc"
                                    label='Full description'
                                    name='descFull'
                                    rows={6}
                                    error={connectorForm.errors.descFull}
                                    touched={connectorForm.touched.descFull}
                                    onBlur={connectorForm.handleBlur}
                                    handleChange={connectorForm.handleChange} />

                                <MultipleSelect
                                    value={connectorForm.values.compatibleCables}
                                    id="compatibleCables"
                                    selectedValues=
                                    {getCablesPartNumbersById(connectorForm.values.compatibleCables, cablesMappedObj)}
                                    label='Compatible cables'
                                    name='compatibleCables'
                                    multiple={true}
                                    items={cables.map(c => {
                                        return { value: c.id, displayText: c.partNumber }
                                    })}
                                    error={connectorForm.errors.compatibleCables}
                                    touched={connectorForm.touched.compatibleCables}
                                    onBlur={connectorForm.handleBlur}
                                    handleChange={connectorForm.handleChange} />


                                <SelectFile
                                    handleChange={handleSelectFile}
                                    label='Item image'
                                    type='file' id='selectFile' accept=".jpg, .jpeg, .png"
                                    selectedFile={selectedImageFile}
                                // DOM_ref={selectFileInputRef}
                                />

                            </div>

                        </div>


                        <div className='mb-4 flex justify-between'>
                            <div className='text-red-500 text-center font-bold self-end'>{message}</div>
                            <Button type={'submit'} clickHandler={handleSubmit}
                                bgColor='bg-blue'>{editItem ? 'Update connector' : 'Add connector'}</Button>
                        </div>

                    </form>
                </div>
            </div>


            {isLoading &&
                (<div className='loader-background'>
                    <div className='loader-container'>
                        <Loader />
                    </div>
                </div>)}
            {/*{!isOnline && <div className='text-red-500 text-center'>No internet connection</div>}*/}


        </>


    );
};