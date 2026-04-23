import Header from './components/Header';
import SideBar from './components/SideBar';
import ButtonProdutoNovo from './components/ButtonProdutoNovo';
import { Routes, Route } from 'react-router-dom';
import NovoProduto from './components/NovoProduto';
import ListaProdutos from './components/ListaProdutos';
import Dashboard from './components/DashBoard';
import Pedidos from './page/Pedidos';
import Relatorios from './page/Relatorios';


function App() {
  return (
    <>
      <Header />

      <div className="flex h-screen">


        <aside className="w-64 bg-slate-800 text-white">
          <SideBar />
        </aside>

        <main className='flex-1 p-6 bg-gray-100 overflow-y-auto'>
          <Routes>

            <Route path="/produtos" element={
              <>
                <ButtonProdutoNovo />
              </>
            } />

            <Route path="/novo-produto" element={
              <NovoProduto />


            } />

            <Route path="/lista-produtos" element={
              <ListaProdutos />
            } />

            <Route path="/Dashboard" element={
              <Dashboard />
            } />

            <Route path="/Pedidos" element={
              <Pedidos />
            } />

            <Route path="/Relatorios" element={
              <Relatorios />
            } />

          </Routes>

        </main>
      </div>
    </>
  )
}

export default App
