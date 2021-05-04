import React from 'react';
import {Link} from 'react-router-dom';

import './world-card.css';

function WorldCard({id, worlds, tipo}){

    return(
        <div className="col-md-12 col-sm-12">
 
            <div className="card-body">
                <p className="card-text text-justify">
                    {worlds} - {tipo} - <Link to={'/worlddetalhes/' + id} className="btn btn-sm btn-detalhes"> Detalhes</Link> 
                </p>
            </div>
        </div>
    )
}

export default WorldCard;