import React from 'react';
import { firebase } from "../firebase/firebase";
import { store } from "../redux/store";
import { setCables, setCableTypes, setConnectors, setProducers } from "../redux/actions/data-actions";
import { setCartItems } from "../redux/actions/cart-actions";
import { toggleIsInitialize } from "../redux/actions/ui-actions";


function getAndTrackData(collectionName, dispatchAction) {

    return firebase.db.collection(collectionName)
        .orderBy('createdAt', 'desc')
        .onSnapshot(snapshot => {
            const data = snapshot.docs.map(doc => {

                return { id: doc.id, ...doc.data() }
            });
            dispatchAction(data)
        })

}

function getMappedObjectFromArray(array) {
    const obj = {};
    array.forEach(i => {
        const { id } = i
        // delete i.id

        obj[id] = i
    });

    return obj;
}


export function useInitData() {
    React.useEffect(() => {

        function loadCartFromLocalStorage() {
            const currentCart = window.localStorage.getItem('cart')


            const cart = JSON.parse(currentCart)
            if (cart && cart.length !== 0)
                store.dispatch(setCartItems(cart))
        }


        async function loadCollections() {
            //start loading
            store.dispatch(toggleIsInitialize(true))
            loadCartFromLocalStorage()

            try {
                const types = await firebase.loadCollection('cableTypes')
                const producers = await firebase.loadCollection('producers')


                const producersObj = getMappedObjectFromArray(producers);
                const typesObj = getMappedObjectFromArray(types)

                store.dispatch(setCableTypes({ types, typesObj }))
                store.dispatch(setProducers({ producers, producersObj }))
                //end loading
                store.dispatch(toggleIsInitialize(false))
            } catch (e) {
                store.dispatch(toggleIsInitialize(false))
                console.log(e.message)
            }

        }


        loadCollections()


        const unsubscribeCablesUpdate = getAndTrackData('cables',
            (cables) => {
                const mappedObj = getMappedObjectFromArray(cables);
                store.dispatch(setCables({ cables, mappedObj }))
            });
        const unsubscribeConnectorsUpdate = getAndTrackData('connectors',
            (connectors) => {
                const mappedObj = getMappedObjectFromArray(connectors);
                store.dispatch(setConnectors({ connectors, mappedObj }))
            });


        return () => {
            unsubscribeCablesUpdate();
            unsubscribeConnectorsUpdate()
        }

    }, [])

    // React.useEffect(() => {
    //
    //     // const unsubscribe = firebase.db.collection('connectors')
    //     //     .orderBy('createdAt', 'desc')
    //     //     .onSnapshot(snapshot => {
    //     //         const connectors = snapshot.docs.map(doc => {
    //     //
    //     //             return {id: doc.id, ...doc.data()}
    //     //         });
    //     //         store.dispatch(setConnectors(connectors))
    //     //         // console.log(cables)
    //     //
    //     //
    //     //     })
    //
    //     const unsubscribe = trackData('connectors', (data)=>store.dispatch(setConnectors(data)))
    //     return () => unsubscribe()
    //
    // }, [])
}

