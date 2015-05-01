using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using RestSharp;
using RestSharp.Deserializers;

namespace WWonlineapi
{

    class Program
    {
        private static string BASE_URL = "http://api.worldweatheronline.com/";
        private static string NAME_REQUEST = "free/v2/past-weather.ashx";
        private static string key = "61a7c1d77101b83979c5fb4a299ef";
        private static string [] argsname = {"-local", "-startdate", "-enddate"};

        private static List<Weather> weatherlist;
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
            RestRequest tempRequest;
            IRestResponse<RootObject> resp;
            //JsonDeserializer jsdes = new JsonDeserializer();
            int nrequests = getNumberRequest(startdate, enddate);
            //nrequests = 1;
            for (int i = 0; i < nrequests; i++)
            {
                tempRequest = getWeatherResp(local, startdate, enddate);
                resp = client.Execute<RootObject>(tempRequest);
                if (weatherlist == null)
                    weatherlist = resp.Data.data.weather;
                else
                    weatherlist.Concat(resp.Data.data.weather);
            }
            
            HistogrameTemps htemps = new HistogrameTemps(weatherlist);

            Console.WriteLine("Local :"+ local);
            Console.WriteLine("Start Date :" + startdate);
            Console.WriteLine("End Date :" + enddate);
            //htemps.drawHistogrs();
             /*
            RootObject r = null;
            client.ExecuteAsync(tempRequest, response =>
            {
                r = jsdes.Deserialize<RootObject>(response);
                if (response.ErrorMessage != null)
                {
                    Console.WriteLine(response.ErrorMessage);
                    Console.WriteLine(response);
                    return;
                }
                //this.HandleResponse(response);
            });
            while (r == null);*/

            //Console.WriteLine("Completed all tasks.");
            Console.WriteLine("Press and key to exit...");
            Console.Read();
        }

        private static int getNumberRequest(string startdate, string enddate)
        {
            DateTime init = Convert.ToDateTime(startdate);
            DateTime final = Convert.ToDateTime(enddate);
            TimeSpan count = final.Subtract(init);
            return 0;
        }

        private static RestRequest getWeatherResp(string local, string startdate, string enddate)
        {
            RestRequest tempRequest = new RestRequest(NAME_REQUEST, Method.GET);
            tempRequest.AddParameter("key", key);
            tempRequest.AddParameter("date", startdate);
            tempRequest.AddParameter("enddate", enddate);
            tempRequest.AddParameter("q", local);
            tempRequest.AddParameter("format", "json");
            return tempRequest;
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
