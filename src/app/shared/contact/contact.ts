import { Component } from '@angular/core';
import { BtnPrimary } from '../btn-primary/btn-primary';

type ContactLink = {
  key: 'email' | 'linkedin' | 'github' | 'whatsapp';
  href: string;
  label: string;
};

@Component({
  selector: 'app-contact',
  imports: [BtnPrimary],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
  readonly links: ContactLink[] = [
    { key: 'email', href: 'mailto:isadocarmo7@gmail.com', label: 'E-mail' },
    { key: 'linkedin', href: 'https://www.linkedin.com/in/isabellabrito1', label: 'LinkedIn' },
    { key: 'github', href: 'https://github.com/bellacarmobrito', label: 'GitHub' },
    { key: 'whatsapp', href: 'https://wa.me/5511994583344', label: 'WhatsApp' },
  ];
}
