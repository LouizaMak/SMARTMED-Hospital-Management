import './pageStyle.css'

function PatientCard({patient}) {
    
    return(
        <div className="card">
            <h3>{patient.last_name}, {patient.first_name} </h3>
            <div className="patient-content">
                <div>
                    <p>Birthday: {patient.birthday} [{patient.age}]</p>
                    <p>Biological Gender: {patient.gender}</p>
                </div>
                <div>
                    <p>Phone Number: {patient.phone}</p>
                    <p>Address: {patient.address}</p>
                </div>
            </div>
        </div>
    )
}

export default PatientCard