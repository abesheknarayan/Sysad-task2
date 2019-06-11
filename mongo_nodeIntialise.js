var MongoClient=require("mongodb").MongoClient;
const url = 'mongodb://localhost:27017';
mongoClient.connect(url,function(err,database)
{ if(err) throw console.log(err);
var db=database.db("servernodes");
var obj={
  nam:"node-1",
  no-of-CPU:10,
  total_memory:"10GB",
  available_memory:"10GB",
}
db.collection("nodes").insertOne(obj,function(err,res)
{
	if(err) throw console.log(err);
	console.log("node inserted");
});
var obj={
  nam:"node-2",
  no-of-CPU:8,
  total_memory:"8GB",
  available_memory:"8GB",
}
db.collection("nodes").insertOne(obj,function(err,res)
{
	if(err) throw console.log(err);
	console.log("node inserted");
});
var obj={
  nam:"node-3",
  no-of-CPU:6,
  total_memory:"6GB",
  available_memory:"6GB",
}
db.collection("nodes").insertOne(obj,function(err,res)
{
	if(err) throw console.log(err);
	console.log("node inserted");
});
var obj={
  nam:"node-4",
  no-of-CPU:7,
  total_memory:"7GB",
  available_memory:"7GB",
}
db.collection("nodes").insertOne(obj,function(err,res)
{
	if(err) throw console.log(err);
	console.log("node inserted");
	database.close();
});
});