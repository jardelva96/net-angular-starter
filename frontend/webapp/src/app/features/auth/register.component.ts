import { Component, inject, signal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule, FormBuilder, Validators } from "@angular/forms";
import { Router, RouterLink } from "@angular/router";
import { AuthService } from "../../core/services/auth.service";

@Component({
  standalone: true,
  selector: "app-register",
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: "./register.component.html"
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);
  loading = signal(false);
  error = signal<string | null>(null);

  form = this.fb.group({
    email: ["", [Validators.required, Validators.email]],
    password: ["", [Validators.required, Validators.minLength(6)]]
  });

  submit() {
    if (this.form.invalid) return;
    this.loading.set(true);
    this.error.set(null);
    this.auth.register(this.form.value as any).subscribe({
      next: () => this.router.navigate(["/projects"]),
      error: () => { this.error.set("Registration failed"); this.loading.set(false); }
    });
  }
}
