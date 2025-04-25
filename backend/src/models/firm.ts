import { ObjectId } from 'mongodb';
import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Firm = new Schema({
    id: {
        type: Number
    },
    naziv: {
        type: String
    },
    adresa: {
        type: String
    },
    usluge: {
        type: Array
    },
    dekorateri: {
        type: Array
    },
    telefon: {
        type: String
    },
    komentari: {
        type: Array
    }
});

export default mongoose.model('Firm', Firm, 'firme');