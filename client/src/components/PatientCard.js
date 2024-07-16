import style from './pageStyle.css'

function PatientCard({patient}) {
    
    return(
        <div className="card">
            <h3>{patient.last_name}, {patient.first_name} </h3>
            <p>Birthday: {patient.birthday} [{patient.age}]</p>
            <p>Biological Gender: {patient.gender}</p>
        </div>
    )
}

export default PatientCard