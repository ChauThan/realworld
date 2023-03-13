﻿namespace Conduit.API.Features.Users;

public class UserDTO
{
    public string UserName { get; set; } = string.Empty;
    
    public string Email { get; set; } = string.Empty;

    public string? Bio { get; set; }

    public string? Image { get; set; }

    public string Token { get; set; } = string.Empty;
}
