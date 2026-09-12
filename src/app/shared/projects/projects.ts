import { ProjectExtra, PROJECT_EXTRAS } from '../../types/project_extra.interface';
import { GithubService } from './../../services/github';
import { Repository } from './../../types/repository.interface';
import { Component, Input, signal, computed } from '@angular/core';
import { FormatRepoNamePipe } from '../pipes/format-repo-name-pipe';
import { ThemeService } from '../../services/theme';

const LANGUAGE_ICON_OVERRIDES: Record<string, string> = {
  dockerfile: 'docker',
  'jupyter-notebook': 'jupyter',
};

const KNOWN_UNSUPPORTED_ICON_SLUGS = new Set<string>([
  'plpgsql',
]);

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
  iconFailed = signal(new Set<string>());

  constructor(private githubService: GithubService, protected themeService: ThemeService) { }

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

  iconSlug(lang: string): string {
    const slug = this.slug(lang);
    return LANGUAGE_ICON_OVERRIDES[slug] ?? slug;
  }

  onIconError(lang: string): void {
    this.iconFailed.update(failed => new Set(failed).add(lang));
  }

  hasIcon(lang: string): boolean {
    return !this.iconFailed().has(lang) && !KNOWN_UNSUPPORTED_ICON_SLUGS.has(this.iconSlug(lang));
  }

  languagesFor(repoName: string): string[] {
    const langs = this.languagesByRepo()[repoName] ?? [];
    return [...langs].sort((a, b) => Number(!this.hasIcon(a)) - Number(!this.hasIcon(b)));
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
