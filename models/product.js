import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true
    },
    unitPrice: {
        type: Number,
        required: true
    },
    unitInStock: {
        type: Number,
        required: true
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    discontinued:{
        type:Boolean,
        default: false,
    }, 
})

productSchema.virtual("id").get(function () {
    return this._id.toHexString();
});
  
productSchema.set("toJSON", {
    virtuals: true,
});

var Product = mongoose.model('Product', productSchema)

export default Product;