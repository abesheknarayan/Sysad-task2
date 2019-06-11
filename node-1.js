var express=require("express");
var app=express();
var MongoClient=require("mongodb").MongoClient;
const url= "mongodb://localhost:27017/";
var ejs=require("ejs");

var req;
var history;
var port=3000;
app.set("view engine","ejs");
 
async function nodefn(res)
{
	const client=new MongoClient(url);
	try{
		await client.connect();
		console.log("connected to server 1");
		const db=client.db("servernodes");
		req = await db.collection("requests").find({allocated_node:"node-1"}).toArray();
		history=await db.collection("history").find({allocated_node:"node-1"}).toArray();
		console.log(db.collection("nodes"));
		res.render("index",{requests:req,requests_history:history});

}
	catch(error)
	{
            return error.stack;
	}
} 
app.get("/",function(req,res)
{ var res;
res.send("hello there!");
nodefn(res);
});

app.listen(port,function()
{
 console.log("PORT " + port +"  is in function ");
});