// src/components/VagasInscritas.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ModalVaga from './ModalVaga'; // Importar o seu Modal de Vaga

const VagasInscritas = ({ userId }) => {
    const [vagasInscritas, setVagasInscritas] = useState([]);
    const [showModal, setShowModal] = useState(false); // Estado para controlar a visibilidade do modal
    const [vagaSelecionada, setVagaSelecionada] = useState(null); // Estado para a vaga selecionada

    useEffect(() => {
        const fetchVagasInscritas = async () => {
            if (!userId) return; // Verifica se o usuário está logado
            try {
                const response = await axios.get(`http://localhost:4000/inscricoes/usuario/${userId}`);
                setVagasInscritas(response.data);
            } catch (error) {
                console.error("Erro ao buscar vagas inscritas: ", error);
            }
        };

        fetchVagasInscritas();
    }, [userId]);

    const openModal = (vaga) => {
        setVagaSelecionada(vaga);
        setShowModal(true);
    };

    const closeModal = () => {
        setVagaSelecionada(null);
        setShowModal(false);
    };

    return (
        <div className="container">
            <h2>Vagas Inscritas</h2>
            {vagasInscritas.length > 0 ? (
                <div className="row">
                    {vagasInscritas.map((vaga) => (
                        <div className="col-md-4" key={vaga.id}>
                            <div className="card mb-4">
                                <div className="card-body">
                                    <h5 className="card-title">{vaga.titulo}</h5>
                                    <p className="card-text">{vaga.descricao || "Descrição não disponível."}</p>
                                    <button className="btn btn-primary" onClick={() => openModal(vaga)}>
                                        Detalhes
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>Você ainda não se inscreveu em nenhuma vaga.</p>
            )}

            {/* Modal para exibir detalhes da vaga */}
            <ModalVaga show={showModal} onHide={closeModal} vaga={vagaSelecionada} />
        </div>
    );
};

export default VagasInscritas;
