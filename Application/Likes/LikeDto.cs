namespace Application.Likes
{
    public class LikeDto
    {
        public string Username { get; set; }
        public string DisplayName { get; set; }
        public string Image { get; set; }
        public string React { get; set; }
        public bool IsLike { get; set; }
    }
}