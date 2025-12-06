import express from 'express'
import mongoose from 'mongoose'

const app=express();
app.use(express.json());
const PORT=8000;
const TodoSchema=mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    }
},{
    timestamps:true,
    collection:"Todos"
});

const Todo=mongoose.model("Todo",TodoSchema);


app.get('/',(req,res)=>{   

    return res.status(201).json({
        "message":"Hello to our Docker program"
    })

})

app.get('/getalltask',async(req,res)=>{
    const allTodo=await Todo.find({});
    if(!allTodo || allTodo.length==0){
        return res.status(401).json({
            "message":"Sorry No task present.",
        })
    }
    return res.status(201).json({
        "message":"All task retrieved successfully!!",
        allTodo
    })
})

app.post('/createtask',async(req,res)=>{
    const {title,description}=req.body;
    if(!title || !description){
        return res.status(401).json({
            "message":"Sorry Missing credentials"
        })
    }
    const newTodo=await Todo.create({
        title,
        description
    })
    await newTodo.save();
    return res.status(201).json({
        "message":"New Task Created",
        newTodo
    })
})

mongoose.connect("mongodb://admin:querty@localhost:27017/docker1-db?authSource=admin")
.then(()=>{
    console.log('Docker mongodb connected Successfullly!!')
})
.catch((error)=>{
    console.log("Sorry there is error while connecting docker mongodb",error);
})


app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`)
})