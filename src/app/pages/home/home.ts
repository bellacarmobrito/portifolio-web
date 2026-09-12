import { Component, OnInit } from '@angular/core';
import { Header } from "../../shared/header/header";
import { MainSection } from '../../shared/main-section/main-section';
import { GithubService } from '../../services/github';
import { Repository } from '../../types/repository.interface';
import { About } from '../../shared/about/about';
import { Projects } from '../../shared/projects/projects';

@Component({
  selector: 'app-home',
  imports: [Header, MainSection, About, Projects],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {

  repositories: Repository[] = [];
  reposError = false;

  constructor(private githubService: GithubService) { }

  ngOnInit(): void {
    this.githubService.getRepositories().subscribe({
      next: (repos) => this.repositories = repos,
      error: () => this.reposError = true
    })
  }
}
