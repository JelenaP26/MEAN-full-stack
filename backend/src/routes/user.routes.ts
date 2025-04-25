import * as express from 'express';
import { UserController } from '../controllers/user.controller';

const userRouter = express.Router();

userRouter.route('/login').post(
    (req, res) => new UserController().login(req, res)
)

userRouter.route('/getUserByUsername').post(
    (req, res) => new UserController().getUserByUsername(req, res)
)

userRouter.route('/getUserByEmail').post(
    (req, res) => new UserController().getUserByEmail(req, res)
)

userRouter.route('/register').post(
    (req, res) => new UserController().register(req, res)
)

userRouter.route('/changePassword').post(
    (req, res) => new UserController().changePassword(req, res)
)

userRouter.route('/changeProfile').post(
    (req, res) => new UserController().changeProfile(req, res)
)

userRouter.route('/getUserByUsernameOthers').post(
    (req, res) => new UserController().getUserByUsernameOthers(req, res)
)

userRouter.route('/getUserByEmailOthers').post(
    (req, res) => new UserController().getUserByEmailOthers(req, res)
)

userRouter.route('/getDecoratorByUsername').post(
    (req, res) => new UserController().getDecoratorByUsername(req, res)
)

userRouter.route('/getAllOwners').get(
    (req, res) => new UserController().getAllOwners(req, res)
)

userRouter.route('/getAllDecorators').get(
    (req, res) => new UserController().getAllDecorators(req, res)
)

userRouter.route('/getAllOwnersWaiting').get(
    (req, res) => new UserController().getAllOwnersWaiting(req, res)
)

userRouter.route('/acceptOwner').post(
    (req, res) => new UserController().acceptOwner(req, res)
)

userRouter.route('/denyOwner').post(
    (req, res) => new UserController().denyOwner(req, res)
)

userRouter.route('/newDecorator').post(
    (req, res) => new UserController().newDecorator(req, res)
)

userRouter.route('/setFirmName').post(
    (req, res) => new UserController().setFirmName(req, res)
)

userRouter.route('/getAllDecoratorsWaitingForJob').get(
    (req, res) => new UserController().getAllDecoratorsWaitingForJob(req, res)
)

export default userRouter;