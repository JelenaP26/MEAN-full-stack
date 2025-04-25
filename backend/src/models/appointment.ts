import { ObjectId } from 'mongodb';
import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Appointment = new Schema({
    id: {
        type: Number
    },
    firma: {
        type: String
    },
    korisnik: {
        type: String
    },
    datumVremeZakazivanja: {
        type: String
    },
    datumVreme: {
        type: String
    },
    datumVremeIzrade: {
        type: String
    },
    datumVremeZavrsetka: {
        type: String
    },
    tipBaste: {
        type: String
    },
    ukupnaKvadratura: {
        type: Number
    },
    bazenKvadratura: {
        type: Number
    },
    bazenBroj: {
        type: Number
    },
    zeleniloKvadraturaP: {
        type: Number
    },
    lezaljkeKvadratura: {
        type: Number
    },
    fontanaKvadratura: {
        type: Number
    },
    fontanaBroj: {
        type: Number
    },
    zeleniloKvadraturaR: {
        type: Number
    },
    brStolicaStolova: {
        type: Number
    },
    dodatniZahtevi: {
        type: String
    },
    izabraneUsluge: {
        type: Array
    },
    komentar: {
        type: String
    },
    ocena: {
        type: Number
    },
    zavrsen: {
        type: Boolean
    },
    tipTermina: {
        type: String
    },
    status: {
        type: String
    },
    obrazlozenje: {
        type: String
    },
    zaduzeni: {
        type: String
    }
});

export default mongoose.model('Appointment', Appointment, 'zakazivanja');