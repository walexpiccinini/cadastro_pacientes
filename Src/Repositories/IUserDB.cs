using cadastro_pacientes.DTOs;
using cadastro_pacientes.Models;

namespace cadastro_pacientes.interfaces {
    public interface IUserDB {
        Task createUser(User user);
        Task<bool> searchForUsuario(string usuario);

        Task<User> validate(UserDTO user);
    }
}