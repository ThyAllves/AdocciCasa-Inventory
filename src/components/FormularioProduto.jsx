import { useState } from 'react';
import { supabase } from '../supabaseClient';

const FormularioProduto = ({ aoSalvar }) => {

    const [nome, setNome] = useState('');
    const [categoria, setCategoria] = useState('');
    const [preco_compra, setpreco_compra] = useState('');
    const [preco, setPreco] = useState('');
    const [sku, setSku] = useState('');
    const [estoque_atual, setEstoque_atual] = useState('');
    const [estoque_minimo, setEstoque_minimo] = useState('');
    const [imagem, setImagem] = useState(null);
    const [preview, setPreview] = useState('');


    const CATEGORIAS = [
        'Mesa Posta',
        'Cozinha',
        'Sala de Jantar',
        'Sala de Estar',
        'Quarto',
        'Banheiro',
        'Decoração',
        'Utilidades',
        'Móveis',
        'Outros'
    ]


    async function handSubmit(e) {
        e.preventDefault();

        try {
            let imagemUrl = null;

            if (imagem) {
                const extensao = imagem.name.split('.').pop();
                const caminho = `${crypto.randomUUID()}.${extensao}`;

                const { error: erroUpload } = await supabase.storage
                    .from('produtos')
                    .upload(caminho, imagem, {
                        contentType: imagem.type,
                        upsert: false,
                    });

                if (erroUpload) throw erroUpload;
                const { data } = supabase.storage
                    .from('produtos')
                    .getPublicUrl(caminho);

                imagemUrl = data.publicUrl;
            }

            const { error: erroCadastro } = await supabase
                .from('produtos')
                .insert({
                    nome,
                    categoria,
                    preco_compra: Number(preco_compra),
                    preco: Number(preco),
                    sku,
                    estoque_atual: Number(estoque_atual),
                    estoque_minimo: Number(estoque_minimo),
                    imagem_url: imagemUrl,
                });

            if (erroCadastro) throw erroCadastro;

            alert('Produto cadastrado com sucesso!');

            setImagem(null);
            setPreview('');

        } catch (erro) {
            console.error('Erro ao cadastrar produto:', erro);
            alert(`Não foi possível cadastrar o produto: ${erro.message}`);
        }
    }


    return (
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 max-w-2xl mx-auto mt-10">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-adocci-dark">Novo Produto</h2>
                <p className="text-gray-500 text-sm">Preencha os dados para cadastrar produtos no estoque premium.</p>
            </div>

            <form onSubmit={handSubmit} className="space-y-6">
                {/* Campo: Nome */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Nome do Produto</label>
                    <input
                        type="text"
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-adocci-gold focus:outline-none transition-all"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        placeholder="Ex: Espelho Veneziano moldura ouro"
                        required
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Campo: Categoria */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Categoria</label>
                        <select
                            value={categoria}
                            onChange={(e) => setCategoria(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-adocci-gold focus:outline-none bg-white" required>
                            <option value="">Selecione uma categoria</option>
                            {CATEGORIAS.map((cat) => (
                                <option key={cat} value={cat}>
                                    {cat}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Preço de Compra</label>
                        <input type="number"
                            value={preco_compra}
                            onChange={(e) => setpreco_compra(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-adocci-gold focus:outline-none"
                            placeholder="R$ 0,00"
                            required
                        />
                    </div>

                   
                        {/* Campo: Preço */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Preço de Venda</label>
                            <input
                                type="number"
                                value={preco}
                                onChange={(e) => setPreco(e.target.value)}
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-adocci-gold focus:outline-none"
                                placeholder="R$ 0,00"
                                required
                            />
                        </div>
                    

                    <div>
                        <label htmlFor="SKU" className="block text-sm font-semibold text-gray-700 mb-1">SKU</label>
                        <input
                            type="text"
                            id="SKU"
                            value={sku}
                            onChange={(e) => setSku(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-adocci-gold focus:outline-none"
                            placeholder="Ex: ESP-001"
                            required
                        />
                    </div>
                </div>


                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Estoque Atual */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Qtd. em Estoque</label>
                        <input type="number" 
                        value={estoque_atual}
                        onChange={(e) => setEstoque_atual(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-adocci-gold" required />
                    </div>

                    {/* Estoque Mínimo */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Alerta de Mínimo</label>
                        <input type="number" 
                        value={estoque_minimo}
                        onChange={(e) => setEstoque_minimo(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-adocci-gold" required />
                    </div>
                </div>

                <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Imagem do Produto
                    </label>

                    <label
                        htmlFor="imagem-produto"
                        className="flex flex-col items-center justify-center w-full min-h-40
                   border-2 border-dashed border-gray-300 rounded-lg
                   cursor-pointer hover:border-adocci-gold transition-colors p-4"
                    >
                        {preview ? (
                            <img
                                src={preview}
                                alt="Prévia do produto"
                                className="max-h-56 max-w-full object-contain rounded-lg"
                            />
                        ) : (
                            <>
                                <span className="text-3xl mb-2">+</span>
                                <span className="text-sm text-gray-600">
                    Clique para selecionar uma imagem
                </span>
                                <span className="text-xs text-gray-400 mt-1">
                    PNG, JPG ou WEBP
                </span>
                            </>
                        )}

                        <input
                            id="imagem-produto"
                            type="file"
                            accept="image/png,image/jpeg,image/webp"
                            className="hidden"
                            onChange={(e) => {
                                const arquivo = e.target.files?.[0];

                                if (!arquivo) return;

                                if (arquivo.size > 5 * 1024 * 1024) {
                                    alert('A imagem deve ter no máximo 5 MB.');
                                    e.target.value = '';
                                    return;
                                }

                                setImagem(arquivo);
                                setPreview(URL.createObjectURL(arquivo));
                            }}
                        />
                    </label>

                    {imagem && (
                        <div className="flex items-center justify-between mt-2">
            <span className="text-sm text-gray-500">
                {imagem.name}
            </span>

                            <button
                                type="button"
                                onClick={() => {
                                    setImagem(null);
                                    setPreview('');
                                }}
                                className="text-sm text-red-600 hover:underline"
                            >
                                Remover imagem
                            </button>
                        </div>
                    )}
                </div>



                {/* Botão de Ação */}
                <button type='submit' className="w-full bg-adocci-dark text-adocci-gold font-bold py-4 rounded-lg hover:bg-gray-700 transition-colors shadow-lg uppercase tracking-widest text-sm mt-4">
                    Salvar no Inventário
                </button>
            </form>

        </div>
    );
}

export default FormularioProduto;