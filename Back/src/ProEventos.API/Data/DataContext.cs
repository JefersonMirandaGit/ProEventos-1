using Microsoft.EntityFrameworkCore;
using ProEventos.API.Models;

namespace ProEventos.API.Data
{
    public class DataContext : DbContext
    {  
        public DataContext(DbContextOptions<DataContext> options) : base(options) {  }
        public DbSet<Evento> Eventos { get; set; } = null! ;// Foi necessario declar que o DbSet EVENTOS  é diferente de null
        
    }
}