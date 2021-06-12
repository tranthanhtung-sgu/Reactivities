using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Likes
{
    public class List
    {
        public class Query : IRequest<Result<List<LikeDto>>>
        {
            public Guid PostId { get; set; }
        }
        public class Handler : IRequestHandler<Query, Result<List<LikeDto>>>
        {
            private readonly IMapper _mapper;
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<List<LikeDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var likes = await _context.Likes
                    .Include(x => x.Post).ThenInclude(x => x.Author)
                    .Include(x => x.Author).ThenInclude(y => y.Photos)
                    .Where(x => x.Post.Id == request.PostId)
                    .ProjectTo<LikeDto>(_mapper.ConfigurationProvider, new { currentUsername = _userAccessor.GetUserName() })
                    .ToListAsync();
                return Result<List<LikeDto>>.Success(likes);
            }
        }
    }
}
