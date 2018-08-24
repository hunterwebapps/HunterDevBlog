namespace HunterDevBlog.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class TagstoTag : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Posts", "Tag", c => c.String());
            DropColumn("dbo.Posts", "Tags");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Posts", "Tags", c => c.String());
            DropColumn("dbo.Posts", "Tag");
        }
    }
}
