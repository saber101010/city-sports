const express =require ('express')
const router =express.Router()
const Product = require('../models/product')
const isAuth =require('../middelware/isAuth')
// const upload =require('../middelware/upload')

router.post('/addProduct',isAuth, async(req,res)=>{
    const {title,prix,description,imageUrl,categorie}=req.body
   console.log(req.body)
   
   try {
    const product =  new Product({
        title,prix,description,imageUrl,categorie
    })
    await product.save() 
    
    res.send(product)
   } catch (error) { 
      
 res.send('error')
   }
})

router.get('/allProduct',async(req,res)=>{
    try {
        const products=await Product.find()
        res.send({products})
    } catch (error) {
        res.send('server error')
    }
})
//delete
router.delete('/delete/:productId',isAuth,async(req,res)=>{
    const {productId}=req.params
    try {
        await Product.findByIdAndDelete(productId)
        res.send('product delete')
    } catch (error) {
        res.send('server error')
    }
})
//put:
router.put('/update/:productId',isAuth,async(req,res)=>{
    const {productId}=req.params 
    // const {title,prix,description}=req.body
    try {
        await Product.findByIdAndUpdate(productId,{$set:{...req.body}})
    } catch (error) {
        res.send('server error')
    }
})
//getbyId:
router.get('/getproduct/:productId',isAuth,async(req,res)=>{
    const {productId}= req.params
    try {
        const product=await Product.findOne({id:productId})
        res.send(product)
    } catch (error) {
        res.send('server error')
    }
})


module.exports=router