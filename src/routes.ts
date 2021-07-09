import { Router } from 'express';
import AppController from './controllers/AppController';

const router = Router();

const   appController = new AppController();
router.get('/app/all', appController.showAll);
router.get('/app/:id', appController.show);

router.post('/app', appController.create);

router.delete('/app/:id',appController.delete);

router.put('/app', appController.update);


export default router;