import { Routes } from "@angular/router";
import { authGuard } from "./core/guards/auth.guard";

export const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "projects" },
  { path: "login", loadComponent: () => import("./features/auth/login.component").then(m => m.LoginComponent) },
  { path: "register", loadComponent: () => import("./features/auth/register.component").then(m => m.RegisterComponent) },
  { path: "projects", canActivate: [authGuard], loadComponent: () => import("./features/projects/projects-list.component").then(m => m.ProjectsListComponent) },
  { path: "projects/new", canActivate: [authGuard], loadComponent: () => import("./features/projects/project-create.component").then(m => m.ProjectCreateComponent) },
  { path: "**", redirectTo: "projects" }
];
