import Comment from "./comment";
import Decorator from "./decorator";
import Service from "./service";

export default class Firm {
    id: number = 0;
    naziv: string = '';
    adresa: string = '';
    usluge: Array<Service> = [];
    dekorateri: Array<Decorator> = [];
    telefon: string = '';
    komentari: Array<Comment> = [];
}