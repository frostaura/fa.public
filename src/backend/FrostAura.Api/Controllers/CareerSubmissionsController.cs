using FrostAura.Application.Contracts;
using FrostAura.Application.Services;
using Microsoft.AspNetCore.Mvc;

namespace FrostAura.Api.Controllers;

[ApiController]
[Route("api/careers/submissions")]
public class CareerSubmissionsController : ControllerBase
{
    private readonly CareerSubmissionService _service;

    public CareerSubmissionsController(CareerSubmissionService service)
    {
        _service = service;
    }

    [HttpPost]
    [ProducesResponseType(typeof(SubmissionReceipt), StatusCodes.Status201Created)]
    public async Task<ActionResult<SubmissionReceipt>> Submit(
        [FromBody] CareerSubmissionRequest request,
        CancellationToken cancellationToken)
    {
        var receipt = await _service.SubmitAsync(request, cancellationToken);
        return Created($"/api/careers/submissions/{receipt.ReferenceId}", receipt);
    }
}
