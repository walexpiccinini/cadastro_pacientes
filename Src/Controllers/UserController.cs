using cadastro_pacientes.Utils;
using cadastro_pacientes.DTOs;
using cadastro_pacientes.interfaces;
using cadastro_pacientes.Models;
using Microsoft.AspNetCore.Mvc;
using cadastro_pacientes.Services;
using Microsoft.AspNetCore.Authorization;

namespace cadastro_pacientes.Controllers
{
    [ApiController]
    [Route("clinica/v1/user")]

    public class UserController : ControllerBase 
    {
        private readonly ClinicaContext _context;

        private IServiceProvider _serviceProvider;

        public UserController(
                ClinicaContext context,
                IServiceProvider serviceProvider
            ){
            _context = context;
            _serviceProvider = serviceProvider;
        }

        [HttpGet("working")]
        [AllowAnonymous]
        public ActionResult working() {
            return Ok("Working");
        }

        /// <summary>
        /// Criar novo usuário
        /// </summary>
        /// <response code="201">tipo User</response>
        /// <response code="422">Email já utilizado</response>
        [HttpPost("create")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult> Create(
            [FromBody] UserDTO user
            )
            {
            var userDB = _serviceProvider.GetService<IUserDB>();
            bool exists = await userDB!.searchForUsuario(user.Usuario);

            if(exists){
                return new CustomHttpStatus(422, "Usuário já utilizado");
            }

            var newUser = new User(){
                Nome = user.Nome,
                Usuario = user.Usuario,
                Senha = Cripto.GerarHash(user.Senha),
                Role = user.Role
            };

            await userDB.createUser(newUser);

            return new CustomHttpStatus(201,newUser);
        }

        /// <summary>
        /// Fazer Login
        /// </summary>
        /// <response code="201">tipo User</response>
        /// <response code="422">Email já utilizado</response>
        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<ActionResult> Login(
            [FromBody] UserDTO user
            )
            {
            var userDB = _serviceProvider.GetService<IUserDB>();
            
            var userDto = new UserDTO(){
                Usuario = user.Usuario,
                Senha = Cripto.GerarHash(user.Senha)
            };

            var userResult = await userDB.validate(userDto);

            if(userResult == null){
                return NotFound(new {message = "Usuário ou senha inválidos"});
            }

            var token = TokenService.GenerateToken(userResult);

            userResult.Senha = "";

            var response = new {
                user = userResult,
                token = token
            };

            return new CustomHttpStatus(201,response);
        }
    }
}