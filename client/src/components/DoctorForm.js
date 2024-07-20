import { useFormik } from "formik";
import { doctorSchema } from "../schemas/schemas";
import './pageStyle.css';

const DoctorForm = ({onToggleForm, doctors, setDoctors}) => {
    const { values, handleChange, handleSubmit, errors } = useFormik({
        initialValues: {
            first_name: "",
            last_name: "",
            npi: "",
            gender: "",
            field: "",
        },
        validationSchema: doctorSchema,
        onSubmit: (values) => {
            fetch("http://127.0.0.1:5555/doctors", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values, null, 2)
            })
            .then(res => res.json())
            .then(newDoctor => {
                    setDoctors([...doctors, newDoctor])
                    onToggleForm()}
            )
        }
    })

    return(
        <div className="form-popup" id="doctorForm" >
            <h2>New Doctor Form</h2>
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
                    <label>NPI#:</label>
                    <input type="number" placeholder="1*********" name="npi" className={errors.npi ? "input-error" : ""} value={values.npi} onChange={handleChange} min="1000000000" max="1999999999" required/>
                </div>

                <div className="field">
                    <label>Field:</label>
                    <input type="text" placeholder="1********X" name="field" className={errors.field ? "input-error" : ""} value={values.field} onChange={handleChange} required/>
                </div>

                <div className="field">
                    <label>Gender Identity:</label>
                    <div className="radio-btns">
                        <div>
                            <label for="f">F</label><br/>
                            <input type="radio" id="f" name="gender" className={errors.gender ? "input-error" : ""} value="F" onChange={handleChange} checked={values.gender === 'F'} required/>
                        </div>
                        <div>
                            <label for="m">M</label><br/>
                            <input type="radio" id="m" name="gender" className={errors.gender ? "input-error" : ""} value="M" onChange={handleChange} checked={values.gender === 'M'} required/>
                        </div>
                    </div>
                </div>

                <button type="submit" className="btn">Add</button>
                <button type="button" className="btn cancel" onClick={onToggleForm}>Cancel</button>
            </form>
    </div>
    )
}

export default DoctorForm;