import { Component } from '@angular/core';
import { AppointmentService } from '../services/appointment.service';
import { UserService } from '../services/user.service';
import { FirmService } from '../services/firm.service';
import { Router } from '@angular/router';
import Appointment from '../models/appointment';
import User from '../models/user';
import Firm from '../models/firm';

@Component({
  selector: 'app-vlasnik-odrzavanje',
  templateUrl: './vlasnik-odrzavanje.component.html',
  styleUrls: ['./vlasnik-odrzavanje.component.css']
})
export class VlasnikOdrzavanjeComponent {

  ulogovan: User = new User();
  firma: Firm = new Firm();
  zakazivanja: Appointment[] = [];
  arhiva: Appointment[] = [];
  error: string = '';

  constructor(private userService: UserService, private firmService: FirmService,
    private appointmentService: AppointmentService, private router: Router) { }

  ngOnInit(): void {
    let korisnik = localStorage.getItem('ulogovan');
    if (korisnik != null) this.ulogovan = JSON.parse(korisnik);
    let f = localStorage.getItem('izabranaFirma');
    if (f != null) this.firma = JSON.parse(f);
    this.appointmentService.waterServiceInProgressForOwner(this.ulogovan.korisnickoIme).subscribe(z => {
      this.zakazivanja = z;
    })
    this.appointmentService.getAllAppointmentsDoneForOwner(this.ulogovan.korisnickoIme).subscribe(a => {
      this.arhiva = a;
    })
  }


  logout(): void {
    localStorage.removeItem('ulogovan');
    this.router.navigate(['']);
  }

  // datumVreme: string = '';
  usluga: string[] = [];

  waterService(a: Appointment) {
    this.error = '';

    let datum = new Date();
    let datumGodina = datum.getFullYear();

    let datumKraja = new Date(a.datumVremeZavrsetka);
    let datumKrajaGodina = datumKraja.getFullYear();

    let godinaRazlika = datumGodina - datumKrajaGodina;
    let mesecRazlika = datum.getMonth() - datumKraja.getMonth();

    let datumVremeZakazivanja = new Date();
    let datumVremeZakazivanjaGodina = datumVremeZakazivanja.getFullYear();
    let datumVremeZakazivanjaMesec = String(datumVremeZakazivanja.getMonth() + 1).padStart(2, '0');
    let datumVremeZakazivanjaDan = String(datumVremeZakazivanja.getDate()).padStart(2, '0');
    let datumVremeZakazivanjaSati = String(datumVremeZakazivanja.getHours()).padStart(2, '0');
    let datumVremeZakazivanjaMinuti = String(datumVremeZakazivanja.getMinutes()).padStart(2, '0');

    let datumZakazivanja = `${datumVremeZakazivanjaGodina}-${datumVremeZakazivanjaMesec}-${datumVremeZakazivanjaDan} ${datumVremeZakazivanjaSati}:${datumVremeZakazivanjaMinuti}`;
    let datumVreme = datumZakazivanja;

    let datumVremeIzrade = new Date(a.datumVreme);
  
    // provera datuma
    if (new Date(a.datumVreme) < new Date()) {
      this.error = "Datum i vreme moraju biti u budućnosti!";
      return;
    }
    this.error = '';

    if (datumVremeIzrade.getDay() === 0 || datumVremeIzrade.getDay() === 6) {
      this.error = "Firma ne radi vikendom!";
      return;
    }
    this.error = '';

    let radnoVremeStart = new Date(datumVremeIzrade);
    radnoVremeStart.setHours(9, 0, 0);
    let radnoVremeEnd = new Date(datumVremeIzrade);
    radnoVremeEnd.setHours(17, 0, 0);
    if (datumVremeIzrade < radnoVremeStart || datumVremeIzrade > radnoVremeEnd) {
      this.error = "Firma ne radi u tom vremenu. Radno vreme firme je svakog radnog dana 09:00 - 17:00!";
      return;
    }
    this.error = '';

    let datumIzradeGodina = datumVremeIzrade.getFullYear();
    let datumIzradeMesec = String(datumVremeIzrade.getMonth() + 1).padStart(2, '0');;
    let datumIzradeDan = String(datumVremeIzrade.getDate()).padStart(2, '0');
    let datumIzradeSati = String(datumVremeIzrade.getHours()).padStart(2, '0');
    let datumIzradeMinuti = String(datumVremeIzrade.getMinutes()).padStart(2, '0');

    let datumIzrade = `${datumIzradeGodina}-${datumIzradeMesec}-${datumIzradeDan} ${datumIzradeSati}:${datumIzradeMinuti}`;

    let tipTermina = 'odrzavanje';

    if (!a.datumVreme) {
      this.error = 'Morate uneti datum i vreme izrade!';
      return;
    }

    if (godinaRazlika * 12 + mesecRazlika < 6) {
      this.error = 'Održavanje vodenih površina se vrši nakon 6 meseci od poslednjeg zakazanog termina!';
      return;
    } 
    // else if (a.datumVreme == '') {
    //   this.error = 'Morate uneti datum i vreme izrade!';
    //   return;
    // } 
    else {
      this.usluga.push('Održavanje vodenih površina');
      this.appointmentService.setDate(a.id, a.datumVremeZakazivanja).subscribe(resp => {
        this.appointmentService.scheduleDecorating(this.firma.naziv, this.ulogovan.korisnickoIme, datumZakazivanja, datumVreme, datumIzrade, 
          a.tipBaste, a.ukupnaKvadratura, a.bazenKvadratura, a.bazenBroj, a.zeleniloKvadraturaP, a.lezaljkeKvadratura,
          a.fontanaKvadratura, a.fontanaBroj, a.zeleniloKvadraturaR, a.brStolicaStolova, a.dodatniZahtevi, this.usluga, tipTermina).subscribe(resp => {
            alert('Uspešno ste zakazali održavanje vodene površine!');
            window.location.reload();
        })
      })
    }
    this.appointmentService.waterServiceInProgress().subscribe(z => {
      this.zakazivanja = z;
    })
  }

}
