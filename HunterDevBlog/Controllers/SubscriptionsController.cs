using HunterDevBlog.Models;
using HunterDevBlog.Models.BindingModels;
using HunterDevBlog.Models.Entities;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;

namespace HunterDevBlog.Controllers
{
    public class SubscriptionsController : ApiController
    {
        ApplicationDbContext db = new ApplicationDbContext();

        [HttpGet]
        [Route("api/Unsubscribe/{id}")]
        public async Task<IHttpActionResult> Unsubscribe(int id)
        {
            var subscription = await db.Subscriptions.FindAsync(id);

            subscription.Unsubscribed = true;

            await db.SaveChangesAsync();

            return Content(HttpStatusCode.OK, "Unsubscribed");
        }

        [HttpPost]
        [Route("api/Subscribe")]
        public async Task<IHttpActionResult> Subscribe(SubscriptionBindingModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var subscription = await db.Subscriptions.SingleOrDefaultAsync(s => s.EmailAddress == model.EmailAddress);

            if (subscription != null)
                subscription.Unsubscribed = false;
            else
                db.Subscriptions.Add(new Subscription
                {
                    EmailAddress = model.EmailAddress,
                    Browser = model.Browser,
                    Unsubscribed = false,
                    TimeCreated = DateTime.Now
                });

            await db.SaveChangesAsync();

            return Ok();
        }
    }
}
