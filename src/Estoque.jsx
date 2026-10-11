import React from 'react';
import Navbar from './components/Navbar';
import TabelaProdutos from './components/TabelaProdutos';

function Estoque() {
    return(
        <div className="max-w-7xl mx-auto py-10 px-4">
            <Navbar />
            <TabelaProdutos />
        </div>
    )
}

export default Estoque;