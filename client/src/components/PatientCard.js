import './pageStyle.css'

function PatientCard({patient}) {
    
    return(
        <div className="card">
            <h3>{patient.last_name}, {patient.first_name} </h3>
            <p>Birthday: {patient.birthday} [{patient.age}]</p>
            <p>Biological Gender: {patient.gender}</p>
            <p>Phone Number: {patient.phone}</p>
            <p>Address: {patient.address}</p>
        </div>
    )
}

export default PatientCard