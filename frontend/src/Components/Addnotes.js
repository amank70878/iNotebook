import React, { useContext, useState } from "react";
import noteContext from "../Context/notes/notecontext";

const Addnotes = (props) => {
  const context = useContext(noteContext);
  const { addnotes } = context;

  const [note, setNote] = useState({title: "", description: "", tag: ""})

  const handleAdd = (e) =>{
      e.preventDefault()
      addnotes(note.title, note.description, note.tag)
      setNote({title: "", description: "", tag: ""});
      props.showAlert("Note Added Successfully", true);
  }
  const onchange = (e) =>{
      setNote({...note, [e.target.name]: e.target.value})
  }

  return (
    <div className="container mt-5">
      <h2 className="mt-2">Add a note</h2>
      <form className="my-3" method="" action="">
        <div className="mb-3">
          <label className="form-label">Note title</label>
          <input type="text" id='title' name='title' className="form-control" onChange={onchange} value={note.title} required minLength={5}/>
        </div>
        <div className="mb-3">
          <label className="form-label">Note Description</label>
          <input type="text" id="description" name="description" className="form-control" onChange={onchange} value={note.description} required minLength={5} />
        </div>
        <div className="mb-3">
          <label className="form-label">Tag</label>
          <input type="text" id="tag" name="tag" className="form-control" value={note.tag} onChange={onchange} required />
        </div>
        <button disabled={note.title.length<5 || note.description.length <5} type="submit" className="btn btn-primary" onClick={handleAdd}>
          Add Note
        </button>
      </form>
    </div>
  );
};

export default Addnotes;
