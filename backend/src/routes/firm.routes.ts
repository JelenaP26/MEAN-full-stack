import * as express from 'express';
import { FirmController } from '../controllers/firm.controller';

const firmRouter = express.Router();

firmRouter.route('/getAllFirms').get(
    (req, res) => new FirmController().getAllFirms(req, res)
)

firmRouter.route('/searchFirm').post(
    (req, res) => new FirmController().searchFirm(req, res)
)

firmRouter.route('/getFirmForDecorator').post(
    (req, res) => new FirmController().getFirmForDecorator(req, res)
)

firmRouter.route('/addNewFirm').post(
    (req, res) => new FirmController().addNewFirm(req, res)
)

export default firmRouter;