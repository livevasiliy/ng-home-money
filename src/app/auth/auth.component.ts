import { Component, HostBinding, OnInit } from '@angular/core';
import { fadeStateTrigger } from '../shared/animations/fade.animations';
import { Router } from '@angular/router';

@Component({
  selector: 'vp-auth',
  templateUrl: './auth.component.html',
  animations: [fadeStateTrigger]
})
export class AuthComponent implements OnInit {

  @HostBinding('@fade') a = true;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.navigate(['/login']);
  }
}
