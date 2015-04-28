using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using RestSharp;
using HtmlAgilityPack;
using RestSharp.Deserializers;

namespace wwonlineapi
{

    class Program
    {
        private static string BASE_URL = "http://api.worldweatheronline.com/";
        private static string NAME_REQUEST = "free/v2/past-weather.ashx";
        private static string key = "61a7c1d77101b83979c5fb4a299ef";
        private static string [] argsname = {"-local", "-startdate", "-enddate"};
        /*
        static void AddRepos(List<Repo> list, IRestResponse source, IDeserializer deserializer)
        {
           //adicionar repositórios a lista
            list.AddRange(deserializer.Deserialize<List<Repo>>(source));
        }

        static void AddCollabs(Repo r, Dictionary<string, int> collabs, IRestResponse source, IDeserializer deserializer)
        {
            foreach (Collab collab in deserializer.Deserialize<List<Collab>>(source))
            {
                if (collabs.ContainsKey(collab.Login))
                {
                    ++collabs[collab.Login];
                }
                else
                {
                    collabs.Add(collab.Login, 1);
                    r.colbs.Add(collab);
                }
                ++TOTAL_COLLAB;
            }
        }
        
        static void GenerateOrgPage(Org org, RestClient client, HtmlDocument indexDoc, JsonDeserializer jsdes) {
            
            

            Console.WriteLine("Got " + org.Login + " info.");
            Console.WriteLine("Getting repos for " + org.Login);
            RestRequest repoRequest = new RestRequest(org.Repos_URL);
            AddRequestHeaders(repoRequest);
            HttpHelper repoHelper = new HttpHelper(client, repoRequest, response => AddRepos(org.Repos, response, jsdes));
            repoHelper.ExecuteRequest();
           
            Console.WriteLine("Got " + org.Login + " repos.");

            
            Dictionary<string, int> languages = new Dictionary<string, int>();
            Dictionary<string, int> collabs = new Dictionary<string, int>();

           
            
            List<HttpHelper> collabHelpers = new List<HttpHelper>();

            //Construir lista de linguagens
            foreach (Repo repo in org.Repos)
            {
                if (!languages.ContainsKey(repo.Language))
                {
                    languages.Add(repo.Language, 1);
                }
                else
                {
                    ++languages[repo.Language];
                }
                ++TOTAL_LANG;                
                
                //pedir lista de colaboradores, adicionar ao dicionário
                if (repo.Contributors_url != null) {
                    RestRequest req = new RestRequest(repo.Contributors_url);
                    AddRequestHeaders(req);
                    HttpHelper ch = new HttpHelper(client, req, collabResponse => AddCollabs(repo, collabs, collabResponse, jsdes));

                    collabHelpers.Add(ch);
                    ch.ExecuteRequestAsync();
                }
            }
            Console.WriteLine("Finished language count for " + org.Login);
            languages = languages.OrderBy(c => c.Key).ToDictionary(t => t.Key, t => t.Value);

            while (collabHelpers.Exists(ch => !ch.IsDone)) ; //wait for collab requests
            
            Console.WriteLine("Generating org HTML for " + org.Login);
            generateHtml(org, languages, collabs);

            Console.WriteLine("Finished " + org.Login);
        }*/    
       
