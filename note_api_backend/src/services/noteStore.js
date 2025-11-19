const fs = require('fs');
const path = require('path');

const NOTES_FILE = path.join(__dirname, '../../notes.json');

class NoteStore {
  constructor() {
    this.notes = [];
    this.lastId = 0;
    this._load();
  }

  // Load notes from file if exists, else set with sample data
  _load() {
    try {
      if (fs.existsSync(NOTES_FILE)) {
        const data = fs.readFileSync(NOTES_FILE, 'utf-8');
        this.notes = JSON.parse(data);
        this.lastId = this.notes.reduce((max, n) => Math.max(max, n.id), 0);
      } else {
        // Seed sample notes
        this.notes = [
          {
            id: 1,
            title: 'Welcome Note',
            content: 'This is your first note!',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          },
        ];
        this.lastId = 1;
        this._save();
      }
    } catch (err) {
      this.notes = [];
      this.lastId = 0;
      this._save();
    }
  }

  _save() {
    try {
      fs.writeFileSync(NOTES_FILE, JSON.stringify(this.notes, null, 2));
    } catch (err) {
      // Logging only, don't crash the whole service
      console.error('Error writing notes file:', err.message);
    }
  }

  // PUBLIC_INTERFACE
  getAll() {
    /** Returns all notes as an array */
    return this.notes;
  }

  // PUBLIC_INTERFACE
  getById(id) {
    /** Returns note by id, or undefined */
    return this.notes.find((n) => n.id === id);
  }

  // PUBLIC_INTERFACE
  create(noteData) {
    /** Creates a note, returns new note */
    const now = new Date().toISOString();
    const note = {
      id: ++this.lastId,
      title: noteData.title,
      content: noteData.content || '',
      createdAt: now,
      updatedAt: now,
    };
    this.notes.push(note);
    this._save();
    return note;
  }

  // PUBLIC_INTERFACE
  update(id, noteData) {
    /** Updates a note by id, returns updated note or null */
    const idx = this.notes.findIndex((n) => n.id === id);
    if (idx === -1) return null;
    const now = new Date().toISOString();
    this.notes[idx] = {
      ...this.notes[idx],
      title: noteData.title,
      content: noteData.content ?? this.notes[idx].content,
      updatedAt: now,
    };
    this._save();
    return this.notes[idx];
  }

  // PUBLIC_INTERFACE
  delete(id) {
    /** Deletes a note by id, returns true if successful */
    const idx = this.notes.findIndex((n) => n.id === id);
    if (idx === -1) return false;
    this.notes.splice(idx, 1);
    this._save();
    return true;
  }
}

module.exports = new NoteStore();
