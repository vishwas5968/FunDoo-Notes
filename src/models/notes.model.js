import {model,Schema} from "mongoose";

const notesSchema=new Schema({
    title:{
        type:String,

    },
    description:{
        type:String
    },
    color:{
        type:String
    },
    isArchive:{
        type:String
    },
    isTrashed:{
        type:String
    },
    createdBy:{
        type:String
    }
})

export default model("Notes",notesSchema)