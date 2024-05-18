const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const mongoose = require("mongoose");
const { log } = require("console");

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());
app.use('/images', express.static('public/images'));



// Connect to MongoDB
mongoose.connect("mongodb+srv://abu10thahir7:c2tGSQRJe36jivxv@cluster0.quyruzp.mongodb.net/crudOperation-image&text")
    .then(() => console.log("connected to mongo database successfully"))
    .catch((err) => {
        console.log(err);
    });

    const fs = require('fs');
// Set up Multer for file upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const folderPath = 'public/images';
        fs.mkdirSync(folderPath, { recursive: true }); // Create folder if it doesn't exist
        cb(null, folderPath);
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ 
    storage: storage,
    
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only images are allowed'));
        }
    }
}); 
// Define a mongoose model for user
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    gender: String,
    age: Number,
    address: String,
    phone: String,
    country: String,
    image: String // Store the image path in the user document
});

const UserModel = mongoose.model('User', userSchema);

// Create a user with image upload
app.post("/createUser", upload.single('image'), (req, res) => {
    const { name, email, password,gender, age, address, phone , country, } = req.body;
    const image = req.file.filename;
    console.log(image);
    
    UserModel.create({
        name,
        email,
        password,
        gender,
        age,
        address,
        phone,
        country,
        image
    })
    .then(user => res.json(user))
    .catch(err => res.status(500).send(err.message || "Internal Server Error"));
});

// Get all users
app.get("/getUser", async (req, res) => {
    try {
        const users = await UserModel.find();
        const usersWithImages = users.map(user => {
            const imagePath = user.image ? `http://localhost:5000/images/${user.image}` : null;
            return { ...user.toObject(), image: imagePath };
        }); 
        res.json(usersWithImages);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
    

// Delete a user
app.delete("/deleteUser/:id", (req, res) => {
    const userId = req.params.id;

    UserModel.findByIdAndDelete(userId)
        .then(() => res.status(200).send("User deleted successfully"))
        .catch(err => res.status(500).send(err.message || "Internal Server Error"));
});


// Update a user
// Update a user by ID
app.put("/updateUser/:id", upload.single('image'), async (req, res) => {
    const userId = req.params.id;
    const { name, email, password,gender, age, address, phone, country  } = req.body;
    let image = null;
    if (req.file) {
        image = req.file.filename;
    }

    try {
        const updatedUser = await UserModel.findByIdAndUpdate(userId, {
            name,
            email,
            password,
            gender,
             age,
              address,
             phone,
             country,
            image
        }, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(updatedUser);
    } catch (err) {
        res.status(500).json({ message: err.message || "Internal Server Error" });
    }
});


  // Backend route to get user by ID
// Update the route to handle individual user retrieval
app.get("/getUser/:id", async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const imagePath = user.image ? `http://localhost:5000/images/${user.image}` : null;
        const userDataWithImage = { ...user.toObject(), image: imagePath };
        res.json(userDataWithImage);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.listen(port, () => {
    console.log("Server is running on port", port);
});
