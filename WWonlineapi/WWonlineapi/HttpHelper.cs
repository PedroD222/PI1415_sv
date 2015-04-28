using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using RestSharp;

namespace wwonlineapi
{
    class HttpHelper
    {

        static DateTime UNIX_TIME = new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc);

        private int X_RATE_LIMIT = 50;
        private int X_RATE_LIMIT_RESET = 0;


        public bool IsDone { get; private set; }
        public IRestRequest Request { get; private set; }
        public IRestClient Client { get; private set; }
        public Action<IRestResponse> Callback { get; private set; }

        public HttpHelper(IRestClient client, IRestRequest request, Action<IRestResponse> callback )
        {
            this.Client = client;
            this.Request = request;
            this.Callback = callback;
            this.IsDone = false;
            //request.Resource = request.Resource.Replace(client.BaseUrl, "");
        }


        public void ExecuteRequest()
        {
            if (this.X_RATE_LIMIT <= 3)
            {
                DateTime d = UNIX_TIME.AddSeconds(this.X_RATE_LIMIT_RESET);
                Console.WriteLine("Exceeded API rate limit. Retrying at " + d.ToString());
                while (DateTime.UtcNow < d) ;
            }
            this.HandleResponse(Client.Execute(Request));
        }

        public void ExecuteRequestAsync()
        {
            if (this.X_RATE_LIMIT <= 3)
            {
                DateTime d = UNIX_TIME.AddSeconds(this.X_RATE_LIMIT_RESET);
                Console.WriteLine("Exceeded API rate limit. Retrying at " + d.ToString());
                while (DateTime.UtcNow < d) ;
            }
            Client.ExecuteAsync(Request, response =>
            {
                this.HandleResponse(response);
            });
        }

        private void HandleResponse(IRestResponse response)
        {
            if (response.ErrorMessage != null)
            {
                Console.WriteLine(response.ErrorMessage);
                return;
            }
            int.TryParse(response.Headers.FirstOrDefault(a => a.Name == "X-RateLimit-Limit").Value.ToString(), out X_RATE_LIMIT);
            int.TryParse(response.Headers.FirstOrDefault(a => a.Name == "X-RateLimit-Reset").Value.ToString(), out X_RATE_LIMIT_RESET);
            this.Callback(response);
            Parameter linkheader = response.Headers.FirstOrDefault(a => a.Name == "Link");
            if (linkheader != null)
            {
                string linkval = linkheader.Value.ToString();
                if (linkval.Contains("rel=\"next\""))
                {
                    int sidx = linkval.IndexOf("<") + 1;
                    int eidx = linkval.IndexOf(">");

                    string nextURI = linkval.Substring(sidx, eidx - sidx);

                    //this.Request.Resource = nextURI.Replace(Client.BaseUrl, "");
                    this.ExecuteRequest();
                }
                else
                    this.IsDone = true;
            }
            else
                this.IsDone = true;
        }

    }
}
