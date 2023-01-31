import Category from '../models/category.js'
import express from 'express'

const router = express.Router();

    //to get all the category list
    router.get('/', async (req, res) => {
        const categoryList = await Category.find();
    
        if (!categoryList) {
        res.status(500).json({ success: false });
        }
        res.status(200).send(categoryList);
    });
  
    //to get category by their ID    
    router.get("/:id", async (req, res) => {
        const category = await Category.findById(req.params.id);
    
        if (!category) {res.status(500).json({ message: "the category with the given ID not found" });}
        res.status(200).send(category);
    });
    
    //to create new category
    router.post('/', async (req, res) => {
        let category = new Category({
            name: req.body.name,
        });
        category = await category.save();
    
        if (!category) return res.status(404).send("the category cannot be created!");
    
        res.send(category);
    });
    
    //To update new category
    router.put("/:id", async (req, res) => {
        const category = await Category.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
        },
        { new: true }
        );
    
        if (!category) return res.status(400).send("the category cannot be created");
    
        res.send(category);
    });
    
    //To delete the existing category
    router.delete("/:id", (req, res) => {
        Category.findByIdAndRemove(req.params.id)
        .then((category) => {
            if (category) {
            return res
                .status(200)
                .json({ success: true, message: "the category deleted" });
            } else {
            return res
                .status(404)
                .json({ success: false, message: "categry not found" });
            }
        })
        .catch((err) => {
            return res.status(400).json({ success: false, error: err });
        });
    });
    
export default router;