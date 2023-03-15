﻿using FluentValidation;

namespace Conduit.API.Features.Users;

public class LoginCommandValidator : AbstractValidator<LoginCommand>
{
    public LoginCommandValidator()
    {
        RuleFor(p => p.Payload.User.Email).NotEmpty();
        RuleFor(p => p.Payload.User.Password).NotEmpty();
    }
}
