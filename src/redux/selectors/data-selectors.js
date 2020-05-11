import { createSelector } from 'reselect'


const selectData = state => state.data;

export const selectCables = createSelector(
    [selectData],
    (data) => data.cables
);

export const selectConnectors = createSelector(
    [selectData],
    (data) => data.connectors
);

export const selectProducersMappedObj = createSelector(
    [selectData],
    (data) => data.producersMappedObj
);

export const selectCablesMappedObj = createSelector(
    [selectData],
    (data) => data.cablesMappedObj
);

export const selectConnectorsMappedObj = createSelector(
    [selectData],
    (data) => data.connectorsMappedObj
);


export const selectCableTypesMappedObj = createSelector(
    [selectData],
    (data) => data.cableTypesMappedObj
);