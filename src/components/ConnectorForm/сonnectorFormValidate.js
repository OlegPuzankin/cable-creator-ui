export const validate = values => {
    const errors = {};

    if (!values.partNumber) {
        errors.partNumber = 'Required';
    }
    if (!values.desc) {
        errors.desc = 'Required';
    }
    if (!values.descFull) {
        errors.descFull = 'Required';
    }

    if (!values.producer) {
        errors.producer = 'Required';
    }

    if (!values.type) {
        errors.type = 'Required';
    }

    if (values.price===0) {
        errors.price = 'WTF';
    }



    if (values.compatibleCables.length===0) {
        errors.compatibleCables = 'Required';
    }

    return errors;
};