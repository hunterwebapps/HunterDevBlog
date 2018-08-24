namespace HunterDevBlog.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class PostsAndImages : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Images",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Path = c.String(nullable: false, maxLength: 500),
                        SortOrder = c.Int(nullable: false),
                        Primary = c.Boolean(nullable: false),
                        PostId = c.Int(),
                        SizeKB = c.Int(nullable: false),
                        TimeCreated = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Posts", t => t.PostId)
                .Index(t => t.PostId);
            
            CreateTable(
                "dbo.Posts",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Title = c.String(nullable: false, maxLength: 200),
                        Subtitle = c.String(nullable: false, maxLength: 200),
                        Content = c.String(nullable: false, unicode: false, storeType: "text"),
                        TimeCreated = c.DateTime(nullable: false),
                        CreatedById = c.String(nullable: false, maxLength: 128),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.AspNetUsers", t => t.CreatedById, cascadeDelete: true)
                .Index(t => t.CreatedById);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Images", "PostId", "dbo.Posts");
            DropForeignKey("dbo.Posts", "CreatedById", "dbo.AspNetUsers");
            DropIndex("dbo.Posts", new[] { "CreatedById" });
            DropIndex("dbo.Images", new[] { "PostId" });
            DropTable("dbo.Posts");
            DropTable("dbo.Images");
        }
    }
}
