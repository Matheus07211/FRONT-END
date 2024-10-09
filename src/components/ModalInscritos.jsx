
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // Acessibilidade

const ModalInscritos = ({ show, onHide, vagaId }) => {
    const [inscritos, setInscritos] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchInscritos = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/inscricoes/vaga/${vagaId}`);
                setInscritos(response.data);
            } catch (error) {
                alert("Erro ao obter inscritos: " + error.message);
            }
        };

        if (vagaId) {
            fetchInscritos();
        }
    }, [vagaId]);

    // Função para filtrar inscritos pelo nome
    const filteredInscritos = inscritos.filter(inscrito => 
        inscrito.nome.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Modal isOpen={show} onRequestClose={onHide}>
            <h2>Inscritos na Vaga</h2>
            <button onClick={onHide}>Fechar</button>
            <input
                type="text"
                placeholder="Buscar pelo nome"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                style={{ margin: '10px 0', padding: '5px', width: '100%' }}
            />
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                {filteredInscritos.map(inscrito => (
                    <li key={inscrito.id_usuario} style={{ marginBottom: '15px' }}>
                        <strong>Nome:</strong> {inscrito.nome}<br />
                        <strong>Email:</strong> {inscrito.email}<br />
                        <strong>Telefone:</strong> {inscrito.telefone}<br />
                        <strong>Experiência Profissional:</strong> {inscrito.experiencia_profissional}<br />
                        <strong>Escolaridade:</strong> {inscrito.escolaridade}<br />
                        <strong>Currículo:</strong> {inscrito.curriculo}
                        <hr style={{ margin: '10px 0', border: '1px solid #ccc' }} /> {/* Divisória */}
                    </li>
                ))}
            </ul>
        </Modal>
    );
};

export default ModalInscritos;
