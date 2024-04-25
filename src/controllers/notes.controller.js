import HttpStatus from "http-status-codes";
import * as NotesService from "../services/notes.service.js"

export const addNote=async (request,response,next)=>{
    const data= await NotesService.addNote(request.body)
}