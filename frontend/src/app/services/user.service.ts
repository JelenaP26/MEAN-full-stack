import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import User from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  uri = "http://localhost:4000/users";

  login(korisnickoIme: string, lozinka: string) {
    let data = {
      korisnickoIme: korisnickoIme, lozinka: lozinka
    }
    return this.http.post<User>(`${this.uri}/login`, data)
  }

  getUserByUsername(korisnickoIme: string) {
    let data = {
      korisnickoIme: korisnickoIme
    }
    return this.http.post<User>(`${this.uri}/getUserByUsername`, data)
  }

  getUserByEmail(email: string) {
    let data = {
      email: email
    }
    return this.http.post<User>(`${this.uri}/getUserByEmail`, data)
  }

  register(korisnickoImeReg: string, lozinkaReg: string, imeReg: string, prezimeReg: string, adresaReg: string, polReg: string, 
  telefonReg: string, emailReg: string, profilnaSlikaReg: string, brojKarticeReg: string) {
    let data = {
      korisnickoIme: korisnickoImeReg, lozinka: lozinkaReg, ime: imeReg, prezime: prezimeReg, pol: polReg, adresa: adresaReg,
      telefon: telefonReg, email: emailReg, profilnaSlika: profilnaSlikaReg, brojKartice: brojKarticeReg
    }
    return this.http.post(`${this.uri}/register`, data)
  }

  changePassword(korisnickoIme: string, trenutnaLozinka: string, novaLozinka: string) {
    let data = {
      korisnickoIme: korisnickoIme, trenutnaLozinka: trenutnaLozinka, novaLozinka: novaLozinka
    }
    return this.http.post<User>(`${this.uri}/changePassword`, data)
  }

  changeProfile(trenKorIme: string, korisnickoIme: string, ime: string, prezime: string, adresa: string, telefon: string, email: string,
     profilnaSlika: string, brojKartice: string) {
      let data = {
        trenKorIme: trenKorIme, korisnickoIme: korisnickoIme, ime: ime, prezime: prezime, adresa: adresa, telefon: telefon, email: email,
        profilnaSlika: profilnaSlika, brojKartice: brojKartice
      }
      return this.http.post<User>(`${this.uri}/changeProfile`, data)
  }
  
  getUserByUsernameOthers(korisnickoIme: string, _id: string) {
    let data = {
      korisnickoIme: korisnickoIme, _id: _id
    }
    return this.http.post<User>(`${this.uri}/getUserByUsernameOthers`, data)
  }

  getUserByEmailOthers(email: string, _id: string) {
    let data = {
      email: email, _id: _id
    }
    return this.http.post<User>(`${this.uri}/getUserByEmailOthers`, data)
  }

  getDecoratorByUsername(korisnickoIme: string) {
    let data = {
      korisnickoIme: korisnickoIme
    }
    return this.http.post<User>(`${this.uri}/getDecoratorByUsername`, data)
  }

  getAllOwners() {
    return this.http.get<User[]>(`${this.uri}/getAllOwners`)
  }

  getAllDecorators() {
    return this.http.get<User[]>(`${this.uri}/getAllDecorators`)
  }

  getallOwnersWaiting() {
    return this.http.get<User[]>(`${this.uri}/getAllOwnersWaiting`)
  }
  
  acceptOwner(korisnickoIme: string) {
    let data = {
      korisnickoIme: korisnickoIme
    }
    return this.http.post<User>(`${this.uri}/acceptOwner`, data)
  }

  denyOwner(korisnickoIme: string) {
    let data = {
      korisnickoIme: korisnickoIme
    }
    return this.http.post<User>(`${this.uri}/denyOwner`, data)
  }

  newDecorator(korisnickoImeReg: string, lozinkaReg: string, imeReg: string, prezimeReg: string, adresaReg: string, polReg: string,
    telefonReg: string, emailReg: string, profilnaSlikaReg: string, brojKarticeReg: string) {
      let data = {
        korisnickoIme: korisnickoImeReg, lozinka: lozinkaReg, ime: imeReg, prezime: prezimeReg, pol: polReg, adresa: adresaReg,
        telefon: telefonReg, email: emailReg, profilnaSlika: profilnaSlikaReg, brojKartice: brojKarticeReg
      }
      return this.http.post(`${this.uri}/newDecorator`, data)
  }

  getAllDecoratorsWaitingForJob() {
    return this.http.get<User[]>(`${this.uri}/getAllDecoratorsWaitingForJob`)
  }

  setFirmName(korisnickoIme: string, firma: string) {
    let data = {
      korisnickoIme: korisnickoIme, firma: firma
    }
    return this.http.post<User>(`${this.uri}/setFirmName`, data)
  }
  
}
