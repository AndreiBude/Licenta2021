using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VirtualMarket.DTO;
using VirtualMarket.Models;

namespace VirtualMarket.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly MarketContext _context;
        private readonly IWebHostEnvironment _hostEnvironment;

        public UsersController(MarketContext context, IWebHostEnvironment hostEnvironment)
        {
            _context = context;
            this._hostEnvironment = hostEnvironment;
        }

        // GET: api/Users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            
            return await _context.Users
                .Select(x => new User()
                {
                    UserID = x.UserID,
                    FirstName = x.FirstName,
                    LastName = x.LastName,
                    Email = x.Email,
                    PasswordHash=x.PasswordHash,
                    PasswordSalt = x.PasswordSalt,
                    ImagePath = x.ImagePath,
                    CreatedAt = x.CreatedAt,
                    UpdatedAt = x.UpdatedAt,
                    ImageSource = String.Format("{0}://{1}{2}/images/{3}", Request.Scheme, Request.Host, Request.PathBase, x.ImagePath)
                })
                .ToListAsync();
        }

        // GET: api/Users/5
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            var user = await _context.Users
                 .Select(x => new User()
                 {
                     UserID = x.UserID,
                     FirstName = x.FirstName,
                     LastName = x.LastName,
                     Email = x.Email,
                     PasswordHash = x.PasswordHash,
                     PasswordSalt = x.PasswordSalt,
                     ImagePath = x.ImagePath,
                     CreatedAt = x.CreatedAt,
                     UpdatedAt = x.UpdatedAt,
                     ImageSource = String.Format("{0}://{1}{2}/images/{3}", Request.Scheme, Request.Host, Request.PathBase, x.ImagePath)
                 })
                .FirstOrDefaultAsync(i => i.UserID == id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        // PUT: api/Users/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<ActionResult<User>> PutUser(int id,[FromForm] User user)
        {
            if (id != user.UserID)
            {
                return BadRequest();
            }

            if (user.ImageFile != null)
            {
                DeleteImage(user.ImagePath);
                user.ImagePath = await SaveImage(user.ImageFile);
            }

            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            var resutl = await _context.Users.FirstOrDefaultAsync(x => x.UserID == id);
            return resutl;
        }

        // POST: api/Users
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<User>> PostUser([FromForm]Register user)
        {
            if (await EmailExistis(user.Email)) return BadRequest("Email already existing");
            if (!Regex.IsMatch(user.Password, @"[~`!@#$%\^\&\*\(\)\-_\+=\[\{\]\}\|\\;:'\""<\,>\.\?\/£]", RegexOptions.ECMAScript) ||!(Regex.IsMatch(user.Password, @"[A-Z]", RegexOptions.ECMAScript) && Regex.IsMatch(user.Password, @"[a-z]", RegexOptions.ECMAScript)) || !Regex.IsMatch(user.Password, @"[\d]", RegexOptions.ECMAScript))
            {
                return BadRequest("Password doesn't match requirements");
            }
            using var hmac = new HMACSHA512();
            var newUser = new User
            {
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
                ImagePath = user.ImagePath,
                ImageFile = user.ImageFile,
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(user.Password)),
                PasswordSalt = hmac.Key,
                CreatedAt = user.CreatedAt,
                UpdatedAt = user.UpdatedAt
            };
            if (newUser.ImagePath!="default.jpg")
                newUser.ImagePath = await SaveImage(newUser.ImageFile);
            _context.Users.Add(newUser);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUser", new { id = newUser.UserID }, newUser);
        }

        private async Task<bool> EmailExistis(string email)
        {
            return await _context.Users.AnyAsync(x => x.Email.ToLower() == email.ToLower());
        }

        [HttpPost("Login")]
        public async Task<ActionResult<User>> Login(LoginDto loginDto)
        {
            var user = await _context.Users
                .SingleOrDefaultAsync(x => x.Email == loginDto.Email);

            if (user == null) return Unauthorized("Email not existing");

            using var hmac = new HMACSHA512(user.PasswordSalt);

            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));
            for(int i = 0; i < computedHash.Length; ++i)
            {
                if (computedHash[i] != user.PasswordHash[i]) return Unauthorized("Invalid Password");
            }
            return user;
        }

        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }
            if (user.ImagePath != "default.jpg")
            {
                DeleteImage(user.ImagePath);
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("Photo/{id}")]
        public async Task<ActionResult<User>> DeletePhoto(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }
            if (user.ImagePath != "default.jpg") { 
            DeleteImage(user.ImagePath);
            }
            user.ImagePath = "default.jpg";
            await _context.SaveChangesAsync();

            var resutl = await _context.Users.FirstOrDefaultAsync(x => x.UserID == id);
            return resutl;
        }

        private bool UserExists(int id)
        {
            return _context.Users.Any(e => e.UserID == id);
        }

        [NonAction]
        public async Task<string> SaveImage(IFormFile imageFile)
        {
            string imageName = new String(Path.GetFileNameWithoutExtension(imageFile.FileName).Take(10).ToArray()).Replace(' ', '-');
            imageName = imageName + DateTime.Now.ToString("yymmssffff") + Path.GetExtension(imageFile.FileName);
            var imagePath = Path.Combine(_hostEnvironment.ContentRootPath, "images", imageName);
            using (var fileStream = new FileStream(imagePath, FileMode.Create))
            {
                await imageFile.CopyToAsync(fileStream);
            }
            return imageName;
        }
        [NonAction]
        public void DeleteImage(string imageName)
        {
            var imagePath = Path.Combine(_hostEnvironment.ContentRootPath, "images", imageName);
            if (System.IO.File.Exists(imagePath))
            {
                System.IO.File.Delete(imagePath);
            }
        }
    }
}
