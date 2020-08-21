import React from 'react';
import {Link} from 'react-router-dom';

const LambdaEats = () => {
    return(
        <div>
            <h1>Lambda Eats</h1>
            <Link to='/'><button>Home</button></Link>
            <button>Help</button>
        </div>
    )
}
export default LambdaEats