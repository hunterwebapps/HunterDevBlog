using System;
using System.Data.Entity;
using System.Security.Claims;
using System.Threading.Tasks;
using HunterDevBlog.Models.Entities;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;

namespace HunterDevBlog.Models
{
    // You can add profile data for the user by adding more properties to your ApplicationUser class, please visit https://go.microsoft.com/fwlink/?LinkID=317594 to learn more.
    public class ApplicationUser : IdentityUser
    {
        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string FullName => FirstName + " " + LastName;

        public bool Administrator { get; set; }

        public DateTime TimeCreated { get; set; }

        public async Task<ClaimsIdentity> GenerateUserIdentityAsync(UserManager<ApplicationUser> manager, string authenticationType)
        {
            // Note the authenticationType must match the one defined in CookieAuthenticationOptions.AuthenticationType
            var userIdentity = await manager.CreateIdentityAsync(this, authenticationType);
            // Add custom user claims here
            return userIdentity;
        }
    }

    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext()
            : base("DefaultConnection", throwIfV1Schema: false)
        {
        }

        public static ApplicationDbContext Create()
        {
            return new ApplicationDbContext();
        }

        public DbSet<Post> Posts { get; set; }
        public DbSet<Image> Images { get; set; }
        public DbSet<Subscription> Subscriptions { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            var user = modelBuilder.Entity<ApplicationUser>();
            user.Property(o => o.FirstName)
                .HasMaxLength(50);
            user.Property(o => o.LastName)
                .HasMaxLength(50);
            user.Ignore(o => o.FullName);

            var post = modelBuilder.Entity<Post>();
            post.Property(o => o.Title)
                .HasMaxLength(200)
                .IsRequired();
            post.Property(o => o.Subtitle)
                .HasMaxLength(200)
                .IsRequired();
            post.Property(o => o.Tag)
                .HasMaxLength(50)
                .IsRequired();
            post.Property(o => o.Content)
                .HasColumnType("text")
                .IsRequired();
            post.HasMany(o => o.Images)
                .WithOptional(o => o.Post)
                .HasForeignKey(o => o.PostId);
            post.HasRequired(o => o.CreatedBy)
                .WithMany()
                .HasForeignKey(o => o.CreatedById);

            var image = modelBuilder.Entity<Image>();
            image.Property(o => o.Path)
                .HasMaxLength(500)
                .IsRequired();

            var subscribe = modelBuilder.Entity<Subscription>();
            subscribe.Property(o => o.EmailAddress)
                .HasMaxLength(254)
                .IsRequired();
        }
    }
}