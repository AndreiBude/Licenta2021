using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VirtualMarket.Models;
using System.Web;
using System.IO;
using Microsoft.AspNetCore.Hosting;

namespace VirtualMarket.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ListingsController : ControllerBase
    {
        private readonly MarketContext _context;
        private readonly IWebHostEnvironment _hostEnvironment;

        public ListingsController(MarketContext context, IWebHostEnvironment hostEnvironment)
        {
            _context = context;
            this._hostEnvironment = hostEnvironment;
        }

        // GET: api/Listings
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Listing>>> GetListings()
        {
            return await _context.Listings
                .Select(x => new Listing()
                {
                    ListingID = x.ListingID,
                    UserID = x.UserID,
                    Title = x.Title,
                    Price = x.Price,
                    CategoryID = x.CategoryID,
                    Description = x.Description,
                    ImagePath = x.ImagePath,
                    PublishedAt = x.PublishedAt,
                    ImageSource = String.Format("{0}://{1}{2}/images/{3}", Request.Scheme, Request.Host, Request.PathBase, x.ImagePath)
                })
                .ToListAsync();
        }

        // GET: api/Listings/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Listing>> GetListing(int id)
        {
            var listing = await _context.Listings
                .Select(x => new Listing()
                {
                    ListingID = x.ListingID,
                    UserID = x.UserID,
                    Title = x.Title,
                    Price = x.Price,
                    CategoryID = x.CategoryID,
                    Description = x.Description,
                    ImagePath = x.ImagePath,
                    PublishedAt = x.PublishedAt,
                    ImageSource = String.Format("{0}://{1}{2}/images/{3}", Request.Scheme, Request.Host, Request.PathBase, x.ImagePath)
                })
                .FirstOrDefaultAsync(i => i.ListingID == id);
             if (listing == null)
             {
                 return NotFound();
             }

             return listing;
        }

        // GET: api/Listings/User/5
        [HttpGet("User/{id}")]
        public async Task<ActionResult<IEnumerable<Listing>>> GetListingOfUser(int id)
        {
            var listing = await  _context.Listings
                .Select(x => new Listing()
                {
                    ListingID = x.ListingID,
                    UserID = x.UserID,
                    Title = x.Title,
                    Price = x.Price,
                    CategoryID = x.CategoryID,
                    Description = x.Description,
                    ImagePath = x.ImagePath,
                    PublishedAt = x.PublishedAt,
                    ImageSource = String.Format("{0}://{1}{2}/images/{3}", Request.Scheme, Request.Host, Request.PathBase, x.ImagePath)
                })
                .Where(l => l.UserID == id)
                .ToListAsync();
            return listing;
        }

        // GET: api/Listings/Category/5
        [HttpGet("Category/{id}")]
        public async Task<ActionResult<IEnumerable<Listing>>> GetListingByCategory(int id)
        {
            var listing = await _context.Listings
                .Where(l => l.CategoryID == id)
                .Select(x => new Listing()
                {
                    ListingID = x.ListingID,
                    UserID = x.UserID,
                    Title = x.Title,
                    Price = x.Price,
                    CategoryID = x.CategoryID,
                    Description = x.Description,
                    ImagePath = x.ImagePath,
                    PublishedAt = x.PublishedAt,
                    ImageSource = String.Format("{0}://{1}{2}/images/{3}", Request.Scheme, Request.Host, Request.PathBase, x.ImagePath)
                })
                .ToListAsync();
            return listing;
        }

        //GET:api/Listings/Search/key
        [HttpGet("Search/{key}")]
        public async Task<ActionResult<IEnumerable<Listing>>> GetListingByKey(string key)
        {
            var listing = await _context.Listings
                .Where(x => x.Title.Contains(key))
                .Select(x => new Listing()
                {
                    ListingID = x.ListingID,
                    UserID = x.UserID,
                    Title = x.Title,
                    Price = x.Price,
                    CategoryID = x.CategoryID,
                    Description = x.Description,
                    ImagePath = x.ImagePath,
                    PublishedAt = x.PublishedAt,
                    ImageSource = String.Format("{0}://{1}{2}/images/{3}", Request.Scheme, Request.Host, Request.PathBase, x.ImagePath)
                })
                .ToListAsync();
            return listing;
        }
        // PUT: api/Listings/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutListing(int id, Listing listing)
        {
            if (id != listing.ListingID)
            {
                return BadRequest();
            }

            _context.Entry(listing).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ListingExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Listings
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Listing>> PostListing([FromForm] Listing listing)
        {
            listing.ImagePath = await SaveImage(listing.ImageFile);
             _context.Listings.Add(listing);
            await _context.SaveChangesAsync();

            return StatusCode(201);
        }


        // DELETE: api/Listings/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteListing(int id)
        {
            var listing = await _context.Listings.FindAsync(id);
            if (listing == null)
            {
                return NotFound();
            }

            DeleteImage(listing.ImagePath);
            _context.Listings.Remove(listing);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ListingExists(int id)
        {
            return _context.Listings.Any(e => e.ListingID == id);
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
