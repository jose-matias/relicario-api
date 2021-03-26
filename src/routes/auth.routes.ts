import { Router } from 'express'
import passport from 'passport'
import multer from 'multer';
import { multerConfig } from '../config/multer'

import AuthController from '../controllers/auth.controller'
import UserController from '../controllers/user.controller'
import BookController from '../controllers/book.controller'
import AuthorController from '../controllers/author.controller'
import CategoryController from '../controllers/category.controller'
import ReportController from '../controllers/report.controller'
import FileController from '../controllers/file.controller'

const router = Router();
const passportAuth = passport.authenticate("jwt", { session: false });

router.post('/auth/signIn', AuthController.singIn);
router.post('/auth/signUp', AuthController.singUp);
router.post('/auth/google', passport.authenticate('google-token', { session: false }), AuthController.google);
router.post('/auth/facebook', passport.authenticate('facebook-token', { session: false }), AuthController.facebook);

/* User */
router.post('/user', UserController.store);
router.get('/user', UserController.index);
router.get('/user/:id', passportAuth, UserController.show);
router.put('/user/:id', passportAuth, UserController.update);
router.delete('/user/:id', passportAuth, UserController.delete);

/* Book */
router.post('/book', BookController.store);
router.get('/book', BookController.index);
router.get('/book/:id', BookController.show);
router.put('/book/:id', BookController.update);
router.delete('/book/:id', BookController.delete);

/* Author */
router.post('/author', AuthorController.store);
router.get('/author', AuthorController.index);
router.get('/author/:id', AuthorController.show);
router.put('/author/:id', AuthorController.update);
router.delete('/author/:id', AuthorController.delete);

/* Category */
router.post('/category', CategoryController.store);
router.get('/category', CategoryController.index);
router.get('/category/:id', CategoryController.show);
router.put('/category/:id', CategoryController.update);
router.delete('/category/:id', CategoryController.delete);

/* Files */
router.post('/file', multer(multerConfig).single('file'), FileController.upload);

/* Reports */
router.get('/report-users', ReportController.users);

export default router;
