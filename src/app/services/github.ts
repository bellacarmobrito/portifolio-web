import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Repository } from '../types/repository.interface';
import { Observable } from 'rxjs';

export const GITHUB_API_URL = 'https://api.github.com/users/bellacarmobrito/repos';

@Injectable({
  providedIn: 'root',
})
export class GithubService {

  constructor(private http: HttpClient) { }

  getRepositories(): Observable<Repository[]> {
    return this.http.get<Repository[]>(GITHUB_API_URL)
  }
}