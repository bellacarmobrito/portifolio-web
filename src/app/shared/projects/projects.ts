import { ProjectExtra, PROJECT_EXTRAS } from '../../types/project_extra.interface';
import { GithubService } from './../../services/github';
import { Repository } from './../../types/repository.interface';
import { Component, Input, Output, EventEmitter, signal, computed, effect } from '@angular/core';
import { FormatRepoNamePipe } from '../pipes/format-repo-name-pipe';
import { ThemeService } from '../../services/theme';
import { TechIconService } from '../../services/tech-icon';
import { EXTERNAL_PROJECTS, toRepository } from '../../types/external-project.interface';

@Component({
  selector: 'app-projects',
  imports: [FormatRepoNamePipe],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class Projects {

  @Input() error = false;
  @Output() visibleTechnologiesChange = new EventEmitter<string[]>();

  @Input() set repositories(repos: Repository[]) {
    const externalRepos = EXTERNAL_PROJECTS.map(toRepository);
    const merged = [...repos, ...externalRepos];

    this.languagesByRepo.update(map => {
      const next = { ...map };
      for (const project of EXTERNAL_PROJECTS) {
        next[project.name] = project.languages;
      }
      return next;
    })

    this._repositories.set(merged);
    merged.forEach(repo => this.loadLanguages(repo));
  }

  get repositories(): Repository[] {
    return this._repositories();
  }

  private _repositories = signal<Repository[]>([]);
  languagesByRepo = signal<Record<string, string[]>>({});

  constructor(
    private githubService: GithubService,
    protected themeService: ThemeService,
    protected techIcon: TechIconService,
  ) {
    effect(() => {
      const seen = new Set<string>();
      const combined: string[] = [];
      for (const repo of this.visibleRepositories()) {
        for (const tech of this.techFor(repo)) {
          const key = this.techIcon.slug(tech);
          if (!seen.has(key)) {
            seen.add(key);
            combined.push(tech);
          }
        }
      }
      this.visibleTechnologiesChange.emit(combined);
    });
  }

  private loadLanguages(repo: Repository): void {
    if (this.languagesByRepo()[repo.name]) return;
    this.githubService.getLanguages(repo.languages_url).subscribe({
      next: (langs) => this.languagesByRepo.update(map => ({ ...map, [repo.name]: langs })),
      error: () => this.languagesByRepo.update(map => ({ ...map, [repo.name]: [] })),
    })
  }

  extrasFor(repo: Repository): ProjectExtra {
    return PROJECT_EXTRAS[repo.name] ?? {};
  }

  techFor(repo: Repository): string[] {
    const languages = this.languagesByRepo()[repo.name] ?? [];
    const topics = repo.topics ?? [];

    const seen = new Set<string>();
    const combined: string[] = [];
    for (const tech of [...languages, ...topics]) {
      if (!tech) continue;
      const key = this.techIcon.slug(tech);
      if (!seen.has(key)) {
        seen.add(key);
        combined.push(tech);
      }
    }

    return this.techIcon.sortByIconAvailability(combined);
  }

  projectsWithLanguages = computed(() =>
    this._repositories().filter(repo => (this.languagesByRepo()[repo.name]?.length ?? 0) > 0)
  );

  visibleCount = signal(6);

  visibleRepositories = computed(() =>
    this.projectsWithLanguages().slice(0, this.visibleCount())
  );

  hasMore = computed(() => this.projectsWithLanguages().length > this.visibleCount());

  showMore(): void {
    this.visibleCount.update(v => v + 3);
  }
}
