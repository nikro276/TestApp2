using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace TestApp2
{
    public class Product
    {
        [Required]
        public Guid Id { get; set; }
        public string Name { get; set; }
        public Guid? SourceId { get; set; }
        public Guid? CategoryId { get; set; }
        public DateTime? ModifiedOn { get; set; }
        public string Comment { get; set; }

        public Source Source { get; set; }
        public Category Category { get; set; }
    }
}
