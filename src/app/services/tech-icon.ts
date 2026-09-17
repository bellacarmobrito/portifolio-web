import { Injectable, signal } from '@angular/core';

type IconStage = 'skillicons' | 'simpleicons' | 'none';

const SKILLICONS_OVERRIDES: Record<string, string> = {
  dockerfile: 'docker',
  'jupyter-notebook': 'jupyter',
  'bootstrap5': 'bootstrap',
  'c#': 'cs',
  'c++': 'cpp',
};

const SKILLICONS_BLANK_SLUGS = new Set<string>([
  'plpgsql', 'oracle', 'signalr', 'jetpack-compose', 'retrofit', 'android',
]);

const SIMPLEICONS_OVERRIDES: Record<string, string> = {
  html: 'html5',
  'c#': 'csharp',
  'c++': 'cplusplus',
};
@Injectable({
  providedIn: 'root',
})
export class TechIconService {

  private stage = signal<Record<string, IconStage>>({});

  private baseSlug(tech: string): string {
    return tech.toLowerCase().replace(/[^a-z0-9#+]+/g, ' ').trim();
  }

  slug(tech: string): string {
    return this.baseSlug(tech);
  }

  private skillIconsSlug(tech: string): string {
    const s = this.baseSlug(tech).replace(/\s+/g, '-');
    return SKILLICONS_OVERRIDES[s] ?? s;
  }

  private simpleIconsSlug(tech: string): string {
    const s = this.baseSlug(tech).replace(/\s+/g, '');
    return SIMPLEICONS_OVERRIDES[s] ?? s;
  }

  private stageFor(tech: string): IconStage {
    const key = this.baseSlug(tech);
    const explicit = this.stage()[key];
    if (explicit) return explicit;
    return SKILLICONS_BLANK_SLUGS.has(this.skillIconsSlug(tech)) ? 'simpleicons' : 'skillicons';
  }

  hasIcon(tech: string): boolean {
    return this.stageFor(tech) !== 'none';
  }

  iconUrl(tech: string, theme: string): string {
    const stage = this.stageFor(tech);
    if (stage === 'simpleicons') {
      const color = theme === 'dark' ? 'F5F3FF' : '1B1730';
      return `https://cdn.simpleicons.org/${this.simpleIconsSlug(tech)}/${color}`;
    }
    return `https://skillicons.dev/icons?i=${this.skillIconsSlug(tech)}&theme=${theme}`;
  }

  onIconError(tech: string): void {
    const key = this.baseSlug(tech);
    const next: IconStage = this.stageFor(tech) === 'skillicons' ? 'simpleicons' : 'none';
    this.stage.update(stage => ({ ...stage, [key]: next }));
  }

  sortByIconAvailability(items: string[]): string[] {
    return [...items].sort((a, b) => Number(!this.hasIcon(a)) - Number(!this.hasIcon(b)));
  }
}
