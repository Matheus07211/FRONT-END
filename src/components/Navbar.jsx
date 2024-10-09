import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ userId, userName, handleLogout }) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <Link className="navbar-brand" to="/">Job Portal</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        {userId ? (
                            <>
                                <li className="nav-item">
                                    <span className="nav-link">Olá, {userName}</span>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/vagas">Vagas</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/vagas-inscritas">Vagas Inscritas</Link>
                                </li>
                                {userId === '1' && ( // Exibe o link apenas para o usuário com ID 1
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/cadastrar-vaga">Cadastrar Vaga</Link>
                                    </li>
                                )}
                                <li className="nav-item">
                                    <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login">Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/cadastro">Cadastro</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
