function DoctorCard({doctor}) {
    return(
        <div>
            <h3>Dr. {doctor.last_name}, {doctor.first_name}</h3>
            <p>NPI#: {doctor.npi}</p>
            <p>Field: {doctor.field}</p>
            <p>Gender: {doctor.gender}</p>
        </div>
    )
}

export default DoctorCard