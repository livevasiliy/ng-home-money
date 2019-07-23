import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { UsersService } from '../../shared/services/users.service';
import { AuthService } from '../../shared/services/auth.service';

import { User } from '../../shared/models/user.model';
import { Message } from '../../shared/models/message.model';

@Component({
  selector: 'vp-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  message: Message;

  ngOnInit() {
    this.message = new Message('danger', '');
    this.route.queryParams
      .subscribe((params: Params) => {
        if (params.nowCanLogin) {
          this.showMessage({
            type: 'success',
            text: 'Теперь вы можете зайти в систему'
          });
        }
      });
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }

  constructor(
    private userService: UsersService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  private showMessage(message: Message) {
    this.message = message;
    window.setTimeout(() => {
      this.message.text = '';
    }, 5000);
  }

  submitHandler() {
    const formData = this.form.value;

    this.userService.getUserByEmail(formData.email).subscribe((user: User) => {
      if (user) {
        if (user.password === formData.password) {
          this.message.text = '';
          window.localStorage.setItem('user', JSON.stringify(user));
          this.authService.login();
          // this.router.navigate(['']);
        } else {
          this.showMessage({type: 'danger', text: 'Не правильный логин или пароль'});
        }
      } else {
        this.showMessage({type: 'danger', text: 'Такого пользователя не существует'});
      }
    });
  }


}
