﻿using Conduit.API.Common.Exceptions;
using Conduit.API.Infrastructure;
using Conduit.API.Infrastructure.Auth;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Conduit.API.Features.Users;

public class UpdateCommandHandler : IRequestHandler<UpdateCommand, UserResponse>
{
    private readonly AppDbContext _appDbContext;
    private readonly IPasswordHasher _passwordHasher;
    private readonly UserResponseBuilder _responseBuilder;
    private readonly ICurrentUserAccessor _currentUserAccessor;

    public UpdateCommandHandler(
        AppDbContext appDbContext,
        IPasswordHasher passwordHasher,
        UserResponseBuilder responseBuilder,
        ICurrentUserAccessor currentUserAccessor)
    {
        _appDbContext = appDbContext;
        _passwordHasher = passwordHasher;
        _responseBuilder = responseBuilder;
        _currentUserAccessor = currentUserAccessor;
    }

    public async Task<UserResponse> Handle(UpdateCommand request, CancellationToken cancellationToken)
    {
        var user = await _appDbContext.Users.Where(u => u.Id == _currentUserAccessor.UserId).FirstOrDefaultAsync(cancellationToken);
        if(user is null)
        {
            throw new ResourceNotFoundException(nameof(User));
        }

        user.Username = request.Payload.User.Username ?? user.Username;
        user.Email = request.Payload.User.Email ?? user.Email;
        user.Bio = request.Payload.User.Bio ?? user.Bio;
        user.Image = request.Payload.User.Image ?? user.Image;

        if (!string.IsNullOrWhiteSpace(request.Payload.User.Password))
        {
            var salt = Guid.NewGuid().ToByteArray();
            user.Hash = await _passwordHasher.HashAsync(request.Payload.User.Password, salt, cancellationToken);
            user.Salt = salt;
        }

        await _appDbContext.SaveChangesAsync(cancellationToken);

        return await _responseBuilder.BuildAsync(user, cancellationToken);
    }
}