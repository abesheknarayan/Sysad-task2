var express=require("express");
var app=express();
var ejs=require("ejs");
var port=5000;
const proxy= require('http-proxy-middleware');
var files;
var bodyParser=require("body-parser");
var MongoClient=require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/";
const proxy = require('http-proxy-middleware');
const { routes } = require('./config.json');

app.get("/",function(req,res)
{
res.send("load balancer accessed");
});
app.post("/",function(req,resServer)
{ 
       
  var cpu_needed = req.body.cpu_needed;
  var memory_needed = req.body.memory_needed;
  var time_to_process = req.body.time_to_process;
  
           init(resServer,cpu_needed,memory_needed,time_to_process);
      
 

});

 function init(resServer,cpu_needed,memory_needed,time_to_process)
 {

     var requests;
     MongoClient.connect(url,function(err,db){
      if (err) throw err;
      var dtb=db.db("servernodes");
      dtb.collection("requests").find({}).toArray(function(err,result){
     if(err) throw err;
     requests = result1;
      reqProcess(resServer,cpu_needed,memory_needed,time_to_process,requests);
      });
      db.close();
     });
 }
 async function reqProcess(resServer,cpu_needed,memory_needed,time_to_process,requests)
 {
     var docs;
     var client=new MongoClient(url);
     try{
        await client.connect();
        console.log("connceted to the server");
        const db=client.db("servernodes");
        let docs =await db.collection('nodes').find({}).toArray();
        let requests=db.collection("requests").find({}).toArray();
        for(i=0;i<requests.length;i++)
        {
            console.log(parseInt(requests[i].Memory_required.slice(0,requests[i].Memory_required.length-2))); //-2 is done to remove the GB from the string
            if(Date.now() - requests[i].Starttime >= parseInt(requests[i].time_required_for_completion)*1000)//converting it to milliseconds
            {
             var docToUpdate =await db.collection("nodes").find({Name:requests[i].allocated_node_name}).toArray();
             var myquery = { Name: docToUpdate[0].Name};
             var newvalues = { $set: {Available_CPUs: parseInt(docToUpdate[0].Available_CPUs)+parseInt(requests[i].CPU_required),available_memory: parseInt(docToUpdate[0].available_memory.slice(0,docToUpdate[0].available_memory.length-2))+ parseInt(requests[i].Memory_required.slice(0,requests[i].Memory_required.length-2)) + "GB"} };
             r = await db.collection("nodes").updateOne(myquery, newvalues);
             r = await db.collection("history").insert(requests[i]);
             r = await db.collection("requests").findOneAndDelete(requests[i]);
           }
       }
       reqhandle(resServer,cpu_needed,memory_needed,time_to_process);

        }
        catch (err){
            console.log(err.stack);
        }


}

async function  reqhandle(resServer,cpu_needed,memory_needed,time_to_process)
{
    MongoClient.connect(url,function(err,db)
    {
      if(err) throw err;
      var dtb=db.db("servernodes");

    });
    dtb.collection("nodes").find({}).toArray(function(err,result)
    {
        if(err) throw err;
        files =result;
        for(i=0;i<files.length;i++)
        {
            if(files[i].Available_CPUs>=cpu_needed && parseInt(docs[i].available_memory.slice(0,available_memory.length-2))>=memory_needed)
            {
                console.log(files[i].name);
                MongoClient.connect(url,function(err,db)
                {
                  if(err) throw err;
                  var dtb=db.db("servernodes");
                  var myquery={name:docs[i].name};
                  var newvalues={ $set: {Available_CPUs: parseInt(docs[i].Available_CPUs)-cpu_needed, available_memory: parseInt(docs[i].available_memory.slice(0,docs[i].available_memory.length-2))-memory_needed + "GB"} };
                  dtb.collection("nodes").updateOne(myquery,newvalues,function(err,res)
                  {
                       if(err) throw err;
                       console.log("document updated");
                       if(myquery.name == "Node_1")
                       { 
                         MongoClient.connect(url, function(err, db) {
                           if (err) throw err;
                           var dtb = db.db("servernodes");
                           var myobj = {allocated_node_name:myquery.name,Starttime:Date.now(),CPU_required:cpu_needed,Memory_required:memory_needed+"GB",time_required_for_completion:time_to_process}
                           dtb.collection("requests").insertOne(myobj, function(err, res) {
                             if (err) throw err;
                             console.log("1 document inserted");
                             resServer.redirect("/backend1");
                             db.close();
                           });
                           });
                       
                       }
                       else if(myquery.Name == "Node_2")
                       {
                         MongoClient.connect(url, function(err, db) {
                           if (err) throw err;
                           var dtb = db.db("serverSetup");
                           var myobj = {allocated_node_name:myquery.name,Starttime:Date.now(),CPU_required:cpu_needed,Memory_required:memory_needed+"GB",time_required_for_completion:time_to_process}
                           dtb.collection("Requests").insertOne(myobj, function(err, res) {
                             if (err) throw err;
                             console.log("1 document inserted");
                             resServer.redirect("/backend2");
                             db.close();
                           });
                           });
                       }
                       else if(myquery.Name == "Node_3")
                       {
                         MongoClient.connect(url, function(err, db) {
                           if (err) throw err;
                           var dtb = db.db("serverSetup");
                           var myobj = {allocated_node_name:myquery.name,Starttime:Date.now(),CPU_required:cpu_needed,Memory_required:memory_needed+"GB",time_required_for_completion:time_to_process}
                           dtb.collection("Requests").insertOne(myobj, function(err, res) {
                             db.close();                     if (err) throw err;
                             console.log("1 document inserted");
                             resServer.redirect("/backend3");
                             db.close();
                           });
                           });
                       }
                       else if(myquery.Name == "Node_4")
                       {
                         MongoClient.connect(url, function(err, db) {
                           if (err) throw err;
                           var dtb = db.db("serverSetup");
                           var myobj = {allocated_node_name:myquery.name,Starttime:Date.now(),CPU_required:cpu_needed,Memory_required:memory_needed+"GB",time_required_for_completion:time_to_process}
                           dbo.collection("Requests").insertOne(myobj, function(err, res) {
                             if (err) throw err;
                             console.log("1 document inserted");
                             resServer.redirect("/backend4");
                             db.close();
                           });
                           });
                       }
                       else
                       {
                         resServer.send("NO NODE AVAILABLE");
                       }
                  });
                });

            }
        }
    });


}
for (route of routes) {
    app.use(route.route,
        proxy({
            target: route.address,
            pathRewrite: function(path, req) {
                return path.split('/').slice(2).join('/'); 
        }})
    );
  }

app.listen(port,function()
{
console.log("PORT "+ port +" is in function ");
});
