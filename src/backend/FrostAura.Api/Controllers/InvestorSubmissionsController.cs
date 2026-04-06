using FrostAura.Application.Contracts;
using FrostAura.Application.Services;
using Microsoft.AspNetCore.Mvc;

namespace FrostAura.Api.Controllers;

[ApiController]
[Route("api/investors/submissions")]
public class InvestorSubmissionsController : ControllerBase
{
    private readonly InvestorSubmissionService _service;

    public InvestorSubmissionsController(InvestorSubmissionService service)
    {
        _service = service;
    }

    [HttpPost]
    [ProducesResponseType(typeof(SubmissionReceipt), StatusCodes.Status201Created)]
    public async Task<ActionResult<SubmissionReceipt>> Submit(
        [FromBody] InvestorSubmissionRequest request,
        CancellationToken cancellationToken)
    {
        var receipt = await _service.SubmitAsync(request, cancellationToken);
        return Created($"/api/investors/submissions/{receipt.ReferenceId}", receipt);
    }
}
