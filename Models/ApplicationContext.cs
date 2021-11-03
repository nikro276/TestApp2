using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TestApp2
{
    public class ApplicationContext : DbContext
    {
        public int SourcesCount { get; set; } = 2;
        public int CategoriesCount { get; set; } = 3;
        public DbSet<Product> Products { get; set; }
        public DbSet<Source> Sources { get; set; }
        public DbSet<Category> Categories { get; set; }

        public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options) {}

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Product>().ToTable("Product");
            modelBuilder.Entity<Category>().ToTable("Category");
            modelBuilder.Entity<Source>().ToTable("Source");
        }

        public void Initialize()
        {
            if (Products.Any())
                return;
            Source[] sources = new Source[SourcesCount];
            Category[] categories = new Category[CategoriesCount];
            for (int i = 0; i < 2; i++)
            {
                sources[i] = new Source()
                {
                    Id = Guid.NewGuid(),
                    Name = "source" + (i + 1)
                };
            }
            Sources.AddRange(sources);
            for (int i = 0; i < 3; i++)
            {
                categories[i] = new Category()
                {
                    Id = Guid.NewGuid(),
                    Name = "category" + (i + 1)
                };
            }
            Categories.AddRange(categories);
            Product product;
            Random random = new Random();
            for (int i = 0; i < 10; i++)
            {
                product = new Product()
                {
                    Id = Guid.NewGuid(),
                    Name = "product" + (i + 1),
                    Source = sources[random.Next(0, SourcesCount)],
                    Category = categories[random.Next(0, CategoriesCount)],
                    ModifiedOn = new DateTime(random.Next(2020, 2022), random.Next(1, 13), random.Next(1, 30)),
                    Comment = ""
                };
                Products.Add(product);
            }
            SaveChanges();
        }
    }
}
