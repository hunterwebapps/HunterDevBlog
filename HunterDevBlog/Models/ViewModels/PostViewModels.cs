using HunterDevBlog.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HunterDevBlog.Models.ViewModels
{
    public class PostViewModel
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public string Subtitle { get; set; }

        public string Tag { get; set; }

        public string Preview { get; set; }

        public string Content { get; set; }

        public bool Featured { get; set; }

        public List<ImageViewModel> Images { get; set; }

        public string TimeCreated { get; set; }

        public string CreatedById { get; set; }

        public static implicit operator PostViewModel(Post post)
        {
            return new PostViewModel
            {
                Id = post.Id,
                Title = post.Title,
                Subtitle = post.Subtitle,
                Tag = post.Tag,
                Preview = post.Preview,
                Content = post.Content,
                Featured = post.Featured,
                Images = post.Images.ConvertAll<ImageViewModel>(i => i),
                TimeCreated = post.TimeCreated.ToString("MMM dd, yyyy"),
                CreatedById = post.CreatedById
            };
        }
    }
}