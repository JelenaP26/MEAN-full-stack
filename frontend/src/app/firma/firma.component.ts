import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { FirmService } from '../services/firm.service';
import { Router } from '@angular/router';
import Firm from '../models/firm';
import User from '../models/user';
import Service from '../models/service';
import { AppointmentService } from '../services/appointment.service';

@Component({
  selector: 'app-firma',
  templateUrl: './firma.component.html',
  styleUrls: ['./firma.component.css']
})
export class FirmaComponent {

  ulogovan: User = new User();
  firma: Firm = new Firm();
  error: string = '';

  currentStep: number = 0;
  steps: HTMLElement[] = [];

  constructor(private userService: UserService, private firmService: FirmService, 
    private appointmentService: AppointmentService, private router: Router) { }

  ngOnInit(): void {
    let korisnik = localStorage.getItem('ulogovan');
    if (korisnik != null) this.ulogovan = JSON.parse(korisnik);
    let f = localStorage.getItem('izabranaFirma');
    if (f != null) this.firma = JSON.parse(f);
    this.steps = Array.from(document.querySelectorAll('.step'));
    this.showStep(this.currentStep);
  }

  logout(): void {
    localStorage.removeItem('ulogovan');
    this.router.navigate(['']);
  }

  showStep(step: number): void {
    this.steps.forEach((s, index) => {
      s.classList.toggle('active', index === step);
    });
  }

  changeStep(step: number): void {
    if (this.currentStep + step >= 0 && this.currentStep + step < this.steps.length) {
      this.currentStep += step;
      this.showStep(this.currentStep);
    }
    if (this.currentStep === 2) {
      this.izabrane();
      if (this.datumVreme) {
        this.datumVremePrikaz = this.formatirajDatumVreme(new Date(this.datumVreme));
      }
    }
  }

  datumVreme: string = '';
  ukupnaKvadratura: number = 0;
  tipBaste: string = '';
  bazenKvadratura: number = 0;
  bazenBroj: number = 0;
  zeleniloKvadraturaP: number = 0;
  lezaljkeKvadratura: number = 0;
  fontanaKvadratura: number = 0;
  fontanaBroj: number = 0;
  zeleniloKvadraturaR: number = 0;
  brStolicaStolova: number = 0;
  dodatniZahtevi: string = '';
  izabraneUsluge: Service[] = [];
  izabraneNazivi: string[] = [];

  datumVremePrikaz: string = '';

