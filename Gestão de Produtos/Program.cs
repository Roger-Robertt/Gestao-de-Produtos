using Gestão_de_Produtos.Repository;
using Gestão_de_Produtos.Model;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddScoped<IProdutoRepository, ProdutoRepository>();

// No Program.cs
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        policy => policy.WithOrigins("http://localhost:5173") // A porta do seu React
                        .AllowAnyMethod()
                        .AllowAnyHeader());
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


var app = builder.Build();

if (app.Environment.IsDevelopment())    
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Depois do app.MapControllers() ou app.UseRouting()
app.UseCors("AllowReactApp");

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();