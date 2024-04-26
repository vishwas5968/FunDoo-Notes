import express from "express";
import {userAuth} from "../middlewares/auth.middleware.js";
import * as NotesController from '../controllers/notes.controller.js'
import {archiveNote} from "../controllers/notes.controller.js";

const router=express.Router()

router.post("/",userAuth,NotesController.createNotes)

router.get("/",userAuth,NotesController.getNoteByEmail)

router.delete("/:id",userAuth,NotesController.deleteNote)

router.put('/trash/:id',userAuth,NotesController.softDeleteNote)

router.put('/archive/:id',userAuth,NotesController.archiveNote)

router.put('/:id',userAuth,NotesController.updateNote)

export default router