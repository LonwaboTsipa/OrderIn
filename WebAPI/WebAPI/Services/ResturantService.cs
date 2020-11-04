using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using Newtonsoft.Json;
using WebAPI.Models;

namespace WebAPI.Services
{
    public class ResturantService
    {

        public ResturantService()
        {
                
        }

        public List<Resturant> GetAllResturants()
        {
            string path = Path.Combine(AppDomain.CurrentDomain.BaseDirectory + "App_Data\\SampleData.json");
            string json = File.ReadAllText(path);
            var list = JsonConvert.DeserializeObject<List<Resturant>>(json);

            return list;
        }
    }
}