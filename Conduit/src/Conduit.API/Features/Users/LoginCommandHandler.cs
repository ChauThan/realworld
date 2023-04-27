using AutoMapper;
using Conduit.API.Common.Exceptions;
using Conduit.API.Infrastructure;
using Conduit.API.Infrastructure.Auth;
using FluentValidation;
using FluentValidation.Results;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Conduit.API.Features.Users;

public class LoginCommandHandler : IRequestHandler<LoginCommand, UserResponse>
{
    private readonly AppDbContext _dbContext;
    private readonly IPasswordHasher _passwordHasher;
    private readonly UserResponseBuilder _responseBuilder;

    public LoginCommandHandler(AppDbContext dbContext,
        IPasswordHasher passwordHasher,
        UserResponseBuilder responseBuilder)
    {
        _dbContext = dbContext;
        _passwordHasher = passwordHasher;
        _responseBuilder = responseBuilder;
    }

    public async Task<UserResponse> Handle(LoginCommand request, CancellationToken cancellationToken)
    {
        var user = await _dbContext.Users.Where(u => u.Email == request.Payload.User.Email).SingleOrDefaultAsync(cancellationToken);
        if (user is null)
        {
            ThrowException("Email or password is invalid.");
        }

        var password = await _passwordHasher.HashAsync(request.Payload.User.Password, user.Salt, cancellationToken);
        if (!user.Hash.SequenceEqual(password))
        {
            ThrowException("Email or password is invalid.");
        }

        return  await _responseBuilder.BuildAsync(user, cancellationToken);
    }

    public void ThrowException(string message)
    {
        var faiture = new ValidationFailure("general", message);

        throw new ValidationException(new List<ValidationFailure>() { faiture });
    }
}

