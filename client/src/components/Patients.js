import { useOutletContext } from "react-router-dom"
import PatientCard from "./PatientCard";

function Patients() {
    const patients = useOutletContext();
    console.log(patients)

    return (
        <>
            <h1>Patient Index</h1>
            {patients.map(patient => <PatientCard key={patient.id} patient={patient}/>)}
        </>
    )
}

export default Patients