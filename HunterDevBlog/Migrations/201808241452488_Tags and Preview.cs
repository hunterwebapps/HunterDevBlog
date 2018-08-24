namespace HunterDevBlog.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class TagsandPreview : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Posts", "Tags", c => c.String());
            AddColumn("dbo.Posts", "Preview", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Posts", "Preview");
            DropColumn("dbo.Posts", "Tags");
        }
    }
}
