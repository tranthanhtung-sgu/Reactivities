using Domain;
using FluentValidation;

namespace Application.Posts
{
    public class PostValidatorCreate : AbstractValidator<PostCreate>
    {
        public PostValidatorCreate()
        {
            RuleFor(m => m.Caption).NotEmpty().Unless(m => m.Image != null);
            RuleFor(m => m.Image).NotEmpty().Unless(m => !string.IsNullOrEmpty(m.Caption));
        }
    }
}