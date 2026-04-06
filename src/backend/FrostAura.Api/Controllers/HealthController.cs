using Microsoft.AspNetCore.Mvc;

namespace FrostAura.Api.Controllers;

[ApiController]
[Route("health")]
public class HealthController : ControllerBase
{
    [HttpGet]
    public IActionResult Get() =>
        Ok(new
        {
            status = "ok",
            service = "FrostAura.Api",
            timestamp = DateTime.UtcNow,
        });
}
