//Apn views folder bhi banate hai taki apn ejs files usse require kar ske
//iske liye path ko add karna padta hai
const express= require("express");
const app= express();
const mongoose= require("mongoose");
const path= require("path");
const Chat= require("./models/chat.js");
const methodOverride= require("method-override");


app.set("views", path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public"))); //ye serve honi wali hai public folder se css property apply ho or aon ko dikhe iske liye
app.use(express.urlencoded({extented:true}));
app.use(methodOverride("_method"));
//Database se data lete hai to async function ka use karte hai
//Itte time se apn schema(data ya rows) apn isme define kar rahe the per real world me data jyada bhi hota hai usko
//ese define nahi kar skte to apn alag se folder create karte hai hai abhi isme model name ka create karenge
main().then(()=>{
    console.log("Connection Successful");
}).catch(err=> console.log(err));

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

//Index Route
app.get("/chats", async(req,res)=>{
    //Database se sara data lene ke liye command db.model.find()
    let chats=  await Chat.find();
    console.log(chats);
    res.render("index.ejs",{chats});
})

//New Route
app.get("/chats/new",(req,res)=>{
    res.render("new.ejs");
})

//Create Route
app.post("/chats",(req,res)=>{
    //direct data nahi aata req.body me uske liye data paras karna padta hai uske urlencoded ye add karma padta hai
    //yaha jo new chat apn bana rahe hai wo banti hai save hoti hai or redirect se wapis main page pe aa jati hai
    let {from,to,msg}= req.body;
    let newChat= new Chat({
        from: from,
        to: to,
        msg: msg,
        created_at: new Date(),
    });
    newChat
    .save()
    .then((res)=>{
        console.log("Chat was saved");
    }).catch((err)=>{
        console.log(err);
    })
    res.redirect("/chats");
})

//Edit Route
app.get("/chats/:id/edit",async(req,res)=>{
    let {id}= req.params;
    let chat= await Chat.findById(id);//database ke andr kuch search karna bhi async hai to
    res.render("edit.ejs",{chat});
})

//Update Route
app.put("/chats/:id",async(req,res)=>{
    let {id}= req.params;
    let {msg: newMsg}= req.body;
    let updatedChat= await Chat.findByIdAndUpdate(id,{msg:newMsg},{runValidators:true,new:true});
    console.log(updatedChat);
    res.redirect("/chats");
})

//Destroy Route
app.delete("/chats/:id",async(req,res)=>{
    let {id}= req.params;
    let deletedChat= await Chat.findByIdAndDelete(id);
    console.log(deletedChat);
    res.redirect("/chats");
})

app.get("/",(req,res)=>{
    res.send("Root is Working");
})

app.listen(8080,()=>{
    console.log("Server is listening on port 8080");
})

