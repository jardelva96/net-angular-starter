import { Component, inject, signal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";
import { ProjectsService } from "../../core/services/projects.service";
import { Project } from "../../core/models/project.models";

@Component({
  standalone: true,
  selector: "app-projects-list",
  imports: [CommonModule, RouterLink],
  templateUrl: "./projects-list.component.html"
})
export class ProjectsListComponent {
  private svc = inject(ProjectsService);
  projects = signal<Project[]>([]);
  loading = signal(true);

  constructor() { this.refresh(); }

  refresh() {
    this.loading.set(true);
    this.svc.list().subscribe({
      next: list => { this.projects.set(list); this.loading.set(false); },
      error: () => this.loading.set(false)
    });
  }
}
