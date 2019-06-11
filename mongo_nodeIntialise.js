var MongoClient=require("mongodb").MongoClient;
const url = 'mongodb://localhost:27017';
mongoClient.connect(url,function(err,database)
{ if(err) throw err;
var db=database.db("servernodes");
var obj={
  name:"node_1",
  no_of_CPU:10,
  Available_CPU:10,
  total_memory:"10GB",
  available_memory:"10GB",
}
db.collection("nodes").insertOne(obj,function(err,res)
{
	if(err) throw console.log(err);
	console.log("node inserted");
});
var obj={
  name:"node_2",
  no_of_CPU:8,
  Available_CPU:8,
  total_memory:"8GB",
  available_memory:"8GB",
}
db.collection("nodes").insertOne(obj,function(err,res)
{
	if(err) throw console.log(err);
	console.log("node inserted");
});
var obj={
  name:"node_3",
  no_of_CPU:6,
  Available_CPU:6,
  total_memory:"6GB",
  available_memory:"6GB",
}
db.collection("nodes").insertOne(obj,function(err,res)
{
	if(err) throw console.log(err);
	console.log("node inserted");
});
var obj={
  name:"node_4",
  no_of_CPU:7,
  Available_CPU:7,
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