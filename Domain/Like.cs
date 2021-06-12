using System;

namespace Domain
{
    public class Like
    {
        public Guid Id { get; set; }
        public AppUser Author { get; set; }
        public Post Post { get; set; }
        public Reacts reacts { get; set; }
        public enum Reacts
        {
            Like,
            Love,
            Haha
        }
    }
}