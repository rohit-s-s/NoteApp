const Notes = require("../model/notes")
const mongoose = require("mongoose")
const asyncHandler = require('express-async-handler')

//Storing notes data
exports.handleCreateNote = asyncHandler(async(req,res)=>{
    const {title,text} = req.body
    if(!title || !text){
        return res.status(400).json({message:"Provide all required feilds"})
    }
    const notes = await Notes.create({user:req.user._id,title,text})
    res.status(201).json({message:"Notes created"})
})

exports.handleUpdateNotes = asyncHandler(async(req,res)=>{
    const {id,title,text} = req.body
    if(!id || !title || !text){
        return res.status(400).json({message:"Enter all required feilds"})
    }
    const notes = await Notes.findById(id)
    notes.title = title
    notes.text = text
    
    await notes.save()
    res.status(200).json(notes)
})

exports.handleDeleteNote = asyncHandler(async(req,res)=>{
    const {id} = req.body
    if(!id) return res.status(400).json({message:"Provide id"})
    const note = await Notes.findByIdAndDelete(id)
    if(!note) return res.status(400).json({message:"Data not found"})
    
    res.status(200).json({message:"Data deleted successfully"})
})

exports.handleGetNotes = asyncHandler(async (req,res) => {
    const notes = await Notes.find({user:req.user._id}).populate('user')
        const noteDetails =  notes.map(note=>({
            id:note._id,
            title:note.title,
            text:note.text
        }))
        res.status(200).json(noteDetails)
})

exports.handleGetNotesById = asyncHandler(async (req,res) => {
    const {id} = req.params
    const notes = await Notes.findById(id)
    res.status(200).json(notes)
})
