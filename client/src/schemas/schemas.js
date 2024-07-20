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

export const doctorSchema = yup.object().shape({
  first_name: yup.string().required("Required"),
  last_name: yup.string().required("Required"),
  npi: yup
  .string()
  .matches(/^1\d{9}$/, 'NPI must be a 10-digit number starting with 1.')
  .required("Required"),
  gender: yup.string().oneOf(['F', 'M']).required('Required'),
  field: yup
  .string()
  .matches(/^1[a-zA-Z0-9]{8}X$/, 'Field must be a 10-character string starting with 1 and ending with X')
  .required("Required")
})

const today = new Date();
today.setHours(0, 0, 0, 0);

export const appointmentSchema = yup.object().shape({
  date: yup
  .string()
  .required("Required.")
  .matches(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in the format YYYY-MM-DD')
  .test('is-future-date', 'Date must be in the future', function(value) {
    return new Date(value) > today}),
  hour: yup
  .string()
  .required('Required'),
  reason: yup.string().required('Required'),
  notes: yup.string(),
  patient_id: yup.number().positive().required('Required'),
  doctor_id: yup.number().positive().required('Required')
})