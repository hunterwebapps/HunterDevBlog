namespace HunterDevBlog.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class FeaturedPostProperty : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Posts", "Featured", c => c.Boolean(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Posts", "Featured");
        }
    }
}
