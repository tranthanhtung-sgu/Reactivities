using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Infrastructure.Security
{
    public class IsHostPostRequirement : IAuthorizationRequirement
    {
    }
    public class IsHostPostRequirementHandler : AuthorizationHandler<IsHostPostRequirement>
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly DataContext _dbContext;
        public IsHostPostRequirementHandler(DataContext dbContext,
            IHttpContextAccessor httpContextAccessor)
        {
            _dbContext = dbContext;
            _httpContextAccessor = httpContextAccessor;
        }

        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, IsHostPostRequirement requirement)
        {
            var username = context.User.FindFirstValue(ClaimTypes.Name);
            if (username == null) return Task.CompletedTask;

            var postId = Guid.Parse(_httpContextAccessor.HttpContext?.Request.RouteValues
                .SingleOrDefault(x => x.Key == "id").Value?.ToString());

            var post = _dbContext.Posts
                .Include(x => x.Author)
                .AsNoTracking()
                .SingleOrDefaultAsync(x => x.Id == postId)
                .Result;
            if (post.Author.UserName != username) return Task.CompletedTask;

            if (post.Author.UserName == username) context.Succeed(requirement);

            return Task.CompletedTask;
        }
    }
}