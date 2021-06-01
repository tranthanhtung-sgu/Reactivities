using System.Threading.Tasks;
using Application.Photos;
using Microsoft.AspNetCore.Http;

namespace Application.Interfaces
{
    public interface IPhotoAccessor
    {
        Task<PhotoUploadResult> AddPhotoAsync(IFormFile fromFile);
        Task<string> DeletePhotoAsync(string publicId);
    }
}