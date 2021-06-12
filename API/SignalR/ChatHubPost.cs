using System;
using System.Threading.Tasks;
using Application.Comments;
using Application.Likes;
using MediatR;
using Microsoft.AspNetCore.SignalR;
using List = Application.Likes.List;

namespace API.SignalR
{
    public class ChatHubPost : Hub
    {
        private readonly IMediator _mediator;
        public ChatHubPost(IMediator mediator)
        {
            _mediator = mediator;
        }
        public async Task SendCommentPost(CreatePost.Command command)
        {
            var comment = await _mediator.Send(command);

            await Clients.Group(command.PostId.ToString())
                .SendAsync("ReciveCommentPost", comment.Value);
        }
        public async Task SendLikePost(LikeToggle.Command command)
        {
            var comment = await _mediator.Send(command);

            await Clients.Group(command.PostId.ToString())
                .SendAsync("ReciveLikePost", comment.Value);
        }

        public override async Task OnConnectedAsync()
        {
            var httpContext = Context.GetHttpContext();
            var postId = httpContext.Request.Query["postId"];
            await Groups.AddToGroupAsync(Context.ConnectionId, postId);

            var result = await _mediator.Send(new ListPost.Query { PostId = Guid.Parse(postId) });
            await Clients.Caller.SendAsync("LoadCommentsPost", result.Value);

            var likes = await _mediator.Send(new List.Query { PostId = Guid.Parse(postId) });
            await Clients.Caller.SendAsync("LoadLikesPost", likes.Value);
        }
    }
}