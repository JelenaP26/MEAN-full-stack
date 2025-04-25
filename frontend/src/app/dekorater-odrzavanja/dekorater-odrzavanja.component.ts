import { Component } from '@angular/core';
import User from '../models/user';
import Firm from '../models/firm';
import Appointment from '../models/appointment';
import { AppointmentService } from '../services/appointment.service';
import { UserService } from '../services/user.service';
import { FirmService } from '../services/firm.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dekorater-odrzavanja',
  templateUrl: './dekorater-odrzavanja.component.html',
  styleUrls: ['./dekorater-odrzavanja.component.css']
})
export class DekoraterOdrzavanjaComponent {

  ulogovan: User = new User();
  firma: Firm = new Firm();
  odrzavanja: Appointment[] = [];
  // potvrdjeniPoslovi: Appointment[] = [];
  error: string = '';

  constructor(private userService: UserService, private firmService: FirmService, 
    private appointmentService: AppointmentService, private router: Router) { }

  ngOnInit(): void {
    let korisnik = localStorage.getItem('ulogovan');
    if (korisnik != null) this.ulogovan = JSON.parse(korisnik);
    this.firmService.getFirmForDecorator(this.ulogovan.korisnickoIme).subscribe(firm => {
      this.firma = firm;
      this.appointmentService.getAppointmentsWaterServiceNotDoneForFirm(this.firma.naziv).subscribe(appointments => {
        this.odrzavanja = appointments;
      })
    })
  }

  logout(): void {
    localStorage.removeItem('ulogovan');
    this.router.navigate(['']);
  }

  acceptWaterService(o: Appointment): void {
    if (!o.datumVremeZavrsetka) {
      this.error = 'Ne možete prihvatiti uslugu dok ne postavite datum završetka.';
      return;
    }
    this.error = '';
    this.appointmentService.acceptWaterService(o.id, this.ulogovan.korisnickoIme, o.datumVremeZakazivanja).subscribe(resp => {
      alert('Prihvatili ste termin!');
      window.location.reload();
    })
  }

  denyWaterService(o: Appointment): void {
    if (o.datumVremeZavrsetka) {
      this.error = 'Nije potrebno da unosite datum završetka.';
      return;
    }
    this.error = '';
    this.appointmentService.denyWaterService(o.id, this.ulogovan.korisnickoIme).subscribe(resp => {
      alert('Odbili ste termin!');
      window.location.reload();
    })
  }

}
