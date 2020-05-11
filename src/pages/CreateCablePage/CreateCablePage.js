import React from 'react';
import './CreateCablePage.scss'
import { Alert } from "../../UI/Alert/Alert";
import { v4 as uuidv4 } from 'uuid';
import {
    getConnectorsByCableId, calculateCablePrice
} from "../../utils/utility_functions";
import { useFormik } from "formik";
import { validate } from './createCablePageValidate';
import { useDispatch, useSelector } from 'react-redux'
import { FormInput } from "../../UI/Inputs/FormInput";
import { Button } from "../../UI/Button/Button";
import { Select } from "../../UI/Inputs/Select";
import { Loader } from "../../UI/Loader/Loader";
import { ItemCard } from "../../components/ItemCard/ItemCard";
import { togglePopup } from "../../redux/actions/ui-actions";
import { PhotoPopup } from "../../components/PhotoPopup/PhotoPopup";
import { addItemToCart } from "../../redux/actions/cart-actions";
import {
    selectCables,
    selectConnectors,
    selectConnectorsMappedObj,
    selectProducersMappedObj,
    selectCableTypesMappedObj,
    selectCablesMappedObj,

} from "../../redux/selectors/data-selectors";
import { selectCartItems } from '../../redux/selectors/cart-selectors'
import { ItemToCartPopup } from "../../components/ItemToCartPopup/ItemToCartPopup";
import { useHistory, useParams } from 'react-router-dom'
import { PopupBackground } from "../../components/PopupBackgound/PopupBackground";
import ReactTooltip from "react-tooltip";
import { NoCableSelected } from '../../components/NoCableSelected/NoCableSelected';
import { GoBackIcon } from '../../UI/GoBackIcon/GoBackIcon';



