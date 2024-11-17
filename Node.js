const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const app = express();

// Crearea unui director 'uploads' dacă nu există
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Configurarea Multer pentru a salva fișierele încărcate
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);  // Directorul unde fișierele vor fi salvate
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));  // Numele fișierului va fi timestamp + extensia
    }
});

const upload = multer({ storage: storage });

// Servirea fișierelor statice (cum ar fi .css, .js, etc.)
app.use(express.static(path.join(__dirname)));

// Permite parsarea datelor din formularele POST
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Ruta pentru afișarea paginii principale (index.html)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Endpoint pentru încărcarea fișierelor
app.post('/upload', upload.array('file'), (req, res) => {
    const username = req.body.username; // Capturăm numele utilizatorului

    if (req.files) {
        req.files.forEach(file => {
            console.log(`Fișierul încărcat: ${file.originalname}`);
            console.log(`Salvat ca: ${file.filename}`);
            console.log(`Încărcat de: ${username}`);
        });
        res.status(200).send(`Fișierele au fost încărcate cu succes de către ${username}!`);
    } else {
        res.status(400).send('Nu s-au încărcat fișiere.');
    }
});

// Pornirea serverului
app.listen(3000, () => {
    console.log('Serverul rulează pe http://localhost:3000');
});
