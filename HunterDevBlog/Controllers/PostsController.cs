using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using HunterDevBlog.Models;
using HunterDevBlog.Models.BindingModels;
using HunterDevBlog.Models.Entities;
using HunterDevBlog.Models.ViewModels;

namespace HunterDevBlog.Controllers
{
    public class PostsController : ApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        // GET: api/Posts
        public async Task<List<PostViewModel>> GetPosts()
        {
            var posts = await db.Posts.OrderByDescending(p => p.TimeCreated).ToListAsync();
            return posts.ConvertAll<PostViewModel>(p => p);
        }

        // GET: api/Posts/5
        [ResponseType(typeof(PostViewModel))]
        public async Task<IHttpActionResult> GetPost(int id)
        {
            var post = await db.Posts.FindAsync(id);

            if (post == null)
                return NotFound();

            return Ok((PostViewModel)post);
        }

        // PUT: api/Posts
        [Authorize(Roles = "Administrator")]
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutPost(UpdatePostBindingModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var entity = await db.Posts.FindAsync(model.Id);

            if (entity == null)
                return BadRequest();

            if (entity.TimeCreated != model.TimeCreated)
                return BadRequest();

            UpdatePostBindingModel.MergeForUpdate(ref entity, model);

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                return Conflict();
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Posts
        [Authorize(Roles = "Administrator")]
        [ResponseType(typeof(PostViewModel))]
        public async Task<IHttpActionResult> PostPost(CreatePostBindingModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var user = await db.Users.SingleOrDefaultAsync(u => u.UserName == User.Identity.Name);

            string preview = Post.ParsePreview(model.Content);

            model.Content = model.Content.Replace(@"//preview\\", "");

            var newModel = db.Posts.Add(new Post
            {
                Title = model.Title,
                Subtitle = model.Subtitle,
                Tag = model.Tag,
                Preview = preview,
                Content = model.Content,
                Featured = model.Featured,
                Images = model.Images.ConvertAll<Image>(i => i),
                TimeCreated = DateTime.Now,
                CreatedBy = user
            });

            await db.SaveChangesAsync();

            return CreatedAtRoute("API", new { id = newModel.Id }, (PostViewModel)newModel);
        }

        // DELETE: api/Posts/5
        [Authorize(Roles = "Administrator")]
        [ResponseType(typeof(Post))]
        public async Task<IHttpActionResult> DeletePost(int id)
        {
            var post = await db.Posts.FindAsync(id);

            if (post == null)
                return NotFound();

            db.Posts.Remove(post);

            await db.SaveChangesAsync();

            return Ok();
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}