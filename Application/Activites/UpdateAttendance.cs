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

namespace Application.Activites
{
    public class UpdateAttendance
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
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

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await _context.Activities
                    .Include(x => x.Attendees).ThenInclude(y => y.AppUser)
                    .SingleOrDefaultAsync(x => x.Id == request.Id);

                if (activity == null) return null;

                var user = await _context.Users
                    .FirstOrDefaultAsync(u => u.UserName == _userAccessor.GetUserName());

                if (user == null) return null;

                var hostUsername = activity.Attendees
                    .FirstOrDefault(a => a.IsHost)?.AppUser?.UserName;

                var attendance = activity.Attendees
                    .FirstOrDefault(a => a.AppUser.UserName == user.UserName);
                // Có tham gia         &&     Là người tổ chức      
                if (attendance != null && hostUsername == user.UserName)
                    activity.IsCancelled = !activity.IsCancelled;

                // Có tham gia         &&     Không là người tổ chức    
                if (attendance != null && hostUsername != user.UserName)
                    activity.Attendees.Remove(attendance);

                // Chưa tham gia
                if (attendance == null)
                {
                    attendance = new ActivityAttendee 
                    {
                        Activity = activity,
                        AppUser = user,
                        IsHost = false
                    };
                    activity.Attendees.Add(attendance);
                }
                
                var result = await _context.SaveChangesAsync() > 0;

                return result ? Result<Unit>.Success(Unit.Value) 
                        : Result<Unit>.Failure("Problems updating attendance");
            }
        }
    }
}