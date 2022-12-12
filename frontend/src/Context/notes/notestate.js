import noteContext from "./notecontext";
import { useState } from "react";

export const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitials = [];

  const [notes, setNotes] = useState(notesInitials);

  // fetch all the notes from the api
  const fetchallnotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
        localStorage.getItem('token'),
      },
    });
    const json = await response.json();
    setNotes(json)
    
  };

  // add notes in the api
  const addnotes = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnotes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
        localStorage.getItem('token'),
      },
      body: JSON.stringify({ title, description, tag }),
    });

    const Anotes = await response.json()
    setNotes(notes.concat(Anotes));
    props.showAlert("Note Addedd Successfully", true);
  };

  // deletenotes form the api
  const deletenotes = async (id) => {
    // eslint-disable-next-line
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
        localStorage.getItem('token'),
      },
    });
    

    const Dnotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(Dnotes);
    props.showAlert("Note Removed Successfully", true);

  };

  // update notes for the inotebook frontend to the api
  const editnotes = async (id, title, description, tag) => {
    // eslint-disable-next-line
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
        localStorage.getItem('token'),
      },
      body: JSON.stringify({ title, description, tag }),
    });

    let Unotes = JSON.parse(JSON.stringify(notes))
    for (let index = 0; index < Unotes.length; index++) {
      const element = Unotes[index];
      if (element._id === id) {
        Unotes[index].title = title;
        Unotes[index].description = description;
        Unotes[index].tag = tag;
        break;
      }
    }
    setNotes(Unotes);
  };

  return (
    <noteContext.Provider value={{ notes, addnotes, deletenotes, editnotes, fetchallnotes }}>
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
