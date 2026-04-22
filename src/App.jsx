import Navbar from './components/Navbar';
import FormularioProduto from './components/FormularioProduto';
import dadosIniciais from './data/produtos.json';
import TabelaProdutos from './components/TabelaProdutos'; // O JSON que você criou
import { supabase } from './supabaseClient';
import { useEffect, useState } from 'react';

function App() {
  // 1. Definindo a "Fonte Única da Verdade"
  const [produtos, setProdutos] = useState(dadosIniciais);

  // 2. Função para Adicionar Produto (será passada para o formulário)
  const adicionarProduto = async (novoProduto) => {
    // 1. Enviamos para o Supabase
    const { data, error } = await supabase
      .from('produtos')
      .insert([
        {
          nome: novoProduto.nome,
          categoria: novoProduto.categoria,
          preco_compra: novoProduto.preco_compra,
          preco: novoProduto.preco,
          sku: novoProduto.sku,
          estoque_atual: novoProduto.estoque_atual,
          estoque_minimo: novoProduto.estoque_minimo
        }
      ])
      .select();

    if (error) {
      alert("Erro ao salvar no banco: " + error.message);
    } else {
      // 2. Se deu certo no banco, atualizamos a tela
      setProdutos([...produtos, data[0]]);
    }
  };

  const totalAlertas = produtos.filter(produtos => produtos.estoque_atual <= produtos.estoque_minimo).length;

  const movimentarEstoque = async (id, delta) => {
    const produtoAlvo = produtos.find(p => p.id === id);
    const novoEstoque = produtoAlvo.estoque_atual + delta;

    if (novoEstoque < 0) {
      alert("Estoque insuficiente!");
      return;
    }

    // 1. Atualiza no Supabase
    const { error } = await supabase
      .from('produtos')
      .update({ estoque_atual: novoEstoque })
      .eq('id', id);

    if (error) {
      alert("Erro ao atualizar estoque: " + error.message);
    } else {
      // 2. Atualiza o estado local para a interface reagir instantaneamente
      setProdutos(produtos.map(p =>
        p.id === id ? { ...p, estoque_atual: novoEstoque } : p
      ));
    }
  };

  useEffect(() => {
    buscarProdutos();
  }, []);

  async function buscarProdutos() {
    const { data, error } = await supabase
      .from('produtos') // Nome da sua tabela no Supabase
      .select('*')
      .order('nome', { ascending: true });

    if (error) console.log('Erro ao buscar:', error);
    else setProdutos(data);
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <Navbar contadorAlertas={totalAlertas} />

      <main className="max-w-7xl mx-auto py-10 px-4">
        <FormularioProduto aoSalvar={adicionarProduto} />
        <TabelaProdutos produtos={produtos} onMovimentarEstoque={movimentarEstoque} />

      </main>
    </div>
  );
}

export default App;