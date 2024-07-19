import { useFormik } from "formik";
import { patientSchema } from "../schemas/schemas";
import './pageStyle.css';

const PatientForm = ({onToggleForm, patients, setPatients}) => {
    const { values, handleChange, handleSubmit, errors } = useFormik({
        initialValues: {
            first_name: "",
            last_name: "",
            birthday: "",
            age: "",
            gender: "",
            phone: "",
            address: ""
        },
        validationSchema: patientSchema,
        onSubmit: (values) => {
            fetch("http://127.0.0.1:5555/patients", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values, null, 2)
            })
            .then(res => res.json())
            .then(newPatient => {
                    setPatients([...patients, newPatient])
                    onToggleForm()}
            )
        }
    })

    return (
        <div className="form-popup" id="patientForm" >
            <h2>New Patient Form</h2>
            <form className="form-container" onSubmit={handleSubmit}>
                <div className="field">
                    <label>First Name:</label>
                    <input type="text" placeholder="First Name" name="first_name" className={errors.first_name ? "input-error" : ""} value={values.first_name} onChange={handleChange} required/>
                </div>

                <div className="field">
                    <label>Last Name:</label>
                    <input type="text" placeholder="Last Name" name="last_name" className={errors.last_name ? "input-error" : ""} value={values.last_name} onChange={handleChange} required/>
                </div>

                <div className="field">
                    <label>Birthday:</label>
                    <input type="text" placeholder="YYYY-MM-DD" name="birthday" className={errors.birthday ? "input-error" : ""} value={values.birthday} onChange={handleChange} required/>
                </div>

                <div className="field">
                    <label>Age:</label>
                    <input type="text" placeholder="Max: 110" name="age" className={errors.age ? "input-error" : ""} value={values.age} onChange={handleChange} required/>
                </div>

                <div className="field">
                    <label>Biological Gender:</label>
                    <div className="radio-btns">
                        <div>
                            <label for="f">F</label><br/>
                            <input type="radio" id="f" name="gender" className={errors.age ? "input-error" : ""} value="F" onChange={handleChange} checked={values.gender === 'F'} required/>
                        </div>
                        <div>
                            <label for="m">M</label><br/>
                            <input type="radio" id="m" name="gender" className={errors.age ? "input-error" : ""} value="M" onChange={handleChange} checked={values.gender === 'M'} required/>
                        </div>
                    </div>
                </div>

                <div className="field">
                    <label>Phone Number:</label>
                    <input type="text" placeholder="1234567890" name="phone" className={errors.phone ? "input-error" : ""} value={values.phone} onChange={handleChange} required/>
                </div>

                <div className="field">
                    <label>Address:</label>
                    <input type="text" placeholder="1234 Alphabet St. Apple, MO 55555" name="address" className={errors.address ? "input-error" : ""} value={values.address} onChange={handleChange} required/>
                </div>

                <button type="submit" className="btn">Add</button>
                <button type="button" className="btn cancel" onClick={onToggleForm}>Cancel</button>
            </form>
        </div>
    )
}

export default PatientForm;