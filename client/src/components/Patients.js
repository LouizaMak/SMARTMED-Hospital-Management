import { useOutletContext } from "react-router-dom"
import PatientCard from "./PatientCard";
import { useEffect, useState } from "react";

function Patients() {
    const [patients, setPatients] = useState([]);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastname] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");

    useEffect(() => {
        fetch("http://127.0.0.1:5555/patients")
        .then(res => res.json())
        .then(patients => setPatients(patients))
      }, [])

    //Pop-up form
    useEffect(() => {
        handleCloseForm()
    }, [])

    function handleOpenForm() {
        document.getElementById("patientForm").style.display = "block";
    }

    function handleCloseForm() {
        document.getElementById("patientForm").style.display = "none";
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
                age: age,
                gender: gender
            })
        })
        .then(res => res.json())
        .then(newPatient => {
            setPatients([...patients, newPatient])
            clearForm()
        })
    }

    function clearForm() {
        setFirstName("")
        setLastname("")
        setAge("")
        setGender("")
    }

    return (
        <>
            <h1>Patient Index</h1>
            <button className="open-button" onClick={handleOpenForm}>Add New Patient</button>
            <div className="form-popup" id="patientForm" onSubmit={handleAddSubmit}>
                <form class="form-container">
                    <label>First Name</label>
                    <input type="text" placeholder="First Name" name="firstName" value={firstName} onChange={handleFormInput} required/>

                    <label>Last Name</label>
                    <input type="text" placeholder="Last Name" name="lastName" value={lastName} onChange={handleFormInput} required/>

                    <label>Gender</label>
                    <input type="text" placeholder="Gender" name="gender" value={gender} onChange={handleFormInput} required/>

                    <label>Age</label>
                    <input type="text" placeholder="Age" name="age" value={age} onChange={handleFormInput} required/>

                    <button type="submit" className="btn">Add</button>
                    <button type="button" className="btn cancel" onClick={handleCloseForm}>Cancel</button>
                </form>
            </div>
            {patients.map(patient => <PatientCard key={patient.id} patient={patient}/>)}
        </>
    )
}

export default Patients