import { useOutletContext } from "react-router-dom";
import DoctorCard from "./DoctorCard";
import DoctorForm from "./DoctorForm";
import { useState } from "react";
import './pageStyle.css';

function Doctors() {
    const {doctors, setDoctors} = useOutletContext();
    const [isUpdating, setIsUpdating] = useState(false);
    
    //Pop-up form
    function handleToggleForm() {
        setIsUpdating(!isUpdating)
    }

    return(
        <>
            <div className="title">
                <h1>Doctors Index</h1>
                <button className="open-button" onClick={handleToggleForm}>New Doctor</button>
            </div>
            {isUpdating ? <DoctorForm onToggleForm={handleToggleForm} doctors={doctors} setDoctors={setDoctors}/> : ("")}
        <div className="card-container">
            {doctors.map(doctor => <DoctorCard key={doctor.id} doctor={doctor}/>)}
        </div>
        </>
    )
}

export default Doctors;