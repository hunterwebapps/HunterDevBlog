using HunterDevBlog.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HunterDevBlog.Models.ViewModels
{
    public class ImageViewModel
    {
        public int Id { get; set; }

        public string Path { get; set; }

        public int SortOrder { get; set; }

        public int SizeKB { get; set; }

        public static implicit operator ImageViewModel(Image image)
        {
            return new ImageViewModel
            {
                Id = image.Id,
                Path = image.Path,
                SortOrder = image.SortOrder,
                SizeKB = image.SizeKB
            };
        }
    }
}