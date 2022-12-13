import express, {Request, Response} from 'express';

const cuponRouter = express.Router();
import CuponModel from '../models/cupon.model.js';

cuponRouter.get('/', async (req: Request, res: Response)=> {
    let {page, limit, cupon_code, title} = req.query;  
    try{
        if(Object.keys(req.query).length>0){
            let data = await CuponModel.find({$or: [{cuponCode: cupon_code}, {title: title}]}).skip(page).limit(limit);
            let count = await CuponModel.find({$or: [{cuponCode: cupon_code}, {title: title}]}).count();
            res.status(200).send({totalCount: count, data: data});
        }else{
            let data = await CuponModel.find().skip(page).limit(limit);
            let count = await CuponModel.find().count();
            res.status(200).send({totalCount: count, data: data});
        }     
   }catch{
     res.status(204).send({message: 'data not found'});
   }
});

cuponRouter.post('/', async (req: Request, res: Response)=> {
    try {
        let newData = await CuponModel.create(req.body);
        res.status(201).send({message: 'coupon created successfully', data: newData})
    } catch {
        res.status(424).send({data: 'error while creating'})
    }
});

cuponRouter.delete('/:id', async (req: Request, res: Response)=> {
    try{
        let deletedData = await CuponModel.deleteOne({id: req.params.id});
        console.log(deletedData);
        res.status(202).send({message: 'coupon deleted successfully', data: deletedData});
    }catch{
        res.status(204).send({message: 'error while deleting'});
    }
});

cuponRouter.put('/:id', async (req: Request, res: Response)=> {
    try{
        let updatedData = await CuponModel.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).send({message: 'coupon updated successfully', data: updatedData});
    }catch{
        res.status(204).send({message: 'error while updating'});
    }
});

cuponRouter.patch('/:id', async (req: Request, res: Response)=> {
    try{
        let changedData = await CuponModel.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).send({message: 'coupon updated successfully', data: changedData});
    }catch{
        res.status(204).send({message: 'error while updating'});
    }
});

export default cuponRouter;