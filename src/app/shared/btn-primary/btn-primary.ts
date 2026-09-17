import { Component, Input } from '@angular/core';

@Component({
  selector: 'btn-primary',
  imports: [],
  templateUrl: './btn-primary.html',
  styleUrl: './btn-primary.scss',
})
export class BtnPrimary {
  @Input() text: string = '';
  @Input() href?: string;
  @Input() download?: string
}
