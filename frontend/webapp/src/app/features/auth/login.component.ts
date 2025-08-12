import { Component, inject, signal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule, FormBuilder, Validators } from "@angular/forms";
import { Router, RouterLink } from "@angular/router";
import { AuthService } from "../../core/services/auth.service";

@Component({
  standalone: true,
  selector: "app-login",
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: "./login.component.html"
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);
  loading = signal(false);
  error = signal<string | null>(null);

  form = this.fb.group({
    email: ["", [Validators.required, Validators.email]],
    password: ["", [Validators.required]]
  });

  submit() {
    if (this.form.invalid) return;
    this.loading.set(true);
    this.error.set(null);
    this.auth.login(this.form.value as any).subscribe({
      next: () => this.router.navigate(["/projects"]),
      error: () => { this.error.set("Invalid credentials"); this.loading.set(false); }
    });
  }
}
