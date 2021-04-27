import React, { useState, useEffect } from 'react';
import {useSelector} from 'react-redux'; 
import './chars-cadastro.css';
import {Link} from 'react-router-dom';
import { useForm } from "react-hook-form"; 
import Navbar from '../../components/navbar/';

import firebase from '../../config/firebase';


function CharCadastro(props){
    const [worlds, setWorlds] = useState([]);
    const [world, setWorld] = useState();
    const [carregando, setCarregando] = useState();
    const [msgTipo, setMsgTipo] = useState();
    const [char, setChar] = useState();
    const [donoChar, setDonoChar] = useState();
    const usuarioEmail = useSelector(state => state.usuarioEmail);

    const { register, handleSubmit } = useForm();

    const db = firebase.firestore();

    useEffect(() => {
        let listamundos = [];
        firebase.firestore().collection('worlds').get().then(async (resultado) => {
            await resultado.docs.forEach(doc => {         
                listamundos.push({
                    id: doc.id,
                    ...doc.data()
                })
            })
        setWorlds(listamundos);
        });
    },[]);

    useEffect(() => {   
        if(carregando){   
            firebase.firestore().collection('chars').doc(props.match.params.id).get().then(resultado => {
                setChar(resultado.data())
                setCarregando(0);   
            })
        }
    },[])

    function onSubmit (data){
        setMsgTipo(null);
        setCarregando(1);
        if(!props.match.params.id){
            db.collection('worlds').doc(data.world).collection('char').add({
                char: data.nick_char,
                level: data.level_char,
                tipo: data.classe_char,
                skill: data.skill_char,
                donoChar: data.dono_char,
                world: data.world,
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
            db.collection('worlds').doc(data.world).collection('char').doc(props.match.params.id).update({
                char: data.nick_char,
                level: data.level_char,
                tipo: data.classe_char,
                skill: data.skill_char,
                donoChar: data.dono_char,
                world: data.world,
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
            <div className="row">
                <h3 className="mx-auto font-weight-bold">{props.match.params.id ? 'Atualizar Char' : 'Novo Char'}</h3>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
            
            <div className="row p-3 ">
                <h2 className="mx-auto p-5">Chars Criados</h2>
                <select {...register('world')} className="form-control">
                <option disabled selected value>-- Selecione uma opção --</option>
                    {worlds && worlds.map(world => {
                        return <option value={world.id}>{world.world}</option>
                    })}
                </select> 
            </div>

            <div className="form-group">
                <label>Nick do Char:</label>
                <input {...register('nick_char')} type="text" className="form-control"/>
            </div>

            <div className="form-group">
                <label>Level do Char:</label>
                <input {...register('level_char')} type="text" className="form-control"/>
            </div>

            <div className="form-group">
                <label>Classe do Char:</label>
                <select {...register('classe_char')} className="form-control">
                    <option disabled selected value>-- Selecione uma opção --</option>
                    <option value={'druid'}>Druid</option>
                    <option value={'knight'}>Knight</option>
                    <option value={'paladin'}>Paladin</option>
                    <option value={'sorcerer'}>Sorcerer</option>
                </select>                    
            </div>

            <div className="form-group">
                <label>Skill do Char:</label>
                <input {...register('skill_char')} type="text" className="form-control"/>
            </div>

            <div className="form-group">
                <label>Dono do Char:</label>
                <input {...register('dono_char')} type="text" className="form-control"/>
            </div>

            <div className="row">               
            {
                carregando > 0 ? <div class="spinner-border text-danger mx-auto" role="status"><span class="sr-only">Loading...</span></div>
                : <button type="submit" className="btn btn-lg btn-block mt-3 mb-5 btn-cadastro">{props.match.params.id ? 'Atualizar ' : 'Criar Char'}</button>
            }
            </div>
            </form>

            <div className="msg-login text-center mt-2">
                {msgTipo === 'sucesso' && <span><strong>WoW!</strong> Char Creado &#128526; </span>}
                {msgTipo === 'erro' && <span><strong>Ops!</strong> Não foi possível criar o Char! &#128546; </span>}               
            </div>
        </div>
        </>
    )
}

export default CharCadastro;