namespace Application.Interfaces
{
    public interface IUserAccessor
    {
        string GetUserId();
        string GetUserName();
        string GetUserEmail();
    }
}