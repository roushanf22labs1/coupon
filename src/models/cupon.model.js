import mongoose from "mongoose";

const cuponSchema = mongoose.Schema({
    cuponCode: String,
    expiry: Date,
    title: String,
    description: [String],
    paymentMode: String,
    discount: {
        percentage: {type: Number, default: null},
        amount: {type: Number, default: null}
    }, 
});

const CuponModel = mongoose.model('cupon', cuponSchema);
export default CuponModel;
