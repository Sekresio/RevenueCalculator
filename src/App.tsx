import React from 'react';
import './App.css';
import FixedBottomNavigation from "./components/FixedBottomNavigation";
import AddClient from "./components/AddClient";
import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import ToPayList from "./components/ToPay/ToPayList";

function App() {

    const baseUrl = process.env.PUBLIC_URL;

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate replace to={`${baseUrl}/`} />}/>
                <Route path={`${baseUrl}/`} element={<ToPayList/>}/>
                <Route path={`${baseUrl}/addClient`} element={<AddClient/>}/>
            </Routes>
            <FixedBottomNavigation/>
        </BrowserRouter>
    )
}

export default App;
