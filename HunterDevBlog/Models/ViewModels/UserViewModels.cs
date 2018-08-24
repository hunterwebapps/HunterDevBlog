using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HunterDevBlog.Models.ViewModels
{
    public class UserViewModel
    {
        public string Id { get; set; }

        public string Username { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string FullName => FirstName + " " + LastName;

        public string EmailAddress { get; set; }

        public string PhoneNumber { get; set; }

        public bool Administrator { get; set; }

        public static implicit operator UserViewModel(ApplicationUser user)
        {
            return new UserViewModel
            {
                Id = user.Id,
                Username = user.UserName,
                FirstName = user.FirstName,
                LastName = user.LastName,
                EmailAddress = user.Email,
                PhoneNumber = user.PhoneNumber,
                Administrator = user.Administrator
            };
        }
    }
}