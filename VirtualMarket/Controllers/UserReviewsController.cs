using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VirtualMarket.Models;

namespace VirtualMarket.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserReviewsController : ControllerBase
    {
        private readonly MarketContext _context;

        public UserReviewsController(MarketContext context)
        {
            _context = context;
        }

        // GET: api/UserReviews
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserReview>>> GetReviews()
        {
            return await _context.Reviews.ToListAsync();
        }

        // GET: api/UserReviews/5
        [HttpGet("{id}")]
        public async Task<ActionResult<UserReview>> GetUserReview(int id)
        {
            var userReview = await _context.Reviews.FindAsync(id);

            if (userReview == null)
            {
                return NotFound();
            }

            return userReview;
        }

        // PUT: api/UserReviews/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUserReview(int id, UserReview userReview)
        {
            if (id != userReview.ReviewID)
            {
                return BadRequest();
            }

            _context.Entry(userReview).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserReviewExists(id))
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

        // POST: api/UserReviews
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<UserReview>> PostUserReview(UserReview userReview)
        {
            _context.Reviews.Add(userReview);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUserReview", new { id = userReview.ReviewID }, userReview);
        }

        // DELETE: api/UserReviews/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUserReview(int id)
        {
            var userReview = await _context.Reviews.FindAsync(id);
            if (userReview == null)
            {
                return NotFound();
            }

            _context.Reviews.Remove(userReview);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UserReviewExists(int id)
        {
            return _context.Reviews.Any(e => e.ReviewID == id);
        }
    }
}
