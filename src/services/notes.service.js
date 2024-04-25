import Notes from "../models/notes.model.js"

export const addNote=async (body)=>{
    return await Notes.create(body)
}

export const getAllNotes=async (id)=>{
    return Notes.findById(id);
}

export const deleteNotes = async (id)=>{
    return Notes.remove({id:id})
}

