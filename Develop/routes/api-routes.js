const router = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const fs = require ("fs");

router.get('/api/notes', async (req, res) => {
    const notes = await JSON.parse(fs.readFileSync("db/db.json"))
    res.json(notes);
});

router.post('/api/notes', (req, res) => {
      const notes = JSON.parse(fs.readFileSync('db/db.json', 'utf8'));
      const newNotes = {
        title: req.body.title,
        text: req.body.text,
        id: uuidv4(),
      };

      notes.push(newNotes);
      fs.writeFileSync("db/db.json", JSON.stringify(notes));
      res.json(notes);
});

router.delete('/api/notes/:id', (req, res) => {
    let id = fs.readFileSync("db/db.json", "utf8");
    const dataJSON = JSON.parse(id);
    const newID = dataJSON.filter((note) => {
        return note.id !== req.params.id;
    });
    
    fs.writeFileSync("db/db.json", JSON.stringify(newID))
    res.json("Now deleted.")
});

module.exports = router;