import * as express from 'express';
import User from '../models/user';

export class UserController {

    login = (req: express.Request, res: express.Response) => {
        let korisnickoIme = req.body.korisnickoIme;
        let lozinka = req.body.lozinka;

        User.findOne({ 'korisnickoIme': korisnickoIme, 'lozinka': lozinka, 'status': 'true' }).then(user=>{
            res.json(user)
        }).catch(err=>{
            console.log(err)
        })
    }

    getUserByUsername = (req: express.Request, res: express.Response) => {
        let korisnickoIme = req.body.korisnickoIme;

        User.findOne({ 'korisnickoIme': korisnickoIme }).then(user=>{
            res.json(user)
        }).catch(err=>{
            console.log(err)
        })
    }

    getUserByEmail = (req: express.Request, res: express.Response) => {
        let email = req.body.email;

        User.findOne({ 'email': email}).then(user=>{
            res.json(user)
        }).catch(err=>{
            console.log(err)
        })
    }

    getUserByUsernameOthers = (req: express.Request, res: express.Response) => {
        let korisnickoIme = req.body.korisnickoIme;
        let _id = req.body._id;

        User.findOne({ 'korisnickoIme': korisnickoIme, '_id': {$ne: _id} }).then(user=>{
            res.json(user)
        }).catch(err=>{
            console.log(err)
        })
    }

    getUserByEmailOthers = (req: express.Request, res: express.Response) => {
        let email = req.body.email;
        let _id = req.body._id;

        User.findOne({ 'email': email, '_id': {$ne: _id}}).then(user=>{
            res.json(user)
        }).catch(err=>{
            console.log(err)
        })
    }

    register = (req: express.Request, res: express.Response) => {
        let user = new User({
            korisnickoIme: req.body.korisnickoIme,
            lozinka: req.body.lozinka,
            ime: req.body.ime,
            prezime: req.body.prezime,
            adresa: req.body.adresa,
            pol: req.body.pol,
            telefon: req.body.telefon,
            email: req.body.email,
            profilnaSlika: req.body.profilnaSlika,
            tipKorisnika: "vlasnik",
            brojKartice: req.body.brojKartice,
            status: '',
            firma: ''
        })

        user.save().then((user) => {
            res.json({ 'message': 'ok' })
        }).catch(err => {
            res.json({ 'message': err })
        })

    }

    changePassword = (req: express.Request, res: express.Response) => {
        let korisnickoIme = req.body.korisnickoIme;
        let trenutnaLozinka = req.body.trenutnaLozinka;
        let novaLozinka = req.body.novaLozinka;

        User.findOneAndUpdate({ 'korisnickoIme': korisnickoIme, 'lozinka': trenutnaLozinka}, 
            { $set: { 'lozinka': novaLozinka}}).then(user => {
                res.json({ 'message': 'ok' })
            }).catch(err => {
                console.log(err)
            })
    }

    changeProfile = (req: express.Request, res: express.Response) => {
        let trenKorIme = req.body.trenKorIme;
        let korisnickoIme = req.body.korisnickoIme;
        let ime = req.body.ime;
        let prezime = req.body.prezime;
        let adresa = req.body.adresa;
        let telefon = req.body.telefon;
        let email = req.body.email;
        let profilnaSlika = req.body.profilnaSlika;
        let brojKartice = req.body.brojKartice;

        User.findOneAndUpdate({ 'korisnickoIme': trenKorIme}, 
            { $set: { 'korisnickoIme': korisnickoIme, 'ime': ime, 'prezime': prezime, 'adresa': adresa, 'telefon': telefon, 
                'email': email, 'profilnaSlika': profilnaSlika, 'brojKartice': brojKartice}}).then(user => {
                res.json({ 'message': 'ok' })
            }).catch(err => {
                console.log(err)
            })
    }

    getDecoratorByUsername = (req: express.Request, res: express.Response) => {
        let korisnickoIme = req.body.korisnickoIme;

        User.findOne({ 'korisnickoIme': korisnickoIme }).then(user=>{
            res.json(user)
        }).catch(err=>{
            console.log(err)
        })
    }

    getAllOwners = (req: express.Request, res: express.Response) => {
        User.find({ 'tipKorisnika': 'vlasnik', 'status': true  }).then(users=>{
            res.json(users)
        }).catch(err=>{
            console.log(err)
        })
    }

    getAllDecorators = (req: express.Request, res: express.Response) => {
        User.find({ 'tipKorisnika': 'dekorater'}).then(users=>{
            res.json(users)
        }).catch(err=>{
            console.log(err)
        })
    }

    getAllDecoratorsWaitingForJob = (req: express.Request, res: express.Response) => {
        User.find({ 'tipKorisnika': 'dekorater', 'firma': ''}).then(users=>{
            res.json(users)
        }).catch(err=>{
            console.log(err)
        })
    }

    getAllOwnersWaiting = (req: express.Request, res: express.Response) => {
        User.find({ 'tipKorisnika': 'vlasnik', 'status': '' }).then(users=>{
            res.json(users)
        }).catch(err=>{
            console.log(err)
        })
    }

    acceptOwner = (req: express.Request, res: express.Response) => {
        let korisnickoIme = req.body.korisnickoIme;

        User.findOneAndUpdate({ 'korisnickoIme': korisnickoIme}, { $set: { 'status': 'true' }}).then(user => {
            res.json({ 'message': 'ok' })
        }).catch(err => {
            console.log(err)
        })
    }

    denyOwner = (req: express.Request, res: express.Response) => {
        let korisnickoIme = req.body.korisnickoIme;

        User.findOneAndUpdate({ 'korisnickoIme': korisnickoIme}, { $set: { 'status': 'false' }}).then(user => {
            res.json({ 'message': 'ok' })
        }).catch(err => {
            console.log(err)
        })
    }

    newDecorator = (req: express.Request, res: express.Response) => {
        let user = new User({
            korisnickoIme: req.body.korisnickoIme,
            lozinka: req.body.lozinka,
            ime: req.body.ime,
            prezime: req.body.prezime,
            adresa: req.body.adresa,
            pol: req.body.pol,
            telefon: req.body.telefon,
            email: req.body.email,
            profilnaSlika: req.body.profilnaSlika,
            tipKorisnika: 'dekorater',
            brojKartice: req.body.brojKartice,
            status: 'true',
            firma: ''
        })

        user.save().then((user) => {
            res.json({ 'message': 'ok' })
        }).catch(err => {
            res.json({ 'message': err })
        })
    }

    setFirmName = (req: express.Request, res: express.Response) => {
        let korisnickoIme = req.body.korisnickoIme;
        let firma = req.body.firma;
        
        User.findOneAndUpdate({ 'korisnickoIme': korisnickoIme}, { $set: { 'firma': firma }}).then(user => {
            res.json(user);
        }).catch(err => {
            console.log(err)
        })
    }

}