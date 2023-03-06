namespace ProEventos.Domain
{
    public class RedeSocial
    {
        // public int Id { get; set; }
        // public string? Nome { get; set; }
        // public string URL { get; set; } = null!;
        // public int? EventoId { get; set; }
        // public Evento Evento { get; set; } = null!;
        // public int? PalestranteID { get; set; }
        // public Palestrante Palestrantes { get; set; }= null!;

        public int Id { get; set; }
        public string Nome { get; set; }
        public string URL { get; set; }
        public int? EventoId { get; set; }
        public Evento? Evento { get; set; }
        public int? PalestranteId { get; set; }
        public Palestrante? Palestrante { get; set; }
    }
}