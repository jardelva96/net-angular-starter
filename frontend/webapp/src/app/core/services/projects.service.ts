import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Project } from '../models/project.models';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProjectsService {
  private http = inject(HttpClient);
  private base = `${environment.apiBaseUrl}/api/projects`;

  list(search = '', page = 1, pageSize = 10): Observable<Project[]> {
    const params = new HttpParams()
      .set('search', search)
      .set('page', page)
      .set('pageSize', pageSize);
    return this.http.get<Project[]>(this.base, { params });
  }

  create(name: string): Observable<Project> {
    return this.http.post<Project>(this.base, { name });
  }
}
