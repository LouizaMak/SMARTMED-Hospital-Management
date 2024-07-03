import App from './components/App';
import Patients from './components/Patients';
import Doctors from './components/Doctors';

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
            }
        ]
    }
]

export default routes;