import React, { useState, useEffect } from "react";
import "./world-detalhes.css";
import { Link, Redirect } from "react-router-dom";
import firebase from "../../config/firebase";
import { useSelector } from "react-redux";
import Navbar from "../../components/navbar/";
import CharCard from "../../components/char-card";

function WorldDetalhes(props) {
    const [world, setWorld] = useState({});
    const [chars, setChars] = useState([]);
    const [pesquisa, setPesquisa] = useState("");
    const usuarioLogado = useSelector((state) => state.usuarioEmail);
    const [carregando, setCarregando] = useState(1);
    const [excluido, setExcluido] = useState(0);

    function remover() {
        firebase.firestore().collection("worlds").doc(props.match.params.id).delete().then(() => {
            setExcluido(1);
        });
    }

    useEffect(() => {
        if (carregando) {
        firebase.firestore().collection("worlds").doc(props.match.params.id).get().then((resultado) => {
            setWorld(resultado.data());
            setCarregando(0);
            queryPesquisa("");
            });
        }
    }, []);

    function executaPesquisa(e) {
        queryPesquisa(e.target.value)
    }

    function queryPesquisa(texto){
        let listachars = [];
        firebase.firestore().collection("worlds").doc(props.match.params.id).collection("char").get().then(async (resultado) => {
            await resultado.forEach((doc) => {
                if (doc.data().char.indexOf(pesquisa) >= 0) {
                    listachars.push({
                    id: doc.id,
                    ...doc.data(),
                    });
                }
            });
            console.log(listachars)
            setChars(listachars);
        });
        setPesquisa(texto)
    }

    console.log(chars);
    return (
        <>
        <Navbar />

        <div className="row p-6 ">
            <h2 className="mx-auto p-5">Mundos Criados</h2>
            <input onChange={executaPesquisa} type="text" className="form-control text-center" placeholder="Pesquisar Char pelo nome..."
            />
        </div>

        <div className="row p-12">
            <h3>Lista de Chars:</h3>
            {
                chars.map((item) => (<CharCard key={item.id} id={item.id} chars={item.char} level={item.level} tipo={item.tipo} skill={item.skill} />))
            }
        </div>

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
                    <strong>{world.world}</strong>
                </h3>
                </div>

                <div className="row mt-5 d-flex justify-content-around ">
                <div className="col-md-3 col-sm-12 box-info p-3 my-2">
                    <i className="fas fa-ticket-alt fa-2x"></i>
                    <span className="mt-3">{world.tipo}</span>
                </div>
                </div>

                {usuarioLogado === world.usuario ? (
                <Link
                    to={`/editarworld/${props.match.params.id}`}
                    type="button"
                    className="btn btn-lg btn-block mt-3 mb-5 btn-cadastro"
                >
                    Editar Mundo{" "}
                </Link>
                ) : null}

                {usuarioLogado === world.usuario ? (
                <button
                    onClick={remover}
                    type="button"
                    className="btn btn-lg btn-block mt-3 mb-5 btn-cadastro"
                >
                    Remover Mundo{" "}
                </button>
                ) : null}
            </div>
            )}
        </div>
        </>
    );
}

export default WorldDetalhes;
