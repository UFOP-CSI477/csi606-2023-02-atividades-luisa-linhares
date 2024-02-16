import React, { useEffect, useState } from 'react';
import {
    BrowserRouter,
    Navigate,
    Route,
    Routes
} from 'react-router-dom';
import Dashboard from './Dashboard';
import Login from './Login';
import CriarUsuario from "./CriarUsuario";

function AutoRedirect({ user, onLogin }: any) {

    return (
        <Routes>
            <Route path="/createUser" element={<CriarUsuario />} />
            <Route path="/dashboard" element={user ? <Dashboard user={user} onLogout={() => onLogin(null)} /> : <Navigate to="/" />} />
            <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Login onLogin={onLogin} />} />
        </Routes>
    );
}

function App() {

    const savedUser = localStorage.getItem("user");
    const [user, setUser] = useState(savedUser ? JSON.parse(savedUser) : null);

    useEffect(() => {
        if (user) {
            localStorage.setItem("user", JSON.stringify(user));
        } else {
            localStorage.removeItem("user");
        }
    }, [user]);

    return (
        <BrowserRouter>
            <AutoRedirect user={user} onLogin={setUser} />
        </BrowserRouter>
    );
}

export default App;