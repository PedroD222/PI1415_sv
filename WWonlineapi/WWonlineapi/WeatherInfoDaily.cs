using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WWonlineapi
{
    public class WeatherInfo
    {
        public String maxtempC { set; get; }
        public String mintempC { set; get; }
        public List<WeatherInfoHourly> { set; get; }
    }
}
