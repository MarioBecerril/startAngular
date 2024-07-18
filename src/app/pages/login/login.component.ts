import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [CommonModule, FormsModule]
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private userService: UserService, private router: Router) { }

  login() {
    this.userService.login(this.username, this.password).subscribe(response => {
      if (response.success) {
        this.router.navigate(['/dashboard']);
      } else {
        this.errorMessage = 'Invalid credentials';
      }
    }, error => {
      this.errorMessage = 'Error logging in';
    });
  }
}
