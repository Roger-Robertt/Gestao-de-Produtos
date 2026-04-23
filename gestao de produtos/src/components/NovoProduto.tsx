import { useEffect, useState } from 'react'; // 1. Não esqueça de importar!
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

// 1. Definimos o formato do objeto Produto
interface Produto {
    id: number;
    name: string;
    preco: number;
    sku: string;
    descricao: string;
    quantidade: number;
    categoria: string;

}

const NovoProduto = () => {
    const navigate = useNavigate();
    const location = useLocation() as { state: { produto: Produto } };
    // 2. Crie os estados aqui dentro
    const [quantidade, setQuantidade] = useState('');
    const [descricao, setDescricao] = useState('');
    const [sku, setSku] = useState('');
    const [name, setNome] = useState('');
    const [preco, setPreco] = useState('');
    const [categoria, setCategoria] = useState('');

    // ... seus estados atuais ...
    const [produtoEditando, setProdutoEditando] = useState<Produto | null>(null); // Adicione este estado

    useEffect(() => {

        if (location.state?.produto) {
            const p = location.state.produto;
            setProdutoEditando(p);
            setNome(p.name);
            setPreco(p.preco.toString());
            setDescricao(p.descricao);
            setSku(p.sku);
            setQuantidade(p.quantidade.toString());
            setCategoria(p.categoria);
        }
    }, [location.state]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const isEditing = produtoEditando !== null;

        const url = isEditing
            ? `https://localhost:52250/api/Produtos/${produtoEditando.id}`
            : 'https://localhost:52250/api/Produtos';

        const method = isEditing ? 'PUT' : 'POST';


        const produtoParaEnviar = {
            ...(isEditing && { id: produtoEditando.id }),
            name,
            preco: parseFloat(preco),
            categoria,
            sku,
            quantidade: parseInt(quantidade),
            descricao: descricao
        };

        try {
            const resposta = await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(produtoParaEnviar)
            });

            if (resposta.ok) {
                alert(isEditing ? "Produto atualizado com sucesso!" : "Produto criado com sucesso!");
                navigate('/lista-produtos');
            } else {
                // Isso vai mostrar a mensagem real que vem do seu servidor (API)
                const erro = await resposta.text();
                alert("Erro ao salvar: " + erro);
                console.error("Detalhes do erro:", erro);
            }
        } catch (error) {
            console.error("Erro na conexão:", error);
            alert("Não foi possível conectar ao servidor.");
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9 }}
        >
            <h2 className="text-xl font-bold mb-4">Novo Produto</h2>
            <form className="bg-white p-4 rounded shadow-md" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Nome</label>
                    <input
                        type="text"
                        className="w-full px-3 py-2 border rounded"
                        placeholder="Digite o nome do produto"
                        value={name} // 3. Conecte o valor ao estado
                        onChange={(e) => setNome(e.target.value)} // 4. Atualize o estado ao digitar
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Preço</label>
                    <input
                        type="number"
                        className="w-full px-3 py-2 border rounded"
                        placeholder="Digite o preço do produto"
                        value={preco}
                        onChange={(e) => setPreco(e.target.value)}
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Descrição</label>
                    <input
                        type="text"
                        className="w-full px-3 py-2 border rounded"
                        placeholder="Digite a descrição"
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">SKU</label>
                    <input
                        type="text"
                        className="w-full px-3 py-2 border rounded"
                        placeholder="Digite o SKU do produto"
                        value={sku}
                        onChange={(e) => setSku(e.target.value)}
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Quantidade</label>
                    <input
                        type="number"
                        className="w-full px-3 py-2 border rounded"
                        placeholder="Digite a quantidade do produto"
                        value={quantidade}
                        onChange={(e) => setQuantidade(e.target.value)}
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Categoria</label>
                    <select
                        className="w-full px-3 py-2 border rounded"
                        value={categoria}
                        onChange={(e) => setCategoria(e.target.value)}
                    >
                        <option value="">Selecione a categoria</option>
                        <option value="roupas">Roupas</option>
                        <option value="eletronicos">Eletrônicos</option>
                        <option value="calcados">Calçados</option>
                        <option value="acessorios">Acessórios</option>
                    </select>
                </div>

                <button
                    type="submit"
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-900"
                >
                    Salvar
                </button>
            </form>

        </motion.div>
    );
};

export default NovoProduto;