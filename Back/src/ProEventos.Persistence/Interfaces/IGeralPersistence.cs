using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ProEventos.Domain;

namespace ProEventos.Persistence.Interfaces
{
    public interface IGeralPersistence
    {
        /// <summary>
        /// Tudo e qual quer adicionar, atualizar ou deletar e salvar que tivemos para nosso banco será feito utilizado esse metodos abaixo.
        /// Somente os Selects ou GETs será diferentes
        /// </summary>
        /// <typeparam name="T"></typeparam>

        //GERAL 
        void Add<T> (T entity) where T : class;
        void Update<T> (T entity) where T : class;
        void Delete<T> (T entity) where T : class;
        void DeleteRange<T> (T[] entity) where T : class;
        Task<bool> SaveChangesAsync();      
    
    }
}