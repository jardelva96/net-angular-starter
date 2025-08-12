import { Component, inject, signal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule, FormBuilder, Validators } from "@angular/forms";
import { ProjectsService } from "../../core/services/projects.service";
import { Router } from "@angular/router";

@Component({
  standalone: true,
  selector: "app-project-create",
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: "./project-create.component.html"
})
export class ProjectCreateComponent {
  private fb = inject(FormBuilder);
  private svc = inject(ProjectsService);
  private router = inject(Router);

  loading = signal(false);
  error = signal<string | null>(null);

  form = this.fb.group({
    name: ["", [Validators.required, Validators.maxLength(200)]]
  });

  submit() {
    if (this.form.invalid) return;
    this.loading.set(true);
    this.error.set(null);
    this.svc.create(this.form.value.name!).subscribe({
      next: () => this.router.navigate(["/projects"]),
      error: () => { this.error.set("Failed to create project"); this.loading.set(false); }
    });
  }
}
