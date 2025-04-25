import { Component } from '@angular/core';
import User from '../models/user';
import { UserService } from '../services/user.service';
import { FirmService } from '../services/firm.service';
import { Router } from '@angular/router';
import Firm from '../models/firm';
import { AppointmentService } from '../services/appointment.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {

  ulogovan: User = new User();
  vlasnici: User[] = [];
  dekorateri: User[] = [];
  firme: Firm[] = [];
  vlasniciWaiting: User[] = [];
  error: string = '';


  constructor(private userService: UserService, private firmService: FirmService, 
    private appointmentService: AppointmentService, private router: Router) { }

  ngOnInit(): void {
    let korisnik = localStorage.getItem('ulogovan');
    if (korisnik != null) this.ulogovan = JSON.parse(korisnik);
    this.userService.getAllOwners().subscribe((users) => {
      this.vlasnici = users;
    });
    this.userService.getAllDecorators().subscribe((users) => {
      this.dekorateri = users;
    });
    this.firmService.getAllFirms().subscribe((firms) => {
      this.firme = firms;
    });
    this.userService.getallOwnersWaiting().subscribe((users) => {
      this.vlasniciWaiting = users;
    });
    // let f = localStorage.getItem('izabranaFirma');
    // if (f != null) this.firma = JSON.parse(f);
  }

  logout(): void {
    localStorage.removeItem('ulogovan');
    this.router.navigate(['']);
  }

  acceptOwner(v: User) {
    this.userService.acceptOwner(v.korisnickoIme).subscribe(resp => {
      alert('Korisnik prihvaćen!');
      window.location.reload();
    })
  }

  denyOwner(v: User) {
    this.userService.denyOwner(v.korisnickoIme).subscribe(resp => {
      alert('Korisnik odbijen!');
      window.location.reload();
    })
  }


}
