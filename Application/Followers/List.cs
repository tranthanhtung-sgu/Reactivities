using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using Application.Profiles;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Profile = Application.Profiles.Profile;

namespace Application.Followers
{
    public class List
    {
        public class Query : IRequest<Result<List<Profile>>>
        {
            public string Username { get; set; }
            public string Predicate { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<List<Profile>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<List<Profile>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var profiles = new List<Profile>();
                switch (request.Predicate)
                {
                    case "followers":
                        // Lấy ra danh sách người đang theo dõi user A (Username)
                        profiles = await _context.UserFollowings
                            .Where(x => x.Target.UserName == request.Username)
                            .Select(x => x.Observer)
                            .ProjectTo<Profile>(_mapper.ConfigurationProvider,
                                new { currentUsername = _userAccessor.GetUserName() })
                            .ToListAsync();
                        break;
                    case "following":
                        //Lấy ra danh sách người User A (Username) đang theo dõi
                        profiles = await _context.UserFollowings
                            .Where(x => x.Observer.UserName == request.Username)
                            .Select(x => x.Target)
                            .ProjectTo<Profile>(_mapper.ConfigurationProvider,
                                new { currentUsername = _userAccessor.GetUserName() })
                            .ToListAsync();
                        break;
                }
                return Result<List<Profile>>.Success(profiles);
            }
        }
    }
}