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

router.post('/items', (req, res, next) => {
    const { title, imageUrl, description, address } = req.body;
    console.log('this is req.body', req.body)
    // const owner = req.session.user._id;
    Item.create({
        title,
        description,
        address,
        imageUrl,
    })
        .then(item => {
            // we return http status code 201 - created
            console.log('item is', item)
            res.status(201).json(item);

        })
        .catch(err => {
            next(err);
        })

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

router.get('/items/:id', (req, res, next) => {
        //console.log(req.session.user);
        Item.findById(req.params.id)
            .then(item => {
                // check if the id is not valid
                // if (!mongoose.Types.ObjectId.isValid(req.params.id))
    
                if (!item) {
                    res.status(404).json(item);
                } else {
                    res.status(200).json(item);
                }
            })
            .catch(err => {
                next(err);
            })
    });



})


router.put('/items/:id', (req, res, next) => {
	const { title, description, address, imageUrl } = req.body
	Item.findByIdAndUpdate(req.params.id, {
		title,
		description,
        address,
        imageUrl
	}, { new: true })
		.then(updatedItem => {
			res.status(200).json(updatedItem)
		})
		.catch(err => next(err))
})

module.exports = router;