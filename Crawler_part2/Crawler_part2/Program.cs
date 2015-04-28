using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using HtmlAgilityPack;
using System.Net;

namespace Crawler_part2
{
    class Program
    {
        private static Dictionary<string, List<string>> wordList = new Dictionary<string, List<string>>();

        private static void getResources(String url, int depth) {
            List<KeyValuePair<string, int>> links = new List<KeyValuePair<string, int>>();
            List<string> visitedURLs = new List<string>();
            
            links.Add(new KeyValuePair<string, int>(url, depth));
            HtmlDocument doc = new HtmlDocument();
            HttpWebRequest request;
            HttpWebResponse response;
            Console.WriteLine("Crawling " + url + ". Max depth: " + depth);

            while (links.Count > 0)
            {
                try
                {
                    request = (HttpWebRequest)WebRequest.Create(links[0].Key);
                    response = (HttpWebResponse)request.GetResponse();
                    doc.Load(response.GetResponseStream());
                    if (response.Headers["content-type"].StartsWith("text/html"))
                    {
                        FindLinks(doc, links, links[0].Value, visitedURLs);
                        IndexWords(doc, links[0].Key, wordList);
                    }
                }
                catch (InvalidCastException e)
                {
                    //caught a file link, ignore.
                }
                catch (Exception e)
                {
                    Console.WriteLine("Error: " + e + "\n on " + links[0].Key);
                }
                Console.Title = "Found " + links.Count + " links. Depth: " + links[0].Value;
                links.RemoveAt(0);
            }
        }

        static void Main(string[] args)
        {
            if (args.Length != 2)
            {
                Console.WriteLine("Parametros invalidos. Requer url e nivel de profundidade maxima.");
                return;
            }
            int depth = Int32.Parse(args[1]);
            getResources(args[0], depth);
           
            string search;
            do
            {
                Console.WriteLine("Introduza termo de pesquisa ou !exit para terminar:");
                search = Console.ReadLine();
                searchWord(search);
            }
            while (search != "!exit");
        }

        private static void searchWord(string search)
        {
            if (wordList.ContainsKey(search.ToLower()))
            {
                foreach (string url in wordList[search.ToLower()])
                {
                    Console.WriteLine(url);
                }
            }
        }

        private static void IndexWords(HtmlDocument doc, string url, Dictionary<string, List<string>> wordList)
        {
            if (doc.DocumentNode.SelectSingleNode("//body") == null) 
                return; //no body
            foreach (HtmlNode node in 
                    doc.DocumentNode.SelectSingleNode("//body").SelectNodes("node()"))
            {
                foreach (string content in node.InnerText.Split(new char[] { ' ', '\n', '\t', '\r', '.', ',', ';', ':' }))
                {
                    if (content.Length > 0 && !content.StartsWith("<"))
                    {
                        if (wordList.ContainsKey(content.ToLower()))
                        {
                            if (!wordList[content.ToLower()].Contains(url))
                                wordList[content.ToLower()].Add(url);
                        }
                        else
                        {
                            wordList.Add(content.ToLower(), new List<string> { url });
                        }
                    }
                }
            }
        }

        private static void FindLinks(HtmlDocument doc, List<KeyValuePair<string, int>> links, int depth, List<string> visitedURLs)
        {
            if (depth <= 0)
                return;
            depth -= 1;

            if (doc.DocumentNode.SelectNodes("//a[@href]") != null)
            {
                HtmlAttribute att;
                foreach (HtmlNode link in doc.DocumentNode.SelectNodes("//a[@href]"))
                {
                    att = link.Attributes["href"];
                    if (att.Value.StartsWith("http") || att.Value.StartsWith("//"))
                    {
                        if (!visitedURLs.Contains(att.Value))
                            links.Add(new KeyValuePair<string, int>(att.Value, depth));
                    }
                    else
                        if (att.Value.IndexOf('/') == 0 && att.Value.Length > 1)
                        {
                            att.Value = links[0].Key.Substring(0, 
                                links[0].Key.IndexOf("/", links[0].Key.IndexOf("//") + 2)) + 
                                att.Value;
                            if (!visitedURLs.Contains(att.Value))
                                links.Add(new KeyValuePair<string, int>(att.Value, depth));
                        }
                }
            }
        }
    }
}
