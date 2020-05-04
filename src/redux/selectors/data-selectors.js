import {createSelector} from 'reselect'


const selectData=state=>state.data;

export const selectCables = createSelector(
    [selectData],
    (data)=>data.cables
);

export const selectConnectors = createSelector(
    [selectData],
    (data)=>data.connectors
);

export const selectProducersMappedObj = createSelector(
    [selectData],
    (data)=>data.producersMappedObj
);