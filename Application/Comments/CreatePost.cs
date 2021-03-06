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

namespace Application.Comments
{
    public class CreatePost
    {
        public class Command : IRequest<Result<CommentDto>>
        {
            public string Body { get; set; }
            public Guid PostId { get; set; }
        }
        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Body).NotEmpty();
            }
        }
        public class Handler : IRequestHandler<Command, Result<CommentDto>>
        {
            private readonly IUserAccessor _userAccessor;
            private readonly IMapper _mapper;
            private readonly DataContext _context;
            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
            {
                _context = context;
                _mapper = mapper;
                _userAccessor = userAccessor;
            }

            public async Task<Result<CommentDto>> Handle(Command request, CancellationToken cancellationToken)
            {
                var post = await _context.Posts.FindAsync(request.PostId);
                if (post == null)
                {
                    return null;
                }
                var user = await _context.Users
                        .Include(u => u.Photos)
                        .FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUserName());
                var comment = new Comment
                {
                    Author = user,
                    Post = post,
                    body = request.Body
                };

                post.Comments.Add(comment);

                var result = await _context.SaveChangesAsync() > 0;

                if (result)
                {
                    return Result<CommentDto>.Success(_mapper.Map<CommentDto>(comment));
                }

                return Result<CommentDto>.Failure("C?? l???i x???y ra khi b??nh lu???n");
            }
        }
    }
}