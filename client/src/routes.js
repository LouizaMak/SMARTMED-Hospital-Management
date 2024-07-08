import App from './components/App';
import Patients from './components/Patients';
import Doctors from './components/Doctors';
import Appointments from './components/Appointments';

const routes = [
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/patients",
                element: <Patients />
            },
            {
                path: "/doctors",
                element: <Doctors />
            },
            {
                path: "/appointments",
                element: <Appointments />
            }
        ]
    }
]

export default routes;