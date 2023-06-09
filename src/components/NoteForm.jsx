import React, { useState } from 'react';

const NoteForm = ({ onCreateNote, onDeleteNote }) => {
  // État pour stocker le texte de la note
  const [noteText, setNoteText] = useState('');
  // État pour stocker les notes
  const [notes, setNotes] = useState([]);

  // Gérer le changement du texte de la note
  const handleNoteChange = (e) => {
    setNoteText(e.target.value);
  };

  // Gérer la soumission du formulaire de note
  const handleNoteSubmit = (e) => {
    e.preventDefault();
    const newNote = { text: noteText };
    onCreateNote(newNote);
    setNotes([...notes, newNote]);
    setNoteText('');
  };

  // Gérer la suppression d'une note
  const handleNoteDelete = (noteId) => {
    onDeleteNote(noteId);
    const updatedNotes = notes.filter((note, index) => index !== noteId);
    setNotes(updatedNotes);
  };

  return (
    <div className="note-form">
      <h2>Créer une note</h2>
      {/* Formulaire de création de note */}
      <form onSubmit={handleNoteSubmit}>
        <input
          type="text"
          value={noteText}
          onChange={handleNoteChange}
          placeholder="Entrez une note..."
          required
        />
        <button type="submit">Ajouter</button>
      </form>
      <h2>Liste des notes</h2>
      <div className="note-list">
        {/* Afficher chaque note */}
        {notes.map((note, index) => (
          <div key={index} className="note-card">
            <p>{note.text}</p>
            <button onClick={() => handleNoteDelete(index)}>Supprimer</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NoteForm;
