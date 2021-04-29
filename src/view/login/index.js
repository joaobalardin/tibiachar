import React, { useState } from 'react';
import './login.css';
import {Link, Redirect} from 'react-router-dom';

import firebase from '../../config/firebase';
import 'firebase/auth';

import { useSelector, useDispatch} from 'react-redux';

function Login(){
    const [email, setEmail] = useState();
    const [senha, setSenha] = useState();
    const [msgTipo, setMsgTipo] = useState();

    const dispatch = useDispatch();
    

    function logar(){

        firebase.auth().signInWithEmailAndPassword(email, senha).then(resultado => {
            setMsgTipo('sucesso')    
            setTimeout(() =>{
                dispatch({type: 'LOG_IN', usuarioEmail: email})       
            },2000);            
        }).catch(erro => {
            setMsgTipo('erro')
        });      
            
    }    
 
    return(     
        <div className="main-content Content Talles-Responsividade loginPag">
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
                            <div className="login-content d-flex align-items-center">
                                {useSelector(state => state.usuarioLogado) > 0 ? <Redirect to='/' /> : null}

                                <form className="form-signin mx-auto text-center">
                                    <div className="text-center mb-4">
                                        <i className="far fa-smile-wink text-black fa-5x"></i>
                                        <h1 className="h3 mb-3 font-weight-normal text-black font-weight-bold">Login</h1>          
                                    </div>


                                    <input onChange={(e) => setEmail(e.target.value) }  type="email" id="inputEmail" className="form-control my-2" placeholder="Email" />          
                                    <input onChange={(e) => setSenha(e.target.value) } type="password" id="inputPassword" className="form-control my-2" placeholder="Senha" />          


                                    <button onClick={logar} className="btn btn-lg btn-block btn-login " type="button">Logar</button>

                                    <div className="msg-login text-black text-center my-5">
                                        {msgTipo === 'sucesso' && <span><strong>WoW!</strong> Você está conectado! &#128526; </span>}
                                        {msgTipo === 'erro' && <span><strong>Ops!</strong> Verifique se a senha ou usuário estão corretos! &#128546; </span>}               
                                    </div>

                                    <div className="opcoes-login mt-5 text-center">
                                        <Link to="/usuariorecuperarsenha" className="mx-2">Recuperar Senha</Link>
                                        <span className="text-black">&#9733;</span>
                                        <Link to='novousuario' className="mx-2">Quero Cadastrar</Link>
                                    </div>
                                </form>   
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
    )
}

export default Login;