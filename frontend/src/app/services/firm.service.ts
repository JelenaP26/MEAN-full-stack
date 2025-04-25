import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Firm from '../models/firm';
import Service from '../models/service';
import Decorator from '../models/decorator';
import Comment from '../models/comment';

@Injectable({
  providedIn: 'root'
})
export class FirmService {

  constructor(private http: HttpClient) { }

  uri = "http://localhost:4000/firms";

  getAllFirms() {
    return this.http.get<Firm[]>(`${this.uri}/getAllFirms`)
  }

  searchFirm(searchByName: string, searchByAddr: string)  {
    let data = {
      searchByName: searchByName,
      searchByAddr: searchByAddr
    }
    return this.http.post<Firm[]>(`${this.uri}/searchFirm`, data)
  }

  getFirmForDecorator(korisnickoIme: string) {
    let data = {
      korisnickoIme: korisnickoIme
    }
    return this.http.post<Firm>(`${this.uri}/getFirmForDecorator`, data)
  }

  addNewFirm(naziv: string, adresa: string, usluge: Service[], dekorateri: Decorator[], telefon: string, komentari: Comment[]) {
    let data = {
      naziv: naziv,
      adresa: adresa,
      usluge: usluge,
      dekorateri: dekorateri,
      telefon: telefon,
      komentari: komentari
    }
    return this.http.post(`${this.uri}/addNewFirm`, data)
  }

}
