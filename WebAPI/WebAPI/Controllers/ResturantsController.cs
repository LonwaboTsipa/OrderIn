using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Newtonsoft.Json;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    public class ResturantsController : ApiController
    {
        // GET: api/Resturants
        public IEnumerable<Resturant> GetResturantsData()
        {
            string path = Path.Combine(AppDomain.CurrentDomain.BaseDirectory + "App_Data\\SampleData.json");
            string json = File.ReadAllText(path);
            var list = JsonConvert.DeserializeObject<List<Resturant>>(json);
            
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
