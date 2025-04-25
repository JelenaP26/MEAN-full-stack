import { Component } from '@angular/core';
import User from '../models/user';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-profile',
  templateUrl: './change-profile.component.html',
  styleUrls: ['./change-profile.component.css']
})
export class ChangeProfileComponent {

  ulogovan: User = new User();
  error: string = '';

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    let korisnik = localStorage.getItem('ulogovan');
    if (korisnik != null) this.ulogovan = JSON.parse(korisnik);
  }

  // logout(): void {
  //   localStorage.removeItem('ulogovan');
  //   this.router.navigate(['']);
  // }

  korisnickoIme: string = '';
  ime: string = '';
  prezime: string = '';
  adresa: string = '';
  telefon: string = '';
  email: string = '';
  brojKartice: string = '';
  profilnaSlika: string = '';

  errorReg: string = '';

  onFileChange(event: any): void {
    const file = event.target.files[0];
    
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const img = new Image();
        img.src = e.target.result;
        
        img.onload = () => {
          if (img.width >= 100 && img.width <= 300 && img.height >= 100 && img.height <= 300) {
            this.profilnaSlika = img.src;
          } else {
            alert('Slika mora biti između 100x100 px i 300x300 px.');
            this.profilnaSlika = ''; // Resetovanje prikaza slike
          }
        };
      };
      reader.readAsDataURL(file);
    } else {
      this.profilnaSlika = ''; // Korisnik nije izabrao sliku
    }
  }

  dinersRegex1 = /^(300|301|302|303)[0-9]{12}$/;
  dinersRegex2 = /^(36|38)[0-9]{13}$/;
  masterCardRegex = /5[1-5][0-9]{14}/;  // 51-55 i tacno 16 cifara
  visaRegex = /^(4539|4556|4916|4532|4929|4485|4716)[0-9]{12}/;

  cardIconClass: string = 'card-icon hidden'; // Početna klasa za ikonu

  updateCardIcon(brojKarticeReg: string) {
    // this.register(); // Pozovite register funkciju za proveru i ažuriranje ikone
    if (this.dinersRegex1.test(this.brojKartice)) {
      this.cardIconClass = 'card-icon diners';
      // this.slikaKaritce = '../../assets/diners.png';
      this.errorReg = '';
    } else if (this.dinersRegex2.test(this.brojKartice)) {
      this.cardIconClass = 'card-icon diners';
      this.errorReg = '';
    } else if (this.masterCardRegex.test(this.brojKartice)) {
      this.cardIconClass = 'card-icon mastercard';
      this.errorReg = ''; 
    } else if (this.visaRegex.test(this.brojKartice)) {
      this.cardIconClass = 'card-icon visa';
      this.errorReg = ''; 
    } else if (this.brojKartice == '') {
      this.cardIconClass = 'card-icon hidden';
      this.errorReg = '';
      return;
    } else {
      this.errorReg = 'Broj kartice nije u dobrom formatu! Kartica Diners počinje sa 300, 301, 302, 303, 36 ili 38 i ima ' +
      'tačno 15 cifara. Kartica MasterCard počinje sa 51, 52, 53, 54 ili 55 i ima tačno 16 cifara. Kartica Visa počinje sa ' +
      '4539, 4556, 4916, 4532, 4929, 4485, 4716 i ima tačno 16 cifara.';
      return;
    }
  }

  changeProfile() {
    this.updateCardIcon(this.brojKartice);
    this.korisnickoIme = this.korisnickoIme ? this.korisnickoIme : this.ulogovan.korisnickoIme;
    this.ime = this.ime ? this.ime : this.ulogovan.ime;
    this.prezime = this.prezime ? this.prezime : this.ulogovan.prezime;
    this.adresa = this.adresa ? this.adresa : this.ulogovan.adresa;
    this.telefon = this.telefon ? this.telefon : this.ulogovan.telefon;
    this.email = this.email ? this.email : this.ulogovan.email;
    this.profilnaSlika = this.profilnaSlika ? this.profilnaSlika : this.ulogovan.profilnaSlika;
    this.brojKartice = this.brojKartice ? this.brojKartice : this.ulogovan.brojKartice;

    this.userService.getUserByUsernameOthers(this.korisnickoIme, this.ulogovan._id).subscribe(user => {
      if (user) {
        alert('Korisničko ime već postoji!');
        return;
      } else {
        this.userService.getUserByEmailOthers(this.email, this.ulogovan._id).subscribe(user => {
          if (user) {
            alert('Email već postoji!');
            return;
          } else {
            this.userService.changeProfile(this.ulogovan.korisnickoIme, this.korisnickoIme, this.ime, this.prezime, this.adresa, this.telefon, this.email, 
              this.profilnaSlika, this.brojKartice).subscribe(resp => {
                if (resp == null) {
                  this.error = 'Greška prilikom izmene profila!';
                  return;
                }
                this.ulogovan.korisnickoIme = this.korisnickoIme ? this.korisnickoIme : this.ulogovan.korisnickoIme;
                // this.ulogovan.korisnickoIme = this.korisnickoIme;
                this.ulogovan.ime = this.ime ? this.ime : this.ulogovan.ime;
                this.ulogovan.prezime = this.prezime ? this.prezime : this.ulogovan.prezime;
                this.ulogovan.adresa = this.adresa ? this.adresa : this.ulogovan.adresa;
                this.ulogovan.telefon = this.telefon ? this.telefon : this.ulogovan.telefon;
                this.ulogovan.email = this.email ? this.email : this.ulogovan.email;
                this.ulogovan.profilnaSlika = this.profilnaSlika ? this.profilnaSlika : this.ulogovan.profilnaSlika;
                this.ulogovan.brojKartice = this.brojKartice ? this.brojKartice : this.ulogovan.brojKartice;
                localStorage.setItem('ulogovan', JSON.stringify(this.ulogovan));
                alert('Uspešno ste izmenili profil!');
                this.router.navigate(['vlasnik']);
              })
          }
        })
      }
    })
  }

}
