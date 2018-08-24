using HunterDevBlog.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HunterDevBlog.Models.BindingModels
{
    public class CreatePostBindingModel
    {
        public string Title { get; set; }

        public string Subtitle { get; set; }

        public string Tag { get; set; }

        public string Content { get; set; }

        public bool Featured { get; set; }

        public List<ImageBindingModel> Images { get; set; }
    }

    public class UpdatePostBindingModel : CreatePostBindingModel
    {
        public int Id { get; set; }

        public DateTime TimeCreated { get; set; }

        public static void MergeForUpdate(ref Post entity, UpdatePostBindingModel model)
        {
            entity.Title = model.Title;
            entity.Subtitle = model.Subtitle;
            entity.Tag = model.Tag;
            entity.Preview = Post.ParsePreview(model.Content);
            entity.Content = model.Content;
            entity.Featured = model.Featured;
            entity.Images = model.Images.ConvertAll<Image>(i => i);
        }
    }
}