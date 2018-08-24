using HunterDevBlog.Models.BindingModels;
using HunterDevBlog.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Http.Description;

namespace HunterDevBlog.Controllers
{
    public class ImagesController : ApiController
    {
        [ActionName("Resize")]
        [HttpPost]
        [Authorize(Roles = "Administrator")]
        [ResponseType(typeof(List<ImageBindingModel>))]
        public IHttpActionResult Resize()
        {
            List<ImageBindingModel> savedImages = new List<ImageBindingModel>();

            var files = HttpContext.Current.Request.Files;

            if (files.Count == 0)
                return BadRequest("No Images");

            int count = 0;
            for (int i = 0; i < files.Count; i++)
            {
                System.Drawing.Image image = System.Drawing.Image.FromStream(files[i].InputStream);

                string tempPath = Image.ResizeImage(image, new System.Drawing.Point(1280, 1280));

                string savedPath = Image.StoreImage(tempPath, "/Client/public/images");

                savedImages.Add(new ImageBindingModel
                {
                    Path = savedPath,
                    SortOrder = count,
                    Primary = count == 0,
                    SizeKB = files[i].ContentLength * 1024
                });

                count++;
            }

            return Ok(savedImages);
        }
    }
}
