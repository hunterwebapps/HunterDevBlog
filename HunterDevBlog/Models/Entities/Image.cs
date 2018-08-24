using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Web;

namespace HunterDevBlog.Models.Entities
{
    public class Image
    {
        public int Id { get; set; }

        public string Path { get; set; }

        public int SortOrder { get; set; }

        public bool Primary { get; set; }

        public int? PostId { get; set; }

        public virtual Post Post { get; set; }

        public int SizeKB { get; set; }

        public DateTime TimeCreated { get; set; }

        public static string ResizeImage(System.Drawing.Image image, Point bounds = default(Point))
        {
            if (bounds == default(Point))
            {
                bounds.X = 1024;
                bounds.Y = 1024;
            }
            string tempDir = HttpContext.Current.Server.MapPath("~/Content/Images/Temp");
            if (!Directory.Exists(tempDir)) { Directory.CreateDirectory(tempDir); }

            string imageExtension = GetMimeType(image).Replace("image/", "");
            if (!new[] { "jpg", "jpeg", "png", "gif" }.Contains(imageExtension)) { return "Only JPG, PNG & GIF Allowed"; }

            int newHeight;
            int newWidth;
            int thumbHeight;
            int thumbWidth;
            if (image.Height > image.Width)
            {
                if (image.Height > bounds.Y)
                {
                    newHeight = bounds.Y;
                    newWidth = (int)Math.Ceiling(image.Width * (bounds.Y / (float)image.Height));
                }
                else
                {
                    newHeight = (int)Math.Ceiling((float)image.Height);
                    newWidth = (int)Math.Ceiling((float)image.Width);
                }
                thumbHeight = 256;
                thumbWidth = Convert.ToInt32((256M / (decimal)newHeight) * (decimal)newWidth);
            }
            else
            {
                if (image.Width > bounds.X)
                {
                    newWidth = bounds.X;
                    newHeight = (int)Math.Ceiling(image.Height * (bounds.X / (float)image.Width));
                }
                else
                {
                    newHeight = (int)Math.Ceiling((float)image.Height);
                    newWidth = (int)Math.Ceiling((float)image.Width);
                }
                thumbWidth = 256;
                thumbHeight = Convert.ToInt32((256M / (decimal)newWidth) * (decimal)newHeight);
            }

            System.Drawing.Image thumbImage = new Bitmap(image, thumbWidth, thumbHeight);
            System.Drawing.Image resizedImage = new Bitmap(image, newWidth, newHeight);

            ImageCodecInfo codecInfo = GetEncoder(imageExtension);

            EncoderParameters encoderParameters = new EncoderParameters(4);
            encoderParameters.Param[0] = new EncoderParameter(Encoder.Quality, 50L);
            encoderParameters.Param[1] = new EncoderParameter(Encoder.ScanMethod, (int)EncoderValue.ScanMethodInterlaced);
            encoderParameters.Param[2] = new EncoderParameter(Encoder.RenderMethod, (int)EncoderValue.RenderProgressive);
            encoderParameters.Param[3] = new EncoderParameter(Encoder.Compression, 50L);

            string guid = Guid.NewGuid().ToString();
            string tempFileName = System.IO.Path.Combine(tempDir, guid + "." + imageExtension);
            string thumbTempFileName = System.IO.Path.Combine(tempDir, guid + "_thumb." + imageExtension);
            string fullTempFileName = System.IO.Path.Combine(tempDir, guid + "_full." + imageExtension);
            resizedImage.Save(tempFileName, codecInfo, encoderParameters);
            thumbImage.Save(thumbTempFileName, codecInfo, encoderParameters);
            image.Save(fullTempFileName);

            string filePath = thumbTempFileName.Substring(tempFileName.IndexOf("\\Content\\"));
            return filePath.Replace("\\", "/");
        }

        public static string StoreImage(string image, string directory)
        {
            return StoreImages(new List<string> { image }, directory)[0];
        }

        public static List<string> StoreImages(List<string> images, string directory)
        {
            if (directory[0] != '/') { directory = "/" + directory; }

            string mappedDirectory = HttpContext.Current.Server.MapPath(directory);

            if (!Directory.Exists(mappedDirectory)) { Directory.CreateDirectory(mappedDirectory); }

            List<string> storedPaths = new List<string>();
            foreach (string path in images)
            {
                string thumbFilePath = path;
                string fullFilePath = path.Replace("_thumb", "_full");
                string filePath = path.Replace("_thumb", "");

                string thumbFileName = System.IO.Path.GetFileName(thumbFilePath);
                string fullFileName = System.IO.Path.GetFileName(fullFilePath);
                string fileName = System.IO.Path.GetFileName(filePath);

                if (Uri.TryCreate(filePath, UriKind.Absolute, out Uri checkRelative))
                {
                    filePath = HttpContext.Current.Server.MapPath(new Uri(filePath).AbsolutePath);
                    thumbFilePath = HttpContext.Current.Server.MapPath(new Uri(thumbFilePath).AbsolutePath);
                    fullFilePath = HttpContext.Current.Server.MapPath(new Uri(fullFilePath).AbsolutePath);
                }
                else
                {
                    filePath = HttpContext.Current.Server.MapPath(filePath);
                    thumbFilePath = HttpContext.Current.Server.MapPath(thumbFilePath);
                    fullFilePath = HttpContext.Current.Server.MapPath(fullFilePath);
                }

                string mappedFile = System.IO.Path.Combine(mappedDirectory, fileName);
                string mappedThumbFile = System.IO.Path.Combine(mappedDirectory, thumbFileName);
                string mappedFullFile = System.IO.Path.Combine(mappedDirectory, fullFileName);

                if (!File.Exists(mappedFile))
                {
                    File.Move(filePath, mappedFile);
                }
                if (!File.Exists(mappedThumbFile))
                {
                    File.Move(thumbFilePath, mappedThumbFile);
                }
                if (!File.Exists(mappedFullFile))
                {
                    File.Move(fullFilePath, mappedFullFile);
                }

                string newPath = System.IO.Path.Combine(directory, thumbFileName).Replace("\\", "/");

                storedPaths.Add(newPath);
            }

            return storedPaths;
        }

        public static ImageCodecInfo GetEncoder(string fileExtension)
        {
            ImageFormat format;
            switch (fileExtension.ToLower())
            {
                case "gif":
                    format = ImageFormat.Gif;
                    break;
                case "png":
                    format = ImageFormat.Png;
                    break;
                case "jpeg":
                case "jpg":
                default:
                    format = ImageFormat.Jpeg;
                    break;
            }
            ImageCodecInfo[] codecs = ImageCodecInfo.GetImageDecoders();
            foreach (ImageCodecInfo codec in codecs)
            {
                if (codec.FormatID == format.Guid)
                {
                    return codec;
                }
            }
            return null;
        }

        public static string GetMimeType(System.Drawing.Image i)
        {
            var imgguid = i.RawFormat.Guid;
            foreach (ImageCodecInfo codec in ImageCodecInfo.GetImageDecoders())
            {
                if (codec.FormatID == imgguid)
                    return codec.MimeType;
            }
            return "image/unknown";
        }
    }
}