using System;
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
        private Dictionary<String, int> medtemps
        {
            get { return medtemps; }
            set { }
        }
        private List<Weather> weatherList;

        public HistogrameTemps(List<Weather> weatherList)
        {
            this.weatherList = weatherList;
            maxtemps = new Dictionary<string,int>();
            mintemps = new Dictionary<string,int>();
            medtemps = new Dictionary<string, int>();
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
                countMedTemps(w);
            }
        }
        //É SO Isto ????
        private void countMedTemps(Weather w)
        {
            foreach (Hourly h in w.hourly)
            {
                if (medtemps.ContainsKey(w.mintempC))
                    medtemps[h.tempC]++;
                else
                    medtemps.Add(h.tempC, 1);
            }
        }

        private int preDraw(Dictionary<string, int> m)
        {
            int big = 0;
            foreach (KeyValuePair<string, int> lang in m)
            {
                big = lang.Key.Length;
                if (big < lang.Key.Length)
                    big = lang.Key.Length;
            }
            return big;
        }

        private void drawHistograme(Dictionary<string, int> dictio)
        {
            string lineHist;
            int big = preDraw(dictio);
            foreach (KeyValuePair<string, int> lang in dictio)
            {
                lineHist = lang.Key.PadRight(big) + ": ";
                for (int i = lang.Value; i > 0; i--)
                    lineHist += '*';

                lineHist = lineHist.PadRight(lang.Value, ' ');
                //lineHist += "";
                Console.WriteLine(lineHist);
            }
        }
        public void drawHistogrs()
        {
            countTemps();
            Console.WriteLine("Histograme of max temps");
            drawHistograme(maxtemps);
            Console.WriteLine("Histograme of min temps");
            drawHistograme(mintemps);
            Console.WriteLine("Histograme of Media temps");
            drawHistograme(medtemps);
        } 
    }
}
