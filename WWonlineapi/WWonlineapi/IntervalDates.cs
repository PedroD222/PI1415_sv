﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WWonlineapi
{
    public class IntervalDates
    {
        public String initialDate;
        public String endDate;

        public IntervalDates(String initialDate, String endDate) 
        { 
            this.initialDate = initialDate;
            this.endDate = endDate;
        }
    }
}
