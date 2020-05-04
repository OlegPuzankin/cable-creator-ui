import React from 'react';
import './CableFormPopup.scss'
import {FormInput} from "../../UI/Inputs/FormInput";
import {Button} from "../../UI/Button/Button";
import {FirebaseContext} from "../../firebase/firebaseContext";
import {useFormik} from 'formik'
import {useDispatch, useSelector} from 'react-redux'
import {validate} from './сableFormValidate'
import {setEditItem} from "../../redux/actions/data-actions";
import {toggleIsLoading, togglePopup} from "../../redux/actions/ui-actions";
import {TextArea} from "../../UI/Inputs/TextArea";
import {Select} from "../../UI/Inputs/Select";
import {SelectFile} from "../../UI/Inputs/InputFile";
import {Loader} from "../../UI/Loader/Loader";
import {CloseIcon} from "../../UI/CloseIcon/CloseIcon";


export const CableFormPopup = ({title, closeHandler}) => {


    // const selectFileInputRef = React.useRef(null)
    const [selectedImageFile, setSelectedImageFile] = React.useState(null);
    const [message, setMessage] = React.useState('');

    const {firebase} = React.useContext(FirebaseContext);
    // const isOnline = useSelector(state => state.ui.isOnline);
    const isLoading = useSelector(state => state.ui.isLoading);
    const dispatch = useDispatch();

    const editItem = useSelector(state => state.data.editItem);
    const cableTypes = useSelector(state => state.data.cableTypes);
    const producers = useSelector(state => state.data.producers);

//////////////////////////DATA FIELDS/////////////////////
    let initialValues = {
        partNumber: '',
        desc: '',
        descFull: '',
        price: 0,
        type: '',
        producer: '',
        extLink: ''
    };

    if (editItem) {
        initialValues = {...editItem}
    }

    const cableForm = useFormik({
        initialValues,
        onSubmit: handleSubmit,
        validate
    });

    async function addCable() {
        //check fields errors
        if (Object.keys(cableForm.errors).length > 0) {
            setMessage('Please check all fields');
            return
        }
        //set loading animation
        dispatch(toggleIsLoading(true));

        try {
            let imageUrl = null;
            let filePath = null;
            if (selectedImageFile) {
                let {imageUrl: url, filePath: path} = await firebase.addImageToStorage(selectedImageFile);
                imageUrl = url;
                filePath = path;
            }
            await firebase.addItemToDatabase('cables', {
                ...cableForm.values,
                filePath, imageUrl, createdAt: Date.now()
            });
            dispatch(toggleIsLoading(false));
            cableForm.resetForm();
            setMessage('Cable was added successfully');
            setTimeout(() => setMessage(''), 2500)
        } catch (e) {
            dispatch(toggleIsLoading(false));
            setMessage(e.message)
        }
    }

    async function updateCable() {
        try {
            dispatch(toggleIsLoading(true));

            delete cableForm.values.table;
            delete cableForm.values.id;


            //update text fields
            await firebase.db.collection('cables')
                .doc(editItem.id)
                .update(cableForm.values);
            //update image
            if (selectedImageFile) {
                try {
                    let {imageUrl, filePath} = await firebase.addImageToStorage(selectedImageFile);
                    await firebase.db.collection('cables')
                        .doc(editItem.id)
                        .update({filePath, imageUrl});

                } catch (e) {
                    dispatch(toggleIsLoading(false));

                    setMessage(e.message)
                }
            }
            dispatch(toggleIsLoading(false));
            dispatch(setEditItem(null));
            dispatch(togglePopup())


        } catch (e) {
            dispatch(toggleIsLoading(false));
            setMessage(e.message)
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (editItem)
            await updateCable();
        else
            await addCable()
    }


    function handleSelectFile(e) {

        // const file = selectFileInputRef.current.files[0];
        const file = e.currentTarget.files[0];
        if (file)
            setSelectedImageFile(file);
    }

    // console.log('cableform errors', cableForm.errors)
    // console.log('cableTypes', cableTypes)
    console.log('cableForm.values', cableForm.values)

    /////////////////////render//////////////////

    return (
        <>


            <div className="popup-content">
                <div className='flex items-center p-2 mb-2'>

                    <h3 className='pl-2 text-lg font-bold mr-auto'>
                        {title}
                    </h3>


                    <CloseIcon closeHandler={closeHandler}/>

                </div>
                <div className='mx-5'>
                    <form onSubmit={cableForm.handleSubmit}>
                        <div className='flex'>
                            <div className='w-1/3'>


                                <FormInput value={cableForm.values.partNumber}
                                           autoComplete='off'
                                           type="text"
                                           id="partNumber"
                                           label='PN'
                                           name='partNumber'
                                           error={cableForm.errors.partNumber}
                                           touched={cableForm.touched.partNumber}
                                           onBlur={cableForm.handleBlur}
                                           handleChange={cableForm.handleChange}/>

                                <Select value={cableForm.values.producer}
                                        id="producer"
                                        label='Producer'
                                        name='producer'
                                        items={producers.map(p => {
                                            return {value: p.id, displayText: p.name}
                                        })}
                                        error={cableForm.errors.type}
                                        touched={cableForm.touched.type}
                                        onBlur={cableForm.handleBlur}
                                        handleChange={cableForm.handleChange}/>

                                <Select value={cableForm.values.type}
                                        id="type"
                                        label='Type'
                                        name='type'
                                        items={cableTypes.map(c => {
                                            return {value: c.id, displayText: c.type}
                                        })}
                                        error={cableForm.errors.type}
                                        touched={cableForm.touched.type}
                                        onBlur={cableForm.handleBlur}
                                        handleChange={cableForm.handleChange}/>


                                <FormInput value={cableForm.values.price}
                                           type="number"
                                           id="price"
                                           label='Price'
                                           name='price'
                                           error={cableForm.errors.price}
                                           touched={cableForm.touched.price}
                                           onBlur={cableForm.handleBlur}
                                           handleChange={cableForm.handleChange}/>


                            </div>

                            <div className='ml-2 w-2/3'>


                                <TextArea value={cableForm.values.descFull}
                                          type="text"
                                          id="descFull"
                                          label='Full description'
                                          name='descFull'
                                          rows={10}
                                          error={cableForm.errors.descFull}
                                          touched={cableForm.touched.descFull}
                                          onBlur={cableForm.handleBlur}
                                          handleChange={cableForm.handleChange}/>

                                <TextArea value={cableForm.values.desc}
                                          type="text"
                                          id="desc"
                                          label='Short description'
                                          name='desc'
                                          rows={3}
                                          error={cableForm.errors.desc}
                                          touched={cableForm.touched.desc}
                                          onBlur={cableForm.handleBlur}
                                          handleChange={cableForm.handleChange}/>

                                <FormInput value={cableForm.values.extLink}
                                           type="text"
                                           id="extLink"
                                           label='External link'
                                           name='extLink'
                                           error={cableForm.errors.extLink}
                                           touched={cableForm.touched.extLink}
                                           onBlur={cableForm.handleBlur}
                                           handleChange={cableForm.handleChange}/>

                                <SelectFile
                                    handleChange={handleSelectFile}
                                    label='Item image'
                                    type='file' id='selectFile' accept=".jpg, .jpeg, .png"
                                    selectedFile={selectedImageFile}
                                    // DOM_ref={selectFileInputRef}
                                />

                                {/*<div className='mt-2'>*/}
                                {/*    <label htmlFor="selectFile" className='btn bg-gray-600 rounded-b-full cursor-pointer p-2'>Select File</label>*/}
                                {/*    <input onChange={handleSelectFile} type='file' id='selectFile' className='hidden' accept=".jpg, .jpeg, .png" ref={selectFileInputRef}/>*/}
                                {/*    <span>{selectedFileName}</span>*/}
                                {/*</div>*/}

                            </div>


                        </div>


                        <div className='mb-4 flex justify-between'>
                            <div className='text-red-500 font-bold self-end'>{message}</div>
                            <Button type='submit' clickHandler={handleSubmit}
                                    bgColor='bg-blue'>{editItem ? 'Update cable' : 'Add cable'}
                            </Button>
                        </div>

                    </form>
                </div>
            </div>


            {isLoading &&
            (<div className='loader-background'>
                <div className='loader-container'>
                    <Loader/>
                </div>
            </div>)}
        </>

    )

};

//todo - isOnline?