        /*private static void generateHtml(Org org, Dictionary<string, int> languages, Dictionary<string, int> collabs)
        {
            HtmlDocument doc = new HtmlDocument();
            doc.Load(BASE_HTML_ORG);
            HtmlNode rootNode = doc.DocumentNode;

            //add org info
            rootNode.SelectSingleNode("//img[@name=\"avatar\"]").SetAttributeValue("src", org.Avatar_URL);
            rootNode.SelectSingleNode("//h1[@name=\"org\"]").AppendChild(HtmlTextNode.CreateNode(org.Login));
            rootNode.SelectSingleNode("//h3[@name=\"location\"]").AppendChild(HtmlTextNode.CreateNode(org.Location));
            rootNode.SelectSingleNode("//node()[@name=\"indexlink\"]").AppendChild(HtmlNode.CreateNode("<a href=\"../index.html\">Index</a>"));
            rootNode.SelectSingleNode("//title").AppendChild(HtmlTextNode.CreateNode(org.Login));
            //generate language graph
            HtmlNode langgraph = rootNode.SelectSingleNode("//div[@name=\"languagegraph\"]");
            foreach (var item in languages)
            {
                langgraph.AppendChild(BootstrapUtils.GraphEntry(item.Key, item.Value, item.Value*100.0d / TOTAL_LANG));
            }

            //generage collaborator graph
            HtmlNode collabgraph = rootNode.SelectSingleNode("//div[@name=\"collabgraph\"]");
            foreach (var item in collabs)
            {
                collabgraph.AppendChild(BootstrapUtils.GraphEntry(BootstrapUtils.NameToContribLink(item.Key), item.Value, item.Value * 100.0d / TOTAL_COLLAB));
            }

            StreamWriter f = File.CreateText("org/"+org.Login+".html");
            doc.Save(f);
            foreach (Repo repo in org.Repos)
            {
                generateContHtml(repo.colbs);    
            }
            
        }

        private static void generateContHtml(List<Collab> clbs)
        {
            HtmlDocument doc = new HtmlDocument();
            foreach (Collab c in clbs)
            {
                
                doc.Load(BASE_HTML_COLLAB);
                HtmlNode rootNode = doc.DocumentNode;

                //add collab info
                rootNode.SelectSingleNode("//h2[@name=\"collab\"]").AppendChild(HtmlTextNode.CreateNode(c.Login));
                rootNode.SelectSingleNode("//img[@name=\"avatar\"]").SetAttributeValue("src", c.Avatar_URL);
                rootNode.SelectSingleNode("//node()[@name=\"indexlink\"]").AppendChild(HtmlNode.CreateNode("<a href=\"../index.html\">Index</a>"));
                rootNode.SelectSingleNode("//title").AppendChild(HtmlTextNode.CreateNode(c.Login));
                
                HtmlNode ul = rootNode.SelectSingleNode("//ul[@name=\"infoC\"]");
                if (c.Name.Length > 0)
                    ul.AppendChild(HtmlNode.CreateNode("<li><h4>NAME: </h4>" + c.Name + "</li>"));

                if (c.URL.Length > 0)
                    ul.AppendChild(HtmlNode.CreateNode("<li><h4>URL PAGE: </h4><a href=\"" + c.URL + "\">" + c.URL + "</a></li>"));
                
                if (c.Email.Length > 0)
                    ul.AppendChild(HtmlTextNode.CreateNode("<li><h4>EMAIL: </h4>" + c.Email + "</li>"));
               
                doc.Save(File.CreateText("contrib/" + c.Login + ".html"));
            }

        }*/

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
                Console.ReadKey();
                return;
            }
            startdate = extractParams(args[ind], ind++);
            if (startdate.Length == 0)
                startdate = getActualDate();
            enddate = extractParams(args[ind], ind);
            if (enddate.Length == 0)
                enddate = getActualDate();
            
            RestClient client = new RestClient(BASE_URL);
            List<Task> tasks = new List<Task>();
            
            JsonDeserializer jsdes = new JsonDeserializer();
            
                //Org org = new Org();
            RestRequest orgRequest = new RestRequest(NAME_REQUEST);
            orgRequest.AddParameter("key", key);
            orgRequest.AddParameter("date", startdate);
            orgRequest.AddParameter("enddate", enddate);
            orgRequest.AddParameter("q", local);
            client.ExecuteAsync(orgRequest, response =>
            {
                if (response.ErrorMessage != null)
                {
                    Console.WriteLine(response.ErrorMessage);
                    Console.WriteLine(response);
                    return;
                }
                //this.HandleResponse(response);
            });
                //HttpHelper orgHelper = new HttpHelper(client, orgRequest, response => org = jsdes.Deserialize<Org>(response));
                //orgHelper.ExecuteRequest();
                //tasks.Add(Task.Run(() => GenerateOrgPage(org, client, index, jsdes)));
                //add org to index page
                //index.DocumentNode.SelectSingleNode("//div[@name=\"orglist\"]").AppendChild(BootstrapUtils.GenerateOrgLink(org));
            
            
            //Task.WaitAll(tasks.ToArray());
            //Console.WriteLine("Completed all tasks.");
            Console.Read();
        }

        private static string getActualDate()
        {
            string datePatt = @"yyyy/MM/dd tt";
            DateTime dispDt = DateTime.Now;
            return dispDt.ToString(datePatt);
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
