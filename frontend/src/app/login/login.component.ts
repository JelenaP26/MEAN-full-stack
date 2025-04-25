import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { FirmService } from '../services/firm.service';
import Firm from '../models/firm';
import Appointment from '../models/appointment';
import { AppointmentService } from '../services/appointment.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor( private userService: UserService, private firmService: FirmService, 
    private appointmentService: AppointmentService, private router: Router) { }

  korisnickoIme: string = '';
  lozinka: string = '';
  firme: Firm[] = [];
  zavrseniPoslovi: number = 0;
  vlasnici: number = 0;
  zakazivanja24h: number = 0;
  zakazivanja7dana: number = 0;
  zakazivanja30dana: number = 0;
  dekorateri: number = 0;
  error: string = '';

  ngOnInit(): void {
    this.firmService.getAllFirms().subscribe(firms => {
      this.firme = firms;
    })
    this.appointmentService.getAllAppointmentsDone().subscribe( appointments => {
      this.zavrseniPoslovi = appointments.length;
    })
    this.userService.getAllOwners().subscribe( owners => {
      this.vlasnici = owners.length;
    })
    this.userService.getAllDecorators().subscribe( decorators => {
      this.dekorateri = decorators.length;
    })
    this.appointmentService.getAppointmetsLast24h().subscribe( appointments => {
      this.zakazivanja24h = appointments.length;
    })
    this.appointmentService.getAppointmetsLast7d().subscribe( appointments => {
      this.zakazivanja7dana = appointments.length;
    })
    this.appointmentService.getAppointmetsLast30d().subscribe( appointments => {
      this.zakazivanja30dana = appointments.length;
    })
  }

  login() {
    if (this.korisnickoIme == "" || this.lozinka == "") {
      this.error = "Nisu popunjena sva polja!";
      return;
    }
    this.error = "";
    this.userService.login(this.korisnickoIme, this.lozinka).subscribe(user => {
      if (!user) {
        this.error = "Neispravni podaci ili Vaš status još uvek nije odobren!";
      }
      else {
        localStorage.setItem("ulogovan", JSON.stringify(user));
          if (user.tipKorisnika == "vlasnik") {
            this.router.navigate(['/vlasnik']);
          }
          else if (user.tipKorisnika == "dekorater") {
            this.router.navigate(['/dekorater']);
          } else if (user.tipKorisnika == "admin") {
            this.error = "Admin ima posebnu formu za prijavljivanje!";
          } else {
            this.error = "Nepoznat tip korisnika!";
          }
      }
    })
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

}
