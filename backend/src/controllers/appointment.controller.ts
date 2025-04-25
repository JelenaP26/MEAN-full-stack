import * as express from 'express';
import Firm from '../models/firm';
import Appointment from '../models/appointment';
import appointment from '../models/appointment';

export class AppointmentController {

    setDate = (req: express.Request, res: express.Response) => {
        let id = req.body.id;
        let datumVremeZakazivanja = req.body.datumVremeZakazivanja;

        Appointment.findOneAndUpdate({ 'id': id }, {$set: { 'datumVreme': datumVremeZakazivanja}}).then(appointment => {
            res.status(200).json({ message: "date set" });
        }).catch(err => {
            console.log(err);
            res.status(400).json({ message: "error" });
        })
    }

    scheduleDecorating = (req: express.Request, res: express.Response) => {
        let id = 1;

        Appointment.find({}).sort({ id: -1 }).limit(1).then(max => {
            if(max.length > 0) {
                id = max[0].id + 1;
            }

            let appointment = new Appointment({
                id: id,
                firma: req.body.firma,
                korisnik: req.body.korisnik,
                datumVremeZakazivanja: req.body.datumVremeZakazivanja,
                datumVreme: req.body.datumVreme,
                datumVremeIzrade: req.body.datumVremeIzrade,
                datumVremeZavrsetka: '',
                tipBaste: req.body.tipBaste,
                ukupnaKvadratura: req.body.ukupnaKvadratura,
                bazenKvadratura: req.body.bazenKvadratura,
                bazenBroj: req.body.bazenBroj,
                zeleniloKvadraturaP: req.body.zeleniloKvadraturaP,
                lezaljkeKvadratura: req.body.lezaljkeKvadratura,
                fontanaKvadratura: req.body.fontanaKvadratura,
                fontanaBroj: req.body.fontanaBroj,
                zeleniloKvadraturaR: req.body.zeleniloKvadraturaR,
                brStolicaStolova: req.body.brStolicaStolova,
                dodatniZahtevi: req.body.dodatniZahtevi,
                izabraneUsluge: req.body.izabraneUsluge,
                komentar: '',
                ocena: 0,
                zavrsen: false,
                tipTermina: req.body.tipTermina,
                status: '',
                obrazlozenje: '',
                zaduzeni: ''
            })

            appointment.save().then(appointment => {
                res.status(200).json({ message: "appointment added" });
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

    getAllAppointmentsDone = (req: express.Request, res: express.Response) => { 
        Appointment.find({ 'zavrsen': true, 'datumVreme': '' }).then(appointments => {
            res.json(appointments)
        }).catch(err => {
            console.log(err)
        })
    }

    getAllAppointmentsDoneForOwner = (req: express.Request, res: express.Response) => { 
        let korisnickoIme = req.body.korisnickoIme;

        Appointment.find({ 'zavrsen': true, 'korisnickoIme': korisnickoIme }).then(appointments => {
            res.json(appointments)
        }).catch(err => {
            console.log(err)
        })
    }

    getAllAppointmentsNotDone = (req: express.Request, res: express.Response) => { 
        Appointment.find({ 'zavrsen': false }).then(appointments => {
            res.json(appointments)
        }).catch(err => {
            console.log(err)
        })
    }

    getAllAppointmentsNotDoneForUser = (req: express.Request, res: express.Response) => { 
        let korisnickoIme = req.body.korisnickoIme;
        
        Appointment.find({ 'zavrsen': false, 'korisnik': korisnickoIme }).then(appointments => {
            res.json(appointments)
        }).catch(err => {
            console.log(err)
        })
    }

    getAppointmentsNotDoneForFirm = (req: express.Request, res: express.Response) => {
        let firma = req.body.firma;

        Appointment.find({ 'firma': firma, 'zavrsen': false, 'status': '' }).then(appointments => {
            res.json(appointments)
        }).catch(err => {
            console.log(err)
        })
    }

    getAppointmentsWaterServiceNotDoneForFirm = (req: express.Request, res: express.Response) => {
        let firma = req.body.firma;

        Appointment.find({ 'firma': firma, 'zavrsen': false, 'status': '', 'tipTermina': 'odrzavanje' }).then(appointments => {
            res.json(appointments)
        }).catch(err => {
            console.log(err)
        })
    }

    acceptAppointment = (req: express.Request, res: express.Response) => {
        let id = req.body.id;
        let korisnickoIme = req.body.korisnickoIme;

        Appointment.findOneAndUpdate({ 'id': id }, {$set: { 'status': 'prihvacen', 'zaduzeni': korisnickoIme }}).then(appointment => {
            res.status(200).json({ message: "appointment accepted" });
        }).catch(err => {
            console.log(err);
            res.status(400).json({ message: "error" });
        })
    }

    acceptWaterService = (req: express.Request, res: express.Response) => {
        let id = req.body.id;
        let korisnickoIme = req.body.korisnickoIme;
        let datumVremeZavrsetka = req.body.datumVremeZavrsetka;

        Appointment.findOneAndUpdate({ 'id': id }, {$set: { 'status': 'prihvacen', 'zaduzeni': korisnickoIme, 'datumVremeZavrsetka': datumVremeZavrsetka }}).then(appointment => {
            res.status(200).json({ message: "appointment accepted" });
        }).catch(err => {
            console.log(err);
            res.status(400).json({ message: "error" });
        })
    }

    denyAppointment = (req: express.Request, res: express.Response) =>  {
        let id = req.body.id;
        let obrazlozenje = req.body.obrazlozenje;
        let korisnickoIme = req.body.korisnickoIme;

        Appointment.findOneAndUpdate({ 'id': id }, {$set: { 'status': 'odbijen', 'obrazlozenje': obrazlozenje, 'zaduzeni': korisnickoIme}}).then(appointment => {
            res.status(200).json({ message: "appointment denied" });
        }).catch(err => {
            console.log(err);
            res.status(400).json({ message: "error" });
        })
    }

    denyWaterService = (req: express.Request, res: express.Response) =>  {
        let id = req.body.id;
        let korisnickoIme = req.body.korisnickoIme;

        Appointment.findOneAndUpdate({ 'id': id }, {$set: { 'status': 'odbijen', 'zaduzeni': korisnickoIme}}).then(appointment => {
            res.status(200).json({ message: "appointment denied" });
        }).catch(err => {
            console.log(err);
            res.status(400).json({ message: "error" });
        })
    }

    getAcceptedAppointmentsForDecorator = (req: express.Request, res: express.Response) =>  {
        let korisnickoIme = req.body.korisnickoIme;

        Appointment.find({'status': 'prihvacen', 'zaduzeni': korisnickoIme, 'datumVremeZavrsetka': '' }).then(appointments => {
            res.json(appointments)
        }).catch(err => {
            console.log(err)
        })
    }

    finishAppointmet = (req: express.Request, res: express.Response) =>  {
        let id = req.body.id;
        let datumVremeZavrsetka = req.body.datumVremeZavrsetka;

        Appointment.updateOne({ 'id': id }, {$set: { 'datumVremeZavrsetka': datumVremeZavrsetka, 'zavrsen': true }}).then(appointments => {
            res.json(appointments)
        }).catch(err => {
            console.log(err)
        })
    }

    getAppointmetsLast24h = (req: express.Request, res: express.Response) => {
        Appointment.find({}).then(appointments => {
            let appointments24h = appointments.filter(appointment => {
                if (appointment.datumVremeZakazivanja != null) {
                    const datum = new Date(appointment.datumVremeZakazivanja);
                    return datum >= (new Date(Date.now() - 24 * 60 * 60 * 1000));
                }
            })
            res.json(appointments24h)
        }).catch(err => {
            console.log(err)
        })
    }

    getAppointmetsLast7d = (req: express.Request, res: express.Response) => {
        Appointment.find({}).then(appointments => {
            let appointments7d = appointments.filter(appointment => {
                if (appointment.datumVremeZakazivanja != null) {
                    const datum = new Date(appointment.datumVremeZakazivanja);
                    return datum >= (new Date(Date.now() - 7 * 24 * 60 * 60 * 1000));
                }
            })
            res.json(appointments7d)
        }).catch(err => {
            console.log(err)
        })
    }

    getAppointmetsLast30d = (req: express.Request, res: express.Response) => {
        Appointment.find({}).then(appointments => {
            let appointments30d = appointments.filter(appointment => {
                if (appointment.datumVremeZakazivanja != null) {
                    const datum = new Date(appointment.datumVremeZakazivanja);
                    return datum >= (new Date(Date.now() - 30 * 24 * 60 * 60 * 1000));
                }
            })
            res.json(appointments30d)
        }).catch(err => {
            console.log(err)
        })
    }

    waterServiceInProgress = (req: express.Request, res: express.Response) => {
        Appointment.find({ 'zavrsen': false, 'status': {$ne: 'odbijen'}, 'tipTermina': 'odrzavanje' }).then(appointments => {
            res.json(appointments)
        }).catch(err => {
            console.log(err)
        })
    }

    waterServiceInProgressForOwner = (req: express.Request, res: express.Response) => {
        let korisnickoIme = req.body.korisnickoIme;

        Appointment.find({ 'korisnik': korisnickoIme, 'zavrsen': false, 'status': {$ne: 'odbijen'}, 'tipTermina': 'odrzavanje' }).then(appointments => {
            res.json(appointments)
        }).catch(err => {
            console.log(err)
        })
    }

    getAllAppointmentsDoneForUser = (req: express.Request, res: express.Response) => {
        let korisnickoIme = req.body.korisnickoIme;

        Appointment.find({ 'zaduzeni': korisnickoIme, 'zavrsen': true }).then(appointments => {
            res.json(appointments)
        }).catch(err => {
            console.log(err)
        })
    }


}