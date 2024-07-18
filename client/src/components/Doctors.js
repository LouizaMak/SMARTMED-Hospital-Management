import { useOutletContext } from "react-router-dom";
import DoctorCard from "./DoctorCard";
import { useState } from "react";
import './pageStyle.css';

function Doctors() {
    const {doctors, setDoctors} = useOutletContext();
    const [isUpdating, setIsUpdating] = useState(false);

    //Post form states
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastname] = useState("");
    const [npi, setNPI] = useState("");
    const [gender, setGender] = useState("");
    const [field, setField] = useState("");
    
    //Pop-up form
    function handleToggleForm() {
        setIsUpdating(!isUpdating)
    }

    //Form data
    function handleFormInput(event) {
        const field = event.target.name;
        let input = event.target.value;
        if(field === "firstName") {
            setFirstName(input)
        } else if(field === "lastName") {
            setLastname(input)
        } else if(field === "gender") {
            setGender(input)
        } else if(field === "npi") {
            setNPI(parseInt(input))
        } else {
            setField(input)
        }
    }

    function handleAddSubmit(event) {
        event.preventDefault()
        fetch("http://127.0.0.1:5555/doctors", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                first_name: firstName,
                last_name: lastName,
                field: field,
                gender: gender,
                npi: npi
            })
        })
        .then(res => res.json().then(data => ({ status: res.status, body: data})))
        .then(data => {
            if (data.status === 201) {
                setDoctors([...doctors, data.body])
                clearForm()
                handleToggleForm()
            } else {
                throw new Error(data.body.error)
            }
        })
        .catch(error => {
            alert(`Error adding new doctor. ${error.message}`)
        })
    }

    function clearForm() {
        setFirstName("")
        setLastname("")
        setField("")
        setGender("")
        setNPI("")
    }

    return(
        <>
            <div className="title">
                <h1>Doctors Index</h1>
                <button className="open-button" onClick={handleToggleForm}>New Doctor</button>
            </div>
            {isUpdating ? (
                <div className="form-popup" id="doctorForm" >
                    <h2>New Doctor Form</h2>
                    <form className="form-container" onSubmit={handleAddSubmit}>
                        <div className="field">
                            <label>First Name:</label>
                            <input type="text" placeholder="First Name" name="firstName" value={firstName} onChange={handleFormInput} required/>
                        </div>

                        <div className="field">
                            <label>Last Name:</label>
                            <input type="text" placeholder="Last Name" name="lastName" value={lastName} onChange={handleFormInput} required/>
                        </div>

                        <div className="field">
                            <label>NPI#:</label>
                            <input type="number" placeholder="1*********" name="npi" value={npi} onChange={handleFormInput} min="1000000000" max="1999999999" required/>
                        </div>

                        <div className="field">
                            <label>Field:</label>
                            <input type="text" placeholder="1********X" name="field" value={field} onChange={handleFormInput} required/>
                        </div>

                        <div className="field">
                            <label>Gender Identity:</label>
                            <div className="radio-btns">
                                <div>
                                    <label for="f">F</label><br/>
                                    <input type="radio" id="f" name="gender" value="F" onChange={handleFormInput} checked={gender === 'F'} required/>
                                </div>
                                <div>
                                    <label for="m">M</label><br/>
                                    <input type="radio" id="m" name="gender" value="M" onChange={handleFormInput} checked={gender === 'M'} required/>
                                </div>
                            </div>
                        </div>

                        <button type="submit" className="btn">Add</button>
                        <button type="button" className="btn cancel" onClick={handleToggleForm}>Cancel</button>
                    </form>
            </div>
            ) : ("")}
        <div className="card-container">
            {doctors.map(doctor => <DoctorCard key={doctor.id} doctor={doctor}/>)}
        </div>
        </>
    )
}

export default Doctors;