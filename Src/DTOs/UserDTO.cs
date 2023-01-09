using System.ComponentModel.DataAnnotations;

namespace cadastro_pacientes.DTOs{
    public class UserDTO {
        public string? Nome {get; set;}

        [Required(ErrorMessage = "O Campo Usuário é requerido")]
        public string Usuario {get; set;} = "";
        
        [Required(ErrorMessage = "O Campo Senha é requerido")]
        public string Senha {get; set;} = "";

        public string? Role {get; set;}
    }
}