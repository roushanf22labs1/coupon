import express from 'express';

const cuponRouter = express.Router();
import CuponModel from '../models/cupon.model.js';

cuponRouter.get('/', async (req, res)=> {
    let {page, limit} = req.query;   
    try{
     let data = await CuponModel.find().skip(page).limit(limit);
     let count = await CuponModel.find().count();
     res.status(200).send({totalCount: count, data: data});
   }catch{
     res.status(404).send({msg: 'data not found'});
   }
});

cuponRouter.post('/', async (req, res)=> {
    try {
        await CuponModel.create(req.body);
        res.status(201).send({data: 'coupon created successfully'})
    } catch {
        res.status().send({data: 'error while creating'})
    }
});

cuponRouter.delete('/:id', async (req, res)=> {
    try{
        await CuponModel.deleteOne({id: req.params.id});
        res.status(200).send({msg: 'coupon deleted successfully'});
    }catch{
        res.status(200).send({msg: 'error while deleting'});
    }
});

cuponRouter.put('/:id', async (req, res)=> {
    try{
        await CuponModel.findByIdAndUpdate(req.params.id, req.body);
        res.status().send({msg: 'coupon updated successfully'});
    }catch{
        res.status().send({msg: 'error while updating'});
    }
});

cuponRouter.patch('/:id', async (req, res)=> {
    try{
        await CuponModel.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).send({msg: 'coupon updated successfully'});
    }catch{
        res.status(200).send({msg: 'error while updating'});
    }
});

export default cuponRouter;