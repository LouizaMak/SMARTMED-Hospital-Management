function PatientCard({patient}) {
    return(
        <div>
            <h3>{patient.last_name}, {patient.first_name} </h3>
            <p>Birthday: {patient.birthday}</p>
            <p>Age: {patient.age}</p>
            <p>Gender: {patient.gender}</p>
        </div>
    )
}

export default PatientCard