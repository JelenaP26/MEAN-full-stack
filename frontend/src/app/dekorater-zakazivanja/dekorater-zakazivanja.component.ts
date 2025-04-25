import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import User from '../models/user';
import { Router } from '@angular/router';
import Firm from '../models/firm';
import { FirmService } from '../services/firm.service';
import Appointment from '../models/appointment';
import { AppointmentService } from '../services/appointment.service';

@Component({
  selector: 'app-dekorater-zakazivanja',
  templateUrl: './dekorater-zakazivanja.component.html',
  styleUrls: ['./dekorater-zakazivanja.component.css']
})
export class DekoraterZakazivanjaComponent {

  ulogovan: User = new User();
  firma: Firm = new Firm();
  zakazivanja: Appointment[] = [];
  potvrdjeniPoslovi: Appointment[] = [];
  error: string = '';

  constructor(private userService: UserService, private firmService: FirmService, 
    private appointmentService: AppointmentService, private router: Router) { }

  ngOnInit(): void {
    let korisnik = localStorage.getItem('ulogovan');
    if (korisnik != null) this.ulogovan = JSON.parse(korisnik);
    this.firmService.getFirmForDecorator(this.ulogovan.korisnickoIme).subscribe(firm => {
      this.firma = firm;
      this.appointmentService.getAppointmentsNotDoneForFirm(this.firma.naziv).subscribe(appointments => {
        this.zakazivanja = appointments;
        this.zakazivanja.sort((a, b) => {
          return Date.parse(a.datumVremeIzrade) - Date.parse(b.datumVremeIzrade);
        })
      })
    })
    this.appointmentService.getAcceptedAppointmentsForDecorator(this.ulogovan.korisnickoIme).subscribe(appointments => {
      this.potvrdjeniPoslovi = appointments
    })
  }

  logout(): void {
    localStorage.removeItem('ulogovan');
    this.router.navigate(['']);
  }

  obrazlozenje: string = '';

  accept(z: Appointment) {
    if (z.obrazlozenje != '') {
      this.error = 'Obrazloženje je potrebno uneti samo uz odbijanje posla!';
      return;
    }
    this.error = '';
    this.appointmentService.acceptAppointment(z.id, this.ulogovan.korisnickoIme).subscribe(resp => {
      alert('Zakazivanje prihvaćeno!');
      window.location.reload();
    })
  }

  deny(z: Appointment) {
    if (z.obrazlozenje == '') {
      this.error = 'Unesite obrazlozenje';
      return;
    }
    this.error = '';
    this.appointmentService.denyAppointment(z.id, z.obrazlozenje, this.ulogovan.korisnickoIme).subscribe(resp => {
      alert('Zakazivanje odbijeno!');
      window.location.reload();
    })
  }

  finish(z: Appointment) {
    let datumVremeZakazivanja = new Date();
    let datumVremeZakazivanjaGodina = datumVremeZakazivanja.getFullYear();
    let datumVremeZakazivanjaMesec = String(datumVremeZakazivanja.getMonth() + 1).padStart(2, '0');
    let datumVremeZakazivanjaDan = String(datumVremeZakazivanja.getDate()).padStart(2, '0');
    let datumVremeZakazivanjaSati = String(datumVremeZakazivanja.getHours()).padStart(2, '0');
    let datumVremeZakazivanjaMinuti = String(datumVremeZakazivanja.getMinutes()).padStart(2, '0');

    let datumZakazivanja = `${datumVremeZakazivanjaGodina}-${datumVremeZakazivanjaMesec}-${datumVremeZakazivanjaDan} ${datumVremeZakazivanjaSati}:${datumVremeZakazivanjaMinuti}`;
    
    this.appointmentService.finishAppointmet(z.id, datumZakazivanja).subscribe(resp => {
      alert('Posao završen!');
      window.location.reload();
    })

  }

}
