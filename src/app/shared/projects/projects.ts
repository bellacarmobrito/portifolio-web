import { ProjectExtra, PROJECT_EXTRAS } from '../../types/project_extra.interface';
import { GithubService } from './../../services/github';
import { Repository } from './../../types/repository.interface';
import { Component, Input, signal, computed } from '@angular/core';
import { FormatRepoNamePipe } from '../pipes/format-repo-name-pipe';


@Component({
  selector: 'app-projects',
  imports: [FormatRepoNamePipe],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class Projects {

  @Input() error = false;

  @Input() set repositories(repos: Repository[]) {
    this._repositories.set(repos);
    repos.forEach(repo => this.loadLanguages(repo));
  }

  get repositories(): Repository[] {
    return this._repositories();
  }

  private _repositories = signal<Repository[]>([]);
  languagesByRepo = signal<Record<string, string[]>>({});
  iconFailed = new Set<string>();

  constructor(private githubService: GithubService) { }

  private loadLanguages(repo: Repository): void {
    if (this.languagesByRepo()[repo.name]) return;
    this.githubService.getLanguages(repo.languages_url).subscribe({
      next: (langs) => this.languagesByRepo.update(map => ({ ...map, [repo.name]: langs })),
      error: () => this.languagesByRepo.update(map => ({ ...map, [repo.name]: [] })),
    })
  }

  slug(lang: string): string {
    return lang.toLowerCase().replace(/[^a-z0-9]/g, '-');
  }

  onIconError(lang: string): void {
    this.iconFailed.add(lang)
  }

  extrasFor(repo: Repository): ProjectExtra {
    return PROJECT_EXTRAS[repo.name] ?? {};
  }

  projectsWithLanguages = computed(() =>
    this._repositories().filter(repo => (this.languagesByRepo()[repo.name]?.length ?? 0) > 0)
  );

  visibleCount = signal(3);

  visibleRepositories = computed(() =>
    this.projectsWithLanguages().slice(0, this.visibleCount())
  );

  hasMore = computed(() => this.projectsWithLanguages().length > this.visibleCount());

  showMore(): void {
    this.visibleCount.update(v => v + 3);
  }
}
