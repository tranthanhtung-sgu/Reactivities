using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using static Domain.Like;

namespace Application.Likes
{
    public class LikeToggle
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid PostId { get; set; }
        }
        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly IMapper _mapper;
            private readonly IUserAccessor _userAccessor;
            private readonly DataContext _context;
            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
            {
                _context = context;
                _userAccessor = userAccessor;
                _mapper = mapper;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _context.Users
                    .Include(x => x.Photos)
                    .FirstOrDefaultAsync(x => x.Id == _userAccessor.GetUserId());
                if (user == null)
                {
                    return null;
                }
                var post = await _context.Posts
                        .Include(x => x.Author)
                        .Include(x => x.Likes)
                        .FirstOrDefaultAsync(x => x.Id == request.PostId);
                var likeInPost = post.Likes.FirstOrDefault(x => x.Author.Id == _userAccessor.GetUserId());
                if (likeInPost != null)
                {
                    post.Likes.Remove(likeInPost);
                }
                else
                {
                    var like = new Like
                    {
                        Author = user,
                        reacts = Reacts.Like,
                        Post = post
                    };
                    post.Likes.Add(like);
                }
                var result = await _context.SaveChangesAsync() > 0;
                if (result) return Result<Unit>.Success(Unit.Value);
                return Result<Unit>.Failure("Thất bại trong quá trình like");
            }
        }
    }
}