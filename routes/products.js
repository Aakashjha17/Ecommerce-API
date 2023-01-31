import express from "express";
import Product from '../models/product.js'
import Category from "../models/category.js";
import mongoose from "mongoose";

const router = express.Router();

    //To get the list of all product
    router.get('/', async (req, res) => {
        const productList= await Product.find();

        if(!productList){res.status(500).json({success:false})};
        res.send(productList);
    });
  
    router.get('/:id', async (req, res) => {
        const product = await Product.findById(req.params.id);
    
        if (!product) {
            res.status(500).json({ success: false });
        }
        res.send(product);
    });
    
    //To post new Product
    router.post('/', async (req, res) => {
        const category = await Category.findById(req.body.categoryId);

        if (!category) return res.status(400).send("Invalid Category");
    
        let product = new Product({
            name: req.body.name,
            quantity: req.body.quantity,
            unitPrice: req.body.unitPrice,
            unitInStock: req.body.unitInStock,
            categoryId: req.body.categoryId,
            discontinued: req.body.discontinued,
        });
  
        product = await product.save();
    
        if (!product) return res.status(500).send("The product cannot be created");
    
        res.send(product);
    });
  
    //To upadate the product
    router.put("/:id", async (req, res) => {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).send("Invalid Product Id");
        }
        const category = await Category.findById(req.body.categoryId);
        if (!category) return res.status(400).send("Invalid Category");
    
        const product = await Product.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            quantity: req.body.quantity,
            unitPrice: req.body.unitPrice,
            unitInStock: req.body.unitInStock,
            categoryId: req.body.categoryId,
            discontinued: req.body.discontinued,
        },
        { new: true }
        );
    
        if (!product) return res.status(500).send("the product cannot be updated!");
    
        res.send(product);
    });


    //to delete the product 
    router.delete("/:id", (req, res) => {
        Product.findByIdAndRemove(req.params.id)
        .then((product) => {
            if (product) {
                return res.status(200).json({ success: true, message: "the product deleted" });
            } else {
                return res.status(404).json({ success: false, message: "product not found" });
            }
        })
        .catch((err) => {
            return res.status(400).json({ success: false, error: err });
        });
    });
    
export default router;