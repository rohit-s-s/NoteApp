const express = require("express")
const router = express.Router()
const { handleCreateNote, handleUpdateNotes, handleDeleteNote, handleShowNotes, handleGetNotes, handleGetNotesById } = require("../controller/notes")
const auth = require('../middleware/auth') 

router.post("/create",handleCreateNote)//route for creating new notes
router.put("/update", handleUpdateNotes)//route for editing routes
router.delete("/delete", handleDeleteNote)//route for editing routes
router.get("/getnotes", auth, handleGetNotes)//route for getting user notes
router.get("/getnote/:id",auth, handleGetNotesById)//route for getting specific notes by id

module.exports = router