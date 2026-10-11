import Navbar from './components/Navbar';
import FormularioProduto from './components/FormularioProduto';
import dadosIniciais from './data/produtos.json';
import TabelaProdutos from './components/TabelaProdutos';
import { supabase } from './supabaseClient';
import { useEffect, useState } from 'react';

function App() {

  const [produtos, setProdutos] = useState(dadosIniciais);


  const adicionarProduto = async (novoProduto) => {
    let caminhoImagem = null;

    try {
      let imagemUrl = null;

      if (novoProduto.imagem) {
        const arquivo = novoProduto.imagem;
        const extensao = arquivo.name.split('.').pop().toLowerCase();
        caminhoImagem = `${crypto.randomUUID()}.${extensao}`;

        const { error: erroUpload } = await supabase.storage
            .from('produtos')
            .upload(caminhoImagem, arquivo, {
              contentType: arquivo.type,
              upsert: false,
            });

        if (erroUpload) throw erroUpload;

        const { data } = supabase.storage
            .from('produtos')
            .getPublicUrl(caminhoImagem);

        imagemUrl = data.publicUrl;
      }

      const { data, error } = await supabase
          .from('produtos')
          .insert({
            nome: novoProduto.nome,
            categoria: novoProduto.categoria,
            preco_compra: Number(novoProduto.preco_compra),
            preco: Number(novoProduto.preco),
            sku: novoProduto.sku,
            estoque_atual: Number(novoProduto.estoque_atual),
            estoque_minimo: Number(novoProduto.estoque_minimo),
            imagem_url: imagemUrl,
          })
          .select()
          .single();

      if (error) throw error;

      setProdutos((anteriores) => [...anteriores, data]);

      alert('Produto cadastrado com sucesso!');
      return true;

    } catch (erro) {
      console.error('Erro ao cadastrar produto:', erro);

      if (caminhoImagem) {
        const { error: erroRemocao } = await supabase.storage
            .from('produtos')
            .remove([caminhoImagem]);

        if (erroRemocao) {
          console.error('Erro ao remover imagem:', erroRemocao);
        }
      }

      alert('Erro ao salvar produto: ' + erro.message);
      return false;
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

    const { error } = await supabase
      .from('produtos')
      .update({ estoque_atual: novoEstoque })
      .eq('id', id);

    if (error) {
      alert("Erro ao atualizar estoque: " + error.message);
    } else {
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
      .from('produtos')
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
        
        <TabelaProdutos produtos={produtos} onMovimentarEstoque={movimentarEstoque} className="" />
      </main>
    </div>
  );
}

export default App;