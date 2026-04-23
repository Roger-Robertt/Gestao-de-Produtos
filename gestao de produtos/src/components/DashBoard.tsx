import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// Reutilize a interface que você já tem
interface Produto {
    id: number;
    nome: string;
    categoria: string;
    preco: number;
    quantidade: number;
}

function Dashboard() {
    const [produtos, setProdutos] = useState<Produto[]>([]);

    useEffect(() => {
        fetch('https://localhost:52250/api/Produtos')
            .then(res => res.json())
            .then(data => setProdutos(data));
    }, []);

    // Cálculos rápidos
    const totalProdutos = produtos.length;
    const valorTotalEstoque = produtos.reduce((acc, p) => acc + (p.preco * p.quantidade), 0);
    const baixoEstoque = produtos.filter(p => p.quantidade < 5);

    return (
        <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9 }}
        >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Card 1 */}
                <div className="bg-stone-700 p-6 rounded shadow">
                    <h3 className="text-gray-500">Total de Produtos</h3>
                    <p className="text-3xl font-bold">{totalProdutos}</p>
                </div>

                {/* Card 2 */}
                <div className="bg-stone-700 p-6 rounded shadow">
                    <h3 className="text-gray-500">Valor em Estoque</h3>
                    <p className="text-3xl font-bold text-green-600">R$ {valorTotalEstoque.toFixed(2)}</p>
                </div>

                {/* Card 3 */}
                <div className="bg-stone-700 p-6 rounded shadow">
                    <h3 className="text-gray-500">Alertas (Baixo Estoque)</h3>
                    <p className="text-3xl font-bold text-red-600">{baixoEstoque.length}</p>
                </div>
            </div>
        </motion.div>
    );
}

export default Dashboard;