import { Router } from 'express';
import passport from 'passport';
import multer from 'multer';
import { multerConfig } from '../config/multer';

import DashController from '../controllers/dash.controller';
import AuthController from '../controllers/auth.controller';
import UserController from '../controllers/user.controller';
import BookController from '../controllers/book.controller';
import AuthorController from '../controllers/author.controller';
import CategoryController from '../controllers/category.controller';
import PublisherController from '../controllers/publisher.controller';
import ReserveController from '../controllers/reserve.controller';
import ReportController from '../controllers/report.controller';
import FileController from '../controllers/file.controller';

const router = Router();
const passportAuth = passport.authenticate("jwt", { session: false });

router.get('/dashboard', passportAuth, DashController.index);

router.post('/auth/signIn', AuthController.singIn);
router.post('/auth/signUp', AuthController.singUp);
router.post('/auth/google', AuthController.singInWithGoogle);
router.post('/auth/recover-password', AuthController.recoverPassword);

/* User */
router.post('/user', passportAuth, UserController.store);
router.get('/user', passportAuth, UserController.index);
router.get('/user/:id', passportAuth, UserController.show);
router.put('/user/:id', passportAuth, UserController.update);
router.delete('/user/:id', passportAuth, UserController.delete);

/* Book */
router.post('/book', passportAuth, BookController.store);
router.get('/book', passportAuth, BookController.index);
router.get('/book/:id', passportAuth, BookController.show);
router.put('/book/:id', passportAuth, BookController.update);
router.delete('/book/:id', passportAuth, BookController.delete);

/* Author */
router.post('/author', passportAuth, AuthorController.store);
router.get('/author', passportAuth, AuthorController.index);
router.get('/author/:id', passportAuth, AuthorController.show);
router.put('/author/:id', passportAuth, AuthorController.update);
router.delete('/author/:id', passportAuth, AuthorController.delete);

/* Category */
router.post('/category', passportAuth, CategoryController.store);
router.get('/category', passportAuth, CategoryController.index);
router.get('/category/:id', passportAuth, CategoryController.show);
router.put('/category/:id', passportAuth, CategoryController.update);
router.delete('/category/:id', passportAuth, CategoryController.delete);

/* Publisher */
router.post('/publisher', passportAuth, PublisherController.store);
router.get('/publisher', passportAuth, PublisherController.index);
router.get('/publisher/:id', passportAuth, PublisherController.show);
router.put('/publisher/:id', passportAuth, PublisherController.update);
router.delete('/publisher/:id', passportAuth, PublisherController.delete);

/* Reserve */
router.post('/reserve', passportAuth, ReserveController.store);
router.get('/reserve', passportAuth, ReserveController.index);
router.get('/reserve/:id', passportAuth, ReserveController.show);
router.put('/reserve/:id', passportAuth, ReserveController.update);
router.patch('/reserve/:id', passportAuth, ReserveController.patch);
router.delete('/reserve/:id', passportAuth, ReserveController.delete);

/* Files */
router.post('/file', multer(multerConfig).single('file'), FileController.upload);

/* Reports */
router.get('/report-users', ReportController.users);

export default router;
