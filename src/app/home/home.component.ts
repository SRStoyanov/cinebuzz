// src/app/home/home.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
    <app-hero></app-hero>
    <app-latest-reviews></app-latest-reviews>
  `,
})
export class HomeComponent {}
