const Note=require('../models/Note');

//create note
exports.createNote = async (req , res)=>{
    try{
        const {title, content, color, pinned, archived}= req.body;
        const note=await Note.create({
            user:req.user._id,
            title,
            content,
            color,
            pinned,
            archived
        });
        res.status(201).json(note);
    }
    catch(err){
        res.status(500).json({ message: 'failed to create note', error:err.message});
    }
};

//Get all notes for the logged-in user
exports.getAllNotes = async (req,res)=>{
    try{
        const notes= await Note.find({user:req.user._id}).sort({updatedAt:-1});
        res.json(notes);
    }
    catch(err){
        res.status(500).json({message:'failed to fetch notes',error:err.message});
    }
};

//Get single note by Id
exports.getNoteById= async (req, res)=>{
    try{
        const note=await Note.findOne({ _id:req.params.id, user:req.user._id});
        if(!note) return res.status(404).json({message:'Note not found'});
        res.json(note);
    }
    catch(err){
        res.status(500).json({message:'failed to get note', error:err.message})
    }
}

//update a note
exports.updateNote = async (req,res)=>{
    try{
        const note= await Note.findOneAndUpdate(
            { _id:req.params.id, user:req.user._id },
            req.body,
            {new:true}
        );

        if(!note) return res.status(404).json({message:"Note not found or unauthorised"});
        res.json(note);
    }
    catch(err){
        res.status(500).json({message:"Failed to update note",error:err.message})
    }
}

//delete a note
exports.deleteNote = async(req,res)=>{
    try{
        const note = await Note.findOneAndDelete({ _id:req.params.id, user:req.user._id});
        if (!note) return res.status(404).json({message:"Note not found or unauthorized"});
        res.json({message:"note deleted succesffully"});
    }
    catch(err){
        res.status(500).json({message:'failed to delete note', error:err.message});
    }
};