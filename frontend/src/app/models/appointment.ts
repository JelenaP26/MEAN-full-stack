import { AcceptDeny } from "./acceptDeny";
import ServiceName from "./serviceName";

export default class Appointment {
    id: number = 0;
    firma: string = '';
    korisnik: string = '';
    datumVremeZakazivanja:string = '';
    datumVreme: string = '';
    datumVremeIzrade: string = '';
    datumVremeZavrsetka: string = '';
    tipBaste: string = '';
    ukupnaKvadratura: number = 0;
    bazenKvadratura: number = 0;
    bazenBroj: number = 0;
    zeleniloKvadraturaP: number = 0;
    lezaljkeKvadratura: number = 0;
    fontanaKvadratura: number = 0;
    fontanaBroj: number = 0;
    zeleniloKvadraturaR: number = 0;
    brStolicaStolova: number = 0;
    dodatniZahtevi: string = '';
    izabraneUsluge: string[] = [];
    komentar: string = '';
    ocena: number = 0;
    zavrsen: boolean = false;
    tipTermina: string = '';
    status: string = '';
    obrazlozenje: string = '';
    zaduzeni: string = '';
}