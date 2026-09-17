import { Component, Input } from '@angular/core';
import { TechIconService } from '../../services/tech-icon';
import { ThemeService } from '../../services/theme';

@Component({
  selector: 'app-technologies',
  imports: [],
  templateUrl: './technologies.html',
  styleUrl: './technologies.scss',
})
export class Technologies {
  @Input() technologies: string[] = [];

  constructor(protected techIcon: TechIconService, protected themeService: ThemeService) {}
}
