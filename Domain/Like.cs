using System;

namespace Domain
{
    public class Like
    {
        public Guid Id { get; set; }
        public AppUser Author { get; set; }
        enum Reacts
        {
            Like,
            Love,
            Haha
        }
    }
}