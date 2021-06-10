using System;
using System.Collections.Generic;
using Domain;
using Microsoft.AspNetCore.Http;

namespace Application.Posts
{
    public class PostCreate
    {
        public Guid Id { get; set; }
        public AppUser Author { get; set; }
        public string Caption { get; set; }
        public IFormFile Image { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public ICollection<Comment> Comments { get; set; } = new List<Comment>();
        public ICollection<Like> Likes { get; set; }
    }
}