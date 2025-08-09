using Application.Abstractions.Persistence;
using Domain.Entities;
using Microsoft.AspNetCore.Mvc;
using WebApi.Contracts;
using Microsoft.AspNetCore.Authorization;


namespace WebApi.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class ProjectsController : ControllerBase
{
    private readonly IAppDbContext _db;
    public ProjectsController(IAppDbContext db) => _db = db;

    // GET /api/projects?search=&page=1&pageSize=10
    [AllowAnonymous]
    [HttpGet]
    [ProducesResponseType(typeof(IEnumerable<ProjectResponse>), StatusCodes.Status200OK)]
    public IActionResult Get([FromQuery] string? search, [FromQuery] int page = 1, [FromQuery] int pageSize = 10)
    {
        if (page <= 0) page = 1;
        if (pageSize <= 0 || pageSize > 100) pageSize = 10;

        var q = _db.Projects.AsQueryable();
        if (!string.IsNullOrWhiteSpace(search))
            q = q.Where(p => p.Name.Contains(search));

        var items = q
            .OrderByDescending(p => p.CreatedAt)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .Select(p => new ProjectResponse(p.Id, p.Name, p.CreatedAt))
            .ToList();

        return Ok(items);
    }

    // POST /api/projects  -> 201 Created
    [HttpPost]
    [ProducesResponseType(typeof(ProjectResponse), StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Create([FromBody] CreateProjectRequest req, CancellationToken ct)
    {
        if (string.IsNullOrWhiteSpace(req.Name))
            return BadRequest(new { error = "Name is required" });

        var entity = new Project { Name = req.Name, OwnerId = Guid.Empty };
        _db.Projects.Add(entity);
        await _db.SaveChangesAsync(ct);

        var dto = new ProjectResponse(entity.Id, entity.Name, entity.CreatedAt);
        return CreatedAtAction(nameof(Get), new { id = entity.Id }, dto);
    }
}
