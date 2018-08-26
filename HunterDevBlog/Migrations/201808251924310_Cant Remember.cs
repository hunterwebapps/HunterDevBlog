namespace HunterDevBlog.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class CantRemember : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Posts", "Tag", c => c.String(nullable: false, maxLength: 50));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Posts", "Tag", c => c.String());
        }
    }
}
