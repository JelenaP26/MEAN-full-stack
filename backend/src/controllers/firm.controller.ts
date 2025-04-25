import * as express from 'express';
import Firm from '../models/firm';
import Appointment from '../models/appointment';

export class FirmController {

    getAllFirms = (req: express.Request, res: express.Response) => {
        Firm.find({}).then(firms => {
            res.json(firms)
        }).catch(err => {
            console.log(err)
        })
    }

    searchFirm = (req: express.Request, res: express.Response) => {
        let naziv = req.body.searchByName;
        let adresa = req.body.searchByAddr;

        Firm.find({ 'naziv': {$regex: naziv}, 'adresa': {$regex: adresa}}).then(firm => {
            res.json(firm)
        }).catch(err => {
            console.log(err)
        })
    }

    getFirmForDecorator = (req: express.Request, res: express.Response) => {
        let korisnickoIme = req.body.korisnickoIme;

        Firm.findOne({ 'dekorateri.korisnickoIme': korisnickoIme }).then(firm => {
            res.json(firm)
        }).catch(err => {
            console.log(err)
        })
    }

    addNewFirm = (req: express.Request, res: express.Response) => {
        let id = 1;

        Firm.find({}).sort({ id: -1 }).limit(1).then(max => {
            if(max.length > 0) {
                id = max[0].id + 1;
            }

            let firm = new Firm({
                id: id,
                naziv: req.body.naziv,
                adresa: req.body.adresa,
                usluge: req.body.usluge,
                dekorateri: req.body.dekorateri,
                telefon: req.body.telefon,
                komentari: req.body.komentari
            })

            firm.save().then(firm => {
                res.status(200).json({ message: "firm added" });
              })
              .catch((err) => {
                console.log(err);
                res.status(400).json({ message: "error" });
              });
        }).catch(err => {
            console.log(err);
            res.status(400).json({ message: "error" });
        })
    }

}