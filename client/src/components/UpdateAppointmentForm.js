import { useFormik } from "formik";
import Calendar from "./Calendar";
import dayjs from 'dayjs';
import { useState } from "react";
import { appointmentSchema } from "../schemas/schemas";

const UpdateAppointmentForm = ({ appointment, doctors, onToggleForm, appointments, setAppointment, id, onAppointmentsUpdate }) => {
    const [dateObj, setDateObj] = useState(dayjs(new Date()))
    
    //Available doctors per appointment date and time
    const [availableDoctors, setAvailableDoctors] = useState(doctors)

    //Passed to Calendar component
    function handleDateChange(dateObj) {
        const newDate = dateObj.toISOString().slice(0,10)
        const newHour = `${dateObj.$H}:${dateObj.$m.toString().padStart(2, '0')}`
        setDateObj(dateObj)
        values.date = newDate
        values.hour = newHour
        checkDoctors(newDate, newHour)
    }

    //Check if doctors are available at time block
    function checkDoctors(date, hour) {
        const filteredDoctors = doctors.filter(doctor => {
            return doctor.appointments.every(appointment => 
                appointment.date !== date || appointment.hour !== hour
            )})
        setAvailableDoctors(filteredDoctors)
    }

    const { values, handleChange, handleSubmit, errors, touched} = useFormik({
        initialValues: {
            date: appointment.date,
            hour: appointment.hour,
            reason: appointment.reason,
            notes: appointment.notes,
            doctor_id: appointment.doctor_id,
            patient_id: appointment.patient_id
        },
        validationSchema: appointmentSchema,
        onSubmit: (values) => {
            fetch(`http://127.0.0.1:5555/appointments/${id}`, {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(values, null, 2)
            })
            .then(res => res.json())
            .then(updatedAppointment => {
                const newApps = appointments.map(appointment => {
                    if(appointment.id === updatedAppointment.id) {
                        return updatedAppointment
                    } else return appointment
                })
                setAppointment(updatedAppointment)
                onAppointmentsUpdate(newApps)
            })
            onToggleForm()
        }
    })

    return(
        <div className="form-popup" id="updateForm">
            <h2>Updating Appointment Form</h2>
            <form className="form-container" onSubmit={handleSubmit}>
                <div className="field">
                    <label>Date & Time:</label>
                    <Calendar dateObj={dateObj} onDateChange={handleDateChange}/>
                </div>

                <div className="field">
                    <label>Doctor:</label>
                    <select name="doctor_id" placeholder="doctors" defaultValue={""} value={values.doctor_id} onChange={handleChange} required>
                        <option value="" disabled>Select Doctor</option>
                        {availableDoctors.map(doctor => <option key={doctor.id} value={doctor.id}>{doctor.last_name}, {doctor.first_name}</option>)}
                    </select>
                    {touched.doctor_id && errors.doctor_id ? (<div>{errors.doctor_id}</div>) : null}
                </div>

                <div className="field">
                    <label>Reason:</label>
                    <input type="text" placeholder="Reason" name="reason" value={values.reason} onChange={handleChange} required/>
                </div>

                <div className="field">
                    <label>Notes:</label>
                    <textarea placeholder="N/a if none" name="notes" value={values.notes} onChange={handleChange} required></textarea>
                </div>
                <input type="hidden" name="patient_id" value={values.patient_id} />

                <button type="submit" className="btn">Confirm</button>
                <button type="button" className="btn cancel" onClick={onToggleForm}>Cancel</button>
            </form>
        </div>
    )
}

export default UpdateAppointmentForm;