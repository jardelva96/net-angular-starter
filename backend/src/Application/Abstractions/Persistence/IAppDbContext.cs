using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Application.Abstractions.Persistence;

public interface IAppDbContext
{
    DbSet<Project> Projects { get; }
    Task<int> SaveChangesAsync(CancellationToken ct = default);
}
