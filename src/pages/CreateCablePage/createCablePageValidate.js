export const validate = values => {
    const errors = {};
    if (!values.selectedCable || values.selectedCable ==='select') {
        errors.selectedCable = 'Required';
    }

    if (!values.selectedConnector_A || values.selectedConnector_A ==='select') {
        errors.selectedConnector_A = 'Required';
    }

    if (!values.selectedConnector_B || values.selectedConnector_B ==='select') {
        errors.selectedConnector_B = 'Required';
    }


    return errors;
};

