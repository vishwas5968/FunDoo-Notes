import Notes from '../models/notes.model.js';

export const createNotes = async(body) => {
    return await Notes.create(body);
}

export const getNotesById = async (id) => {
    return Notes.find({ createdBy: id })
}

export const updateNote = async(_id, body, email) => {
    return await Notes.findOneAndUpdate(
        {
            _id, createdBy: email
        },
        body,
        {
            new: true
        }
    ).then((updatedNote) => {
        if(updatedNote!==null)
            return updatedNote
        throw new Error('Unauthorized Request')
    })
}

export const deleteNote = async(_id, email) => {
    return await Notes.findOneAndDelete(
        {
            _id, createdBy: email
        }
    ).then((result) => {
        if(result!==null)
            return
        throw new Error('Unauthorized Request')
    })
}

export async function softDeleteNote(id) {
    const oldData=await Notes.findById(id);
    oldData.isTrashed=!oldData.isTrashed
    return Notes.findByIdAndUpdate(id, oldData, {new: true});
}

export async function archiveNote(id) {
    const oldData=await Notes.findById(id);
    oldData.isArchive=!oldData.isArchive
    return Notes.findByIdAndUpdate(id, oldData, {new: true});
}