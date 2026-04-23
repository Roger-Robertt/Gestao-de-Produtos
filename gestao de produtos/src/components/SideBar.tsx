import { Link } from "react-router-dom";


const SideBar = () => {
    return (
        <div className="bg-slate-800 text-gray-100 w-64 min-h-screen px-4 py-2 font-extrabold">
            <nav className="p-4">
                <ul className="space-y-2">
                    <li><Link to="/Dashboard" className="block p-2 rounded hover:bg-gray-600">Dashboard</Link></li>
                    <li><Link to="/lista-produtos" className="block p-2 rounded hover:bg-gray-600 text-blue-800">Produtos</Link></li>
                    <li><Link to="/pedidos" className="block p-2 rounded hover:bg-gray-600">Pedidos</Link></li>
                    <li><Link to="/relatorios" className="block p-2 rounded hover:bg-gray-600">Relatórios</Link></li>
                </ul>
            </nav>
        </div>
    );
}

export default SideBar; 