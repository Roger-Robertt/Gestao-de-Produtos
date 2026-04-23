using Microsoft.EntityFrameworkCore;

namespace Gestão_de_Produtos.Model
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Produto> Produtos { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Produto>().ToTable("produtos", "public"); // E especifique o esquema aqui
            base.OnModelCreating(modelBuilder);
        }
    }
}