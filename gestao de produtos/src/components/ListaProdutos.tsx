import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

// 1. Definimos o formato do objeto Produto
interface Produto {
    id: number;
    name: string;
    categoria: string;
    preco: number;
    sku: string;
}

function ListaProdutos() {
    // 2. Dizemos ao useState que ele vai guardar um array de 'Produto'
    const [produtos, setProdutos] = useState<Produto[]>([]);

    const navigate = useNavigate();

    useEffect(() => {
        fetch('https://localhost:52250/api/Produtos')
            .then((response) => response.json())
            // 3. Garantimos que os dados que vêm da API correspondam ao nosso tipo
            .then((data: Produto[]) => setProdutos(data))
            .catch((error) => console.error("Erro ao buscar:", error));
    }, []);

    const handleExcluir = async (id: number) => {
        // 1. Confirmação para o usuário
        if (!window.confirm("Tem certeza que deseja excluir este produto?")) return;

        try {
            // 2. Chamada para o Back-end
            await fetch(`https://localhost:52250/api/Produtos/${id}`, {
                method: 'DELETE',
            });

            // 3. Atualiza o estado da lista para remover o produto da tela imediatamente
            setProdutos(produtos.filter(p => p.id !== id));

            alert("Produto excluído com sucesso!");
        } catch (error) {
            console.error("Erro ao excluir:", error);
        }
    };

    return (

        <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9 }}
        >
            <table className='bg-gray-900 min-w-full text-white rounded-lg overflow-hidden'>
                <thead>
                    <tr className='bg-gray-800 border-b border-gray-600 '>
                        <th className='p-4'>Name</th>
                        <th className='p-4'>Categoria</th>
                        <th className='p-4'>Preço</th>
                        <th className='p-4'>SKU</th>
                        <th className='p-4'>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {/* O 'p' aqui já é reconhecido automaticamente como do tipo Produto */}
                    {produtos.map((p) => (
                        <tr key={p.id}>
                            <td className='py-2 px-4 border-b'>{p.name}</td>
                            <td className='py-2 px-4 border-b'>{p.categoria}</td>
                            <td className='py-2 px-4 border-b'>R$ {p.preco.toFixed(2)}</td>
                            <td className='py-2 px-4 border-b'>{p.sku}</td>
                            <td className='py-2 px-4 border-b'>
                                <button className="bg-blue-500 text-white px-2 py-1 rounded" onClick={() => navigate('/novo-produto', { state: { produto: p } })}>
                                    Editar
                                </button>
                                <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => handleExcluir(p.id)}>
                                    Excluir
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>

                <button className="bg-green-500 text-white px-4 py-2 rounded mb-2 mt-9 ml-2 cursor-pointer hover:bg-green-900" onClick={() => {
                    navigate('/novo-produto');
                }}>
                    Novo Produto
                </button>
            </table>
        </motion.div>
    );
}

export default ListaProdutos;