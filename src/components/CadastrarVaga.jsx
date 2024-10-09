import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Importa o useNavigate

const CadastrarVaga = () => {
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [requisitos, setRequisitos] = useState('');
    const [localizacao, setLocalizacao] = useState('');
    const [salario, setSalario] = useState('');
    
    const navigate = useNavigate(); // Inicializa o useNavigate

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post('http://localhost:4000/vagas', {
                titulo,
                descricao,
                requisitos,
                localizacao,
                salario
            });
            alert("Vaga cadastrada com sucesso!"); // Aviso de sucesso

            // Limpa os campos do formulário
            setTitulo('');
            setDescricao('');
            setRequisitos('');
            setLocalizacao('');
            setSalario('');

            // Redireciona para a tela de Vagas
            navigate('/vagas'); // Redireciona para a tela de Vagas
        } catch (error) {
            alert("Erro ao cadastrar vaga: " + error.message);
        }
    };

    return (
        <div className="container">
            <h2>Cadastrar Vaga</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label>Título:</label>
                    <input type="text" className="form-control" value={titulo} onChange={(e) => setTitulo(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label>Descrição:</label>
                    <textarea className="form-control" value={descricao} onChange={(e) => setDescricao(e.target.value)} required></textarea>
                </div>
                <div className="mb-3">
                    <label>Requisitos:</label>
                    <textarea className="form-control" value={requisitos} onChange={(e) => setRequisitos(e.target.value)} required></textarea>
                </div>
                <div className="mb-3">
                    <label>Localização:</label>
                    <input type="text" className="form-control" value={localizacao} onChange={(e) => setLocalizacao(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label>Salário:</label>
                    <input type="text" className="form-control" value={salario} onChange={(e) => setSalario(e.target.value)} required />
                </div>
                <button type="submit" className="btn btn-primary">Cadastrar Vaga</button>
            </form>
        </div>
    );
};

export default CadastrarVaga;
