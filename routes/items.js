const express = require("express");
const router = express.Router();
const Item = require("../models/Item");
const Post = require("../models/Post")

const fileUploader = require("../config/cloudinary");


const isAuthor = () => {
    return (req, res, next) => {
        Item.findById(req.params.id).then(item => {
            item.author.toString() === req.session.user._id
                ? next()
                : res.redirect("/")
        })
    }
}

// GET "/api/movies" => Route to list all available movies
router.get("/items", (req, res, next) => {

    Item.find()

        .then(itemsFromDB => res.status(200).json(itemsFromDB))
        .catch(err => next(err));
});

router.post('/items', (req, res, next) => {
    const { title, imageUrl, description, address } = req.body;

    const author = req.session.user._id;
    console.log('this is author', author)
    Item.create({
        title,
        description,
        address,
        imageUrl,
        author,
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


})

router.get('/items/:id', (req, res, next) => {
    //console.log(req.session.user);

    Item.findById(req.params.id)
        .populate('author')
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

router.put('/items/:id', isAuthor(), (req, res, next) => {
    const { title, description, address, imageUrl } = req.body
    Item.findByIdAndUpdate(req.params.id, {
        title,
        description,
        address,
        imageUrl,

    }, { new: true })
        .then(updatedItem => {
            res.status(200).json(updatedItem)
        })
        .catch(err => next(err))
})

router.delete('/items/:id', isAuthor(), (req, res, next) => {
    Item.findByIdAndDelete(req.params.id)
        .then(() => {
            res.status(200).json({ message: 'item deleted' })
        })
});


//Messaging 

router.get('/items/:id/post', (req, res, next) => {
    Post.find({item: req.params._id})
    .then(postsFromDB => {
        console.log("POOOOSSSSSTTTTTSSSSS",postsFromDB)
        res.status(200).json(postsFromDB)
    })
    .catch(err => next(err));
})

router.post("/items/:id/post", (req, res, next) => {
    const loggedInUser = req.session.user
    const id = req.params.id

    const { message} = req.body

    console.log("message:", message)

    // const postedDate = shortDates(datePost)

    Post.create({
        poster: loggedInUser,
        item: id,
        message,
       
    })
        .then(post => {
            Item.findByIdAndUpdate(id, { $push: { post: post._id } })
            .populate('post')
            .then(
                (post) => {
                    console.log("post is", post)
                    res.status(200).json(post)
                }
            )
        })
        .catch(err => next(err))
})





module.exports = router;