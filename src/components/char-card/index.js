import React from 'react';
import {Link} from 'react-router-dom';

import './char-card.css';

function CharCard({id, chars, level, tipo, skill}){

    return(
        <div className="col-md-12 col-sm-12">
            <div className="card-body">
                <p className="card-text text-justify">
                    <h>Nick - Level - Classe - Skill</h>
                    <br></br>
                    {chars} - {level} - {tipo} - {skill} - <Link to={'/worlddetalhes/' + id} className="btn btn-sm btn-detalhes"> Detalhes</Link> 
                </p>

            </div>
        </div>
    )
}

export default CharCard;