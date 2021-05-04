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
    
    return (
        <>
        <Navbar />
        <div className="main-content Content Talles-Responsividade">
                <div id="characters" className="Box">

                    <div className="Corner-tl" ></div>

                    <div className="Corner-tr" ></div>

                    <div className="Border_1"></div>

                    <div className="BorderTitleText">
                    </div>

                    <img id="ContentBoxHeadline" className="Title" src="https://static.tibia.com/images/global/strings/headline-worlds.gif" alt="Contentbox headline">
                    </img>

                    <div className="Border_2">
                        <div className="Border_3">
                            <div className="BoxContent">
                                <div className="row p-6 ">
                                    <h2 className="mx-auto pt-3 pb-2">Mundos:</h2>
                                    <div className="row">
                                        <h3 className="mx-auto titulo colorworldRow">
                                            <span>{world.world}</span> <span> -- </span> <span className="">{world.tipo}</span>
                                        </h3>
                                    </div>
                                    <input onChange={executaPesquisa} type="text" className="form-control text-center styleSerch mb-3" placeholder="Pesquisar Char pelo nome..."
                                    />
                                </div>
                              

                                <div className="row pb-2 pt-3">
                                    <h3>Lista de Chars:</h3>
                                    {
                                        chars.map((item) => (<CharCard key={item.id} id={item.id} chars={item.char} level={item.level} tipo={item.tipo} skill={item.skill} world={item.world} />))
                                    }
                                </div>

                                {excluido ? <Redirect to="/" /> : null}

                                <div className="container-fluid">
                                    {carregando ? (
                                    <div className="row mt-5">
                                        {" "}
                                        <div className="spinner-border mx-auto" role="status">
                                        <span className="sr-only"></span>
                                        </div>{" "}
                                    </div>
                                    ) : (
                                    <div>
                                        {usuarioLogado === world.usuario ? (
                                        <Link
                                            to={`/editarworld/${props.match.params.id}`}
                                            type="button"
                                            className="btn btn-lg btn-block mt-2 mb-3 btn-cadastro"
                                        >
                                            Editar Mundo{" "}
                                        </Link>
                                        ) : null}

                                        {usuarioLogado === world.usuario ? (
                                        <button
                                            onClick={remover}
                                            type="button"
                                            className="btn btn-lg btn-block mt-2 mb-3 btn-cadastro"
                                        >
                                            Remover Mundo{" "}
                                        </button>
                                        ) : null}
                                    </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>		
                
                 
                <div id="Footer" className="main-footer">
                    Copyright by João Vitor Carpes Balardin. All rights reserved.<br></br>
                    <a href="https://www.tibia.com/abouttibia/?subtopic=aboutcipsoft">About JV</a> | 
                    <a href="https://www.tibia.com/support/?subtopic=legaldocuments&amp;page=agreement">Service Agreement</a> | 
                    <a href="https://www.tibia.com/support/?subtopic=legaldocuments&amp;page=privacy">Privacy Policy</a>
                </div>
            </div>
        </>
    );
}

export default WorldDetalhes;
