using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HunterDevBlog.Models.Entities
{
    public class Post
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public string Subtitle { get; set; }

        public string Tag { get; set; }

        public string Preview { get; set; }

        public string Content { get; set; }

        public bool Featured { get; set; }

        public virtual List<Image> Images { get; set; }

        public DateTime TimeCreated { get; set; }

        public string CreatedById { get; set; }
        public virtual ApplicationUser CreatedBy { get; set; }

        public static string ParsePreview(string content)
        {
            if (content.Contains("//preview\\"))
                return content.Substring(0, content.IndexOf("//preview\\"));

            return content;
        }
    }
}