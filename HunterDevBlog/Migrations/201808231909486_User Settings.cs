namespace HunterDevBlog.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class UserSettings : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.AspNetUsers", "FirstName", c => c.String(maxLength: 50));
            AddColumn("dbo.AspNetUsers", "LastName", c => c.String(maxLength: 50));
            AddColumn("dbo.AspNetUsers", "Administrator", c => c.Boolean(nullable: false));
            AddColumn("dbo.AspNetUsers", "TimeCreated", c => c.DateTime(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.AspNetUsers", "TimeCreated");
            DropColumn("dbo.AspNetUsers", "Administrator");
            DropColumn("dbo.AspNetUsers", "LastName");
            DropColumn("dbo.AspNetUsers", "FirstName");
        }
    }
}
