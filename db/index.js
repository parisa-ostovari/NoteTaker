const fs = require('fs');
const util = require('util');

const uuid = require('uuid/v1');

const readAsync = util.promisify(fs.readFile);
const writeAsync = util.promisify(fs.writeFile);

class DB {
    read() {
        return readAsync('db/db.json', 'utf-8')
    }

    // Read note
    readNotes() {
        return this.read().then((data) => {
            let notes;

            try {
                notes = [].concat(JSON.parse(data))
            } catch (err) {
                notes = []
            }
            return notes;
        })
    }

    write(note) {
        return writeAsync('db/db.json', JSON.stringify(note))
    }

    // Create note
    createNote(note) {
        const { title, text } = note;
        const newNote = {
            title,
            text,
            id: uuid()
        }
        return this.readNotes().then((existingNotes) => [...existingNotes, newNote]).then((updatedNotes) => this.write(updatedNotes))
    }

    // Delete Note
    deleteNote(id) {
        return this.readNotes()
            .then((notes) => notes.filter((note) => note.id !== id))
            .then((filteredNotes) => this.write(filteredNotes));
    }
}

module.exports = new DB()