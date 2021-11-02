using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TestApp2.Controllers
{
    public class SourcesController : Controller
    {
        private readonly ApplicationContext _context;

        public SourcesController(ApplicationContext context)
        {
            _context = context;
        }

        public List<Source> GetSources()
        {
            return _context.Sources.ToList();
        }
    }
}
