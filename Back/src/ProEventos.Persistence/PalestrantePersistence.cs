using Microsoft.EntityFrameworkCore;
using ProEventos.Domain;
using ProEventos.Persistence.Contextos;
using ProEventos.Persistence.Interfaces;

namespace ProEventos.Persistence
{
    public class PalestrantePersistence : IPalestrantePersistence
    {
        private readonly ProEventosContext _context;

        public PalestrantePersistence(ProEventosContext context)
        {
            _context = context;

        }       
        public async Task<Palestrante[]> GetAllPalestrantesAsync(bool includeEventos = false)
        {
                IQueryable<Palestrante> query = _context.Palestrantes                                        
                                        .Include(p => p.RedesSociais);


            if (includeEventos)
            {
                query = query
                        .Include(p => p.PalestrantesEventos)
                        .ThenInclude(pe => pe.Evento);
            }

            query = query.AsNoTracking().OrderBy(p => p.Id);

            return await query.ToArrayAsync();
        }

        public async Task<Palestrante[]> GetAllPalestrantesByNomeAsync(string nome, bool includeEventos)
        {
              IQueryable<Palestrante> query = _context.Palestrantes                                        
                                        .Include(p => p.RedesSociais);


            if (includeEventos)
            {
                query = query
                        .Include(p => p.PalestrantesEventos)
                        .ThenInclude(pe => pe.Evento);
            }

            query = query.AsNoTracking().OrderBy(p => p.Id)
                         .Where(p => p.Nome.ToLower().Contains(nome.ToLower()));

            return await query.ToArrayAsync();
        }

        public async Task<Palestrante> GetPalestrantesByIdAsync(int palestranteId, bool includeEventos)
        {
              IQueryable<Palestrante> query = _context.Palestrantes                                        
                                        .Include(p => p.RedesSociais);


            if (includeEventos)
            {
                query = query
                        .Include(p => p.PalestrantesEventos)
                        .ThenInclude(pe => pe.Evento);
            }

            query = query.AsNoTracking().OrderBy(p => p.Id)
                         .Where(p => p.Id == palestranteId);

            return await query.FirstOrDefaultAsync();
        }

    }
}