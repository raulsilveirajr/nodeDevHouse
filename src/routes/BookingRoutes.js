import { Router } from 'express';
import multer from 'multer';
import BookingController from '../controllers/BookingController.js';

import uploadConfig from '../config/upload.js';

const upload = multer(uploadConfig);

const bookingRoutes = new Router();

bookingRoutes.get('/booking', BookingController.index);
bookingRoutes.post('/houses/:house_id/booking', BookingController.store);
bookingRoutes.delete('/booking/:id', BookingController.delete);

export default bookingRoutes;
