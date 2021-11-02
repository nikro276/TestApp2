using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace TestApp2
{
    public class Category
    {
        [Required]
        public Guid Id { get; set; }
        public string Name { get; set; }
    }
}
