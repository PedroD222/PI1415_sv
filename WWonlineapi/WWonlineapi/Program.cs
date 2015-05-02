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
                Console.WriteLine("Falta o local.");
                Console.WriteLine("Press and key to exit...");
                Console.ReadKey();
                return;
            }
            startdate = extractParams(args[ind], ind++);
            if (startdate.Length == 0)
                startdate = Utils.getActualDate();
            enddate = extractParams(args[ind], ind);
            if (enddate.Length == 0)
                enddate = Utils.getActualDate();
            
            RestClient client = new RestClient(BASE_URL);
            weatherlist = new List<Weather>();
            RestRequest tempRequest;
            //IRestResponse<RootObject> resp;
            
            if (Utils.validateDate(startdate))
                return; 
            if (Utils.validateDate(enddate))
                return;
            int ndays = Utils.getNumberOfDaysBetweenDates(startdate, enddate);
            List<IntervalDates> intervaldates = Utils.getDatesForRequest(startdate, enddate, ndays);
            List<Task> tasks = new List<Task>(intervaldates.Count);
            foreach(IntervalDates date in intervaldates)
            {
                tempRequest = getWeatherResp(local, date.initialDate, date.endDate);
                HttpHelper ht = new HttpHelper(client, tempRequest, null);
                tasks.Add(Task.Run(() => addlistWeather(ht)));
                /*resp = client.Execute<RootObject>(tempRequest);
                if (weatherlist == null){
                    weatherlist = resp.Data.data.weather;
                    local = resp.Data.data.request.First().query;
                } 
                else
                    weatherlist.AddRange(resp.Data.data.weather);*/
            }
            Task.WaitAll(tasks.ToArray());

            HistogrameTemps htemps = new HistogrameTemps(weatherlist);

            Console.WriteLine("Local :"+ local);
            Console.WriteLine("Start Date :" + startdate);
            Console.WriteLine("End Date :" + enddate);
            htemps.drawHistogrs();

            Console.WriteLine("Press and key to exit...");
            Console.Read();
        }

        private static RestRequest getWeatherResp(string local, string startdate, string enddate)
        {
            RestRequest tempRequest = new RestRequest(NAME_REQUEST, Method.GET);
            tempRequest.AddParameter("key", key);
            tempRequest.AddParameter("date", startdate);
            tempRequest.AddParameter("enddate", enddate);
            tempRequest.AddParameter("q", local);
            tempRequest.AddParameter("format", "json");
            tempRequest.AddParameter("tp", "24");
            return tempRequest;
        }

        private static void addlistWeather(HttpHelper http) 
        {
            IRestResponse<RootObject> resp = http.ExecuteRequest();
            weatherlist.AddRange(resp.Data.data.weather);
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
