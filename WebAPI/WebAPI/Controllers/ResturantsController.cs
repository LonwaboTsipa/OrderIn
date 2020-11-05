using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using Newtonsoft.Json;
using WebAPI.Models;
using WebAPI.Services;

namespace WebAPI.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class ResturantsController : ApiController
    {
        private ResturantService resturantService = new ResturantService();

        public ResturantsController()
        {

        }
        // GET: api/Resturants
        public IEnumerable<Resturant> GetResturantsData()
        {

            var list = resturantService.GetAllResturants();
            return list;
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
