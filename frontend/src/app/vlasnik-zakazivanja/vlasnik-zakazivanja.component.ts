import { Component } from '@angular/core';
import User from '../models/user';
import Firm from '../models/firm';
import { UserService } from '../services/user.service';
import { FirmService } from '../services/firm.service';
import { Router } from '@angular/router';
import Appointment from '../models/appointment';
import { AppointmentService } from '../services/appointment.service';

@Component({
  selector: 'app-vlasnik-zakazivanja',
  templateUrl: './vlasnik-zakazivanja.component.html',
  styleUrls: ['./vlasnik-zakazivanja.component.css']
})
export class VlasnikZakazivanjaComponent {

  ulogovan: User = new User();
  zakazivanja: Appointment[] = [];
  arhiva: Appointment[] = [];
  error: string = '';

  constructor(private userService: UserService, private firmService: FirmService,
    private appointmentService: AppointmentService, private router: Router) { }

  ngOnInit(): void {
    let korisnik = localStorage.getItem('ulogovan');
    if (korisnik != null) this.ulogovan = JSON.parse(korisnik);
    this.appointmentService.getAllAppointmentsNotDoneForUser(this.ulogovan.korisnickoIme).subscribe(a => {
      this.zakazivanja = a;
    })
    this.appointmentService.getAllAppointmentsDoneForOwner(this.ulogovan.korisnickoIme).subscribe(a => {
      this.arhiva = a;
    })
  }


  logout(): void {
    localStorage.removeItem('ulogovan');
    this.router.navigate(['']);
  }

  addCommentRate() {
    
  }

}
