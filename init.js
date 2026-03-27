const mongoose= require("mongoose");
const Chat= require("./models/chat.js");

main().then(()=>{
    console.log("Connection Successful");
}).catch(err=> console.log(err));

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

let allchats=[
    {
        from:"lucky",
        to:"China",
        msg:"Hii how are you",
        created_at: new Date(),
    },
    {
        from:"Hariom",
        to:"Ratan",
        msg:"Le aave na re",
        created_at: new Date(),
    },
    {
        from:"Kartik",
        to:"Akshat",
        msg:"kha hai bhai",
        created_at: new Date(),
    },
    {
        from:"Eklavya",
        to:"kavadiya",
        msg:"Colllege chalega kya aaj",
        created_at: new Date(),
    },
    {
        from:"Rohhi",
        to:"Lalit",
        msg:"Can you send me my pics",
        created_at: new Date(),
    }
];

Chat.insertMany(allchats);