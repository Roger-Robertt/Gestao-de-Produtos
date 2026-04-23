using Gestão_de_Produtos.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Gestão_de_Produtos.Controller

{
    [Route("api/produtos")]
    [ApiController]

    public class ProdutosController(IProdutoRepository repository, ILogger<ProdutosController> logger) : ControllerBase
    {
        private readonly IProdutoRepository _repository = repository;
        private readonly ILogger<ProdutosController> _logger = logger;
        private readonly DbContext? _context;

        [HttpPost]
        public IActionResult Create(Produto produto)
        {
            if(produto.Quantidade < 0)
            {
                return BadRequest("A quantidade não pode ser negativa.");
            }

            if (produto.Categoria == "Eletronicos" && produto.Preco < 50.00m) { 
                return BadRequest("Produtos eletrônicos devem ter um preço mínimo de 50.00.");
            }

            if (_repository.SkuExists(produto.Sku))
            {
                return Conflict("Já existe um produto com este SKU.");
            }

            try
            {
                _repository.Add(produto);
                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro ao salvar produto");
                return StatusCode(500, "Erro interno.");
            }

        }

        [HttpGet]
        public IActionResult GetAll([FromQuery] int page = 1, int pageSize = 10)
        {
            try
            {
                var produtos = _repository.GetPaged(page, pageSize);
                return Ok(produtos);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro ao buscar a lista de produtos.");
                return StatusCode(500, "Erro interno ao buscar produtos.");
            }
        }

        [HttpPut]
        public IActionResult Update(Produto produto)
        {
            
            if (!ModelState.IsValid)
            {
                _logger.LogWarning("Tentativa de atualização com dados inválidos para o produto {Id}", produto.Id);
                return BadRequest(ModelState);
            }

            try
            {
                _repository.Update(produto);
                _logger.LogInformation("Produto {Id} atualizado com sucesso.", produto.Id);
                return NoContent(); 
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro ao atualizar o produto {Id}", produto.Id);
                return StatusCode(500, "Erro interno ao atualizar produto.");
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                var produto = _repository.GetById(id);
                if (produto == null)
                {
                    _logger.LogWarning("Tentativa de excluir produto com ID {Id} inexistente.", id);
                    return NotFound();
                }

                _repository.Delete(id);
                _logger.LogInformation("Produto {Id} excluído com sucesso.", id);
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro ao excluir o produto {Id}", id);
                return StatusCode(500, "Erro interno ao excluir produto.");
            }
        }
    }
}