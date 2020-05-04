export const validate = values => {
    const errors = {};
    if (!values.desc) {
        errors.desc = 'Required';
    }

    if (!values.partNumber) {
        errors.partNumber = 'Required';
    }

    if (!values.descFull) {
        errors.descFull = 'Required';
    }

    if (values.price===0) {
        errors.price = 'Price can not be 0';
    }

    return errors;
};

// let initialValues = {partNumber: '', desc: '', descFull: '', price: 0, type: '', producer: ''};
