const express = require('express')
const cors = require('cors')
const multer = require('multer')
const port = 5000

const app = express()

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'images/');
    },

    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },

});

const fileFilter = (req, file, cb) =>{
    const allowedTypes = ['image/jpg', 'image/png'];

    if(allowedTypes.includes(file.mimetype)){
        cb(null, true)
    } else {
        cb(new Error('invalid file type'), false)
    }
}


const upload = multer({
    storage:storage,
    fileFilter
});

app.use(cors());

app.post('/image', upload.single('file'), (req, res) => {
    res.json({ message: "Image uploaded "})
})

app.listen(port, ()=> {
    console.log('server is running `${post}`')
})