using Microsoft.AspNetCore.Mvc;

namespace cadastro_pacientes.Utils {
    public class CustomHttpStatus : ObjectResult, IActionResult {
        public CustomHttpStatus(int statusCode, object message) : base(message) {
            StatusCode = statusCode;
        }
    }
}