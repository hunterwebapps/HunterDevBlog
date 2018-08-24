namespace HunterDevBlog.Migrations
{
    using HunterDevBlog.Models;
    using Microsoft.AspNet.Identity;
    using Microsoft.AspNet.Identity.EntityFramework;
    using System;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<ApplicationDbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(ApplicationDbContext context)
        {
            if (context.Users.Count() == 0)
            {
                var userStore = new UserStore<ApplicationUser>(context);
                var userManager = new ApplicationUserManager(userStore);

                var user = new ApplicationUser
                {
                    UserName = "jancarius",
                    FirstName = "Dwayne",
                    LastName = "Hunter",
                    Email = "hunter@hunterwebapps.com",
                    PhoneNumber = "+1-386-868-7928",
                    EmailConfirmed = true,
                    PhoneNumberConfirmed = true,
                    Administrator = true,
                    TimeCreated = DateTime.Now
                };

                var userResult = userManager.Create(user, "Garthan@3");

                if (userResult.Succeeded)
                {
                    context.Roles.AddOrUpdate(new IdentityRole
                    {
                        Name = "Administrator"
                    });
                    context.SaveChanges();

                    var userId = userManager.FindByName(user.UserName).Id;

                    userManager.AddToRole(userId, "Administrator");
                }
            }
        }
    }
}
