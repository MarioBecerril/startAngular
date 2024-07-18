import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {

  username: string = '';

  constructor(private userService: UserService,  private router: Router) {
    this.username = this.userService.getUsername();
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['/login']);
  }

}
