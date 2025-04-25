import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {

  constructor( private userService: UserService, private router: Router) { }

  korisnickoIme: string = '';
  lozinka: string = '';
  error: string = '';

  ngOnInit(): void {
  }

  login() {
    if (this.korisnickoIme == "" || this.lozinka == "") {
      this.error = "Nisu popunjena sva polja!";
      return;
    }
    this.error = "";
    this.userService.login(this.korisnickoIme, this.lozinka).subscribe(user => {
      if (!user) {
        this.error = "Pogrešni podaci!";
      }
      else {
        localStorage.setItem("ulogovan", JSON.stringify(user));
          if (user.tipKorisnika == "admin") {
            this.router.navigate(['/admin']);
          }
          else if (user.tipKorisnika == "dekorater" || user.tipKorisnika == "vlasnik") {
            this.error = "Samo admin može da se prijavi, molim Vas vratite se na prethodnu stranicu!";
          } else {
            this.error = "Nepoznat tip korisnika!";
          }
      }
    })
  }

}
