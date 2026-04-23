using Gestão_de_Produtos.Model;

namespace Gestão_de_Produtos.Repository
{
    internal class ProdutoRepository : IProdutoRepository
    {
        private readonly AppDbContext _context;

        public ProdutoRepository(AppDbContext context)
        {
            _context = context;
        }

        public void Add(Produto produto)
        {
            _context.Produtos.Add(produto);
            _context.SaveChanges();
        }

        public List<Produto> GetAll()
        {
            return _context.Produtos.ToList();
        }

        public List<Produto> GetPaged(int page, int pageSize)
        {
            return _context.Produtos
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToList();
        }

        public Produto GetById(int id)
        {
            return _context.Produtos.Find(id);
        }

        public bool SkuExists(string sku)
        {
            return _context.Produtos.Any(p => p.Sku == sku);
        }

        public void Update(Produto produto)
        {
            _context.Produtos.Update(produto);
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            var produto = GetById(id);
            if (produto != null)
            {
                _context.Produtos.Remove(produto);
                _context.SaveChanges();
            }
        }
    }
}
