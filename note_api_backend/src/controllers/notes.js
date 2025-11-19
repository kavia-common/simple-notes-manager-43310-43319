const noteStore = require('../services/noteStore');

// PUBLIC_INTERFACE
exports.createNote = (req, res) => {
  /**
   * Creates a new note.
   * Body: { title: string (required), content: string (optional) }
   */
  const { title, content } = req.body;
  if (!title || typeof title !== 'string' || !title.trim()) {
    return res.status(400).json({ message: 'Title is required and must be non-empty.' });
  }
  const note = noteStore.create({ title: title.trim(), content });
  return res.status(201).json(note);
};

// PUBLIC_INTERFACE
exports.getAllNotes = (req, res) => {
  /** Gets all notes. */
  res.json(noteStore.getAll());
};

// PUBLIC_INTERFACE
exports.getNoteById = (req, res) => {
  /** Gets a note by id param */
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) return res.status(400).json({ message: 'Invalid note id.' });
  const note = noteStore.getById(id);
  if (!note) return res.status(404).json({ message: 'Note not found.' });
  res.json(note);
};

// PUBLIC_INTERFACE
exports.updateNote = (req, res) => {
  /**
   * Updates a note.
   * Params: id
   * Body: { title: string (required), content: string (optional) }
   */
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) return res.status(400).json({ message: 'Invalid note id.' });
  const { title, content } = req.body;
  if (!title || typeof title !== 'string' || !title.trim()) {
    return res.status(400).json({ message: 'Title is required and must be non-empty.' });
  }
  const updated = noteStore.update(id, { title: title.trim(), content });
  if (!updated) return res.status(404).json({ message: 'Note not found.' });
  res.json(updated);
};

// PUBLIC_INTERFACE
exports.deleteNote = (req, res) => {
  /** Deletes a note by id param */
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) return res.status(400).json({ message: 'Invalid note id.' });
  const ok = noteStore.delete(id);
  if (!ok) return res.status(404).json({ message: 'Note not found.' });
  res.status(204).send();
};
