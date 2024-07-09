import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import NavBar from './NavBar'

function App() {
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5555/patients")
    .then(res => res.json())
    .then(patients => setPatients(patients))
  }, [])

  useEffect(() => {
    fetch("http://127.0.0.1:5555/doctors")
    .then(res => res.json())
    .then(doctors => setDoctors(doctors))
  }, [])

  return (
    <>
      <h1>Hospital Manager</h1>
      <header>
        <NavBar />
      </header>
      <Outlet context={{patients, setPatients, doctors, setDoctors}}/>
    </>
  )
}

export default App;
