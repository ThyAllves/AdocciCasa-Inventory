import { useState } from 'react';
import Navbar from './components/Navbar';
import FormularioProduto from './components/FormularioProduto';
import dadosIniciais from './data/produtos.json'; 
import TabelaProdutos from './components/TabelaProdutos'; // O JSON que você criou

function App() {
  // 1. Definindo a "Fonte Única da Verdade"
  const [produtos, setProdutos] = useState(dadosIniciais);

  // 2. Função para Adicionar Produto (será passada para o formulário)
  const adicionarProduto = (novoProduto) => {
    setProdutos([...produtos, novoProduto]);
  };

  const produtosEmAlerta = produtos .filter(produtos => produtos.estoqueAtual <= produtos.estoqueMinimo).length;

  const totalAlertas = produtosEmAlerta.length;

  return (
    <div className="min-h-screen bg-slate-900">
      <Navbar contadorAlertas={totalAlertas} /> 
      
      <main className="max-w-7xl mx-auto py-10 px-4">
        {/* 3. Passamos a FUNÇÃO para o formulário via "Props" */}
        <FormularioProduto aoSalvar={adicionarProduto} />
        <TabelaProdutos produtos={produtos} />
        
        {/* Aqui você pode testar se está funcionando apenas mostrando o número de itens */}
      </main>
    </div>
  );
}

export default App;