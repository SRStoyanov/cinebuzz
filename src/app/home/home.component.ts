// src/app/home/home.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
    <div class="bg-gray-800 min-h-screen">
      <app-hero></app-hero>
      <app-latest-reviews></app-latest-reviews>
    </div>
  `,
})
export class HomeComponent {}
