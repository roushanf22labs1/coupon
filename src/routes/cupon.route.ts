import express, {Request, Response} from 'express';

const cuponRouter = express.Router();
import CuponModel from '../models/cupon.model.js';

cuponRouter.get('/:id', async (req: Request, res: Response)=> {
    try{        
        let data = CuponModel.find(parseInt(req.params.id));
        let count = CuponModel.find(parseInt(req.params.id)).count();
        res.status(200).send({totalCount: count, data: data});    
   }catch{
     res.status(204).send({message: 'data not found'});
   }
});

cuponRouter.get('/', async (req: Request, res: Response)=> {
    let {page, limit} = req.query;       
    try{
        if(Object.keys(req.query).length==0){
            let data = await CuponModel.find();
            let count = await CuponModel.find().count();
            res.status(200).send({totalCount: count, data: data}); 
        }else if(Object.keys(req.query).length===2 && req.query.page && req.query.limit){
            let data = await CuponModel.find({}).skip((parseInt(page-1) * parseInt(limit))).limit(parseInt(limit));
            let count = await CuponModel.find({}).count();
            res.status(200).send({totalCount: count, data: data});             
        }else if(Object.keys(req.query).length>2){
            delete req.query.page;
            delete req.query.limit;
            let data = await CuponModel.find(req.query).skip((parseInt(page-1) * parseInt(limit))).limit(parseInt(limit));
            let count = await CuponModel.find(req.query).skip((parseInt(page-1) * parseInt(limit))).limit(parseInt(limit)).count();
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
        let deletedData = await CuponModel.findByIdAndDelete(req.params.id);
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