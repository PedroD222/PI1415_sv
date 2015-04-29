using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WWonlineapi
{
    public class Hourly
    {
        public string cloudcover { get; set; }
        public string DewPointC { get; set; }
        public string DewPointF { get; set; }
        public string FeelsLikeC { get; set; }
        public string FeelsLikeF { get; set; }
        public string HeatIndexC { get; set; }
        public string HeatIndexF { get; set; }
        public string humidity { get; set; }
        public string precipMM { get; set; }
        public string pressure { get; set; }
        public string tempC { get; set; }
        public string tempF { get; set; }
        public string time { get; set; }
        public string visibility { get; set; }
        public string weatherCode { get; set; }
        public List<WeatherDesc> weatherDesc { get; set; }
        public List<WeatherIconUrl> weatherIconUrl { get; set; }
        public string WindChillC { get; set; }
        public string WindChillF { get; set; }
        public string winddir16Point { get; set; }
        public string winddirDegree { get; set; }
        public string WindGustKmph { get; set; }
        public string WindGustMiles { get; set; }
        public string windspeedKmph { get; set; }
        public string windspeedMiles { get; set; }
    }
}
