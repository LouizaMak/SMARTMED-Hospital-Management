import { useOutletContext } from "react-router-dom";
import React, { useState } from "react";
import AppointmentForm from "./AppointmentForm";
import AppointmentCard from "./AppointmentCard";
import './pageStyle.css';

function Appointments() {
    const {appointments, setAppointments} = useOutletContext();
    const {patients} = useOutletContext();
    const {doctors} = useOutletContext();
    const [isUpdating, setIsUpdating] = useState(false);

    //Pop-up form
    function handleToggleForm() {
        setIsUpdating(!isUpdating)
    }

    return(
        <>
            <div className="title">
                <h1>Appointments</h1>
                <button className="open-button" onClick={handleToggleForm}>Schedule Appointment</button>
            </div>
            {isUpdating ? <AppointmentForm 
                onToggleForm={handleToggleForm} 
                appointments={appointments} 
                setAppointments={setAppointments}
                doctors={doctors}
                patients={patients}
                /> : ("")}
            <div className="card-container">
                {appointments.map(appointment => <AppointmentCard key={appointment.id} appointment={appointment} />)}
            </div>
        </>
    )
}

export default Appointments