﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace WWonlineapi
{
    class HistogrameTemps
    {
        private Dictionary<String, int> maxtemps
        {
            get { return maxtemps; }
            set{}
        }
        private Dictionary<String, int> mintemps
        {
            get { return mintemps; }
            set{}
        }
        private List<Weather> weatherList;

        public HistogrameTemps(List<Weather> weatherList)
        {
            this.weatherList = weatherList;
            maxtemps = new Dictionary<string,int>();
            mintemps = new Dictionary<string,int>();
        }

        public void countTemps()
        {
            foreach (Weather w in weatherList)
            {
                if (maxtemps.ContainsKey(w.maxtempC))
                    maxtemps[w.maxtempC]++;
                else
                    maxtemps.Add(w.maxtempC,1);

                if (mintemps.ContainsKey(w.mintempC))
                    mintemps[w.mintempC]++;
                else
                    mintemps.Add(w.mintempC,1);
            }
        }
    }
}
