import { useOutletContext } from "react-router-dom";
import PatientCard from "./PatientCard";
import { useState } from "react";
import './pageStyle.css';

function Patients() {
    const {patients, setPatients} = useOutletContext();
    const [isUpdating, setIsUpdating] = useState(false);

    //Post form states
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastname] = useState("");
    const [birthday, setBirthday] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");

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
        } else if(field === "age") {
            setAge(input)
        } else if(field === "birthday") {
            setBirthday(input)
        } else {
            setGender(input)
        }
    }

    function handleAddSubmit(event) {
        event.preventDefault()
        fetch("http://127.0.0.1:5555/patients", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                first_name: firstName,
                last_name: lastName,
                birthday: birthday,
                age: age,
                gender: gender
            })
        })
        .then(res => res.json().then(data => ({ status: res.status, body: data})))
        .then(data => {
            if (data.status === 201) {
                setPatients([...patients, data.body])
                clearForm()
                handleToggleForm()
            } else {
                throw new Error(data.body.error)
            }
        })
        .catch(error => {
            alert(`Error adding new patient. ${error.message}`)
        })
    }

    function clearForm() {
        setFirstName("")
        setLastname("")
        setBirthday("")
        setAge("")
        setGender("")
    }

    return (
        <>
            <div className="title">
                <h1>Patients Index</h1>
                <button className="open-button" onClick={handleToggleForm}>New Patient</button>
            </div>
            {isUpdating ? (
                <div className="form-popup" id="patientForm" >
                    <h2>New Patient Form</h2>
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
                            <label>Birthday:</label>
                            <input type="text" placeholder="YYYY-MM-DD" name="birthday" value={birthday} onChange={handleFormInput} required/>
                        </div>

                        <div className="field">
                            <label>Age:</label>
                            <input type="text" placeholder="Max: 110" name="age" value={age} onChange={handleFormInput} required/>
                        </div>

                        <div className="field">
                            <label>Biological Gender:</label>
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
                {patients.map(patient => <PatientCard key={patient.id} patient={patient}/>)}
            </div>
        </>
    )
}

export default Patients