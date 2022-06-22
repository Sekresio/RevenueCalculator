import React from 'react';
import './App.css';
import FixedBottomNavigation from "./components/FixedBottomNavigation";
import AddClient from "./components/AddClient";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ToPayList from "./components/ToPayList";
import Revenue from "./components/Revenue";

function App() {

    return (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Routes>
                <Route path="/" element={<ToPayList/>}/>
                <Route path="/addClient" element={<AddClient/>}/>
                <Route path="/revenue" element={<Revenue/>}/>
            </Routes>
            <FixedBottomNavigation/>
        </BrowserRouter>
    )
}

export default App;
