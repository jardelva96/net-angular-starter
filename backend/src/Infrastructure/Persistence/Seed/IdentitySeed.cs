using Infrastructure.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace Infrastructure.Persistence.Seed;

public static class IdentitySeed
{
    public static async Task RunAsync(IServiceProvider sp)
    {
        using var scope = sp.CreateScope();
        var roleMgr = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole<Guid>>>();
        var userMgr = scope.ServiceProvider.GetRequiredService<UserManager<ApplicationUser>>();

        var adminRole = "admin";
        if (!await roleMgr.Roles.AnyAsync(r => r.Name == adminRole))
            await roleMgr.CreateAsync(new IdentityRole<Guid>(adminRole));

        var email = "admin@local";
        var user = await userMgr.FindByEmailAsync(email);
        if (user is null)
        {
            user = new ApplicationUser { UserName = email, Email = email, EmailConfirmed = true };
            await userMgr.CreateAsync(user, "Admin123!");
            await userMgr.AddToRoleAsync(user, adminRole);
        }
    }
}
