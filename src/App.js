import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; // Adicione Navigate aqui
import Login from './components/Login';
import Cadastro from './components/Cadastro';
import Vagas from './components/Vagas';
import VagasInscritas from './components/VagasInscritas';
import CadastrarVaga from './components/CadastrarVaga'; // Importa o novo componente
import Navbar from './components/Navbar';

const App = () => {
    const [userId, setUserId] = useState(localStorage.getItem('userId') || null);
    const [userName, setUserName] = useState(localStorage.getItem('userName') || null);

    useEffect(() => {
        const storedUserId = localStorage.getItem('userId');
        const storedUserName = localStorage.getItem('userName');

        if (storedUserId) setUserId(storedUserId);
        if (storedUserName) setUserName(storedUserName);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('userId');
        localStorage.removeItem('userName');
        setUserId(null);
        setUserName(null);
        window.location.href = '/login'; // Redireciona para login após logout
    };

    return (
        <Router>
            <Navbar userId={userId} userName={userName} handleLogout={handleLogout} />
            <Routes>
                <Route path="/login" element={<Login setUserId={setUserId} setUserName={setUserName} />} />
                <Route path="/cadastro" element={<Cadastro />} />
                <Route path="/vagas" element={<Vagas userId={userId} />} />
                <Route path="/vagas-inscritas" element={<VagasInscritas userId={userId} />} />
                <Route path="/cadastrar-vaga" element={userId === '1' ? <CadastrarVaga /> : <Navigate to="/login" />} /> {/* Rota de cadastrar vaga apenas para o usuário 1 */}
                <Route path="/" element={<Login setUserId={setUserId} setUserName={setUserName} />} />
            </Routes>
        </Router>
    );
};

export default App;
