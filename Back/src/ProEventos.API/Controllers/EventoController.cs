using Microsoft.AspNetCore.Mvc;

namespace ProEventos.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class EventoController : ControllerBase
{

    public IEnumerable<Evento> _evento = new Evento[]{
            new Evento(){
            EventoId = 1,
            Tema = "Angular 11 e .NET 5",
            Local = "Belo Horizonte",
            Lote = "1° Lote",
            QtdPessoas = 250,
            DateEvento = DateTime.Now.AddDays(2).ToString("dd/MM/yyyy"),
            ImagemURL = "Foto.png"
            },
             new Evento(){
            EventoId = 2,
            Tema = "Angular en suas novidades",
            Local = "São Paulo",
            Lote = "3° Lote",
            QtdPessoas = 350,
            DateEvento = DateTime.Now.AddDays(3).ToString("dd/MM/yyyy"),
            ImagemURL = "Foto1.png"
            }
    };
    public EventoController()
    {
    }

    [HttpGet]
    public IEnumerable<Evento> Get()
    {
        return _evento;

    }

    [HttpGet("{id}")]
    public IEnumerable<Evento> GetById(int id)
    {
        return _evento.Where(evento => evento.EventoId == id);

    }
    [HttpPost]
    public string Post()
    {
        return "bla bla bla";
    }
}
