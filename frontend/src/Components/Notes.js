import React, { useContext, useRef, useState } from "react";
import { useEffect } from "react";
import noteContext from "../Context/notes/notecontext";
import Noteitems from "./Noteitems";
import { useNavigate } from "react-router-dom";

const Note = (props) => {
  const context = useContext(noteContext);
  const { notes, fetchallnotes, editnotes } = context;
  const navigate = useNavigate()

  useEffect(() => {
    if(localStorage.getItem('token')){
      fetchallnotes();
    }else{
      navigate('/signup');
    }
    // eslint-disable-next-line
  }, []);

  const ref = useRef(null);
  const refClose = useRef(null);

  const [note, setNote] = useState({id:'', etitle: "", edescription: "", etag: ""})

  const updatenotes = (Cnote) => {
    ref.current.click();
    setNote({id:Cnote._id , etitle: Cnote.title, edescription: Cnote.description, etag: Cnote.tag})
  };
  
  const handleclick = (e) =>{
    editnotes(note.id, note.etitle, note.edescription, note.etag);
    refClose.current.click();
    setNote({id:'', etitle: "", edescription: "", etag: ""})
    props.showAlert("Note Updated Successfully", true);
  }
  const onchange = (e) =>{
    setNote({...note, [e.target.name]: e.target.value})
  }

  return (
  <>
    <button style={{ display: "none" }} type="button" ref={ref} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
      Launch demo modal
    </button>
    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              Edit your notes
            </h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <div className="container my-3">  
              
              <form className="my-3" method="" action="">
                <div className="mb-3">
                  <label className="form-label">Note title</label>
                  <input type="text" id="etitle" name="etitle" value={note.etitle} className="form-control" onChange={onchange} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Note Description</label>
                  <input type="text" id="edescription" value={note.edescription} name="edescription" className="form-control" onChange={onchange} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Tag</label>
                  <input type="text" id="etag" name="etag" className="form-control" value={note.etag} onChange={onchange} />
                </div>
                
              </form>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">
              Close
            </button>
            <button type="button" disabled={note.etitle.length<5 || note.edescription.length <5} className="btn btn-primary" onClick={handleclick}>
              Update Note
            </button>
          </div>
        </div>
      </div>
    </div>

    <h2 className="text-center mt-4">your Notes</h2>
      <div className="container">
        {notes.length===0 && 'you don\'t have any notes'}
      </div>
      <div className="my-4" style={{ display: "flex" , flexWrap: "wrap" }}>
      {notes.map((note, key) => {
      key++;
      return <Noteitems showAlert={props.showAlert} note={note} updatenotes={updatenotes} key={key}/>;
      })}
    </div>
  </>
  );
};

export default Note;