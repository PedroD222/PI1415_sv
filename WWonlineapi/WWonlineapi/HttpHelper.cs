using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using RestSharp;

namespace WWonlineapi
{
    class HttpHelper
    {
        public IRestRequest Request { get; private set; }
        public IRestClient Client { get; private set; }

        public HttpHelper(IRestClient client, IRestRequest request, Action<IRestResponse> callback )
        {
            this.Client = client;
            this.Request = request;
        }

        public IRestResponse<RootObject> ExecuteRequest()
        {
            return Client.Execute<RootObject>(Request);
        }
    }
}
