// src/components/Vagas.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ModalVaga from './ModalVaga';
import ModalInscritos from './ModalInscritos';

const Vagas = () => {
    const [vagas, setVagas] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showModalInscritos, setShowModalInscritos] = useState(false);
    const [vagaSelecionada, setVagaSelecionada] = useState(null);
    
    // Lendo o ID do usuário do localStorage
    const userId = localStorage.getItem('userId');

    const fetchVagas = async () => {
        try {
            const response = await axios.get('http://localhost:4000/vagas');
            const allVagas = response.data;

            // Se o usuário for o ID 1, pega todas as vagas
            if (userId === '1') {
                setVagas(allVagas);
            } else {
                // Caso contrário, busca as inscrições do usuário
                const inscricoesResponse = await axios.get(`http://localhost:4000/inscricoes/usuario/${userId}`);
                const inscricoes = inscricoesResponse.data.map(inscricao => inscricao.id_vaga); // IDs das vagas em que o usuário se inscreveu

                // Filtrando as vagas que o usuário não se inscreveu
                const vagasDisponiveis = allVagas.filter(vaga => !inscricoes.includes(vaga.id_vaga));
                setVagas(vagasDisponiveis);
            }
        } catch (error) {
            alert("Erro ao obter vagas: " + error.message);
        }
    };

    const inscrever = async (vagaId) => {
        const dataInscricao = new Date().toISOString().split('T')[0]; // Formato de data
        try {
            await axios.post('http://localhost:4000/inscricoes', {
                id_usuario: userId,
                id_vaga: vagaId,
                data_inscricao: dataInscricao
            });
            alert("Inscrição realizada com sucesso!");
            fetchVagas(); // Atualiza a lista de vagas após a inscrição
        } catch (error) {
            alert("Erro ao inscrever-se: " + error.message);
        }
    };

    useEffect(() => {
        fetchVagas();
    }, [userId]); // Adiciona userId como dependência

    return (
        <div className="container">
            <h2>Vagas</h2>
            {vagas.length > 0 ? ( // Verifica se há vagas disponíveis
                <div className="row">
                    {vagas.map(vaga => (
                        <div className="col-md-4" key={vaga.id_vaga}>
                            <div className="card mb-4">
                                <div className="card-body">
                                    <h5 className="card-title">{vaga.titulo}</h5>
                                    <p className="card-text">{vaga.descricao}</p>
                                    <button className="btn btn-primary" onClick={() => { setVagaSelecionada(vaga); setShowModal(true); }}>
                                        Visualizar
                                    </button>
                                    <button className="btn btn-success" onClick={() => inscrever(vaga.id_vaga)}>
                                        Inscrever-se
                                    </button>
                                    {userId === '1' && ( // Verifica se o ID do usuário é 1
                                        <button className="btn btn-info" onClick={() => { setVagaSelecionada(vaga); setShowModalInscritos(true); }}>
                                            Visualizar Inscritos
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>Você já se inscreveu em todas as vagas disponíveis.</p> // Mensagem se não houver vagas disponíveis
            )}
            <ModalVaga show={showModal} onHide={() => setShowModal(false)} vaga={vagaSelecionada} />
            <ModalInscritos show={showModalInscritos} onHide={() => setShowModalInscritos(false)} vagaId={vagaSelecionada ? vagaSelecionada.id_vaga : null} />
        </div>
    );
};

export default Vagas;
