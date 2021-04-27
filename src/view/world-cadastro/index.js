import React, { useState, useEffect } from 'react';
import {useSelector} from 'react-redux'; 
import './world-cadastro.css';
import {Link} from 'react-router-dom';
import Navbar from '../../components/navbar/';
import { useForm } from "react-hook-form"; 
import firebase from '../../config/firebase';


function MundoCadastro(props){
    const [carregando, setCarregando] = useState();
    const [msgTipo, setMsgTipo] = useState();
    const [worlds, setWorld] = useState([]);
    const [tipo, setTipo] = useState();
    const usuarioEmail = useSelector(state => state.usuarioEmail);

    const db = firebase.firestore();

    const { register, handleSubmit } = useForm();

    useEffect(() => {  
        if(props.match.params.id){                   
            firebase.firestore().collection('worlds').doc(props.match.params.id).get().then(resultado => {
                setWorld(resultado.data().world)       
                setTipo(resultado.data().tipo)                                                                                           
    })
    }
    },[carregando])

    function onSubmit (data){
        setMsgTipo(null);
        setCarregando(1);
        if(!props.match.params.id){
            db.collection('worlds').add({
                world: data.nome_world,
                tipo: data.tipo_world,
                usuario: usuarioEmail,
                publico: 1,
                criacao: new Date()
            }).then(() => {
                setMsgTipo('sucesso');
                setCarregando(0);
            }).catch(erro => {
                setMsgTipo('erro');
                setCarregando(0);
            });
        }else{
            db.collection('worlds').doc(props.match.params.id).update({
                world: data.nome_world,
                tipo: data.tipo_world,
                usuario: usuarioEmail,
                publico: 1,
                criacao: new Date()
            }).then(() => {
                setMsgTipo('sucesso');
                setCarregando(0);
            }).catch(erro => {
                setMsgTipo('erro');
                setCarregando(0);
            });
        }
    }

    

    return(
        <>
        <Navbar/>
        <div className="col-12 mt-5">

            <div className="row-nav">
                <h3 className="mx-auto font-weight-bold">{props.match.params.id ? 'Atualizar Mundo' : 'Novo Mundo'}</h3>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>


                <div className="form-group">
                    <label>Mundo:</label>
                    <input {...register('nome_world')} type="text" className="form-control" />
                </div>

                <div className="form-group">
                    <label>Tipo de Mundo:</label>
                    <select {...register('tipo_world')} className="form-control">
                        <option disabled selected value>-- Selecione uma opção --</option>
                        <option value={'PvP-Opcional'}>PvP-Opcional</option>
                        <option value={'PvE'}>PvE</option>
                        <option value={'Retro-PvP'}>Retro-PvP</option>
                    </select>                    
                </div>

                <div className="row">               
                {
                    carregando > 0 ? <div className="spinner-border text-danger mx-auto" role="status"><span className="sr-only">Loading...</span></div>
                    : <button type="submit" className="btn btn-lg btn-block mt-3 mb-5 btn-cadastro">{props.match.params.id ? 'Atualizar Mundo' : 'Criar Mundo'}</button>
                }
                </div>
                
            </form>

            <div className="msg-login text-center mt-2">
                {msgTipo === 'sucesso' && <span><strong>WoW!</strong> Mundo Creado &#128526; </span>}
                {msgTipo === 'erro' && <span><strong>Ops!</strong> Não foi possível criar o mundo! &#128546; </span>}               
            </div>
        </div>
        </>
    )
}

export default MundoCadastro;