using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Posts
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>>
        {
            public PostCreate Post { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Post).SetValidator(new PostValidatorCreate());
            }
        }
        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            private readonly IMapper _mapper;
            private readonly IPhotoAccessor _photoAccessor;
            public Handler(DataContext context, IUserAccessor userAccessor, IMapper mapper, IPhotoAccessor photoAccessor)
            {
                _photoAccessor = photoAccessor;
                _mapper = mapper;
                _userAccessor = userAccessor;
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _context.Users
                        .Include(u => u.Photos)
                        .FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUserName());
                request.Post.Author = user;
                var temp = new Post();
                if (request.Post.Image != null)
                {
                    var photoUploadResult = await _photoAccessor.AddPhotoAsync(request.Post.Image);

                    var photo = new Photo
                    {
                        Url = photoUploadResult.Url,
                        Id = photoUploadResult.PublicId,
                        IsMain = false
                    };
                    temp = new Post
                    {
                        Id = request.Post.Id,
                        Author = user,
                        Caption = request.Post.Caption,
                        Image = photo.Url
                    };
                    user.Photos.Add(photo);
                }
                else
                {

                    temp = new Post
                    {
                        Id = request.Post.Id,
                        Author = user,
                        Caption = request.Post.Caption,
                    };
                }


                _context.Posts.Add(temp);
                var result = await _context.SaveChangesAsync() > 0;
                if (!result) return Result<Unit>.Failure("Failed to create post");
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}