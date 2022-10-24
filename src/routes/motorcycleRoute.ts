import { Router } from 'express';
import MotorcycleController from '../controllers/MotorcycleController';
import MotorcycleMiddleware from '../middlewares/MotorcycleMiddleware';
import MotorcycleModel from '../models/MotorcycleModel';
import MotorcycleService from '../services/MotorcycleService';

const route = Router();

const motorcycleModel = new MotorcycleModel();
const motorcycleService = new MotorcycleService(motorcycleModel);
const motorcycleController = new MotorcycleController(motorcycleService);

const motorcycleMiddleware = new MotorcycleMiddleware();

route.post(
  '/motorcycles',
  (req, res, next) => motorcycleMiddleware.validateData(req, res, next),
  (req, res) => motorcycleController.create(req, res),
);

route.get(
  '/motorcycles/:id',
  (req, res, next) => motorcycleMiddleware.validateId(req, res, next),
  (req, res) => motorcycleController.readOne(req, res),
);

route.get('/motorcycles', (req, res) => motorcycleController.read(req, res));
route.put(
  '/motorcycles/:id',
  (req, res, next) => motorcycleMiddleware.validateId(req, res, next),
  (req, res, next) => motorcycleMiddleware.verifyBody(req, res, next),
  (req, res) => motorcycleController.update(req, res),
);
route.delete(
  '/motorcycles/:id',
  (req, res, next) => motorcycleMiddleware.validateId(req, res, next),
  (req, res) => motorcycleController.delete(req, res),
);

export default route;