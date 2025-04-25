import * as express from 'express';
import { AppointmentController } from '../controllers/appointment.controller';

const appointmentRouter = express.Router();

appointmentRouter.route('/setDate').post(
    (req, res) => new AppointmentController().setDate(req, res)
)

appointmentRouter.route('/scheduleDecorating').post(
    (req, res) => new AppointmentController().scheduleDecorating(req, res)
)

appointmentRouter.route('/getAllAppointmentsDone').get(
    (req, res) => new AppointmentController().getAllAppointmentsDone(req, res)
)

appointmentRouter.route('/getAllAppointmentsDoneForOwner').post(
    (req, res) => new AppointmentController().getAllAppointmentsDoneForOwner(req, res)
)

appointmentRouter.route('/getAllAppointmentsNotDone').get(
    (req, res) => new AppointmentController().getAllAppointmentsNotDone(req, res)
)

appointmentRouter.route('/getAllAppointmentsNotDoneForUser').post(
    (req, res) => new AppointmentController().getAllAppointmentsNotDoneForUser(req, res)
)

appointmentRouter.route('/getAppointmentsNotDoneForFirm').post(
    (req, res) => new AppointmentController().getAppointmentsNotDoneForFirm(req, res)
)

appointmentRouter.route('/acceptAppointment').post(
    (req, res) => new AppointmentController().acceptAppointment(req, res)
)

appointmentRouter.route('/denyAppointment').post(
    (req, res) => new AppointmentController().denyAppointment(req, res)
)

appointmentRouter.route('/getAppointmetsLast24h').get(
    (req, res) => new AppointmentController().getAppointmetsLast24h(req, res)
)

appointmentRouter.route('/getAppointmetsLast7d').get(
    (req, res) => new AppointmentController().getAppointmetsLast7d(req, res)
)

appointmentRouter.route('/getAppointmetsLast30d').get(
    (req, res) => new AppointmentController().getAppointmetsLast30d(req, res)
)

appointmentRouter.route('/getAcceptedAppointmentsForDecorator').post(
    (req, res) => new AppointmentController().getAcceptedAppointmentsForDecorator(req, res)
)

appointmentRouter.route('/finishAppointmet').post(
    (req, res) => new AppointmentController().finishAppointmet(req, res)
)

appointmentRouter.route('/getAppointmentsWaterServiceNotDoneForFirm').post(
    (req, res) => new AppointmentController().getAppointmentsWaterServiceNotDoneForFirm(req, res)
)

appointmentRouter.route('/acceptWaterService').post(
    (req, res) => new AppointmentController().acceptWaterService(req, res)
)

appointmentRouter.route('/denyWaterService').post(
    (req, res) => new AppointmentController().denyWaterService(req, res)
)

appointmentRouter.route('/waterServiceInProgress').get(
    (req, res) => new AppointmentController().waterServiceInProgress(req, res)
)

appointmentRouter.route('/waterServiceInProgressForOwner').post(
    (req, res) => new AppointmentController().waterServiceInProgressForOwner(req, res)
)

appointmentRouter.route('/getAllAppointmentsDoneForUser').post(
    (req, res) => new AppointmentController().getAllAppointmentsDoneForUser(req, res)
)

export default appointmentRouter;