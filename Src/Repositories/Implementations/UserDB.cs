using cadastro_pacientes.DTOs;
using cadastro_pacientes.interfaces;
using cadastro_pacientes.Models;
using Microsoft.EntityFrameworkCore;

namespace cadastro_pacientes.Repository {
    public class UserDB : IUserDB
    {
        private readonly ClinicaContext _context;
        public UserDB(ClinicaContext context)
        {
            _context = context;
        }
        public async Task createUser(User user)
        {
            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();
        }

        public async Task<bool> searchForUsuario(string usuario)
        {
            var user = await _context.Users.Where(u => u.Usuario == usuario).AsNoTracking().ToListAsync();
            if(user.Count > 0){
                return true;
            }


            return false;
        }

        public async Task<User> validate(UserDTO user)
        {
            var userResult = await _context.Users
            .AsNoTracking()
            .Where(u=> u.Usuario ==  user.Usuario && 
                u.Senha == user.Senha).FirstOrDefaultAsync();
            
            return userResult;
        }
    }
}