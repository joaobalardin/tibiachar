import React, { useState } from 'react';
import './usuario-recuperar-senha.css';
import Navbar from '../../components/navbar/';

import firebase from '../../config/firebase';
import 'firebase/auth';

function UsuarioRecuperarSenha(){

    const [email, setEmail] = useState();
    const [msg, setMsg] = useState();

    function recuperarSenha(){
        firebase.auth().sendPasswordResetEmail(email).then(resultado => {
            setMsg('Enviamos um link no seu email para você redefinir sua senha!');
        }).catch(erro => {
            setMsg('Verifique se o email está correto!');
        })
    }

    return(
        <>
            <Navbar />
                <div className="main-content Content Talles-Responsividade">
                    <div id="characters" className="Box">

                        <div className="Corner-tl" ></div>

                        <div className="Corner-tr" ></div>

                        <div className="Border_1"></div>

                        <div className="BorderTitleText">
                        </div>

                        <img id="ContentBoxHeadline" className="Title" src="https://static.tibia.com/images/global/strings/headline-accountmanagement.gif" alt="Contentbox headline">
                        </img>

                        <div className="Border_2">
                            <div className="Border_3">
                                <div className="BoxContent">
                                    <form className="text-center form-login mx-auto mt-5">                
                                        <h3 className="mb-3 font-weight-bold">Recuperar Senha</h3>
                                        <input onChange={(e) => setEmail(e.target.value)} type="email" className="form-control my-2" placeholder="Email" />

                                        <div className="msg my-4 text-center">
                                            <span>{msg}</span>
                                        </div>

                                        <button onClick={recuperarSenha} type="button" className="btn btn-lg btn-block btn-enviar">Recuperar Senha</button>
                                    </form>
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
    )
}

export default UsuarioRecuperarSenha;