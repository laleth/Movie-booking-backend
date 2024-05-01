const express = require("express")
const moviesModel = require("../models/moviemodel");
const authUser = require("../middleware/auth");



const router = express.Router();
router.use(authUser);


router.post("/add-movies", async (req, res) => {
    try {
        const { id } = req.body;
        const existingMovie = await moviesModel.findOne({ id: id });

        if (existingMovie) {
            return res.status(400).json({ message: "Movie with this ID already exists" });
        }

        const movie = await moviesModel.create(req.body);
        res.status(201).json(movie);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.get("/get-all-movies", async (req, res) => {
    try {
        const movies = await moviesModel.find();
        res.status(200).json(movies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.get("/get-movie-byid/:id", async (req, res) => {
    try {
        const movie = await moviesModel.findById(req.params.id);
        if (!movie) {
            return res.status(404).json({ message: "Movie not found" });
        }
        res.status(200).json(movie);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// router.get('/last-movie-id', async (req, res) => {
//     try {
//       const lastMovie = await moviesModel.aggregate([
//         { $group: { _id: null, maxId: { $max: "$id" } } }
//       ]);
    
//       if (lastMovie.length > 0) {
//         res.json({ id: lastMovie[0].maxId });
//       } else {
//         res.json({ id: '1' }); // If there are no documents in the collection, default to id 1
//       }
//     } catch (error) {
//       console.error('Error fetching last movie ID:', error);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   });
router.get('/last-movie-id', async (req, res) => {
    try {
        const count = await moviesModel.countDocuments();
        res.json({ id: count }); // Return the count of documents as the ID
    } catch (error) {
        console.error('Error fetching last movie ID:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});




  

module.exports = router;