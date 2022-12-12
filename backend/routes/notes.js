const express = require('express');
const router = express.Router();
const Notes = require("../models/Notes");
const fetchuser = require('../middleware/fetchuser')
const { body, validationResult } = require("express-validator");

// ROUTE 1 ----> fetch all the notes of the user : login required
router.get('/fetchallnotes', fetchuser, async (req, res)=>{
      try{
            const notes = await Notes.find({user: req.user.id})
            res.json(notes)
      } catch (err) {
            console.log(err.message);
            res.status(500).send("internal serval error")
      }
})



// ROUTE 2 ----> add the notes of the user : login required
router.post('/addnotes', fetchuser, [
      body('title', 'title must be more than 5 characters').isLength({min:5}),
      body('description', 'description must be more than 5 characters').isLength({min:5}),
      ], async (req, res)=>{
            try{
                  const {title, description, tag} = req.body;

                  // is error occurred then return bad req
                  const errors = validationResult(req);
                  if(!errors.isEmpty()){
                        return res.status(400).json({ errors: errors.array() });
                  }

                  // saving the notes
                  const notes = new Notes({
                        title, description, tag, user: req.user.id
                  })
                  const savednote = await notes.save();
                  res.send(savednote)

            } catch (error) {
                  // error handling
                  console.log(error.message);
                  res.status(500).send("internal serval error")
            }
})

// ROUTE 3: Update an existing Note using: PUT "/api/notes/updatenote". Login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
      const { title, description, tag } = req.body;
      try {
          // Create a newNote object
          const newNote = {};
          if (title) { newNote.title = title };
          if (description) { newNote.description = description };
          if (tag) { newNote.tag = tag };
  
          // Find the note to be updated and update it
          let note = await Notes.findById(req.params.id);
          if (!note) { return res.status(404).send("Not Found") }
  
          if (note.user.toString() !== req.user.id) {
              return res.status(401).send("Not Allowed");
          }
          note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
          res.json({ note });
      } catch (error) {
          console.error(error.message);
          res.status(500).send("Internal Server Error");
      }
  }
)



// ROUTE 4: Delete an existing Note using: Delete "/api/notes/deletenote". Login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
      try {
          // Find the note to be updated and update it
          let note = await Notes.findById(req.params.id);
          if (!note) { return res.status(404).send("Not Found") }
  
          if (note.user.toString() !== req.user.id) {
              return res.status(401).send("Not Allowed");
          }
          note = await Notes.findByIdAndDelete(req.params.id)
          res.json({ "success" : "note has been succesfully deleted" , note : note });
      } catch (error) {
          console.error(error.message);
          res.status(500).send("Internal Server Error");
      }
  }   
)
  

module.exports = router;