import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="container d-flex align-items-center justify-content-center">
      <router-outlet></router-outlet>
    </div>
  `
})
export class AppComponent {
  title = 'ordering-system';
}
