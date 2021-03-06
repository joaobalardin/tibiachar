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
        <div className="main-content Content Talles-Responsividade">
                <div id="characters" className="Box">

                    <div className="Corner-tl" ></div>

                    <div className="Corner-tr" ></div>

                    <div className="Border_1"></div>

                    <div className="BorderTitleText">
                    </div>

                    <img id="ContentBoxHeadline" className="Title" src="https://static.tibia.com/images/global/strings/headline-characters.gif" alt="Contentbox headline">
                    </img>
                    
                    <div className="Border_2">
                        <div className="Border_3">
                            <div className="BoxContent">
                                <div className="container-fluid">
                                    {carregando ? (
                                    <div className="row">
                                        {" "}
                                        <div className="spinner-border text-danger mx-auto" role="status">
                                                <span className="sr-only"></span>
                                        </div>{" "}
                                    </div>
                                    ) : (
                                    <div>
                                        <div className="row">
                                            <h3 className="mx-auto titulo colorcharRow d-flex mt-3 justify-content-around ">
                                                <strong>{char.char}</strong>
                                            </h3>
                                        </div>

                                        <div className="row d-flex justify-content-around">
                                            <div className="col-md-3 col-sm-12 mt-2 box-info p-2 my-2">
                                                <i className="fas fa-ticket-alt fa-2x"></i>
                                                <span className="">{char.level}</span>
                                            </div>
                                        </div>

                                        <div className="row d-flex justify-content-around">
                                            <div className="col-md-3 col-sm-12 mt-3 box-info p-2 my-2">
                                                <i className="fas fa-ticket-alt fa-2x"></i>
                                                <span className="">{char.tipo}</span>
                                            </div>
                                        </div>

                                        <div className="row d-flex justify-content-around">
                                            <div className="col-md-3 col-sm-12 mt-3 box-info p-2 my-2">
                                                <i className="fas fa-ticket-alt fa-2x"></i>
                                                <span className="">{char.skill}</span>
                                            </div>
                                        </div>

                                        {usuarioLogado === char.usuario ? (
                                        <Link
                                            to={`/editarchar/${props.match.params.id}`}
                                            type="button"
                                            className="btn btn-lg btn-block mt-3 mb-5 btn-cadastro d-flex justify-content-around "
                                        >
                                            Editar Char{" "}
                                        </Link>
                                        ) : null}

                                        {usuarioLogado === char.usuario ? (
                                        <button
                                            onClick={remover}
                                            type="button"
                                            className="btn btn-lg btn-block mt-3 mb-5 btn-cadastro d-flex justify-content-around "
                                        >
                                            Remover Char{" "}
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

                    Copyright by Jo??o Vitor Carpes Balardin. All rights reserved.<br></br>
                    <a href="https://www.tibia.com/abouttibia/?subtopic=aboutcipsoft">About JV</a> | 
                    <a href="https://www.tibia.com/support/?subtopic=legaldocuments&amp;page=agreement">Service Agreement</a> | 
                    <a href="https://www.tibia.com/support/?subtopic=legaldocuments&amp;page=privacy">Privacy Policy</a>

                </div>
            </div>
        </>
    );
}

export default CharDetalhes;
