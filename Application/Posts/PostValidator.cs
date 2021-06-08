using Domain;
using FluentValidation;

namespace Application.Posts
{
    public class PostValidator : AbstractValidator<Post>
    {
        public PostValidator()
        {
            RuleFor(m => m.Caption).NotEmpty().Unless(m => !string.IsNullOrEmpty(m.Image));
            RuleFor(m => m.Image).NotEmpty().Unless(m => !string.IsNullOrEmpty(m.Caption));
        }
    }
}