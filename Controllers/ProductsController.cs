using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TestApp2.Controllers
{
    public class ProductsController : Controller
    {
        private readonly ApplicationContext _context;

        public ProductsController(ApplicationContext context)
        {
            _context = context;
        }

        public List<Product> GetProducts([FromBody] GetProductsResponse response)
        {
            var products = _context.Products.Include(x => x.Category).Include(x => x.Source) as IQueryable<Product>;
            if (response.CategoryFilter != null)
                products = products.Where(x => x.CategoryId == response.CategoryFilter);
            if (response.DateFilter != null)
            {
                var filterLocalTime = ((DateTime)response.DateFilter).ToLocalTime();
                products = products.Where(x => x.ModifiedOn != null && ((DateTime)x.ModifiedOn).Date == filterLocalTime.Date);
            }
            return products.ToList();
        }

        public void Insert([FromBody] Product product)
        {
            if (product.Id == Guid.Empty)
                product.Id = Guid.NewGuid();
            _context.Products.Add(product);
            _context.SaveChanges();
        }

        public void Update([FromBody] Product product)
        {
            _context.Products.Update(product);
            _context.SaveChanges();
        }

        public void Delete([FromBody] Guid id)
        {
            _context.Products.Remove(_context.Products.Find(id));
            _context.SaveChanges();
        }
    }

    public class GetProductsResponse
    {
        public DateTime? DateFilter { get; set; }
        public Guid? CategoryFilter { get; set; }
    }
}
