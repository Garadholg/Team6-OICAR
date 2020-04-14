namespace WebServis.Models.Registration
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class LoginCredentials
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public LoginCredentials()
        {
            RegisteredUser = new HashSet<RegisteredUser>();
        }

        [Key]
        public int IDLoginCredentials { get; set; }

        [Required]
        [StringLength(64)]
        public string Username { get; set; }

        [Required]
        public string Pwd { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<RegisteredUser> RegisteredUser { get; set; }
    }
}
