import React from 'react';
import './navbar.css';
import {Link} from 'react-router-dom';
import { useSelector, useDispatch} from 'react-redux';

function Navbar(){

    const dispatch = useDispatch();

    return(
        <div className="main-content Content Talles-ResponsividadeNav">
            <div id="RightArtwork">
                <img id="Monster" src="https://static.tibia.com/images/global/header/monsters/vulcongra.gif"></img>
                <img id="Pedestal" src="https://static.tibia.com/images/global/header/pedestal.gif"></img>
            </div>

            <div id="" className="Box">
                <div className="Corner-tl">
                    
                </div>

                <div className="Corner-tr">
                    
                </div>

                <div className="Border_1">
                </div>

                <div className="BorderTitleTextNav">
                    <div className="navJustf">
                        <Link className="linkDecoration" to="/">Home</Link>
                        <Link className="linkDecoration" to="/mundocadastro">Mundos</Link>
                        <Link className="linkDecoration" to="/charcadastro">Chars</Link>
                        
                        <Link className="linkDecoration" to="/login">Login</Link>
                        <Link className="linkDecoration" to="/novousuario">Cadastrar</Link>
                        <Link className="linkDecoration" onClick={() => dispatch({type: 'LOG_OUT'})   }>Sair</Link>
        
                    </div>

                </div>

                <div className="Border_1">
                </div>

                <div className="CornerWrapper-b">

                    <div className="Corner-bl">
                        
                    </div>

                </div>

                <div className="CornerWrapper-b">

                    <div className="Corner-br">
                        
                    </div>

                </div>

            </div>
        </div>

        // <nav className="navbar navbar-expand-lg">
        //     <i className="far fa-smile-wink text-white fa-2x"></i>
        //         <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        //             <i className="fas fa-bars text-white"></i>
        //         </button>
        //     <div className="collapse navbar-collapse" id="navbarNav">
        //         <ul className="navbar-nav">

        //             <li className="nav-item"><Link className="nav-link ml-2" to="/">Home</Link></li> 

        //             {           
        //                 useSelector(state => state.usuarioLogado) > 0 ?                  
        //             <>                        
        //                 <li className="nav-item"><Link className="nav-link" to="/mundocadastro">Mundos</Link></li> 
        //                 <li className="nav-item"><Link className="nav-link" to="/charcadastro">Chars</Link></li>
        //                 <li className="nav-item"><Link className="nav-link" onClick={() => dispatch({type: 'LOG_OUT'})   }>Sair</Link></li> 
        //             </>
        //             :
        //             <>
        //             <li className="nav-item"><Link className="nav-link" to="/novousuario">Cadastrar</Link></li> 
        //             <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li> 
        //             </>
        //             }
                    
        //         </ul>
        //     </div>
        // </nav>
    )
}

export default Navbar;