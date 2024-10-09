
import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ModalVaga = ({ show, onHide, vaga }) => {
    if (!vaga) return null;

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>{vaga.titulo}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p><strong>Descrição:</strong> {vaga.descricao}</p>
                <p><strong>Requisitos:</strong> {vaga.requisitos}</p>
                <p><strong>Localização:</strong> {vaga.localizacao}</p>
                <p><strong>Salário:</strong> {vaga.salario}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Fechar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalVaga;
