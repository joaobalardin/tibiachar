import React, { useState, useEffect } from "react";
import "./char-detalhes.css";
import { Link, Redirect } from "react-router-dom";
import firebase from "../../config/firebase";
import { useSelector } from "react-redux";
import Navbar from "../../components/navbar/";

function CharDetalhes(props) {
    const [char, setChar] = useState([]);
    const usuarioLogado = useSelector((state) => state.usuarioEmail);
    const [carregando, setCarregando] = useState(1);
    const [excluido, setExcluido] = useState(0);

    function remover() {
        firebase.firestore().collection("worlds").doc(props.match.params.mundoid).collection("char").doc(props.match.params.id).delete().then(() => {
            setExcluido(1);
        });
    }

    useEffect(() => {
        if (carregando) {
        firebase.firestore().collection("worlds").doc(props.match.params.mundoid).collection("char").doc(props.match.params.id).get().then((resultado) => {
            setChar(resultado.data());
            setCarregando(0);
            });
        }
    }, []);

    return (
        <>
        <Navbar />

        {excluido ? <Redirect to="/" /> : null}

        <div className="container-fluid">
            {carregando ? (
            <div className="row mt-5">
                {" "}
                <div className="spinner-border text-danger mx-auto" role="status">
                <span className="sr-only"></span>
                </div>{" "}
            </div>
            ) : (
            <div>
                <div className="row">
                <h3 className="mx-auto mt-5 titulo">
                    <strong>{char.char}</strong>
                </h3>
                </div>

                <div className="row mt-5 d-flex justify-content-around ">
                <div className="col-md-3 col-sm-12 box-info p-3 my-2">
                    <i className="fas fa-ticket-alt fa-2x"></i>
                    <span className="mt-3">{char.level}</span>
                </div>
                </div>

                <div className="row mt-5 d-flex justify-content-around ">
                <div className="col-md-3 col-sm-12 box-info p-3 my-2">
                    <i className="fas fa-ticket-alt fa-2x"></i>
                    <span className="mt-3">{char.tipo}</span>
                </div>
                </div>

                <div className="row mt-5 d-flex justify-content-around ">
                <div className="col-md-3 col-sm-12 box-info p-3 my-2">
                    <i className="fas fa-ticket-alt fa-2x"></i>
                    <span className="mt-3">{char.skill}</span>
                </div>
                </div>

                {usuarioLogado === char.usuario ? (
                <Link
                    to={`/editarchar/${props.match.params.id}`}
                    type="button"
                    className="btn btn-lg btn-block mt-3 mb-5 btn-cadastro"
                >
                    Editar Char{" "}
                </Link>
                ) : null}

                {usuarioLogado === char.usuario ? (
                <button
                    onClick={remover}
                    type="button"
                    className="btn btn-lg btn-block mt-3 mb-5 btn-cadastro"
                >
                    Remover Char{" "}
                </button>
                ) : null}
            </div>
            )}
        </div>
        </>
    );
}

export default CharDetalhes;
