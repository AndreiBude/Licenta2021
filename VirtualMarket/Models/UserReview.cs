using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace VirtualMarket.Models
{
    [Table("UserReviews")]
    public class UserReview
    {
        [Key]
        public int ReviewID { get; set; }
        public int ListingID { get; set; } 
        public int? UserID { get; set; }

        [Column(TypeName = "nvarchar(500)")]
        public string Text { get; set; }
        [Column(TypeName = "integer")]
        public int Rating { get; set; }
        public DateTime CreatedAt { get; set; }

        [ForeignKey("UserID")]
        public User Users { get; set; }
        [ForeignKey("ListingID")]
        public Listing Listings { get; set; }
    }
}
