using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace WebAPI.Controllers
{
    public class ResturantsController : ApiController
    {
        // GET: api/Resturants
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/Resturants/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Resturants
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/Resturants/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Resturants/5
        public void Delete(int id)
        {
        }
    }
}
