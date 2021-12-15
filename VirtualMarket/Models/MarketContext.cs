using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace VirtualMarket.Models
{
    public class MarketContext:DbContext 
    {
        public MarketContext(DbContextOptions<MarketContext> options):base(options)
        {

        }
      
        public DbSet<User> Users { get; set; }
        public DbSet<Listing> Listings { get; set; }
        public DbSet<UserReview> Reviews { get; set; }
        public DbSet<Category> Categories { get; set; }
     
    }
}
