import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { FirebaseContext } from "../../firebase/firebaseContext";
import { togglePopup } from "../../redux/actions/ui-actions";
import { CableFormPopup } from "./CableFormPopup";
import { setEditItem } from "../../redux/actions/data-actions";
import { Loader } from "../../UI/Loader/Loader";
import { formatDescription } from "../../utils/utility_functions";
import cn from 'classnames'
import { PopupBackground } from "../PopupBackgound/PopupBackground";


export const CablesTable = () => {

    const dispatch = useDispatch();

    // const [searchInput, setSearchInput] = React.useState('')


    const editItem = useSelector(state => state.data.editItem);
    const isInitialize = useSelector(state => state.ui.isInitialize);
    const cables = useSelector(state => state.data.cables);
    // const [renderCables, setRenderCables] = React.useState(null)
    const connectors = useSelector(state => state.data.connectors);

    const producersMappedObj = useSelector(state => state.data.producersMappedObj);
    const cableTypesMappedObj = useSelector(state => state.data.cableTypesMappedObj);


    const showPopup = useSelector(state => state.ui.showPopup);
    const { firebase } = React.useContext(FirebaseContext);


    const tableHeader = [
        { name: 'Pos', width: '5%' },
        { name: 'PN', width: '5%' },
        { name: 'Producer', width: '5%' },
        { name: 'Type', width: '5%' },
        { name: 'Short description', width: '20%' },
        { name: 'Full description', width: 'auto%' },
        { name: 'Price', width: '5%' },
        { name: 'Image', width: 'auto' },
    ];

    async function editHandler(e) {
        // e.persist()
        dispatch(togglePopup())
    }

    async function deleteHandler(e) {
        e.persist()
        // const response = window.confirm('remove item?');
        // if (!response)
        //     return;


        connectors.forEach(c => {
            const idx = c.compatibleCables.indexOf(editItem.id);
            if (idx !== -1) {
                const response = window.confirm('this cable has compatible conns. remove?');
                if (!response)
                    return;

                c.compatibleCables.splice(idx, 1)

                firebase.db.collection('connectors').doc(c.id).update({
                    compatibleCables: c.compatibleCables
                }).then(() => {
                    setEditItem(null)

                }).catch((e) => {
                    console.error(e.message)
                })
            }
        });


        try {
            await firebase.deleteItemFromDatabase('cables', editItem.id)
        } catch (e) {
            console.log(e.message)
        }
    }


    function addItemHandler() {
        dispatch(setEditItem(null));
        dispatch(togglePopup())
    }

    function selectItemHandler(e, arg) {
        e.persist()

        const item = cables.find(c => c.id === arg);
        dispatch(setEditItem({ ...item, table: 'cable' }));

    }

    function closePopupHandler() {
        dispatch(togglePopup())
    }


    // console.log(isInitialize)
    // console.log(searchInput)

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

                {editItem && editItem.table === 'cable' &&
                    <span onClick={editHandler}
                        className="material-icons text-4xl text-blue-500 hover:text-blue-900"> edit </span>}

                {editItem && editItem.table === 'cable' &&
                    <span onClick={deleteHandler}
                        className="material-icons text-4xl text-blue-500 hover:text-blue-900">delete</span>}


            </div>

            <table className="table-auto w-full">
                <thead>
                    <tr>
                        {
                            tableHeader.map((th, idx) => (
                                <th style={{ 'width': th.width }} key={idx} className="th-cell">{th.name}</th>))
                        }

                    </tr>
                </thead>
                <tbody>

                    {cables && cables.map((c, idx) => {
                        return (
                            <tr id={c.id}
                                key={c.id}
                                // key={idx}
                                className={cn('table-row', { 'table-row-selected': editItem && editItem.id === c.id })}
                                onClick={(e) => selectItemHandler(e, c.id)}>

                                <td className="td-cell text-center">{idx + 1}</td>
                                <td className="td-cell">{c.partNumber}</td>
                                <td className="td-cell">{producersMappedObj[c.producer].name}</td>
                                <td className="td-cell">{cableTypesMappedObj[c.type].type}</td>
                                <td className="td-cell">{formatDescription(c.desc)}</td>
                                <td className="td-cell">{formatDescription(c.descFull)}</td>
                                <td className="td-cell text-center">{c.price}</td>

                                <td className="td-cell text-center">
                                    <img src={c.imageUrl} alt="" className='td-img' />
                                </td>

                            </tr>
                        )

                    })
                    }
                </tbody>
            </table>
            {showPopup &&
                (<PopupBackground>
                    <CableFormPopup closeHandler={closePopupHandler}
                        title={editItem ? 'Edit cable' : 'Add cable'} />
                </PopupBackground>)}


        </>
    );
};

