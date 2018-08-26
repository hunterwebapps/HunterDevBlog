using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HunterDevBlog.Models.Entities
{
    public class Subscription
    {
        public int Id { get; set; }

        public string EmailAddress { get; set; }

        public string Browser { get; set; }

        public bool Unsubscribed { get; set; }

        public DateTime TimeCreated { get; set; }
    }
}