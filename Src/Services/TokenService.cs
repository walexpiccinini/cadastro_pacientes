using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using cadastro_pacientes.Models;
using cadastro_pacientes.Settings;
using Microsoft.IdentityModel.Tokens;

namespace cadastro_pacientes.Services{
    public static class TokenService{
        public static string GenerateToken(User user){

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(Config.Secret);

            var tokenDescriptor = new SecurityTokenDescriptor{
                Subject = new ClaimsIdentity(new Claim[]
                    {
                        new Claim(ClaimTypes.Name, user.Usuario.ToString()),
                        new Claim(ClaimTypes.Role, user.Role.ToString())
                    }),
                    Expires = DateTime.UtcNow.AddHours(8),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

    }
}