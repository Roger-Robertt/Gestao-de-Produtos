import { useNavigate } from 'react-router-dom';

const ButtonProdutoNovo = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/novo-produto");
    };

    return (
        <button className="bg-green-500 text-white px-4 py-2 rounded mb-4 cursor-pointer hover:bg-green-900" onClick={handleClick}>
            Novo Produto
        </button>
    );
}

export default ButtonProdutoNovo;   
