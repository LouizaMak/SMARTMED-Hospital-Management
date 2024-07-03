function PatientCard({patient}) {
    return(
        <div>
            <h3>{patient.last_name}, {patient.first_name} </h3>
            <p>Gender: {patient.gender}</p>
            <p>Age: {patient.age}</p>
        </div>
    )
}

export default PatientCard