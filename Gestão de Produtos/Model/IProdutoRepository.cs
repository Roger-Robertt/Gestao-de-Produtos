namespace Gestão_de_Produtos.Model
{
    public interface IProdutoRepository
    {
        void Add(Produto produto);

        List<Produto> GetAll();
        
        List<Produto> GetPaged(int page, int pageSize);

        Produto GetById(int id);

        bool SkuExists(string sku);
        void Update(Produto produto);
        void Delete(int id);
    }


}
