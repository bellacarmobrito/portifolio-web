import { Component } from '@angular/core';
import { BtnPrimary } from '../btn-primary/btn-primary';

@Component({
  selector: 'app-header',
  imports: [BtnPrimary],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header { }
