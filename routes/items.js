const express = require("express");
const router = express.Router();
const Item = require("../models/Item");

const fileUploader = require("../config/cloudinary");

// GET "/api/movies" => Route to list all available movies
router.get("/items", (req, res, next) => {
    Item.find()
      .then(itemsFromDB => res.status(200).json(itemsFromDB))
      .catch(err => next(err));
  });
   
  // POST "/api/upload" => Route that will receive an image, send it to Cloudinary via the fileUploader and return the image URL
  router.post("/upload", fileUploader.single("imageUrl"), (req, res, next) => {
    console.log("file is: ", req.file)
   
    if (!req.file) {
      next(new Error("No file uploaded!"));
      return;
    }
    
    // Get the URL of the uploaded file and send it as a response.
    // 'secure_url' can be any name, just make sure you remember to use the same when accessing it on the frontend
    
    res.json({ secure_url: req.file.path });
  });
   
  // POST '/api/movies' => for saving a new movie in the database

//   router.post('/items', (req, res, next) => {
    
   
//     Item.create(req.body)
//       .then(createdItem => {
//           console.log(req.body)
        
//         res.status(200).json(createdItem);
//       })
//       .catch(err => next(err));
//   });


router.post('/items', (req, res, next) => {
	const { title, imageUrl, description } = req.body;
    console.log('test')
	// const owner = req.session.user._id;
	Item.create({
		title,
        imageUrl,
		description,
		
	})
		.then(item => {
			// we return http status code 201 - created
			res.status(201).json(item);
		})
		.catch(err => {
			next(err);
		})
})

   
  module.exports = router;