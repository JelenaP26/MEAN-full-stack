import { Component } from '@angular/core';
import { FirmService } from '../services/firm.service';
import { Router } from '@angular/router';
import Service from '../models/service';
import Decorator from '../models/decorator';
import User from '../models/user';
import { UserService } from '../services/user.service';
import Comment from '../models/comment';

@Component({
  selector: 'app-nova-firma',
  templateUrl: './nova-firma.component.html',
  styleUrls: ['./nova-firma.component.css']
})
export class NovaFirmaComponent {

  constructor(private userService: UserService, private firmService: FirmService, private router: Router) { }

  naziv: string = '';
  adresa: string = '';
  usluge: string = '';
  // dekorateri: string = '';
  dekorateri: User[] = [];
  dekorateriSlanje: Decorator[] = [];
  telefon: string = '';
  komentari: Comment[] = [];
  error: string = '';

  uslugeLista: Service[] = [];
  // dekorateriLista: Decorator[] = [];

  ngOnInit(): void {
    this.userService.getAllDecoratorsWaitingForJob().subscribe((data: User[]) => {
      this.dekorateri = data;
    })
  }

  addNewFirm() {
    if (this.naziv === '' || this.adresa === '' || this.telefon === '' || this.usluge === '') {
      this.error = 'Morate popuniti sva polja!';
      return;
    }
    this.error = '';

    const uslugeRazdvoj = this.usluge.split(',').map(item => item.trim()).filter(item => item);

    const checkedCount = this.dekorateri.filter(option => option.checked).length;

    if (checkedCount < 2) {
      this.error = 'Morate označiti najmanje dve opcije!';
      return;
    } else {

      for (const usluga of uslugeRazdvoj) {
        const parts = usluga.split('-').map(part => part.trim());
        if (parts.length !== 2 || isNaN(Number(parts[1]))) {
          this.error = `Neispravan format: "${usluga}". Koristite "naziv - cena".`;
          return;
        }
  
        let novaUsluga = new Service();
        novaUsluga.naziv = parts[0];
        novaUsluga.cena = Number(parts[1]);
        this.uslugeLista.push(novaUsluga);
      }

      for (let d of this.dekorateri) {
        if (d.checked) {
            let dekorater = new Decorator();
            dekorater.korisnickoIme = d.korisnickoIme;
            dekorater.ime = d.ime;
            dekorater.prezime = d.prezime;
            this.dekorateriSlanje.push(dekorater);
            this.userService.setFirmName(d.korisnickoIme, this.naziv).subscribe(resp => {
              console.log('Firma postavljena');
            })
        }
      }
      
      this.firmService.addNewFirm(this.naziv, this.adresa, this.uslugeLista, this.dekorateriSlanje, this.telefon, this.komentari).subscribe(resp => {
        alert('Uspešno ste dodali novu firmu!');
        window.location.reload();
      });

    }
  }

}
