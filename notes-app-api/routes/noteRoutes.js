const express=require("express");
const router= express.Router();

const {
    createNote,
    getAllNotes,
    getNoteById,
    updateNote,
    deleteNote
}= require("../controllers/noteController");

const authMiddleware= require('../middleware/authMiddleware');4

// Protected routes
router.post("/create",authMiddleware,createNote);
router.get('/', authMiddleware,getAllNotes);
router.get('/:id',authMiddleware,getNoteById)
router.put('/:id',authMiddleware,updateNote)
router.delete('/:id', authMiddleware,deleteNote);

module.exports=router;