
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Cadastro = () => {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [telefone, setTelefone] = useState('');
    const [endereco, setEndereco] = useState('');
    const [data_nascimento, setDataNascimento] = useState('');
    const [experiencia_profissional, setExperiencia] = useState('');
    const [escolaridade, setEscolaridade] = useState('');
    const [curriculo, setCurriculo] = useState('');
    const navigate = useNavigate();

    const handleCadastro = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:4000/usuario', {
                nome,
                email,
                senha,
                telefone,
                endereco,
                data_nascimento,
                experiencia_profissional,
                escolaridade,
                curriculo
            });
            alert("Usuário cadastrado com sucesso!");
            navigate('/login'); // Redireciona para a tela de login
        } catch (error) {
            alert("Erro ao cadastrar: " + error.message);
        }
    };

    return (
        <div className="container">
            <h2>Cadastrar-se</h2>
            <form onSubmit={handleCadastro}>
                <div className="form-group">
                    <label>Nome:</label>
                    <input type="text" className="form-control" value={nome} onChange={(e) => setNome(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Senha:</label>
                    <input type="password" className="form-control" value={senha} onChange={(e) => setSenha(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Telefone:</label>
                    <input type="text" className="form-control" value={telefone} onChange={(e) => setTelefone(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Endereço:</label>
                    <input type="text" className="form-control" value={endereco} onChange={(e) => setEndereco(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Data de Nascimento:</label>
                    <input type="date" className="form-control" value={data_nascimento} onChange={(e) => setDataNascimento(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Experiência Profissional:</label>
                    <textarea className="form-control" value={experiencia_profissional} onChange={(e) => setExperiencia(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Escolaridade:</label>
                    <input type="text" className="form-control" value={escolaridade} onChange={(e) => setEscolaridade(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Currículo:</label>
                    <input type="text" className="form-control" value={curriculo} onChange={(e) => setCurriculo(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-success">Cadastrar</button>
            </form>
        </div>
    );
};

export default Cadastro;
