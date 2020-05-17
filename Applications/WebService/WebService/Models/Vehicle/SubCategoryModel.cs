namespace WebServis.Models.Vehicle
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;

    public partial class SubCategoryModel : DbContext
    {
        public SubCategoryModel()
            : base("name=apiCS")
        {
        }

        public virtual DbSet<SubCategory> SubCategory { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
        }
    }
}
