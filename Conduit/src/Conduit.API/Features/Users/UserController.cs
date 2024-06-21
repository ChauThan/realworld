using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Conduit.API.Features.Users;
[Route("api/[controller]")]
[ApiController]
[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
public class UserController : ControllerBase
{
    private readonly IMediator _mediator;

    public UserController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet]
    public async Task<IActionResult> Get(CancellationToken cancellationToken)
    {
        var result = await _mediator.Send(new GetQuery(), cancellationToken);

        return Ok(result);
    }

    [HttpPut]
    public async Task<IActionResult> Update(UpdatePayload payload, CancellationToken cancellationToken)
    {
        var result = await _mediator.Send(new UpdateCommand(payload), cancellationToken);
        return Ok(result);
    }
}
