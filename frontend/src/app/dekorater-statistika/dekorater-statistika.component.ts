import { Component } from '@angular/core';
import User from '../models/user';
import Firm from '../models/firm';
import Appointment from '../models/appointment';
import { UserService } from '../services/user.service';
import { AppointmentService } from '../services/appointment.service';
import { FirmService } from '../services/firm.service';
import { Router } from '@angular/router';
import { ChartOptions } from 'chart.js';
// import { ChartsModule } from 'ng2-charts';

@Component({
  selector: 'app-dekorater-statistika',
  templateUrl: './dekorater-statistika.component.html',
  styleUrls: ['./dekorater-statistika.component.css']
})
export class DekoraterStatistikaComponent {

  ulogovan: User = new User();
  firma: Firm = new Firm();
  zavrseniPoslovi: Appointment[] = [];
  error: string = '';

  barChartData: any = {
    labels: [], // Meseci
    datasets: [
      {
        label: 'Broj poslova',
        data: [] // Broj poslova po mesecima
      }
    ]
  };

  constructor(private userService: UserService, private firmService: FirmService, 
    private appointmentService: AppointmentService, private router: Router) { }

  
  ngOnInit(): void {
    let korisnik = localStorage.getItem('ulogovan');
    if (korisnik != null) this.ulogovan = JSON.parse(korisnik);
    this.appointmentService.getAllAppointmentsDoneForUser(this.ulogovan.korisnickoIme).subscribe(appointments => {
      this.zavrseniPoslovi = appointments;
      console.log(this.zavrseniPoslovi); // Dodaj ovo za logovanje
      this.prepareChartData();
    })
  }

  logout(): void {
    localStorage.removeItem('ulogovan');
    this.router.navigate(['']);
  }

  prepareChartData(): void {
    const monthCount = Array(12).fill(0);

    this.zavrseniPoslovi.forEach(posao => {
      const month = new Date(posao.datumVremeZakazivanja).getMonth();
      monthCount[month]++;
    });

    this.barChartData.labels = monthCount.map((_, index) => 
      new Date(0, index).toLocaleString('default', { month: 'long' })
    );
    this.barChartData.datasets[0].data = monthCount;
  }


}
