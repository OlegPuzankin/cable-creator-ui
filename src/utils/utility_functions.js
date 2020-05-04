export function getCablesPartNumbersById(cableIDs, cablesMappedObj) {
    const arr = [];
    cableIDs.forEach(id => arr.push(cablesMappedObj[id].partNumber));
    return arr.join(', ')

}

export function getCablePartNumberById(cableID, cables) {
    const result = cables.find(c => c.id === cableID);
    if (result)
        return result.partNumber
}

export function getConnectorPartNumberById(connectorId, connectors) {
    const result = connectors.find(c => c.id === connectorId);
    if (result)
        return result.partNumber
}

export function getConnectorsByCableId(cableId, connectors) {
    const result = [];
    connectors.forEach(c => {
        if (c.compatibleCables.includes(cableId))
            result.push(c)
    });
    return result
}

export function formatDescription(desc) {
    if (desc.length > 100) {
        return `${desc.substring(0, 100)} ...`
    } else return desc

}

export function calculateCablePrice(cablePrice, length, connectorA_Price, connectorB_Price, label, labor = 3) {
    if (labor === 'coax')
        labor = 1;
    else if (labor === 'audio')
        labor = 2;

    if (label)
        label = 2
    else
        label = 0

    return Number(cablePrice) * length + Number(connectorA_Price) + Number(connectorB_Price) + Number(label) + Number(labor)

}





