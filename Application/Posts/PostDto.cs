using System;
using System.Collections.Generic;
using Domain;

namespace Application.Posts
{
    public class PostDto
    {
        public Guid Id { get; set; }
        public string Username { get; set; }
        public string DisplayName { get; set; }
        public string Caption { get; set; }
        public string Image { get; set; }
        public DateTime CreatedAt { get; set; }
        public ICollection<Comment> Comments { get; set; }
        public ICollection<Like> Likes { get; set; }

    }
}