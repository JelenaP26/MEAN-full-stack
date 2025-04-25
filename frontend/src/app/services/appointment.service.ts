import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Appointment from '../models/appointment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(private http: HttpClient) { }

  uri = "http://localhost:4000/appointments";

  setDate(id: number, datumVremeZakazivanja: string) {
    let data = {
      id: id,
      datumVremeZakazivanja: datumVremeZakazivanja
    }
    return this.http.post(`${this.uri}/setDate`, data)
  }

  scheduleDecorating(firma: string, korisnik: string, datumVremeZakazivanja: string, datumVreme: string, datumVremeIzrade: string,
    tipBaste: string, ukupnaKvadratura: number, bazenKvadratura: number, bazenBroj: number, zeleniloKvadraturaP: number, 
    lezaljkeKvadratura: number, fontanaKvadratura: number, fontanaBroj: number, zeleniloKvadraturaR: number, brStolicaStolova: number, 
    dodatniZahtevi: string, izabraneUsluge: string[], tipTermina: string) {
      let data = {
        firma: firma, korisnik: korisnik, datumVremeZakazivanja: datumVremeZakazivanja, datumVreme: datumVreme, datumVremeIzrade: datumVremeIzrade, 
         tipBaste: tipBaste, ukupnaKvadratura: ukupnaKvadratura, bazenKvadratura: bazenKvadratura, 
         bazenBroj: bazenBroj, zeleniloKvadraturaP: zeleniloKvadraturaP, lezaljkeKvadratura: lezaljkeKvadratura, fontanaKvadratura: fontanaKvadratura, 
         fontanaBroj: fontanaBroj, zeleniloKvadraturaR: zeleniloKvadraturaR, brStolicaStolova: brStolicaStolova, 
         dodatniZahtevi: dodatniZahtevi, izabraneUsluge: izabraneUsluge, tipTermina: tipTermina
      }
      return this.http.post(`${this.uri}/scheduleDecorating`, data)
  }

  getAllAppointmentsDone() {
    return this.http.get<Appointment[]>(`${this.uri}/getAllAppointmentsDone`)
  }

  getAllAppointmentsDoneForOwner(korisnickoIme: string) {
    let data = {
      korisnickoIme: korisnickoIme
    }
    return this.http.post<Appointment[]>(`${this.uri}/getAllAppointmentsDoneForOwner`, data)
  }

  getAllAppointmentsNotDone() {
    return this.http.get<Appointment[]>(`${this.uri}/getAllAppointmentsNotDone`)
  }

  getAllAppointmentsNotDoneForUser(korisnickoIme: string) {
    let data = {
      korisnickoIme: korisnickoIme
    }
    return this.http.post<Appointment[]>(`${this.uri}/getAllAppointmentsNotDoneForUser`, data)
  }

  getAppointmentsNotDoneForFirm(firma: string) {
    let data = {
      firma: firma
    }
    return this.http.post<Appointment[]>(`${this.uri}/getAppointmentsNotDoneForFirm`, data)
  }

  acceptAppointment(id: number, korisnickoIme: string) {
    let data = {
      id: id,
      korisnickoIme: korisnickoIme
    }
    return this.http.post(`${this.uri}/acceptAppointment`, data)
  }

  denyAppointment(id: number, obrazlozenje: string, korisnickoIme: string) {
    let data = {
      id: id,
      obrazlozenje: obrazlozenje,
      korisnickoIme: korisnickoIme
    }
    return this.http.post(`${this.uri}/denyAppointment`, data)
  }

  getAcceptedAppointmentsForDecorator(korisnickoIme: string) {
    let data = {
      korisnickoIme: korisnickoIme
    }
    return this.http.post<Appointment[]>(`${this.uri}/getAcceptedAppointmentsForDecorator`, data)
  }

  finishAppointmet(id: number, datumVremeZavrsetka: string) {
    let data = {
      id: id,
      datumVremeZavrsetka: datumVremeZavrsetka
    }
    return this.http.post(`${this.uri}/finishAppointmet`, data)
  }

  getAppointmetsLast24h() {
    return this.http.get<Appointment[]>(`${this.uri}/getAppointmetsLast24h`)
  }

  getAppointmetsLast7d() {
    return this.http.get<Appointment[]>(`${this.uri}/getAppointmetsLast7d`)
  }

  getAppointmetsLast30d() {
    return this.http.get<Appointment[]>(`${this.uri}/getAppointmetsLast30d`)
  }

  getAppointmentsWaterServiceNotDoneForFirm(firma: string) {
    let data = {
      firma: firma
    }
    return this.http.post<Appointment[]>(`${this.uri}/getAppointmentsWaterServiceNotDoneForFirm`, data)
  }

  acceptWaterService(id: number, korisnickoIme: string, datumVremeZavrsetka: string) {
    let data = {
      id: id,
      korisnickoIme: korisnickoIme,
      datumVremeZavrsetka: datumVremeZavrsetka
    }
    return this.http.post(`${this.uri}/acceptWaterService`, data)
  }

  denyWaterService(id: number, korisnickoIme: string) {
    let data = {
      id: id,
      korisnickoIme: korisnickoIme
    }
    return this.http.post(`${this.uri}/denyWaterService`, data)
  }

  waterServiceInProgress() {
    return this.http.get<Appointment[]>(`${this.uri}/waterServiceInProgress`)
  }

  waterServiceInProgressForOwner(korisnickoIme: string) {
    let data = {
      korisnickoIme: korisnickoIme
    }
    return this.http.post<Appointment[]>(`${this.uri}/waterServiceInProgressForOwner`, data)
  }

  getAllAppointmentsDoneForUser(korisnickoIme: string) {
    let data = {
      korisnickoIme: korisnickoIme
    }
    return this.http.post<Appointment[]>(`${this.uri}/getAllAppointmentsDoneForUser`, data)
  }

}
