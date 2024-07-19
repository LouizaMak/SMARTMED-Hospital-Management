import { useOutletContext } from "react-router-dom";
import PatientCard from "./PatientCard";
import PatientForm from "./PatientForm";
import { useState } from "react";
import './pageStyle.css';

function Patients() {
    const {patients, setPatients} = useOutletContext();
    const [isUpdating, setIsUpdating] = useState(false);

    //Pop-up form
    function handleToggleForm() {
        setIsUpdating(!isUpdating)
    }

    return (
        <>
            <div className="title">
                <h1>Patients Index</h1>
                <button className="open-button" onClick={handleToggleForm}>New Patient</button>
            </div>
            {isUpdating ? <PatientForm onToggleForm={handleToggleForm} patients={patients} setPatients={setPatients}/> : ("")}
            <div className="card-container">
                {patients.map(patient => <PatientCard key={patient.id} patient={patient}/>)}
            </div>
        </>
    )
}

export default Patients