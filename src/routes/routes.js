import { Router } from 'express';
import sessionRoutes from './SessionRoutes.js';
import houseRoutes from './HouseRoutes.js';
import bookingRoutes from './BookingRoutes.js';

const routes = new Router();

routes.use(sessionRoutes);
routes.use(houseRoutes);
routes.use(bookingRoutes);

routes.get('/', (req, res) => res.json({ ok: 'true' }));

export default routes;
