using ProEventos.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProEventos.Persistence.Interfaces
{
    public interface IEventosPersistence
    {
          
        //EVENTOS
        Task<Evento[]> GetAllEventosByTemaAsync(string tema, bool includePalestrantes  = false) ;
        Task<Evento[]> GetAllEventosAsync(bool includePalestrantes  = false);
        Task<Evento> GetEventosByIdAsync(int eventoId, bool includePalestrantes  = false );

    }
}