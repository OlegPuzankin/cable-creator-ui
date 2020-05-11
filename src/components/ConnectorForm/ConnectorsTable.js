import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { FirebaseContext } from "../../firebase/firebaseContext";
import { togglePopup } from "../../redux/actions/ui-actions";
import { setEditItem } from "../../redux/actions/data-actions";
import { Loader } from "../../UI/Loader/Loader";
import { ConnectorFormPopup } from "./ConnectorFormPopup";
import { formatDescription, getCablesPartNumbersById } from "../../utils/utility_functions";
import cn from "classnames";
import { PopupBackground } from "../PopupBackgound/PopupBackground";

const tableHeader = [
    { name: 'Pos', width: '5%' },
    { name: 'PN', width: '5%' },
    { name: 'Producer', width: '5%' },
    { name: 'Type', width: '5%' },
    { name: 'Short description', width: '20%' },
    { name: 'Full description', width: 'auto%' },
    { name: 'Compatible cables', width: '15%' },
    { name: 'Price', width: '5%' },
    { name: 'Image', width: 'auto' },
];

export const ConnectorsTable = () => {

    const dispatch = useDispatch()
    const isInitialize = useSelector(state => state.ui.isInitialize);


    const editItem = useSelector(state => state.data.editItem)
    const connectors = useSelector(state => state.data.connectors)

    const producersMappedObj = useSelector(state => state.data.producersMappedObj);
    const cableTypesMappedObj = useSelector(state => state.data.cableTypesMappedObj);
    const cablesMappedObj = useSelector(state => state.data.cablesMappedObj);

    const showPopup = useSelector(state => state.ui.showPopup)
    const { firebase } = React.useContext(FirebaseContext)


    async function editHandler(e, arg) {
        dispatch(togglePopup())
    }

    async function deleteHandler(e, arg) {
        const response = window.confirm('remove item?')
        if (!response)
            return

        try {
            await firebase.deleteItemFromDatabase('connectors', editItem.id)
        } catch (e) {
            console.log(e.message)
        }
    }


    function addItemHandler() {
        dispatch(setEditItem(null))
        dispatch(togglePopup())
    }

    function selectItemHandler(e, arg) {
        e.persist()

        const item = connectors.find(c => c.id === arg);
        dispatch(setEditItem({ ...item, table: 'connector' }));

    }

    ///////////////////////////////////render/////////////////////////////////////////

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
            <div className='p-2 flex align-middle'>
                <span onClick={addItemHandler}
                    className="material-icons text-4xl text-blue-500 hover:text-blue-900"> add_circle </span>
                {editItem && editItem.table === 'connector' &&
                    <span onClick={editHandler}
                        className="material-icons text-4xl text-blue-500 hover:text-blue-900"> edit </span>}

                {editItem && editItem.table === 'connector' &&
                    <span onClick={deleteHandler}
                        className="material-icons text-4xl text-blue-500 hover:text-blue-900">delete</span>}

                {/*<Button clickHandler={addItemHandler} bgColor='bg-blue'>Add сonnector</Button>*/}
            </div>

            <table className="table-auto w-full">
                <thead>
                    <tr>
                        {
                            tableHeader.map((th, idx) =>
                                (<th style={{ 'width': th.width }} key={idx} className="th-cell">{th.name}</th>))
                        }

                    </tr>
                </thead>
                <tbody>

                    {connectors && connectors.map((c, idx) => {

                        return (
                            <tr id={c.id}
                                key={c.id}
                                className={cn('table-row', { 'table-row-selected': editItem && editItem.id === c.id })}
                                onClick={(e) => selectItemHandler(e, c.id)}>


                                <td className="td-cell text-center">{idx + 1}</td>
                                <td className="td-cell">{c.partNumber}</td>
                                <td className="td-cell">{producersMappedObj[c.producer].name}</td>
                                <td className="td-cell">{cableTypesMappedObj[c.type].type}</td>
                                <td className="td-cell">{formatDescription(c.desc)}</td>
                                <td className="td-cell">{formatDescription(c.descFull)}</td>

                                <td className="td-cell">
                                    {getCablesPartNumbersById(c.compatibleCables, cablesMappedObj)}
                                </td>


                                <td className="td-cell">{c.price}</td>

                                <td className="td-cell text-center">
                                    <img src={c.imageUrl} alt="" className='td-img' />
                                </td>


                            </tr>
                        )

                    })
                    }
                </tbody>
            </table>
            {showPopup && (
                <PopupBackground>
                    <ConnectorFormPopup closeHandler={addItemHandler}
                        title={editItem ? 'Edit connector' : 'Add connector'} />
                </PopupBackground>)}
        </>

    );
};

