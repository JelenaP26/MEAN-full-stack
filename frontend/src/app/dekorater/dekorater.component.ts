import { Component } from '@angular/core';
import User from '../models/user';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dekorater',
  templateUrl: './dekorater.component.html',
  styleUrls: ['./dekorater.component.css']
})
export class DekoraterComponent {

  ulogovan: User = new User();
  error: string = '';

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    let korisnik = localStorage.getItem('ulogovan');
    if (korisnik != null) this.ulogovan = JSON.parse(korisnik);
  }

  logout(): void {
    localStorage.removeItem('ulogovan');
    this.router.navigate(['']);
  }

  korisnickoIme: string = '';
  ime: string = '';
  prezime: string = '';
  adresa: string = '';
  telefon: string = '';
  email: string = '';
  brojKartice: string = '';

  change() {
    this.router.navigate(['changeProfile']);
  }

  trenutnaLozinka: string = '';
  novaLozinka: string = '';
  novaLozinkaPonovljena = '';
  passwordChangeError: string = '';

  lozinkaRegex = /^(?=[a-zA-Z])(?=.*[A-Z])(?=(?:.*[a-z]){3})(?=.*[0-9])(?=.*[!@#$%^&*]).{6,10}$/;

  changePassword() {
    if (this.trenutnaLozinka == '' || this.novaLozinka == '' || this.novaLozinkaPonovljena == '') {
      this.passwordChangeError = 'Morate popuniti sva polja!';
      return;
    }
    this.passwordChangeError = '';
    if (this.trenutnaLozinka != this.ulogovan.lozinka) {
      this.passwordChangeError = 'Trenutna lozinka nije ispravna!';
      return;
    }
    this.passwordChangeError = '';
    if (!this.lozinkaRegex.test(this.novaLozinka)) {
      this.passwordChangeError = 'Lozinka neispravna - mora sadržati najmanje 6 karaktera, a najviše 10, od toga bar jedno veliko slovo, ' +
      'tri mala slova, jedan broj i jedan specijalni karakter.';
      return;
    }
    this.passwordChangeError = '';
    if (this.novaLozinka != this.novaLozinkaPonovljena) {
      this.passwordChangeError = 'Lozinke se ne poklapaju!';
      return;
    }
    this.passwordChangeError = '';

    // sad pozovi odg metodu iz servisa
    this.userService.changePassword(this.ulogovan.korisnickoIme, this.trenutnaLozinka, this.novaLozinka).subscribe(resp => {
      if (resp == null) {
        this.passwordChangeError = 'Greška prilikom promene lozinke!';
        return;
      }
      this.ulogovan.lozinka = this.novaLozinka;
      localStorage.setItem('ulogovan', JSON.stringify(this.ulogovan));
      alert('Uspešno ste promenili lozinku!');
      // window.location.reload();
      this.router.navigate(['']);
    })
  }

}
