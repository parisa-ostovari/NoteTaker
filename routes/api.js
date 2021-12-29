const router = require('express').Router();
const db = require('../db')


// get route to retrieve notes
router.get('/notes', (req, res) => {
    db.readNotes()
        .then((data) => {
            return res.json(data)
        })
        .catch((err) => res.status(500).json(err))
});

// post route for new note
router.post('/notes', (req, res) => {
    db.createNote(req.body)
        .then((data) => {
            return res.json(data)
        })
        .catch((err) => res.status(500).json(err))
});

// delete route

router.delete('/notes/:id', (req, res) => {
    db.deleteNote(req.params.id)
        .then(() => res.json({ ok: true }))
        .catch((er) => res.status(500).json(err));
});


module.exports = router
