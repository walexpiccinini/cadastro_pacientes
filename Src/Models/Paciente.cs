using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace cadastro_pacientes.Models
{
    [Table("paciente")]
    public class Paciente{
        [Key,Column("CODIGO")]
        public long Id {get; set;}

        [Column("FICHA")]
        public long Ficha {get; set;}

        [Column("NOME")]
        public string? Nome {get; set;}

        [Column("TELEFONE")]
        public string? Telefone {get; set;}

        [Column("RG")]
        public string? Rg {get; set;}
        
        [Column("CPF")]
        public string? Cpf {get; set;}

        [Column("NASCIMENTO")]
        public DateTime Nascimento {get; set;}

        [Column("SEXO")]
        public string? Sexo {get; set;}

        [Column("NATURALIDADE")]
        public string? Naturalidade {get; set;}
        
        [Column("UF")]
        public string? Uf {get; set;}

        [Column("PROFISSAO")]
        public string? Profissao {get; set;}

        [Column("ENDERECO",TypeName = "longtext")]
        public string? Endereco {get; set;}

    }
}