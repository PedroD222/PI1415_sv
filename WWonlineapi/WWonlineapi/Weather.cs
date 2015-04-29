using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WWonlineapi
{
    public class Weather
    {
        public List<Astronomy> astronomy { get; set; }
        public string date { get; set; }
        public List<Hourly> hourly { get; set; }
        public string maxtempC { get; set; }
        public string maxtempF { get; set; }
        public string mintempC { get; set; }
        public string mintempF { get; set; }
        public string uvIndex { get; set; }
    }
}
