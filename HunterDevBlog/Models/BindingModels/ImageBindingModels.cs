using System;
using System.Collections.Generic;
using System.Linq;
using HunterDevBlog.Models.Entities;

namespace HunterDevBlog.Models.BindingModels
{
    public class ImageBindingModel
    {
        public int? Id { get; set; }

        public string Path { get; set; }

        public int SortOrder { get; set; }

        public bool Primary { get; set; }

        public int SizeKB { get; set; }

        public static implicit operator Image(ImageBindingModel model)
        {
            return new Image
            {   
                Path = model.Path,
                SortOrder = model.SortOrder,
                Primary = model.Primary,
                SizeKB = model.SizeKB,
                TimeCreated = DateTime.Now
            };
        }

        public static List<Image> MergeForUpdate(List<ImageBindingModel> model, List<Image> entity)
        {
            foreach (var modelImage in model)
            {
                if (modelImage.Id.HasValue)
                {
                    var entityImage = entity.Where(i => i.Id == modelImage.Id.Value).Single();

                    entityImage.Path = modelImage.Path;
                    entityImage.SortOrder = modelImage.SortOrder;
                    entityImage.Primary = modelImage.Primary;
                    entityImage.SizeKB = modelImage.SizeKB;
                }
                else
                {
                    entity.Add(new Image
                    {
                        Path = modelImage.Path,
                        SortOrder = modelImage.SortOrder,
                        Primary = modelImage.Primary,
                        SizeKB = modelImage.SizeKB,
                        TimeCreated = DateTime.Now
                    });
                }
            }

            return entity;
        }
    }
}