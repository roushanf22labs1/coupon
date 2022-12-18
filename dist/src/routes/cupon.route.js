var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from 'express';
const cuponRouter = express.Router();
import CuponModel from '../models/cupon.model.js';
/**
 * @swagger
 * tags:
 *   name: Coupon
 *   description: All mehods of Coupon API
 */
/**
 * @swagger
 * /coupon/{id}:
 *   get:
 *      summary: Returns coupon which matches the specified id
 *      tags: [Coupon]
 *      parameters:
 *        - name: id
 *          in: path
 *          required: true
 *      responses:
 *        200:
 *          description: Returns coupon which matches the specified id
 *          content:
 *            application/json:
 *              schema:
 *                 type: array
 *              example:
*                    {
 *                       "discount": {
 *                                      "percentage": "20",
 *                                      "amount": null
 *                                   },
 *                       "_id": "639ef0c154e416e1e14c60aa",
 *                       "cuponCode": "MarryChristmas9",
 *                       "expiry": "2022-12-14",
 *                       "title": "New year offer 897",
 *                       "description": [
 *                                        "a",
 *                                        "b",
 *                                        "c",
 *                                        "d"
 *                                      ],
 *                       "paymentMode": "phone pe"
 *                    }
 */
cuponRouter.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let data = yield CuponModel.findById(req.params.id);
        let count = yield CuponModel.findById(req.params.id).count();
        res.status(200).send({ totalCount: count, data: data });
    }
    catch (_a) {
        res.status(204).send({ message: 'data not found' });
    }
}));
/**
 * @swagger
 * /coupon:
 *   get:
 *      summary: Returns the list of all the coupons
 *      tags: [Coupon]
 *      responses:
 *        200:
 *          description: The list of all the coupons
 *          content:
 *            application/json:
 *              schema:
 *                 type: array
 *              example:
 *                  [
 *                    {
 *                       "discount": {
 *                                      "percentage": "20",
 *                                      "amount": null
 *                                   },
 *                       "_id": "639ef0c154e416e1e14c60aa",
 *                       "cuponCode": "MarryChristmas9",
 *                       "expiry": "2022-12-14",
 *                       "title": "New year offer 897",
 *                       "description": [
 *                                        "a",
 *                                        "b",
 *                                        "c",
 *                                        "d"
 *                                      ],
 *                       "paymentMode": "phone pe"
 *                    }
 *                  ]
 */
cuponRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { page, limit } = req.query;
    try {
        if (Object.keys(req.query).length == 0) {
            let data = yield CuponModel.find();
            let count = yield CuponModel.find().count();
            res.status(200).send({ totalCount: count, data: data });
        }
        else if (Object.keys(req.query).length === 2 && req.query.page && req.query.limit) {
            let data = yield CuponModel.find({}).skip((parseInt(page - 1) * parseInt(limit))).limit(parseInt(limit));
            let count = yield CuponModel.find({}).count();
            res.status(200).send({ totalCount: count, data: data });
        }
        else if (Object.keys(req.query).length > 2) {
            delete req.query.page;
            delete req.query.limit;
            let data = yield CuponModel.find(req.query).skip((parseInt(page - 1) * parseInt(limit))).limit(parseInt(limit));
            let count = yield CuponModel.find(req.query).skip((parseInt(page - 1) * parseInt(limit))).limit(parseInt(limit)).count();
            res.status(200).send({ totalCount: count, data: data });
        }
    }
    catch (_b) {
        res.status(204).send({ message: 'data not found' });
    }
}));
/**
 * @swagger
 * /coupon:
 *   post:
 *      summary: Returns the list of all the some
 *      tags: [Coupon]
 *      description: Optional description in *Markdown*
 *      required: true
 *      requestBody:
 *         required: true
 *         content:
 *            application/json:
 *              schema:
 *                 type: object
 *                 properties:
 *                    {
 *                       "discount": {
 *                                      "percentage": "20",
 *                                      "amount": null
 *                                   },
 *                       "cuponCode": "MarryChristmas",
 *                       "expiry": "2022-12-14",
 *                       "title": "New year offer 897",
 *                       "description": [
 *                                        "a",
 *                                        "b",
 *                                        "c",
 *                                        "d"
 *                                      ],
 *                       "paymentMode": "phone pe"
 *                    }
 *      responses:
 *        200:
 *          description: The list of all the some
 *          content:
 *            application/json:
 *              schema:
 *                 type: array
 *              example:
  *                    {
 *                       "discount": {
 *                                      "percentage": "20",
 *                                      "amount": null
 *                                   },
 *                       "cuponCode": "MarryChristmas9",
 *                       "expiry": "2022-12-14",
 *                       "title": "New year offer 897",
 *                       "description": [
 *                                        "a",
 *                                        "b",
 *                                        "c",
 *                                        "d"
 *                                      ],
 *                       "paymentMode": "phone pe"
 *                    }
 */
cuponRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let newData = yield CuponModel.create(req.body);
        res.status(201).send({ message: 'coupon created successfully', data: newData });
    }
    catch (_c) {
        res.status(424).send({ data: 'error while creating' });
    }
}));
/**
 * @swagger
 * /coupon/{id}:
 *   delete:
 *      summary: Returns the list of all the some
 *      tags: [Coupon]
 *      parameters:
 *        - name: id
 *          in: id
 *          required: true
 *      responses:
 *        200:
 *          description: The list of all the some
 *          content:
 *            application/json:
 *              schema:
 *                 type: string
 *                 example:
 *                   {
 *                     "message": "coupon deleted successfully",
 *                     "data": null
 *                    }
 */
cuponRouter.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let deletedData = yield CuponModel.findByIdAndDelete(req.params.id);
        res.status(202).send({ message: 'coupon deleted successfully', data: deletedData });
    }
    catch (_d) {
        res.status(204).send({ message: 'error while deleting' });
    }
}));
/**
 * @swagger
 * /coupon/{id}:
 *   put:
 *      summary: Returns the status of the id which get changed
 *      tags: [Coupon]
 *      parameters:
 *        - name: id
 *          in: path
 *          required: true
 *      description: Optional description in *Markdown*
 *      required: true
 *      requestBody:
 *         required: true
 *         content:
 *            application/json:
 *              schema:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   city:
 *                     type: string
 *      responses:
 *        200:
 *          description: The list of all the some
 *          content:
 *            application/json:
 *              schema:
 *                 type: array
 */
cuponRouter.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let updatedData = yield CuponModel.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).send({ message: 'coupon updated successfully', data: updatedData });
    }
    catch (_e) {
        res.status(204).send({ message: 'error while updating' });
    }
}));
/**
 * @swagger
 * /coupon/{id}:
 *   patch:
 *      summary: Returns the list of all the some
 *      tags: [Coupon]
 *      parameters:
 *        - name: id
 *          in: path
 *          required: true
 *      description: Optional description in *Markdown*
 *      required: true
 *      requestBody:
 *         required: true
 *         content:
 *            application/json:
 *              schema:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   city:
 *                     type: string
 *      responses:
 *        200:
 *          description: The list of all the some
 *          content:
 *            application/json:
 *              schema:
 *                 type: array
 */
cuponRouter.patch('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let changedData = yield CuponModel.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).send({ message: 'coupon updated successfully', data: changedData });
    }
    catch (_f) {
        res.status(204).send({ message: 'error while updating' });
    }
}));
export default cuponRouter;
