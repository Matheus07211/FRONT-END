// src/components/Login.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({ setUserId, setUserName }) => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/usuario/autenticar', { email, senha });
            localStorage.setItem('userId', response.data.usuario.id_usuario);
            localStorage.setItem('userName', response.data.usuario.nome); // Armazena o nome do usuário
            setUserId(response.data.usuario.id_usuario);
            setUserName(response.data.usuario.nome); // Atualiza o estado do nome do usuário
            navigate('/vagas'); // Redireciona para a página de vagas após login
        } catch (error) {
            alert("Erro ao fazer login: " + error.message);
        }
    };

    return (
        <div className="container">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div className="form-group">
                    <label>Email:</label>
                    <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Senha:</label>
                    <input type="password" className="form-control" value={senha} onChange={(e) => setSenha(e.target.value)} required />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
                <button type="button" className="btn btn-secondary" onClick={() => navigate('/cadastro')}>Cadastrar-se</button>
                <button type="button" className="btn btn-info" onClick={() => navigate('/vagas')}>Visualizar Vagas</button>
            </form>
        </div>
    );
};

export default Login;
