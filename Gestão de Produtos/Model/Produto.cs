using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Gestão_de_Produtos.Model
{
    [Table("produtos")]
    public class Produto
    {
        [Key]
        public int Id { get; private set; }

        [Required(ErrorMessage = "O nome é obrigatório.")]
        [StringLength(200, ErrorMessage = "O nome não pode exceder 200 caracteres.")]
        public string Name { get; private set; }

        public string Descricao { get; set; }

        public string Sku { get; set; }

        public string Categoria { get; set; }

        [Range(1, int.MaxValue, ErrorMessage = "A quantidade deve ser pelo menos 1.")]
        public int Quantidade { get; set; }

        [Required(ErrorMessage = "O preço é obrigatório.")]
        [Range(0.01, double.MaxValue, ErrorMessage = "O preço deve ser maior que zero.")]
        public decimal Preco { get; set; } 

        public Produto(string name, string descricao, int quantidade, decimal preco)
        {
            this.Name = name ?? throw new ArgumentException("Nome inválido", nameof(name));
            this.Descricao = descricao;
            this.Quantidade = quantidade;
            this.Preco = preco;
        }
    }
}


