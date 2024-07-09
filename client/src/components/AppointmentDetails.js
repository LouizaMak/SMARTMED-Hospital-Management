import { useParams } from "react-router-dom";

function AppointmentDetails() {
    const {id} = useParams();
    console.log(id)

    return (
        <>
        <h3>Appointment Details: {id}</h3>
        </>
    )
}

export default AppointmentDetails