import { ObjectId } from 'mongodb';
import mongoose from "mongoose";

const Schema = mongoose.Schema;

let User = new Schema({
    // _id: {
    //     type: ObjectId
    // },
    korisnickoIme: {
        type: String
    },
    lozinka: {
        type: String
    },
    ime: {
        type: String
    },
    prezime: {
        type: String
    },
    adresa: {
        type: String
    },
    pol: {
        type: String
    },
    telefon: {
        type: String
    },
    email: {
        type: String
    },
    profilnaSlika: {
        type: String
    },
    tipKorisnika: {
        type: String
    },
    brojKartice: {
        type: String
    },
    status: {
        type: String
    },
    firma: {
        type: String
    }
});

export default mongoose.model('User', User, 'korisnici');