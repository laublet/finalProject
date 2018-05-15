import express from 'express';
import multer from 'multer';
import User from './../../models/User';
import Product from './../../models/Product';

const products = express.Router();

const storage = multer.diskStorage({
  destination: './public/productImages/',
  filename(req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 9000000 },
  // fileFilter: function(req, file, cb){
  //   checkFileType(file, cb);
  // }
});

products.post('/', upload.single('picture'), (req, res) => {
  const newProduct = new Product(JSON.parse(req.body.product));
  // const newProduct = new Product(req.body);
  if (req.file) newProduct.pictures = req.file.filename;
  newProduct.userId = req.decode.id;
  newProduct.email = req.decode.email;
  newProduct.save((err, product) => {
    if (err) {
      res.status(400).json({ success: false, message: err.message });
    } else {
      res.status(200).json({
        success: true,
        message: 'Product created',
        content: product,
      });
    }
  });
});

products.get('/', (req, res) => {
  Product.find({}, (err, productList) => {
    if (err) res.status(500).json({ success: false, message: err.message });
    else {
      res.status(200).json({
        success: true,
        message: 'Here is the list of products!',
        content: productList,
      });
    }
  });
});

products.get('/:id', (req, res) => {
  Product.findOne({ _id: req.params.id }, (err, uniqueProduct) => {
    if (err) res.status(500).json({ success: false, message: err.message });
    else {
      res.status(200).json({
        success: true,
        message: 'Here is your product!',
        content: uniqueProduct,
      });
    }
  });
});

products.put('/:id', (req, res) => {
  req.body.lastUpdateDate = Date.now();
  const updateOps = {};
  for (const key of Object.keys(req.body)) {
    if (req.body[key]) updateOps[key] = req.body[key];
  }
  Product.findOneAndUpdate(
    { _id: req.params.id },
    { $set: updateOps },
    { new: true },
    (err, productUpdated) => {
      if (err) res.status(500).json({ success: false, message: err.message });
      else {
        res.status(200).json({
          success: true,
          message: 'Product updated !',
          content: productUpdated,
        });
      }
    },
  );
});

products.delete('/:id', (req, res) => {
  Product.findOneAndRemove({ _id: req.params.id }, (err, Produc) => {
    if (err) res.status(500).json({ success: false, message: err.message });
    else {
      res.status(200).json({
        success: true,
        message: 'Product deleted!',
      });
    }
  });
});

export default products;
