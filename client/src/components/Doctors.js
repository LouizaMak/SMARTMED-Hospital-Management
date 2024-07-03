import DoctorCard from "./DoctorCard";
import { useEffect, useState } from "react";

function Doctors() {
    const [doctors, setDoctors] = useState([])

    useEffect(() => {
        fetch("http://127.0.0.1:5555/doctors")
        .then(res => res.json())
        .then(doctors => setDoctors(doctors))
      }, [])

    return(
        <>
        {doctors.map(doctor => <DoctorCard key={doctor.id} doctor={doctor}/>)}
        </>
    )
}

export default Doctors;