import React, { useState, useEffect } from 'react';
import './home.css';
import {Link} from 'react-router-dom';
import Navbar from '../../components/navbar/';
import { useSelector } from 'react-redux';
import firebase from '../../config/firebase';
import WorldCard from '../../components/world-card'

function Home(props){

    const [worlds, setWorlds] = useState([]);
    const [pesquisa, setPesquisa] = useState('');
     
    const usuarioEmail = useSelector(state => state.usuarioEmail);

    let listamundos = []; 

    useEffect(() => {
        firebase.firestore().collection('worlds').get().then(async (resultado) => {
            await resultado.docs.forEach(doc => {    
                listamundos.push({
                   id: doc.id,
                   ...doc.data()
               })
           })
           setWorlds(listamundos);
        });
    });

    

    return(
        <>
        <Navbar/>
            <div className="row p-6 ">
                <h2 className="mx-auto p-5">Mundos Criados</h2>
                <input onChange={(e) => setPesquisa(e.target.value)} type="text" className="form-control text-center" placeholder="Pesquisar Mundo pelo nome..." />
            </div>

            <div className="row p-12">
                <h3>Lista de Mundos:</h3>
                {worlds.map(item => <WorldCard key={item.id} id={item.id} worlds={item.world} tipo={item.tipo} />) }
            </div>
        </>
    )
}

export default Home;