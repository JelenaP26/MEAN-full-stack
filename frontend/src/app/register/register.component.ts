import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor( private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  korisnickoImeReg: string = '';
  lozinkaReg: string = '';
  ponovljenaLozinkaReg: string = '';
  imeReg: string = '';
  prezimeReg: string = '';
  polReg: string = '';
  adresaReg: string = '';
  telefonReg: string = '';
  emailReg: string = '';
  profilnaSlikaReg: string = '';
  brojKarticeReg: string = '';
  statusReg: string = '';
  errorReg: string = '';

  message: string = '';


  onFileChange(event: any): void {
    const file = event.target.files[0];
    
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const img = new Image();
        img.src = e.target.result;
        
        img.onload = () => {
          if (img.width >= 100 && img.width <= 300 && img.height >= 100 && img.height <= 300) {
            this.profilnaSlikaReg = img.src;
          } else {
            alert('Slika mora biti između 100x100 px i 300x300 px.');
            this.profilnaSlikaReg = ''; // Resetovanje prikaza slike
          }
        };
      };
      reader.readAsDataURL(file);
    } else {
      this.profilnaSlikaReg = ''; // Korisnik nije izabrao sliku
    }
  }

  lozinkaRegex = /^(?=[a-zA-Z])(?=.*[A-Z])(?=(?:.*[a-z]){3})(?=.*[0-9])(?=.*[!@#$%^&*]).{6,10}$/;
  

  dinersRegex1 = /^(300|301|302|303)[0-9]{12}$/;
  dinersRegex2 = /^(36|38)[0-9]{13}$/;
  masterCardRegex = /5[1-5][0-9]{14}/;  // 51-55 i tacno 16 cifara
  visaRegex = /^(4539|4556|4916|4532|4929|4485|4716)[0-9]{12}/;

  cardIconClass: string = 'card-icon hidden'; // Početna klasa za ikonu

  updateCardIcon(brojKarticeReg: string): boolean {
    if (this.dinersRegex1.test(this.brojKarticeReg)) {
      this.cardIconClass = 'card-icon diners';
      this.errorReg = '';
      return true;
    } else if (this.dinersRegex2.test(this.brojKarticeReg)) {
      this.cardIconClass = 'card-icon diners';
      this.errorReg = '';
      return true;
    } else if (this.masterCardRegex.test(this.brojKarticeReg)) {
      this.cardIconClass = 'card-icon mastercard';
      this.errorReg = ''; 
      return true;
    } else if (this.visaRegex.test(this.brojKarticeReg)) {
      this.cardIconClass = 'card-icon visa';
      this.errorReg = ''; 
      return true;
    } else {
      this.errorReg = 'Broj kartice nije u dobrom formatu! Kartica Diners počinje sa 300, 301, 302, 303, 36 ili 38 i ima ' +
      'tačno 15 cifara. Kartica MasterCard počinje sa 51, 52, 53, 54 ili 55 i ima tačno 16 cifara. Kartica Visa počinje sa ' +
      '4539, 4556, 4916, 4532, 4929, 4485, 4716 i ima tačno 16 cifara.';
      return false;
    }
  }

  register() {
    if (this.korisnickoImeReg == '' || this.lozinkaReg == '' || this.ponovljenaLozinkaReg == '' || this.imeReg == '' || this.prezimeReg == '' || this.polReg == '' || this.adresaReg == '' || this.telefonReg == '' || this.emailReg == '' || this.brojKarticeReg == '') {
      this.errorReg = 'Morate popuniti sva polja!';
      return;
    }
    this.errorReg = '';
    if (!this.lozinkaRegex.test(this.lozinkaReg)) {
      this.errorReg = 'Lozinka neispravna - mora sadržati najmanje 6 karaktera, a najviše 10, od toga bar jedno veliko slovo, ' +
      'tri mala slova, jedan broj i jedan specijalni karakter.';
      return;
    }
    this.errorReg = '';
    if (this.lozinkaReg != this.ponovljenaLozinkaReg) {
      this.errorReg = 'Lozinke se ne poklapaju!';
      return;
    }
    this.errorReg = '';

    const isCardValid =  this.updateCardIcon(this.brojKarticeReg);
    if (!isCardValid) {
    return; // Prekini ako kartica nije validna
   }

    this.errorReg = '';
    
    this.userService.getUserByUsername(this.korisnickoImeReg).subscribe(user => {
      if (user) {
        alert('Korisničko ime već postoji!');
        return;
      } else {
        this.userService.getUserByEmail(this.emailReg).subscribe(user => {
          if (user) {
            alert('Email već postoji!');
            return;
          } else {
            this.userService.register(this.korisnickoImeReg, this.lozinkaReg, this.imeReg, this.prezimeReg, this.adresaReg, this.polReg, 
            this.telefonReg, this.emailReg, this.profilnaSlikaReg, this.brojKarticeReg).subscribe(resp => {
              alert('Uspešno ste poslali zahtev za registraciju!');
              window.location.reload();
            })
          }
        })
      }
    })

  }


}
