import React, { useContext } from "react";
import "../style/noteitemsstyle.css"
import noteContext from "../Context/notes/notecontext";

const Noteitems = (props) => {
      const context = useContext(noteContext);
      const { deletenotes } = context;
      const { note, updatenotes } = props;
      const handleDelete = ()=>{
            let reply = window.confirm("are you sure you want to delete the note")
            if(reply){
                  deletenotes(note._id);
                  props.showAlert("Note Deleted Successfully", true)
            }else{
                  props.showAlert("Note not Deleted", true)
            }
      }

  return (
      <div className="card" id='card'>
            <span id='badge' className="translate-middle badge rounded-pill bg-success">
                  {note.tag}
            </span>
            {/* <img src={`https://source.unsplash.com/200x130?${note.tag},remindernotes`} className="card-img-top" alt="..." /> */}
            <div className="card-body">
                  <span className="card-title" style={{fontWeight: '600'}}>{note.title}</span>
                  <p className="card-text mt-1 pt-1"  style={{borderTop:'2px solid grey'}}>{note.description.length < 160 ? note.description : note.description.slice(0, 160) + `...`}...</p>
            </div>
            <div id="iDiv">
                  <i className="fas fa-trash-alt mx-2" onClick={handleDelete}></i>
                  <i className="fas fa-edit mx-2" onClick={()=>{updatenotes(note)}}></i>
            </div>
      </div>
  );
};

export default Noteitems;
