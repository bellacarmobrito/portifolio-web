import { afterNextRender, Component, inject } from '@angular/core';
import { BtnPrimary } from '../btn-primary/btn-primary';
import { ThemeService } from '../../services/theme';

@Component({
  selector: 'app-header',
  imports: [BtnPrimary],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  themeService = inject(ThemeService);

  constructor() {
    afterNextRender(() => this.themeService.init());
  }
}
