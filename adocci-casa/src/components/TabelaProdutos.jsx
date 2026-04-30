import React from 'react';
import { useState } from 'react';

const TabelaProdutos = ({ produtos, onMovimentarEstoque }) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden mt-8">
      <div className="px-6 py-5 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
        <h3 className="text-lg font-bold text-adocci-dark">Itens em Estoque</h3>
        <span className="text-xs font-semibold bg-adocci-gold/20 text-adocci-dark px-3 py-1 rounded-full uppercase tracking-wider">
          {produtos.length} Produtos
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white">
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100">Produto</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100">Categoria</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100">Preço de Compra</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100">Preço de Venda</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100">SKU</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 text-center">Estoque</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 text-right">Status</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {produtos.map((produto) => {
              const estaBaixo = produto.estoqueAtual <= produto.estoqueMinimo;

              return (
                <tr key={produto.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <p className="font-semibold text-adocci-dark group-hover:text-adocci-gold transition-colors">{produto.nome}</p>
                    <p className="text-[10px] text-gray-400 uppercase">ID: {produto.id.toString().slice(-4)}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600">{produto.categoria}</span>
                  </td>
                  <td>
                    <span className="font-medium text-gray-700">
                      {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(produto.precoCompra)}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <span className="font-medium text-gray-700">
                      {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(produto.preco)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-medium text-gray-700">{produto.sku}</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`font-bold ${estaBaixo ? 'text-red-500' : 'text-gray-700'}`}>
                      {produto.estoqueAtual}
                    </span>
                    <span className="text-gray-300 text-xs ml-1">/ {produto.estoqueMinimo} min.</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {estaBaixo ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 mr-1.5 animate-pulse"></span>
                        Repor Estoque
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Disponível
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                  <div className="flex items-center justify-center gap-2">
                    {/* Botão de Saída (Venda) */}
                    <button
                      onClick={() => onMovimentarEstoque(produto.id, -1)}
                      className="w-8 h-8 flex items-center justify-center rounded-lg border border-red-200 text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-sm"
                      title="Registrar Venda (-1)"
                    >
                      -
                    </button>

                    {/* Botão de Entrada (Reposição) */}
                    <button
                      onClick={() => onMovimentarEstoque(produto.id, 1)}
                      className="w-8 h-8 flex items-center justify-center rounded-lg border border-adocci-gold text-adocci-dark hover:bg-adocci-gold transition-all shadow-sm font-bold"
                      title="Adicionar Estoque (+1)"
                    >
                      +
                    </button>
                  </div>
                </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TabelaProdutos;