using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WWonlineapi
{
    public class Utils
    {
        public static Dictionary<int, int> monthDays = new Dictionary<int,int>();
        public static String DATE_FORMAT = @"yyyy/MM/dd tt";

        public static void fillDictionary()
        {
            monthDays.Add(1,31);
            monthDays.Add(2,28);
            monthDays.Add(3,31);
            monthDays.Add(4,30);
            monthDays.Add(5,31);
            monthDays.Add(6,30);
            monthDays.Add(7,31);
            monthDays.Add(8,31);
            monthDays.Add(9,30);
            monthDays.Add(10,31);
            monthDays.Add(11,30);
            monthDays.Add(12,31);
        }

        public static int getNumberOfDaysBetweenDates(String initialDate, String endDate) {
            DateTime initial = Convert.ToDateTime(initialDate);
            DateTime end = Convert.ToDateTime(endDate);
            TimeSpan count = end.Subtract(initial);
            return count.Days;
        }

        public static List<IntervalDates> getDatesForRequest(String initialDate, String endDate, int numberOfDays) 
        {
            List<IntervalDates> dates = new List<IntervalDates>();
            DateTime initial = Convert.ToDateTime(initialDate);
            DateTime end = Convert.ToDateTime(endDate);
            fillDictionary();
            do
            {
                if (end.Month - initial.Month > 0)
                {
                    int daysInMonth;
                    if (monthDays.TryGetValue(initial.Month, out daysInMonth))
                    {
                        int toEndMonthDays = daysInMonth - initial.Day;
                        DateTime endOfMonth = initial.Add(new TimeSpan(toEndMonthDays, 0, 0, 0));
                        dates.Add(new IntervalDates(initial.ToString(DATE_FORMAT), endOfMonth.ToString(DATE_FORMAT)));
                        initial = endOfMonth.Add(new TimeSpan(1, 0, 0, 0));
                        numberOfDays -= toEndMonthDays;
                    }
                }
                else
                {
                    dates.Add(new IntervalDates(initial.ToString(DATE_FORMAT), end.ToString(DATE_FORMAT)));
                    numberOfDays = 0;
                }
            } while (numberOfDays > 0);

            return dates;
        }
    }
}
