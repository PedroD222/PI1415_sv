using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using RestSharp;
//using HtmlAgilityPack;
using RestSharp.Deserializers;

namespace wwonlineapi
{

    class Program
    {
        private static string BASE_URL = "http://api.worldweatheronline.com/";
        private static string NAME_REQUEST = "free/v2/past-weather.ashx";
        private static string key = "61a7c1d77101b83979c5fb4a299ef";
        private static string [] argsname = {"-local", "-startdate", "-enddate"};
       
        static void Main(string[] args)
        {
            string local, enddate, startdate;
            if (args.Length < 1)
            {
                Console.WriteLine("Falta Cidade");
                Console.ReadKey();
                return;
            }
            int ind = 0;
            local = extractParams(args[ind], ind++);
            if (local.Length == 0)
            {
                Console.ReadKey();
                return;
            }
            startdate = extractParams(args[ind], ind++);
            if (startdate.Length == 0)
                startdate = getActualDate();
            enddate = extractParams(args[ind], ind);
            if (enddate.Length == 0)
                enddate = getActualDate();
            
            RestClient client = new RestClient(BASE_URL);
            //List<Task> tasks = new List<Task>();
            
            JsonDeserializer jsdes = new JsonDeserializer();
            
                //Org org = new Org();
            RestRequest tempRequest = new RestRequest(NAME_REQUEST);
            tempRequest.AddParameter("key", key);
            tempRequest.AddParameter("date", startdate);
            tempRequest.AddParameter("enddate", enddate);
            tempRequest.AddParameter("q", local);
            tempRequest.AddParameter("format", "json");
            
            client.ExecuteAsync(tempRequest, response =>
            {
                if (response.ErrorMessage != null)
                {
                    Console.WriteLine(response.ErrorMessage);
                    Console.WriteLine(response);
                    return;
                }
                //this.HandleResponse(response);
            });
                
            
            //Console.WriteLine("Completed all tasks.");
            Console.Read();
        }

        private static string getActualDate()
        {
            string datePatt = @"yyyy/MM/dd tt";
            DateTime dispDt = DateTime.Now;
            return dispDt.ToString(datePatt);
        }

        private static string extractParams(string args, int i)
        {
            string varg = "";
            string[] aux = args.Split('=');
            if (aux.Length > 1)
                if (aux[0].Equals(argsname[i]))
                {
                    varg = aux[1];
                }
            return varg;
        }
    }
}
