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
            <div className="main-content Content Talles-Responsividade">
                <div id="characters" className="Box">

                    <div className="Corner-tl" ></div>

                    <div className="Corner-tr" ></div>

                    <div className="Border_1"></div>

                    <div className="BorderTitleText">
                    </div>

                    <img id="ContentBoxHeadline" className="Title" src="https://i.postimg.cc/FKQvsR4h/management.png" alt="Contentbox headline">
                    </img>

                    <div className="Border_2">
                        <div className="Border_3">
                            <div className="BoxContent">
                                <div className="row p-6 ">
                                    <h3 className="mx-auto pt-3 pb-2">Mundos Criados:</h3>
                                    <input onChange={(e) => setPesquisa(e.target.value)} type="text" className="form-control text-center styleSerch" placeholder="Pesquisar Mundo pelo nome..." />
                                </div>
                                <div className="row pt-3">
                                    <h5>Lista de Mundos:</h5>
                                    {worlds.map(item => <WorldCard key={item.id} id={item.id} worlds={item.world} tipo={item.tipo} />) }
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

export default Home;