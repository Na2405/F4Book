import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'F4Book';
  constructor(private router: Router, private ac: ActivatedRoute) {
    // router.navigate(['home'])
  }
}
