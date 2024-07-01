import App from './components/App';
import Patients from './components/Patients';

const routes = [
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/patients",
                element: <Patients />
            }
        ]
    }
]

export default routes;