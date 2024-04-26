import HttpStatus from "http-status-codes";
import * as NotesService from "../services/notes.service.js"

export const createNotes = async(req, res) => {
    try {
        console.log(res.locals.user.email)
        req.body.createdBy = res.locals.user.email
        console.log("*********--------------------")
        const data = await NotesService.createNotes(req.body);
        res.status(HttpStatus.CREATED).json({
            success: true,
            message: 'Note created successfully',
            data: data
        });
    } catch (error) {
        res.status(HttpStatus.BAD_REQUEST).json({
            code: HttpStatus.BAD_REQUEST,
            message: `${error}`
        });
    }
};

export const getNoteByEmail = async(req, res) => {
    try{
        const data = await NotesService.getNoteByEmail(res.locals.user.email)
        res.status(HttpStatus.OK).json({
            success: true,
            message: 'fetched successfully',
            data: data
        });
    }catch(error){
        res.status(HttpStatus.OK).json({
            success: false,
            message: `${error}`
        });
    }
};

export const updateNote = async(req, res) => {
    try{
        const data = await NotesService.updateNote(req.params._id, req.body, res.locals.user.email);
        res.status(HttpStatus.OK).json({
            success: true,
            message: 'Note Updated Successfully',
            data: data
        });
    }catch(error){
        res.status(HttpStatus.BAD_REQUEST).json({
            success: false,
            message: `${error}`
        });
    }
}

export const deleteNote = async(req, res) => {
    try{
        await NotesService.deleteNote(req.params._id, res.locals.user.email);
        res.status(HttpStatus.OK).json({
            success: true,
            message: 'Note Deleted Successfully',
        });
    }catch(error){
        res.status(HttpStatus.BAD_REQUEST).json({
            success: false,
            message: `${error}`
        });
    }
};

export const softDeleteNote= async (req, res)=> {
    const data = await NotesService.softDeleteNote(req.params.id)
    res.status(HttpStatus.CREATED).json({
        success: true,
        message: 'Note Deleted successfully',
        data: data
    });
}

export const archiveNote= async (req, res)=> {
    const data = await NotesService.archiveNote(req.params.id)
    res.status(HttpStatus.CREATED).json({
        success: true,
        message: 'Note Deleted successfully',
        data: data
    });
}