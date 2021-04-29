import React, { useState } from 'react';
import firebase from '../../config/firebase';
import 'firebase/auth';
import Navbar from '../../components/navbar/';

import './usuario-novo.css';

function NovoUsuario(){

    const [email, setEmail] = useState();
    const [senha, setSenha] = useState();
    const [msgTipo, setMsgTipo] = useState();
    const [msg, setMsg] = useState();
    const [carregando, setCarregando] = useState();

    function cadastrar(){

        setCarregando(1);

        setMsgTipo(null);

        if(!email || !senha){
            setMsgTipo('erro')
            setMsg('Você precisa informar o email e senha para fazer o cadastro!')
            return;
        }

        firebase.auth().createUserWithEmailAndPassword(email,senha).then(resultado => {
            setCarregando(0);
            setMsgTipo('sucesso')            
        }).catch(erro => {
            setCarregando(0);
            setMsgTipo('erro')
            switch(erro.message) 
            {
            case 'Password should be at least 6 characters':
                setMsg('A senha deve ter pelo menos 6 caracteres!');  
                break;
            case 'The email address is already in use by another account.':
                setMsg('Este email já está sendo utilizado por outro usuário!'); 
                break; 
            case 'The email address is badly formatted.':
                setMsg('O formato do seu email é inválido!'); 
                break;
             default:
                setMsg('Não foi possível cadastrar. Tente novamente mais tarde!');
                break; 
            }
        })
    }



    return(
        <>
        <Navbar/>
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
                            <div className="form-cadastro">
                                <form className="text-center form-login mx-auto mt-5">
                                    <h1 className="h3 mb-3 text-black font-weight-bold">Cadastro</h1>

                                    <input onChange={(e) => setEmail(e.target.value) }  type="email" className="form-control my-2" placeholder="Email" />
                                    <input onChange={(e) => setSenha(e.target.value) }  type="password" className="form-control my-2" placeholder="Senha" />
                                    
                                    {
                                        carregando ? <div className="spinner-border text-danger" role="status"><span className="sr-only">Loading...</span></div>
                                        : <button onClick={cadastrar} type="button" className="btn btn-lg btn-block mt-3 mb-5 btn-cadastro">Cadastrar</button>
                                    }
                                    
                                    

                                    <div className="msg-login text-black text-center my-5">
                                        {msgTipo === 'sucesso' && <span><strong>WoW!</strong>Usuário cadastrado com sucesso! &#128526; </span>}
                                        {msgTipo === 'erro' && <span><strong>Ops!</strong> {msg} &#128546; </span>}               
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
    </>
    )
}

export default NovoUsuario;