import { Component } from '@angular/core';
import User from '../models/user';
import Firm from '../models/firm';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { FirmService } from '../services/firm.service';

@Component({
  selector: 'app-vlasnik-firme',
  templateUrl: './vlasnik-firme.component.html',
  styleUrls: ['./vlasnik-firme.component.css']
})
export class VlasnikFirmeComponent {

  ulogovan: User = new User();
  firme: Firm[] = [];
  error: string = '';

  constructor(private userService: UserService, private firmService: FirmService, private router: Router) { }

  ngOnInit(): void {
    let korisnik = localStorage.getItem('ulogovan');
    if (korisnik != null) this.ulogovan = JSON.parse(korisnik);
    this.firmService.getAllFirms().subscribe(firms => {
      this.firme = firms;
    })
  }

  logout(): void {
    localStorage.removeItem('ulogovan');
    this.router.navigate(['']);
  }

  rating(firma: Firm) {
    if (firma.komentari.length == 0) return 0;
    let ocena = 0;
    let ukupnoOcena = firma.komentari.length;
    firma.komentari.forEach(x => {
      if (x.ocena == 0) ukupnoOcena -= 1;
      ocena += x.ocena;
    });
    ocena = ocena / ukupnoOcena;
    return ocena.toFixed(2);
  }

  sortByNameAsc() {
    this.firmService.getAllFirms().subscribe(firms => {
      this.firme = firms;
      this.firme.sort((f1, f2) => {
        if (f1.naziv > f2.naziv) return 1;
        if (f1.naziv < f2.naziv) return -1;
        return 0;
      })
    })
  }

  sortByNameDesc() {
    this.firmService.getAllFirms().subscribe(firms => {
      this.firme = firms;
      this.firme.sort((f1, f2) => {
        if (f1.naziv > f2.naziv) return -1;
        if (f1.naziv < f2.naziv) return 1;
        return 0;
      })
    })
  }

  sortByAddrAsc() {
    this.firmService.getAllFirms().subscribe(firms => {
      this.firme = firms;
      this.firme.sort((f1, f2) => {
        if (f1.adresa > f2.adresa) return 1;
        if (f1.adresa < f2.adresa) return -1;
        return 0;
      })
    })
  }

  sortByAddrDesc() {
    this.firmService.getAllFirms().subscribe(firms => {
      this.firme = firms;
      this.firme.sort((f1, f2) => {
        if (f1.adresa > f2.adresa) return -1;
        if (f1.adresa < f2.adresa) return 1;
        return 0;
      })
    })
  }

  searchByName: string = '';
  searchByAddr: string = '';
  
  firmePretraga: Firm[] = [];

  searchFirm() {
    this.firmService.searchFirm(this.searchByName, this.searchByAddr).subscribe(firms => {
      this.firme = firms;
    })
  }

  firmDetails(firm: Firm) {
    localStorage.setItem("izabranaFirma", JSON.stringify(firm));
  }

}
