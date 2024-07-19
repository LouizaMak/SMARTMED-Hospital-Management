import * as yup from "yup";
import moment from "moment";

export const patientSchema = yup.object().shape({
    first_name: yup.string().required("Required"),
    last_name: yup.string().required("Required"),
    age: yup.number().positive().integer().max(110).required("Required"),
    birthday: yup
    .string()
    .required("Required")
    .matches(/^\d{4}-\d{2}-\d{2}$/, 'Birthday must be in the format YYYY-MM-DD')
    .test('is-valid-date', 'Invalid date', (value) => moment(value, 'YYYY-MM-DD', true).isValid())
    .test('is-not-too-old', 'Age cannot be more than 110 years', (value) => {
        if (!value) return false;
        const birthDate = moment(value, 'YYYY-MM-DD');
        const today = moment();
        return today.diff(birthDate, 'years') <= 110;
      }),
    gender: yup.string().oneOf(['F', 'M']).required('Required'),
    phone: yup.string().matches(/^[0-9]+$/, 'Phone number must be numeric').required('Required'),
    address: yup.string().required('Required')
})