  formatirajDatumVreme(datum: Date): string {
    const year = datum.getFullYear();
    const month = String(datum.getMonth() + 1).padStart(2, '0');
    const day = String(datum.getDate()).padStart(2, '0');
    const hours = String(datum.getHours()).padStart(2, '0');
    const minutes = String(datum.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}`;
  }
  
  izabrane() {
    this.izabraneUsluge = [];
    for (let u of this.firma.usluge) {
        if (u.checked) {
            let usluga = new Service();
            usluga.naziv = u.naziv;
            usluga.cena = u.cena;
            usluga.checked = true;
            this.izabraneUsluge.push(usluga);
        }
    }
    this.izabraneNazivi = [];
    for (let u of this.izabraneUsluge) {
        this.izabraneNazivi.push(u.naziv);
    }
  }

  potvrdi() {
    // provera datuma
    if (new Date(this.datumVreme) < new Date()) {
      this.error = "Datum i vreme moraju biti u budućnosti!";
      return;
    }
    this.error = '';

    let datum = new Date(this.datumVreme);
    if (datum.getDay() === 0 || datum.getDay() === 6) {
      this.error = "Firma ne radi vikendom!";
      return;
    }
    this.error = '';

    let radnoVremeStart = new Date(datum);
    radnoVremeStart.setHours(9, 0, 0);
    let radnoVremeEnd = new Date(datum);
    radnoVremeEnd.setHours(17, 0, 0);
    if (datum < radnoVremeStart || datum > radnoVremeEnd) {
      this.error = "Firma ne radi u tom vremenu. Radno vreme firme je svakog radnog dana 09:00 - 17:00!";
      return;
    }
    this.error = '';

    // provera unetih kvadratura i da li se poklapaju
    if (this.ukupnaKvadratura === 0) {
      this.error = "Unesite ukupnu kvadraturu!";
      return;
    }
    this.error = '';

    if (this.ukupnaKvadratura < 0) {
      this.error = "Ukupna kvadratura mora biti veća od 0!";
      return;
    }
    this.error = '';

    if (this.tipBaste === '') {
      this.error = "Izaberite tip bašte!";
      return;
    }
    this.error = '';

    if (this.bazenBroj < 0) {
      this.error = "Broj bazena ne može biti negativan!";
      return;
    }
    this.error = '';

    if (this.fontanaBroj < 0) {
      this.error = "Broj fontana ne može biti negativan!";
      return;
    }
    this.error = '';

    if (this.bazenKvadratura < 0 || this.zeleniloKvadraturaP < 0 || this.lezaljkeKvadratura < 0 
      || this.fontanaKvadratura < 0 || this.zeleniloKvadraturaR < 0 || this.brStolicaStolova < 0) {
        this.error = "Kvadrature ne mogu biti negativne!";
        return;
    }
    this.error = '';
    if (this.bazenKvadratura + this.zeleniloKvadraturaP + this.lezaljkeKvadratura > this.ukupnaKvadratura) {
      this.error = "Unete kvadrature se ne poklapaju sa unetom ukupnom kvadraturom!";
      return;
    }
    this.error = '';
    if (this.fontanaKvadratura + this.zeleniloKvadraturaR + this.brStolicaStolova > this.ukupnaKvadratura) {
      this.error = "Unete kvadrature se ne poklapaju sa unetom ukupnom kvadraturom!";
      return;
    }
    this.error = '';

    // da li ima slobodnih majstora
    if (this.firma.dekorateri.every(d => d.angazovan)) {
      this.error = "Nema slobodnih majstora!";
      return;
    }
    this.error = '';

    let datumIzradeGodina = datum.getFullYear();
    let datumIzradeMesec = String(datum.getMonth() + 1).padStart(2, '0');;
    let datumIzradeDan = String(datum.getDate()).padStart(2, '0');
    let datumIzradeSati = String(datum.getHours()).padStart(2, '0');
    let datumIzradeMinuti = String(datum.getMinutes()).padStart(2, '0');

    let datumIzrade = `${datumIzradeGodina}-${datumIzradeMesec}-${datumIzradeDan} ${datumIzradeSati}:${datumIzradeMinuti}`;
    
    let datumVremeZakazivanja = new Date();
    let datumVremeZakazivanjaGodina = datumVremeZakazivanja.getFullYear();
    let datumVremeZakazivanjaMesec = String(datumVremeZakazivanja.getMonth() + 1).padStart(2, '0');
    let datumVremeZakazivanjaDan = String(datumVremeZakazivanja.getDate()).padStart(2, '0');
    let datumVremeZakazivanjaSati = String(datumVremeZakazivanja.getHours()).padStart(2, '0');
    let datumVremeZakazivanjaMinuti = String(datumVremeZakazivanja.getMinutes()).padStart(2, '0');

    let datumZakazivanja = `${datumVremeZakazivanjaGodina}-${datumVremeZakazivanjaMesec}-${datumVremeZakazivanjaDan} ${datumVremeZakazivanjaSati}:${datumVremeZakazivanjaMinuti}`;
    let datumVremeNovo = '';

    let datumVremeKraja = new Date();
    let datumVremeKrajaGodina = datumVremeKraja.getFullYear();
    let datumVremeKrajaMesec = String(datumVremeKraja.getMonth() + 1).padStart(2, '0');
    let datumVremeKrajaDan = String(datumVremeKraja.getDate()).padStart(2, '0');
    let datumVremeKrajaSati = String(datumVremeKraja.getHours()).padStart(2, '0');
    let datumVremeKrajaMinuti = String(datumVremeKraja.getMinutes()).padStart(2, '0');

    let datumKraja = `${datumVremeKrajaGodina}-${datumVremeKrajaMesec}-${datumVremeKrajaDan} ${datumVremeKrajaSati}:${datumVremeKrajaMinuti}`;

    let tipTermina = 'zakazivanje';

    this.appointmentService.scheduleDecorating(this.firma.naziv, this.ulogovan.korisnickoIme, datumZakazivanja, datumVremeNovo, datumIzrade,
      this.tipBaste, this.ukupnaKvadratura, this.bazenKvadratura, this.bazenBroj, this.zeleniloKvadraturaP, this.lezaljkeKvadratura, 
      this.fontanaKvadratura, this.fontanaBroj, this.zeleniloKvadraturaR, this.brStolicaStolova, this.dodatniZahtevi, 
      this.izabraneNazivi, tipTermina).subscribe(resp => {
        alert('Uspešno ste zakazali termin!');
        window.location.reload();
      })
    }
  

}