export const CreateCablePage = (props) => {

    //type used to filter cables and connectors
    // const { type } = useParams()

    const dispatch = useDispatch();
    const history = useHistory()

    ////data from redux
    const cables = useSelector(selectCables);
    const connectors = useSelector(selectConnectors);
    const isInitialize = useSelector(state => state.ui.isInitialize);
    const cablesMappedObj = useSelector(selectCablesMappedObj);
    const connectorsMappedObj = useSelector(selectConnectorsMappedObj);
    const producersMappedObj = useSelector(selectProducersMappedObj);
    const cableTypesMappedObj = useSelector(selectCableTypesMappedObj);
    const cartItems = useSelector(selectCartItems)

    const showPopup = useSelector(state => state.ui.showPopup);

    ////local state
    const [renderCables, setRenderCables] = React.useState([]);
    const [renderConnectors, setRenderConnectors] = React.useState([]);
    const [selectedCable, setSelectedCable] = React.useState(null);
    const [compatibleConnectors, setCompatibleConnectors] = React.useState([]);
    const [connector_A, setConnector_A] = React.useState(null);
    const [connector_B, setConnector_B] = React.useState(null);
    const [imageData, setImageData] = React.useState(null);
    const [itemToCart, setItemToCart] = React.useState(null);
    const [alertMessage, setAlertMessage] = React.useState('');


    let initialValues = {
        selectedCable: '',
        selectedConnector_A: '',
        selectedConnector_B: '',
        length: 1,
        quantity: 1,
        label: ''
    };

    const cableForm = useFormik({
        initialValues,
        onSubmit: handleSubmit,
        validate,

    });

    function clearState() {
        setImageData(null)
        setItemToCart(null)
    }

    ///filter required  cables and connectors
    React.useEffect(() => {
        if (!cables || !connectors)
            return;

        // const types = {
        //     'coax': 'oSEeipdzto3zsemlzMqY',
        //     'audio': 'ai6JYNgKZPClL443TfWE',
        //     'ethernet': 'R0sYiqlr3ErC9dCrbjZS'
        // }

        const renderCables = cables.filter(c => c.type === history.location.state.typeId);
        const renderConnectors = connectors.filter(c => c.type === history.location.state.typeId);
        setRenderCables(renderCables)
        setRenderConnectors(renderConnectors)



    }, [cables, connectors, history.location.state.typeId]);

    async function handleSubmit(e) {
        e.preventDefault();
        const errors = await cableForm.validateForm()

        if (Object.keys(errors).length > 0) {
            setAlertMessage('Перевірте обов\'язкові поля');
            return
        }


        const laborCost = cableTypesMappedObj[history.location.state.typeId].labor
        const labelCost = cableForm.values.label ? 1 : 0



        setItemToCart({
            id: uuidv4(),
            selectedCable,
            connector_A: connector_A,
            connector_B: connector_B,
            length: cableForm.values.length,
            quantity: cableForm.values.quantity,
            label: cableForm.values.label,
            price: calculateCablePrice(selectedCable.price, cableForm.values.length,
                connector_A.price, connector_B.price, labelCost, laborCost)
        })

        dispatch(togglePopup())//open popup
    }

    function addItem() {

        dispatch(addItemToCart(itemToCart))
        clearState()
        dispatch(togglePopup())//close popup

    }

    function addItemAndGoToCart() {
        dispatch(addItemToCart(itemToCart))
        clearState()
        dispatch(togglePopup())//close popup
        history.push('/cart')
    }

    function handleSelectCable(e) {
        //set selected cable value
        const cableId = e.target.value;
        cableForm.setFieldValue('selectedCable', cableId);

        //set compatible connectors for selected cable
        setSelectedCable(cablesMappedObj[cableId]);
        const selectedConnectors = getConnectorsByCableId(cableId, renderConnectors);
        setCompatibleConnectors(selectedConnectors)

        //reset selected connector field if new selected cable is not compatible with current selected connector
        if (connector_A) {
            if (!connector_A.compatibleCables.includes(cableId)) {
                setConnector_A(null)
                cableForm.setFieldValue('selectedConnector', 'select');
            }
        }

    }

    function handleSelectConnector(e) {
        const connectorId = e.target.value;

        if (e.target.name === 'selectedConnector_A') {
            cableForm.setFieldValue('selectedConnector_A', connectorId);
            setConnector_A(connectorsMappedObj[connectorId])
        } else {
            cableForm.setFieldValue('selectedConnector_B', connectorId);
            setConnector_B(connectorsMappedObj[connectorId])
        }
    }

    function closePopupHandler() {
        clearState()
        dispatch(togglePopup())
    }

    function enlargePhoto(e) {
        const imgDOM = e.target
        const productTitle = imgDOM.getAttribute('data_product_title')

        setImageData({ imageUrl: imgDOM.src, productTitle })
        dispatch(togglePopup())
    }

    // console.log(connectorsMappedObj);
    //  console.log(selectedConnector);
    // console.log('renderConnectors', renderConnectors)

    // console.log('con-A -', connector_A, 'con-B-', connector_B)


    //////////////////////////JSX_TEMPLATES//////////////////////////////
    const ConnectorA_jsx = connector_A && (
        <ItemCard desc={connector_A.descFull}
            title={'Роз\'єм А'}
            extLink={connector_A.extLink}
            price={connector_A.price}
            productTitle={`${producersMappedObj[connector_A.producer].name} ${connector_A.partNumber}`}
            imageUrl={connector_A.imageUrl}
            enlargePhoto={enlargePhoto} />)


    const ConnectorB_jsx = connector_B && (
        <ItemCard desc={connector_B.descFull}
            title={'Роз\'єм B'}
            extLink={connector_B.extLink}
            price={connector_B.price}
            productTitle={`${producersMappedObj[connector_B.producer].name} ${connector_B.partNumber}`}
            imageUrl={connector_B.imageUrl}
            enlargePhoto={enlargePhoto} />)

    const connectorA_B_jsx = (connector_A && connector_B && connector_A.id === connector_B.id) && (
        <ItemCard desc={connector_A.descFull}
            title={'Роз\'єми А, B'}
            extLink={connector_A.extLink}
            price={connector_A.price}
            productTitle={`${producersMappedObj[connector_A.producer].name} ${connector_A.partNumber}`}
            imageUrl={connector_A.imageUrl}
            enlargePhoto={enlargePhoto} />)


    ////////////////////////render//////////////////////

    if (isInitialize) {
        return (
            <div className='loader-background'>
                <div className='loader-container'>
                    <Loader />
                </div>
            </div>)
    }

    return (
        <>
            <div className='flex h-85vh'>
                <div className='w-1/3 p-2'>
                    <form onSubmit={handleSubmit}>
                        <Select
                            value={cableForm.values.selectedCable}
                            id="selectedCable"

                            label='Кабель'
                            name='selectedCable'
                            items={renderCables.map(c => {
                                return {
                                    value: c.id,
                                    displayText: `${producersMappedObj[c.producer].name} ${c.partNumber}`
                                }
                            })}
                            error={cableForm.errors.selectedCable}
                            touched={cableForm.touched.selectedCable}
                            onBlur={cableForm.handleBlur}
                            handleChange={handleSelectCable} />

                        <Select
                            value={cableForm.values.selectedConnector_A}
                            id="selectedConnector_A"
                            label={'Роз\'єм  A'}
                            name='selectedConnector_A'
                            multiple={false}
                            items={compatibleConnectors.map(c => {
                                return {
                                    value: c.id,
                                    displayText: `${producersMappedObj[c.producer].name} ${c.partNumber}`
                                }
                            })}
                            error={cableForm.errors.selectedConnector_A}
                            touched={cableForm.touched.selectedConnector_A}
                            onBlur={cableForm.handleBlur}
                            handleChange={handleSelectConnector} />

                        <Select
                            value={cableForm.values.selectedConnector_B}
                            id="selectedConnector_B"
                            label={'Роз\'єм  B'}
                            name='selectedConnector_B'
                            multiple={false}
                            items={compatibleConnectors.map(c => {
                                return {
                                    value: c.id,
                                    displayText: `${producersMappedObj[c.producer].name} ${c.partNumber}`
                                }
                            })}
                            error={cableForm.errors.selectedConnector_B}
                            touched={cableForm.touched.selectedConnector_B}
                            onBlur={cableForm.handleBlur}
                            handleChange={handleSelectConnector} />

                        <div data-tip="length">
                            <FormInput value={cableForm.values.length}
                                type="number"
                                id="length"
                                label='Довжина'
                                name='length'
                                error={cableForm.errors.length}
                                touched={cableForm.touched.length}
                                onBlur={cableForm.handleBlur}
                                handleChange={cableForm.handleChange} />
                        </div>

                        <div data-tip="quantity">
                            <FormInput value={cableForm.values.quantity}
                                type="number"
                                id="quantity"
                                label='Кількість'
                                name='quantity'
                                error={cableForm.errors.quantity}
                                touched={cableForm.touched.quantity}
                                onBlur={cableForm.handleBlur}
                                handleChange={cableForm.handleChange} />
                        </div>

                        <div data-tip="label">
                            <FormInput value={cableForm.values.label}
                                type="text"
                                id="label"
                                label='Шильдік'
                                name='label'
                                error={cableForm.errors.label}
                                touched={cableForm.touched.label}
                                onBlur={cableForm.handleBlur}
                                handleChange={cableForm.handleChange} />
                        </div>

                        <div className='flex justify-end mb-auto'>
                            <Button type='submit' clickHandler={handleSubmit} bgColor='bg-blue'>Add to cart</Button>
                        </div>

                        {alertMessage &&
                            <Alert bgColor={'bg-blue-500'} message={alertMessage} cb={() => setAlertMessage(null)} />}

                    </form>
                </div>

                <div className='w-2/3 p-2 text-white'>

                    {!selectedCable && <NoCableSelected />}

                    {
                        selectedCable && (
                            <ItemCard desc={selectedCable.descFull}
                                title={'Кабель'}
                                extLink={selectedCable.extLink}
                                price={selectedCable.price}
                                productTitle={selectedCable.partNumber}
                                imageUrl={selectedCable.imageUrl}
                                enlargePhoto={enlargePhoto} />)

                    }
                    {/*render connectors*/}
                    {!connectorA_B_jsx && ConnectorA_jsx}
                    {!connectorA_B_jsx && ConnectorB_jsx}
                    {connectorA_B_jsx && connectorA_B_jsx}


                </div>
            </div>

            {showPopup && imageData && (
                <PopupBackground>
                    <PhotoPopup
                        imageUrl={imageData.imageUrl}
                        productTitle={imageData.productTitle}
                        closeHandler={closePopupHandler} />
                </PopupBackground>)}


            {showPopup && itemToCart && (
                <PopupBackground>
                    <ItemToCartPopup
                        addItem={addItem}
                        addItemAndGoToCart={addItemAndGoToCart}
                        itemToCart={itemToCart}
                        closeHandler={closePopupHandler} />}
                </PopupBackground>)}

            <ReactTooltip place='top' delayShow={200} />
            <GoBackIcon clickHandler={() => history.goBack()} size='text-4xl' />
        </>
    );
};
