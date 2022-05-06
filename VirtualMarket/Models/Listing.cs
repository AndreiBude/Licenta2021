using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace VirtualMarket.Models
{
    [Table("Listings")]
    public class Listing
    {
        [Key]
        public int ListingID { get; set; }
        public int UserID { get; set; }
        
        [Column(TypeName = "nvarchar(100)")]
        public string Title { get; set; }
        [Column(TypeName = "real")]
        public float Price { get; set; }
        public int CategoryID { get; set; }
        
        [Column(TypeName = "nvarchar(500)")]
        public string Description { get; set; }
        [Column(TypeName = "nvarchar(200)")]
        public string ImagePath { get; set; } 
        [NotMapped]
        public IFormFile ImageFile { get; set; }
        [NotMapped]
        public string ImageSource  { get; set; }
        public DateTime PublishedAt { get; set; }
        [ForeignKey("UserID")]
        public User Users { get; set; }
        [ForeignKey("CategoryID")]
        public Category Categories { get; set; }

        public ICollection<UserReview> Reviews { get; set; }
    }
}
