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
using HunterDevBlog.Models.ViewModels;

namespace HunterDevBlog.Controllers
{
    [Authorize(Roles = "Administrator")]
    public class UsersController : ApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        // GET: api/Users
        [AllowAnonymous]
        public async Task<List<UserViewModel>> GetUsers()
        {
            var users = await db.Users.ToListAsync();
            return users.ConvertAll<UserViewModel>(u => u);
        }

        // GET: api/Users/5
        [AllowAnonymous]
        [ResponseType(typeof(UserViewModel))]
        public async Task<IHttpActionResult> GetUser(string id)
        {
            var user = await db.Users.SingleOrDefaultAsync(u => u.UserName == id);

            if (user == null)
                return NotFound();

            return Ok((UserViewModel)user);
        }

        // PUT: api/Users/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutUser(string id, ApplicationUser applicationUser)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (id != applicationUser.Id)
                return BadRequest();

            db.Entry(applicationUser).State = EntityState.Modified;

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

        // POST: api/Users
        [ResponseType(typeof(UserViewModel))]
        public async Task<IHttpActionResult> PostApplicationUser(CreateUserBindingModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var newUser = db.Users.Add(new ApplicationUser
            {

            });

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                return Conflict();
            }

            return CreatedAtRoute("API", new { id = newUser.Id }, newUser);
        }

        // DELETE: api/Users/5
        [ResponseType(typeof(UserViewModel))]
        public async Task<IHttpActionResult> DeleteApplicationUser(string id)
        {
            var applicationUser = await db.Users.SingleOrDefaultAsync(u => u.Id == id);
            if (applicationUser == null)
                return NotFound();

            db.Users.Remove(applicationUser);

            await db.SaveChangesAsync();

            return Ok((UserViewModel)applicationUser);
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