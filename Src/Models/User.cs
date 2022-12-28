using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace cadastro_pacientes.Models {
    [Table("funcionario")]
    public class User{
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key,Column("CODIGO")]
        public long Id {get; set;}

        [Column("NOME")]
        public string? Nome {get; set;}

        [Column("SENHA")]
        public string? Senha {get; set;}

    }
}