import { Injectable, signal } from '@angular/core';

const LANGUAGE_ICON_OVERRIDES: Record<string, string> = {
  dockerfile: 'docker',
  'jupyter-notebook': 'jupyter',
};

const KNOWN_UNSUPPORTED_ICON_SLUGS = new Set<string>([
  'plpgsql',
]);

@Injectable({
  providedIn: 'root',
})
export class TechIconService {

  private iconFailed = signal(new Set<string>());

  slug(tech: string): string {
    return tech.toLowerCase().replace(/[^a-z0-9]/g, '-');
  }

  iconSlug(tech: string): string {
    const slug = this.slug(tech);
    return LANGUAGE_ICON_OVERRIDES[slug] ?? slug;
  }

  hasIcon(tech: string): boolean {
    return !this.iconFailed().has(tech) && !KNOWN_UNSUPPORTED_ICON_SLUGS.has(this.iconSlug(tech));
  }

  onIconError(tech: string): void {
    this.iconFailed.update(failed => new Set(failed).add(tech));
  }

  iconUrl(tech: string, theme: string): string {
    return `https://skillicons.dev/icons?i=${this.iconSlug(tech)}&theme=${theme}`;
  }

  sortByIconAvailability(items: string[]): string[] {
    return [...items].sort((a, b) => Number(!this.hasIcon(a)) - Number(!this.hasIcon(b)));
  }
}
