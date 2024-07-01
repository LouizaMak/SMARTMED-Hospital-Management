import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Switch, Route } from "react-router-dom";
import NavBar from './NavBar'

function App() {
  return (
    <>
      <h1>Hospital Manager</h1>
      <header>
        <NavBar />
      </header>
      <Outlet />
    </>
  )
}

export default App;
