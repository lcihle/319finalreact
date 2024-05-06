// Author: Logan Ihle abd Katherine Jacobson
//     ISU Netid : lcihle@iastate.edu and kjacob@iastate.edu
//     Date :  April 25, 2024


var express = require("express");
var cors = require("cors");
var app = express();
var fs = require("fs");
var bodyParser = require("body-parser");
app.use(cors());
app.use(bodyParser.json());
const port = "8081";
const host = "localhost";

//const sharp = require('sharp');

const { MongoClient } = require("mongodb");

const url = "mongodb://127.0.0.1:27017";
const dbName = "finalskis";
const client = new MongoClient(url);
const db = client.db(dbName);

app.get("/listRobots", async (req, res) => {
    await client.connect();
    console.log("Node connected successfully to GET MongoDB");
    const query = {};
    const results = await db
    .collection("skis1")
    .find(query)
    .limit(100)
    .toArray();
    console.log(results);
    res.status(200).send(results);
  //  res.send(results);
    });

app.get("/skis1/:id", async (req, res) => {
//     const robotid = Number(req.params.id);
//     console.log("Robot to find :", robotid);
//     await client.connect();
//     console.log("Node connected successfully to GET-id MongoDB");
//     const query = {"id": robotid };
//     const results = await db.collection("robot")
//     .findOne(query);
//     console.log("Results :", results);
//     res.send(results);
//    // res.send



    const robotid = Number(req.params.id);
    console.log("Running to find first one by ID");
    console.log("Robot to find :", robotid);
    await client.connect();
    console.log("Node connected successfully to GET-id MongoDB");
    const query = {"id": robotid };
    const results = await db.collection("skis1")
    .findOne(query);
    console.log("Results :", results);
    if (!results) res.send("Not Found").status(404);
    else res.send(results).status(200);
    });


app.post("/addRobot", async (req, res) => { 
    await client.connect();
    const keys = Object.keys(req.body);
    const values = Object.values(req.body);

    // was correct
    const newDocument = {
        "id": values[0], // also "id": req.body.id,
        "name": values[1], // also "name": req.body.name,
        "price": values[2], // also "price": req.body.price,
        "imageUrl": values[4],
        "description": values[3] // also "description": req.body.description,
        // also "imageUrl": req.body.imageUrl, was "imageUrl": values[4]
        };
    console.log(newDocument);
    const results = await db
    .collection("skis1")
    .insertOne(newDocument);
    res.status(200);
    res.send(results);


});



       
app.delete("/deleteRobot/:id", async (req, res) => {
    try {
    const id = Number(req.params.id);
    await client.connect();
    console.log("Robot to delete :",id);
    const query = { id: id };
    // delete
    //questionable placement
    const robotDeleted = await db.collection("skis1").findOne(query);
    const results = await db.collection("skis1").deleteOne(query);
    res.status(200);
    res.send(results);
    }
    catch (error){
    console.error("Error deleting robot:", error);
    // questionable placement
        res.send(robotDeleted);
    res.status(500).send({ message: 'Internal Server Error' });
    }
    });


app.put("/updateRobot/:id", async (req, res) => {
    const id = Number(req.params.id);
    const query = { id: id };
    await client.connect();
    console.log("Robot to Update :",id);
    const robotUpdated = await db.collection("skis1").findOne(query);
    res.send(robotUpdated);
    // Data for updating the document, typically comes from the request body
    console.log(req.body);
    const updateData = {$set: {} };
    if (req.body.name) {
        updateData.$set.name = req.body.name;
    }
    if (req.body.price) {
        updateData.$set.price = req.body.price;
    }
    if (req.body.description) {
        updateData.$set.description = req.body.description;
    }
    if (req.body.imageUrl) {
        updateData.$set.imageUrl = req.body.imageUrl;
    }


    // Add options if needed, for example { upsert: true } to create a document if it doesn't exist
    const options = { };
    const results = await db.collection("skis1").updateOne(query, updateData, options);
    res.status(200);
   // res.send(results);

    
    
 });



 // for skis2: 
 app.get("/listRobots2", async (req, res) => {
    await client.connect();
    console.log("Node connected successfully to GET MongoDB");
    console.log(db);
    const query = {};
    const results = await db
    .collection("skis2")
    .find(query)
    .limit(100)
    .toArray();
    console.log(results);
    res.status(200).send(results);
  //  res.send(results);
    });

app.get("/skis2/:id", async (req, res) => {

    console.log("Running to find by ID");
    const robotid = Number(req.params.id);
    console.log("Robot to find :", robotid);
    await client.connect();
    console.log("Node connected successfully to GET-id MongoDB");
    const query = {"id": robotid };
    const results = await db.collection("skis2")
    .findOne(query);
    console.log("Results :", results);
    if (!results) res.send("Not Found").status(404);
    else res.send(results).status(200);
    });


app.post("/addRobot2", async (req, res) => { 
    await client.connect();
    const keys = Object.keys(req.body);
    const values = Object.values(req.body);

    // was correct
    const newDocument = {
        "id": values[0], // also "id": req.body.id,
        "name": values[1], // also "name": req.body.name,
        "price": values[2], // also "price": req.body.price,
        "imageUrl": values[4],
        "description": values[3] // also "description": req.body.description,
        // also "imageUrl": req.body.imageUrl, was "imageUrl": values[4]
        };
    console.log(newDocument);
    const results = await db
    .collection("skis2")
    .insertOne(newDocument);
    res.status(200);
    res.send(results);


});



       
app.delete("/deleteRobot2/:id", async (req, res) => {
    try {
    const id = Number(req.params.id);
    await client.connect();
    console.log("Robot to delete :",id);
    const query = { id: id };
    const robotDeleted = await db.collection("skis2").findOne(query);
    const results = await db.collection("skis2").deleteOne(query);
    res.status(200);
    res.send(results);
    }
    catch (error){
    console.error("Error deleting robot:", error);
    // questionable placement
        res.send(robotDeleted);
    res.status(500).send({ message: 'Internal Server Error' });
    }
    });


app.put("/updateRobot2/:id", async (req, res) => {
    const id = Number(req.params.id);
    const query = { id: id };
    await client.connect();
    console.log("Robot to Update :",id);
    const robotUpdated = await db.collection("skis2").findOne(query);
    res.send(robotUpdated);
    // Data for updating the document, typically comes from the request body
    console.log(req.body);
    const updateData = {$set: {} };
    if (req.body.name) {
        updateData.$set.name = req.body.name;
    }
    if (req.body.price) {
        updateData.$set.price = req.body.price;
    }
    if (req.body.description) {
        updateData.$set.description = req.body.description;
    }
    if (req.body.imageUrl) {
        updateData.$set.imageUrl = req.body.imageUrl;
    }
    const options = { };
    const results = await db.collection("skis1").updateOne(query, updateData, options);
    res.status(200);
   // res.send(results);

    
    
 });


    //skis3
    app.get("/listRobots3", async (req, res) => {
        await client.connect();
        console.log("Node connected successfully to GET MongoDB");
        const query = {};
        const results = await db
        .collection("skis3")
        .find(query)
        .limit(100)
        .toArray();
        console.log(results);
        res.status(200).send(results);
      //  res.send(results);
        });
    
    app.get("/skis3/:id", async (req, res) => {
    
        console.log("Running to find by ID");
        const robotid = Number(req.params.id);
        console.log("Robot to find :", robotid);
        await client.connect();
        console.log("Node connected successfully to GET-id MongoDB");
        const query = {"id": robotid };
        const results = await db.collection("skis3")
        .findOne(query);
        console.log("Results :", results);
        if (!results) res.send("Not Found").status(404);
        else res.send(results).status(200);
        });
    
    
    app.post("/addRobot3", async (req, res) => { 
        await client.connect();
        const keys = Object.keys(req.body);
        const values = Object.values(req.body);
    
        // was correct
        const newDocument = {
            "id": values[0], // also "id": req.body.id,
            "name": values[1], // also "name": req.body.name,
            "price": values[2], // also "price": req.body.price,
            "imageUrl": values[4],
            "description": values[3] // also "description": req.body.description,
            // also "imageUrl": req.body.imageUrl, was "imageUrl": values[4]
            };
        console.log(newDocument);
        const results = await db
        .collection("skis3")
        .insertOne(newDocument);
        res.status(200);
        res.send(results);
    
    
    });
    
    
    
           
    app.delete("/deleteRobot3/:id", async (req, res) => {
        try {
        const id = Number(req.params.id);
        await client.connect();
        console.log("Robot to delete :",id);
        const query = { id: id };
        const robotDeleted = await db.collection("skis3").findOne(query);
        const results = await db.collection("skis3").deleteOne(query);
        res.status(200);
        res.send(results);
        }
        catch (error){
        console.error("Error deleting robot:", error);
        // questionable placement
            res.send(robotDeleted);
        res.status(500).send({ message: 'Internal Server Error' });
        }
        });
    
    
    app.put("/updateRobot3/:id", async (req, res) => {
        const id = Number(req.params.id);
        const query = { id: id };
        await client.connect();
        console.log("Robot to Update :",id);
    
        const robotUpdated = await db.collection("skis3").findOne(query);
        res.send(robotUpdated);
        // Data for updating the document, typically comes from the request body
        console.log(req.body);
        const updateData = {$set: {} };
        if (req.body.name) {
            updateData.$set.name = req.body.name;
        }
        if (req.body.price) {
            updateData.$set.price = req.body.price;
        }
        if (req.body.description) {
            updateData.$set.description = req.body.description;
        }
        if (req.body.imageUrl) {
            updateData.$set.imageUrl = req.body.imageUrl;
        }

        const options = { };
    const results = await db.collection("skis3").updateOne(query, updateData, options);
    res.status(200);
    });

    //skis4
    app.get("/listRobots4", async (req, res) => {
        await client.connect();
        console.log("Node connected successfully to GET MongoDB");
        console.log(db);
        const query = {};
        const results = await db
        .collection("skis4")
        .find(query)
        .limit(100)
        .toArray();
        console.log(results);
        res.status(200).send(results);
      //  res.send(results);
        });
    
    app.get("/skis4/:id", async (req, res) => {
    
        console.log("Running to find by ID");
        const robotid = Number(req.params.id);
        console.log("Robot to find :", robotid);
        await client.connect();
        console.log("Node connected successfully to GET-id MongoDB");
        const query = {"id": robotid };
        const results = await db.collection("skis4")
        .findOne(query);
        console.log("Results :", results);
        if (!results) res.send("Not Found").status(404);
        else res.send(results).status(200);
        });
    
    
    app.post("/addRobot4", async (req, res) => { 
        await client.connect();
        const keys = Object.keys(req.body);
        const values = Object.values(req.body);
    
        // was correct
        const newDocument = {
            "id": values[0], // also "id": req.body.id,
            "name": values[1], // also "name": req.body.name,
            "price": values[2], // also "price": req.body.price,
            "imageUrl": values[4],
            "description": values[3] // also "description": req.body.description,
            // also "imageUrl": req.body.imageUrl, was "imageUrl": values[4]
            };
        console.log(newDocument);
        const results = await db
        .collection("skis4")
        .insertOne(newDocument);
        res.status(200);
        res.send(results);
    
    
    });
    
    
    
           
    app.delete("/deleteRobot4/:id", async (req, res) => {
        try {
        const id = Number(req.params.id);
        await client.connect();
        console.log("Robot to delete :",id);
        const query = { id: id };
        const robotDeleted = await db.collection("skis4").findOne(query);
        const results = await db.collection("skis4").deleteOne(query);
        res.status(200);
        res.send(results);
        }
        catch (error){
        console.error("Error deleting robot:", error);
        // questionable placement
            res.send(robotDeleted);
        res.status(500).send({ message: 'Internal Server Error' });
        }
        });
    
    
    app.put("/updateRobot4/:id", async (req, res) => {
        const id = Number(req.params.id);
        const query = { id: id };
        await client.connect();
        console.log("Robot to Update :",id);
        const robotUpdated = await db.collection("skis4").findOne(query);
        res.send(robotUpdated);
        // Data for updating the document, typically comes from the request body
        console.log(req.body);
        const updateData = {$set: {} };
        if (req.body.name) {
            updateData.$set.name = req.body.name;
        }
        if (req.body.price) {
            updateData.$set.price = req.body.price;
        }
        if (req.body.description) {
            updateData.$set.description = req.body.description;
        }
        if (req.body.imageUrl) {
            updateData.$set.imageUrl = req.body.imageUrl;
        }

        const options = { };
    const results = await db.collection("skis4").updateOne(query, updateData, options);
    res.status(200);
    });

    //skis5
    app.get("/listRobots5", async (req, res) => {
        await client.connect();
        console.log("Node connected successfully to GET MongoDB");
        console.log(db);
        const query = {};
        const results = await db
        .collection("skis5")
        .find(query)
        .limit(100)
        .toArray();
        console.log(results);
        res.status(200).send(results);
      //  res.send(results);
        });
    
    app.get("/skis5/:id", async (req, res) => {
    
        console.log("Running to find by ID");
        const robotid = Number(req.params.id);
        console.log("Robot to find :", robotid);
        await client.connect();
        console.log("Node connected successfully to GET-id MongoDB");
        const query = {"id": robotid };
        const results = await db.collection("skis5")
        .findOne(query);
        console.log("Results :", results);
        if (!results) res.send("Not Found").status(404);
        else res.send(results).status(200);
        });
    
    
    app.post("/addRobot5", async (req, res) => { 
        await client.connect();
        const keys = Object.keys(req.body);
        const values = Object.values(req.body);
    
        // was correct
        const newDocument = {
            "id": values[0], // also "id": req.body.id,
            "name": values[1], // also "name": req.body.name,
            "price": values[2], // also "price": req.body.price,
            "imageUrl": values[4],
            "description": values[3] // also "description": req.body.description,
            // also "imageUrl": req.body.imageUrl, was "imageUrl": values[4]
            };
        console.log(newDocument);
        const results = await db
        .collection("skis5")
        .insertOne(newDocument);
        res.status(200);
        res.send(results);
    
    
    });
    
    
    
           
    app.delete("/deleteRobot5/:id", async (req, res) => {
        try {
        const id = Number(req.params.id);
        await client.connect();
        console.log("Robot to delete :",id);
        const query = { id: id };
        const robotDeleted = await db.collection("skis5").findOne(query);
        const results = await db.collection("skis5").deleteOne(query);
        res.status(200);
        res.send(results);
        }
        catch (error){
        console.error("Error deleting robot:", error);
        // questionable placement
            res.send(robotDeleted);
        res.status(500).send({ message: 'Internal Server Error' });
        }
        });
    
    
    app.put("/updateRobot5/:id", async (req, res) => {
        const id = Number(req.params.id);
        const query = { id: id };
        await client.connect();
        console.log("Robot to Update :",id);
    
        const robotUpdated = await db.collection("skis5").findOne(query);
        res.send(robotUpdated);
        // Data for updating the document, typically comes from the request body
        console.log(req.body);
        const updateData = {$set: {} };
        if (req.body.name) {
            updateData.$set.name = req.body.name;
        }
        if (req.body.price) {
            updateData.$set.price = req.body.price;
        }
        if (req.body.description) {
            updateData.$set.description = req.body.description;
        }
        if (req.body.imageUrl) {
            updateData.$set.imageUrl = req.body.imageUrl;
        }

        const options = { };
    const results = await db.collection("skis5").updateOne(query, updateData, options);
    res.status(200);
    });

    //skis6
    app.get("/listRobots6", async (req, res) => {
        await client.connect();
        console.log("Node connected successfully to GET MongoDB");
        console.log(db);
        const query = {};
        const results = await db
        .collection("skis6")
        .find(query)
        .limit(100)
        .toArray();
        console.log(results);
        res.status(200).send(results);
      //  res.send(results);
        });
    
    app.get("/skis6/:id", async (req, res) => {
    
        console.log("Running to find by ID");
        const robotid = Number(req.params.id);
        console.log("Robot to find :", robotid);
        await client.connect();
        console.log("Node connected successfully to GET-id MongoDB");
        const query = {"id": robotid };
        const results = await db.collection("skis6")
        .findOne(query);
        console.log("Results :", results);
        if (!results) res.send("Not Found").status(404);
        else res.send(results).status(200);
        });
    
    
    app.post("/addRobot6", async (req, res) => { 
        await client.connect();
        const keys = Object.keys(req.body);
        const values = Object.values(req.body);
    
        // was correct
        const newDocument = {
            "id": values[0], // also "id": req.body.id,
            "name": values[1], // also "name": req.body.name,
            "price": values[2], // also "price": req.body.price,
            "imageUrl": values[4],
            "description": values[3] // also "description": req.body.description,
            // also "imageUrl": req.body.imageUrl, was "imageUrl": values[4]
            };
        console.log(newDocument);
        const results = await db
        .collection("skis6")
        .insertOne(newDocument);
        res.status(200);
        res.send(results);
    
    
    });
    
    
    
           
    app.delete("/deleteRobot6/:id", async (req, res) => {
        try {
        const id = Number(req.params.id);
        await client.connect();
        console.log("Robot to delete :",id);
        const query = { id: id };
        const robotDeleted = await db.collection("skis6").findOne(query);
        const results = await db.collection("skis6").deleteOne(query);
        res.status(200);
        res.send(results);
        }
        catch (error){
        console.error("Error deleting robot:", error);
        // questionable placement
            res.send(robotDeleted);
        res.status(500).send({ message: 'Internal Server Error' });
        }
        });
    
    
    app.put("/updateRobot6/:id", async (req, res) => {
        const id = Number(req.params.id);
        const query = { id: id };
        await client.connect();
        console.log("Robot to Update :",id);
    
        const robotUpdated = await db.collection("skis6").findOne(query);
        res.send(robotUpdated);
        // Data for updating the document, typically comes from the request body
        console.log(req.body);
        const updateData = {$set: {} };
        if (req.body.name) {
            updateData.$set.name = req.body.name;
        }
        if (req.body.price) {
            updateData.$set.price = req.body.price;
        }
        if (req.body.description) {
            updateData.$set.description = req.body.description;
        }
        if (req.body.imageUrl) {
            updateData.$set.imageUrl = req.body.imageUrl;
        }

        const options = { };
    const results = await db.collection("skis6").updateOne(query, updateData, options);
    res.status(200);
    });

    //skis7
    app.get("/listRobots7", async (req, res) => {
        await client.connect();
        console.log("Node connected successfully to GET MongoDB");
        console.log(db);
        const query = {};
        const results = await db
        .collection("skis7")
        .find(query)
        .limit(100)
        .toArray();
        console.log(results);
        res.status(200).send(results);
      //  res.send(results);
        });
    
    app.get("/skis7/:id", async (req, res) => {
    
        console.log("Running to find by ID");
        const robotid = Number(req.params.id);
        console.log("Robot to find :", robotid);
        await client.connect();
        console.log("Node connected successfully to GET-id MongoDB");
        const query = {"id": robotid };
        const results = await db.collection("skis7")
        .findOne(query);
        console.log("Results :", results);
        if (!results) res.send("Not Found").status(404);
        else res.send(results).status(200);
        });
    
    
    app.post("/addRobot7", async (req, res) => { 
        await client.connect();
        const keys = Object.keys(req.body);
        const values = Object.values(req.body);
    
        // was correct
        const newDocument = {
            "id": values[0], // also "id": req.body.id,
            "name": values[1], // also "name": req.body.name,
            "price": values[2], // also "price": req.body.price,
            "imageUrl": values[4],
            "description": values[3] // also "description": req.body.description,
            // also "imageUrl": req.body.imageUrl, was "imageUrl": values[4]
            };
        console.log(newDocument);
        const results = await db
        .collection("skis7")
        .insertOne(newDocument);
        res.status(200);
        res.send(results);
    
    
    });
    
    
    
           
    app.delete("/deleteRobot7/:id", async (req, res) => {
        try {
        const id = Number(req.params.id);
        await client.connect();
        console.log("Robot to delete :",id);
        const query = { id: id };
        const robotDeleted = await db.collection("skis7").findOne(query);
        const results = await db.collection("skis7").deleteOne(query);
        res.status(200);
        res.send(results);
        }
        catch (error){
        console.error("Error deleting robot:", error);
        // questionable placement
            res.send(robotDeleted);
        res.status(500).send({ message: 'Internal Server Error' });
        }
        });
    
    
    app.put("/updateRobot7/:id", async (req, res) => {
        const id = Number(req.params.id);
        const query = { id: id };
        await client.connect();
        console.log("Robot to Update :",id);
    
        const robotUpdated = await db.collection("skis7").findOne(query);
        res.send(robotUpdated);
        // Data for updating the document, typically comes from the request body
        console.log(req.body);
        const updateData = {$set: {} };
        if (req.body.name) {
            updateData.$set.name = req.body.name;
        }
        if (req.body.price) {
            updateData.$set.price = req.body.price;
        }
        if (req.body.description) {
            updateData.$set.description = req.body.description;
        }
        if (req.body.imageUrl) {
            updateData.$set.imageUrl = req.body.imageUrl;
        }
        const options = { };
    const results = await db.collection("skis7").updateOne(query, updateData, options);
    res.status(200);
    });

    //skis8
    app.get("/listRobots8", async (req, res) => {
        await client.connect();
        console.log("Node connected successfully to GET MongoDB");
        console.log(db);
        const query = {};
        const results = await db
        .collection("skis8")
        .find(query)
        .limit(100)
        .toArray();
        console.log(results);
        res.status(200).send(results);
      //  res.send(results);
        });
    
    app.get("/skis8/:id", async (req, res) => {
    
        console.log("Running to find by ID");
        const robotid = Number(req.params.id);
        console.log("Robot to find :", robotid);
        await client.connect();
        console.log("Node connected successfully to GET-id MongoDB");
        const query = {"id": robotid };
        const results = await db.collection("skis8")
        .findOne(query);
        console.log("Results :", results);
        if (!results) res.send("Not Found").status(404);
        else res.send(results).status(200);
        });
    
    
    app.post("/addRobot8", async (req, res) => { 
        await client.connect();
        const keys = Object.keys(req.body);
        const values = Object.values(req.body);
    
        // was correct
        const newDocument = {
            "id": values[0], // also "id": req.body.id,
            "name": values[1], // also "name": req.body.name,
            "price": values[2], // also "price": req.body.price,
            "imageUrl": values[4],
            "description": values[3] // also "description": req.body.description,
            // also "imageUrl": req.body.imageUrl, was "imageUrl": values[4]
            };
        console.log(newDocument);
        const results = await db
        .collection("skis8")
        .insertOne(newDocument);
        res.status(200);
        res.send(results);
    
    
    });
    
    
    
           
    app.delete("/deleteRobot8/:id", async (req, res) => {
        try {
        const id = Number(req.params.id);
        await client.connect();
        console.log("Robot to delete :",id);
        const query = { id: id };
        const robotDeleted = await db.collection("skis8").findOne(query);
        const results = await db.collection("skis8").deleteOne(query);
        res.status(200);
        res.send(results);
        }
        catch (error){
        console.error("Error deleting robot:", error);
        // questionable placement
            res.send(robotDeleted);
        res.status(500).send({ message: 'Internal Server Error' });
        }
        });
    
    
    app.put("/updateRobot8/:id", async (req, res) => {
        const id = Number(req.params.id);
        const query = { id: id };
        await client.connect();
        console.log("Robot to Update :",id);
    
        const robotUpdated = await db.collection("skis8").findOne(query);
        res.send(robotUpdated);
        // Data for updating the document, typically comes from the request body
        console.log(req.body);
        const updateData = {$set: {} };
        if (req.body.name) {
            updateData.$set.name = req.body.name;
        }
        if (req.body.price) {
            updateData.$set.price = req.body.price;
        }
        if (req.body.description) {
            updateData.$set.description = req.body.description;
        }
        if (req.body.imageUrl) {
            updateData.$set.imageUrl = req.body.imageUrl;
        }

        const options = { };
    const results = await db.collection("skis8").updateOne(query, updateData, options);
    res.status(200);
    });


// Stuff for the Snowboards
//-----------------------------------

// for board1: 
app.get("/listRobots1B", async (req, res) => {
    await client.connect();
    console.log("Node connected successfully to GET MongoDB");
    console.log(db);
    const query = {};
    const results = await db
    .collection("board1")
    .find(query)
    .limit(100)
    .toArray();
    console.log(results);
    res.status(200).send(results);
  //  res.send(results);
    });

app.get("/board1/:id", async (req, res) => {

    console.log("Running to find by ID");
    const robotid = Number(req.params.id);
    console.log("Robot to find :", robotid);
    await client.connect();
    console.log("Node connected successfully to GET-id MongoDB");
    const query = {"id": robotid };
    const results = await db.collection("board1")
    .findOne(query);
    console.log("Results :", results);
    if (!results) res.send("Not Found").status(404);
    else res.send(results).status(200);
    });


app.post("/addRobot1B", async (req, res) => { 
    await client.connect();
    const keys = Object.keys(req.body);
    const values = Object.values(req.body);

    // was correct
    const newDocument = {
        "id": values[0], // also "id": req.body.id,
        "name": values[1], // also "name": req.body.name,
        "price": values[2], // also "price": req.body.price,
        "imageUrl": values[4],
        "description": values[3] // also "description": req.body.description,
        // also "imageUrl": req.body.imageUrl, was "imageUrl": values[4]
        };
    console.log(newDocument);
    const results = await db
    .collection("board1")
    .insertOne(newDocument);
    res.status(200);
    res.send(results);


});



       
app.delete("/deleteRobot1B/:id", async (req, res) => {
    try {
    const id = Number(req.params.id);
    await client.connect();
    console.log("Robot to delete :",id);
    const query = { id: id };
    const robotDeleted = await db.collection("board1").findOne(query);
    const results = await db.collection("board1").deleteOne(query);
    res.status(200);
    res.send(results);
    }
    catch (error){
    console.error("Error deleting robot:", error);
    // questionable placement
        res.send(robotDeleted);
    res.status(500).send({ message: 'Internal Server Error' });
    }
    });


app.put("/updateRobot1B/:id", async (req, res) => {
    const id = Number(req.params.id);
    const query = { id: id };
    await client.connect();
    console.log("Robot to Update :",id);
    const robotUpdated = await db.collection("board1").findOne(query);
    res.send(robotUpdated);
    // Data for updating the document, typically comes from the request body
    console.log(req.body);
    const updateData = {$set: {} };
    if (req.body.name) {
        updateData.$set.name = req.body.name;
    }
    if (req.body.price) {
        updateData.$set.price = req.body.price;
    }
    if (req.body.description) {
        updateData.$set.description = req.body.description;
    }
    if (req.body.imageUrl) {
        updateData.$set.imageUrl = req.body.imageUrl;
    }
    const options = { };
    const results = await db.collection("board1").updateOne(query, updateData, options);
    res.status(200);
   // res.send(results);

    
    
 });
    

// for board2: 
app.get("/listRobots2B", async (req, res) => {
    await client.connect();
    console.log("Node connected successfully to GET MongoDB");
    console.log(db);
    const query = {};
    const results = await db
    .collection("board2")
    .find(query)
    .limit(100)
    .toArray();
    console.log(results);
    res.status(200).send(results);
  //  res.send(results);
    });

app.get("/board2/:id", async (req, res) => {

    console.log("Running to find by ID");
    const robotid = Number(req.params.id);
    console.log("Robot to find :", robotid);
    await client.connect();
    console.log("Node connected successfully to GET-id MongoDB");
    const query = {"id": robotid };
    const results = await db.collection("board2")
    .findOne(query);
    console.log("Results :", results);
    if (!results) res.send("Not Found").status(404);
    else res.send(results).status(200);
    });


app.post("/addRobot2B", async (req, res) => { 
    await client.connect();
    const keys = Object.keys(req.body);
    const values = Object.values(req.body);

    // was correct
    const newDocument = {
        "id": values[0], // also "id": req.body.id,
        "name": values[1], // also "name": req.body.name,
        "price": values[2], // also "price": req.body.price,
        "imageUrl": values[4],
        "description": values[3] // also "description": req.body.description,
        // also "imageUrl": req.body.imageUrl, was "imageUrl": values[4]
        };
    console.log(newDocument);
    const results = await db
    .collection("board2")
    .insertOne(newDocument);
    res.status(200);
    res.send(results);


});



       
app.delete("/deleteRobot2B/:id", async (req, res) => {
    try {
    const id = Number(req.params.id);
    await client.connect();
    console.log("Robot to delete :",id);
    const query = { id: id };
    const robotDeleted = await db.collection("board2").findOne(query);
    const results = await db.collection("board2").deleteOne(query);
    res.status(200);
    res.send(results);
    }
    catch (error){
    console.error("Error deleting robot:", error);
    // questionable placement
        res.send(robotDeleted);
    res.status(500).send({ message: 'Internal Server Error' });
    }
    });


app.put("/updateRobot2B/:id", async (req, res) => {
    const id = Number(req.params.id);
    const query = { id: id };
    await client.connect();
    console.log("Robot to Update :",id);
    const robotUpdated = await db.collection("board2").findOne(query);
    res.send(robotUpdated);
    // Data for updating the document, typically comes from the request body
    console.log(req.body);
    const updateData = {$set: {} };
    if (req.body.name) {
        updateData.$set.name = req.body.name;
    }
    if (req.body.price) {
        updateData.$set.price = req.body.price;
    }
    if (req.body.description) {
        updateData.$set.description = req.body.description;
    }
    if (req.body.imageUrl) {
        updateData.$set.imageUrl = req.body.imageUrl;
    }
    const options = { };
    const results = await db.collection("board2").updateOne(query, updateData, options);
    res.status(200);
   // res.send(results);

    
    
 });

 // for board3: 
app.get("/listRobots3B", async (req, res) => {
    await client.connect();
    console.log("Node connected successfully to GET MongoDB");
    console.log(db);
    const query = {};
    const results = await db
    .collection("board3")
    .find(query)
    .limit(100)
    .toArray();
    console.log(results);
    res.status(200).send(results);
  //  res.send(results);
    });

app.get("/board3/:id", async (req, res) => {

    console.log("Running to find by ID");
    const robotid = Number(req.params.id);
    console.log("Robot to find :", robotid);
    await client.connect();
    console.log("Node connected successfully to GET-id MongoDB");
    const query = {"id": robotid };
    const results = await db.collection("board3")
    .findOne(query);
    console.log("Results :", results);
    if (!results) res.send("Not Found").status(404);
    else res.send(results).status(200);
    });


app.post("/addRobot3B", async (req, res) => { 
    await client.connect();
    const keys = Object.keys(req.body);
    const values = Object.values(req.body);

    // was correct
    const newDocument = {
        "id": values[0], // also "id": req.body.id,
        "name": values[1], // also "name": req.body.name,
        "price": values[2], // also "price": req.body.price,
        "imageUrl": values[4],
        "description": values[3] // also "description": req.body.description,
        // also "imageUrl": req.body.imageUrl, was "imageUrl": values[4]
        };
    console.log(newDocument);
    const results = await db
    .collection("board3")
    .insertOne(newDocument);
    res.status(200);
    res.send(results);


});



       
app.delete("/deleteRobot3B/:id", async (req, res) => {
    try {
    const id = Number(req.params.id);
    await client.connect();
    console.log("Robot to delete :",id);
    const query = { id: id };
    const robotDeleted = await db.collection("board3").findOne(query);
    const results = await db.collection("board3").deleteOne(query);
    res.status(200);
    res.send(results);
    }
    catch (error){
    console.error("Error deleting robot:", error);
    // questionable placement
        res.send(robotDeleted);
    res.status(500).send({ message: 'Internal Server Error' });
    }
    });


app.put("/updateRobot3B/:id", async (req, res) => {
    const id = Number(req.params.id);
    const query = { id: id };
    await client.connect();
    console.log("Robot to Update :",id);
    const robotUpdated = await db.collection("board3").findOne(query);
    res.send(robotUpdated);
    // Data for updating the document, typically comes from the request body
    console.log(req.body);
    const updateData = {$set: {} };
    if (req.body.name) {
        updateData.$set.name = req.body.name;
    }
    if (req.body.price) {
        updateData.$set.price = req.body.price;
    }
    if (req.body.description) {
        updateData.$set.description = req.body.description;
    }
    if (req.body.imageUrl) {
        updateData.$set.imageUrl = req.body.imageUrl;
    }
    const options = { };
    const results = await db.collection("board3").updateOne(query, updateData, options);
    res.status(200);
   // res.send(results);

    
    
 });

 // for board4: 
app.get("/listRobots4B", async (req, res) => {
    await client.connect();
    console.log("Node connected successfully to GET MongoDB");
    console.log(db);
    const query = {};
    const results = await db
    .collection("board4")
    .find(query)
    .limit(100)
    .toArray();
    console.log(results);
    res.status(200).send(results);
  //  res.send(results);
    });

app.get("/board4/:id", async (req, res) => {

    console.log("Running to find by ID");
    const robotid = Number(req.params.id);
    console.log("Robot to find :", robotid);
    await client.connect();
    console.log("Node connected successfully to GET-id MongoDB");
    const query = {"id": robotid };
    const results = await db.collection("board4")
    .findOne(query);
    console.log("Results :", results);
    if (!results) res.send("Not Found").status(404);
    else res.send(results).status(200);
    });


app.post("/addRobot4B", async (req, res) => { 
    await client.connect();
    const keys = Object.keys(req.body);
    const values = Object.values(req.body);

    // was correct
    const newDocument = {
        "id": values[0], // also "id": req.body.id,
        "name": values[1], // also "name": req.body.name,
        "price": values[2], // also "price": req.body.price,
        "imageUrl": values[4],
        "description": values[3] // also "description": req.body.description,
        // also "imageUrl": req.body.imageUrl, was "imageUrl": values[4]
        };
    console.log(newDocument);
    const results = await db
    .collection("board4")
    .insertOne(newDocument);
    res.status(200);
    res.send(results);


});



       
app.delete("/deleteRobot4B/:id", async (req, res) => {
    try {
    const id = Number(req.params.id);
    await client.connect();
    console.log("Robot to delete :",id);
    const query = { id: id };
    const robotDeleted = await db.collection("board4").findOne(query);
    const results = await db.collection("board4").deleteOne(query);
    res.status(200);
    res.send(results);
    }
    catch (error){
    console.error("Error deleting robot:", error);
    // questionable placement
        res.send(robotDeleted);
    res.status(500).send({ message: 'Internal Server Error' });
    }
    });


app.put("/updateRobot4B/:id", async (req, res) => {
    const id = Number(req.params.id);
    const query = { id: id };
    await client.connect();
    console.log("Robot to Update :",id);
    const robotUpdated = await db.collection("board4").findOne(query);
    res.send(robotUpdated);
    // Data for updating the document, typically comes from the request body
    console.log(req.body);
    const updateData = {$set: {} };
    if (req.body.name) {
        updateData.$set.name = req.body.name;
    }
    if (req.body.price) {
        updateData.$set.price = req.body.price;
    }
    if (req.body.description) {
        updateData.$set.description = req.body.description;
    }
    if (req.body.imageUrl) {
        updateData.$set.imageUrl = req.body.imageUrl;
    }
    const options = { };
    const results = await db.collection("board4").updateOne(query, updateData, options);
    res.status(200);
   // res.send(results);

    
    
 });
    

 // for board5: 
app.get("/listRobots5B", async (req, res) => {
    await client.connect();
    console.log("Node connected successfully to GET MongoDB");
    console.log(db);
    const query = {};
    const results = await db
    .collection("board5")
    .find(query)
    .limit(100)
    .toArray();
    console.log(results);
    res.status(200).send(results);
  //  res.send(results);
    });

app.get("/board5/:id", async (req, res) => {

    console.log("Running to find by ID");
    const robotid = Number(req.params.id);
    console.log("Robot to find :", robotid);
    await client.connect();
    console.log("Node connected successfully to GET-id MongoDB");
    const query = {"id": robotid };
    const results = await db.collection("board5")
    .findOne(query);
    console.log("Results :", results);
    if (!results) res.send("Not Found").status(404);
    else res.send(results).status(200);
    });


app.post("/addRobot1B", async (req, res) => { 
    await client.connect();
    const keys = Object.keys(req.body);
    const values = Object.values(req.body);

    // was correct
    const newDocument = {
        "id": values[0], // also "id": req.body.id,
        "name": values[1], // also "name": req.body.name,
        "price": values[2], // also "price": req.body.price,
        "imageUrl": values[4],
        "description": values[3] // also "description": req.body.description,
        // also "imageUrl": req.body.imageUrl, was "imageUrl": values[4]
        };
    console.log(newDocument);
    const results = await db
    .collection("board5")
    .insertOne(newDocument);
    res.status(200);
    res.send(results);


});



       
app.delete("/deleteRobot5B/:id", async (req, res) => {
    try {
    const id = Number(req.params.id);
    await client.connect();
    console.log("Robot to delete :",id);
    const query = { id: id };
    const robotDeleted = await db.collection("board5").findOne(query);
    const results = await db.collection("board5").deleteOne(query);
    res.status(200);
    res.send(results);
    }
    catch (error){
    console.error("Error deleting robot:", error);
    // questionable placement
        res.send(robotDeleted);
    res.status(500).send({ message: 'Internal Server Error' });
    }
    });


app.put("/updateRobot5B/:id", async (req, res) => {
    const id = Number(req.params.id);
    const query = { id: id };
    await client.connect();
    console.log("Robot to Update :",id);
    const robotUpdated = await db.collection("board5").findOne(query);
    res.send(robotUpdated);
    // Data for updating the document, typically comes from the request body
    console.log(req.body);
    const updateData = {$set: {} };
    if (req.body.name) {
        updateData.$set.name = req.body.name;
    }
    if (req.body.price) {
        updateData.$set.price = req.body.price;
    }
    if (req.body.description) {
        updateData.$set.description = req.body.description;
    }
    if (req.body.imageUrl) {
        updateData.$set.imageUrl = req.body.imageUrl;
    }
    const options = { };
    const results = await db.collection("board5").updateOne(query, updateData, options);
    res.status(200);
   // res.send(results);

    
    
 });

 // for board6: 
app.get("/listRobots6B", async (req, res) => {
    await client.connect();
    console.log("Node connected successfully to GET MongoDB");
    console.log(db);
    const query = {};
    const results = await db
    .collection("board6")
    .find(query)
    .limit(100)
    .toArray();
    console.log(results);
    res.status(200).send(results);
  //  res.send(results);
    });

app.get("/board6/:id", async (req, res) => {

    console.log("Running to find by ID");
    const robotid = Number(req.params.id);
    console.log("Robot to find :", robotid);
    await client.connect();
    console.log("Node connected successfully to GET-id MongoDB");
    const query = {"id": robotid };
    const results = await db.collection("board6")
    .findOne(query);
    console.log("Results :", results);
    if (!results) res.send("Not Found").status(404);
    else res.send(results).status(200);
    });


app.post("/addRobot6B", async (req, res) => { 
    await client.connect();
    const keys = Object.keys(req.body);
    const values = Object.values(req.body);

    // was correct
    const newDocument = {
        "id": values[0], // also "id": req.body.id,
        "name": values[1], // also "name": req.body.name,
        "price": values[2], // also "price": req.body.price,
        "imageUrl": values[4],
        "description": values[3] // also "description": req.body.description,
        // also "imageUrl": req.body.imageUrl, was "imageUrl": values[4]
        };
    console.log(newDocument);
    const results = await db
    .collection("board6")
    .insertOne(newDocument);
    res.status(200);
    res.send(results);


});



       
app.delete("/deleteRobot6B/:id", async (req, res) => {
    try {
    const id = Number(req.params.id);
    await client.connect();
    console.log("Robot to delete :",id);
    const query = { id: id };
    const robotDeleted = await db.collection("board6").findOne(query);
    const results = await db.collection("board6").deleteOne(query);
    res.status(200);
    res.send(results);
    }
    catch (error){
    console.error("Error deleting robot:", error);
    // questionable placement
        res.send(robotDeleted);
    res.status(500).send({ message: 'Internal Server Error' });
    }
    });


app.put("/updateRobot6B/:id", async (req, res) => {
    const id = Number(req.params.id);
    const query = { id: id };
    await client.connect();
    console.log("Robot to Update :",id);
    const robotUpdated = await db.collection("board6").findOne(query);
    res.send(robotUpdated);
    // Data for updating the document, typically comes from the request body
    console.log(req.body);
    const updateData = {$set: {} };
    if (req.body.name) {
        updateData.$set.name = req.body.name;
    }
    if (req.body.price) {
        updateData.$set.price = req.body.price;
    }
    if (req.body.description) {
        updateData.$set.description = req.body.description;
    }
    if (req.body.imageUrl) {
        updateData.$set.imageUrl = req.body.imageUrl;
    }
    const options = { };
    const results = await db.collection("board6").updateOne(query, updateData, options);
    res.status(200);
   // res.send(results);

    
    
 });

 // for board7: 
app.get("/listRobots7B", async (req, res) => {
    await client.connect();
    console.log("Node connected successfully to GET MongoDB");
    console.log(db);
    const query = {};
    const results = await db
    .collection("board7")
    .find(query)
    .limit(100)
    .toArray();
    console.log(results);
    res.status(200).send(results);
  //  res.send(results);
    });

app.get("/board7/:id", async (req, res) => {

    console.log("Running to find by ID");
    const robotid = Number(req.params.id);
    console.log("Robot to find :", robotid);
    await client.connect();
    console.log("Node connected successfully to GET-id MongoDB");
    const query = {"id": robotid };
    const results = await db.collection("board7")
    .findOne(query);
    console.log("Results :", results);
    if (!results) res.send("Not Found").status(404);
    else res.send(results).status(200);
    });


app.post("/addRobot7B", async (req, res) => { 
    await client.connect();
    const keys = Object.keys(req.body);
    const values = Object.values(req.body);

    // was correct
    const newDocument = {
        "id": values[0], // also "id": req.body.id,
        "name": values[1], // also "name": req.body.name,
        "price": values[2], // also "price": req.body.price,
        "imageUrl": values[4],
        "description": values[3] // also "description": req.body.description,
        // also "imageUrl": req.body.imageUrl, was "imageUrl": values[4]
        };
    console.log(newDocument);
    const results = await db
    .collection("board7")
    .insertOne(newDocument);
    res.status(200);
    res.send(results);


});



       
app.delete("/deleteRobot7B/:id", async (req, res) => {
    try {
    const id = Number(req.params.id);
    await client.connect();
    console.log("Robot to delete :",id);
    const query = { id: id };
    const robotDeleted = await db.collection("board7").findOne(query);
    const results = await db.collection("board7").deleteOne(query);
    res.status(200);
    res.send(results);
    }
    catch (error){
    console.error("Error deleting robot:", error);
    // questionable placement
        res.send(robotDeleted);
    res.status(500).send({ message: 'Internal Server Error' });
    }
    });


app.put("/updateRobot7B/:id", async (req, res) => {
    const id = Number(req.params.id);
    const query = { id: id };
    await client.connect();
    console.log("Robot to Update :",id);
    const robotUpdated = await db.collection("board7").findOne(query);
    res.send(robotUpdated);
    // Data for updating the document, typically comes from the request body
    console.log(req.body);
    const updateData = {$set: {} };
    if (req.body.name) {
        updateData.$set.name = req.body.name;
    }
    if (req.body.price) {
        updateData.$set.price = req.body.price;
    }
    if (req.body.description) {
        updateData.$set.description = req.body.description;
    }
    if (req.body.imageUrl) {
        updateData.$set.imageUrl = req.body.imageUrl;
    }
    const options = { };
    const results = await db.collection("board7").updateOne(query, updateData, options);
    res.status(200);
   // res.send(results);

    
    
 });

 // for board8: 
app.get("/listRobots8B", async (req, res) => {
    await client.connect();
    console.log("Node connected successfully to GET MongoDB");
    console.log(db);
    const query = {};
    const results = await db
    .collection("board8")
    .find(query)
    .limit(100)
    .toArray();
    console.log(results);
    res.status(200).send(results);
  //  res.send(results);
    });

app.get("/board8/:id", async (req, res) => {

    console.log("Running to find by ID");
    const robotid = Number(req.params.id);
    console.log("Robot to find :", robotid);
    await client.connect();
    console.log("Node connected successfully to GET-id MongoDB");
    const query = {"id": robotid };
    const results = await db.collection("board8")
    .findOne(query);
    console.log("Results :", results);
    if (!results) res.send("Not Found").status(404);
    else res.send(results).status(200);
    });


app.post("/addRobot8B", async (req, res) => { 
    await client.connect();
    const keys = Object.keys(req.body);
    const values = Object.values(req.body);

    // was correct
    const newDocument = {
        "id": values[0], // also "id": req.body.id,
        "name": values[1], // also "name": req.body.name,
        "price": values[2], // also "price": req.body.price,
        "imageUrl": values[4],
        "description": values[3] // also "description": req.body.description,
        // also "imageUrl": req.body.imageUrl, was "imageUrl": values[4]
        };
    console.log(newDocument);
    const results = await db
    .collection("board8")
    .insertOne(newDocument);
    res.status(200);
    res.send(results);


});



       
app.delete("/deleteRobot8B/:id", async (req, res) => {
    try {
    const id = Number(req.params.id);
    await client.connect();
    console.log("Robot to delete :",id);
    const query = { id: id };
    const robotDeleted = await db.collection("board8").findOne(query);
    const results = await db.collection("board8").deleteOne(query);
    res.status(200);
    res.send(results);
    }
    catch (error){
    console.error("Error deleting robot:", error);
    // questionable placement
        res.send(robotDeleted);
    res.status(500).send({ message: 'Internal Server Error' });
    }
    });


app.put("/updateRobot8B/:id", async (req, res) => {
    const id = Number(req.params.id);
    const query = { id: id };
    await client.connect();
    console.log("Robot to Update :",id);
    const robotUpdated = await db.collection("board8").findOne(query);
    res.send(robotUpdated);
    // Data for updating the document, typically comes from the request body
    console.log(req.body);
    const updateData = {$set: {} };
    if (req.body.name) {
        updateData.$set.name = req.body.name;
    }
    if (req.body.price) {
        updateData.$set.price = req.body.price;
    }
    if (req.body.description) {
        updateData.$set.description = req.body.description;
    }
    if (req.body.imageUrl) {
        updateData.$set.imageUrl = req.body.imageUrl;
    }
    const options = { };
    const results = await db.collection("board8").updateOne(query, updateData, options);
    res.status(200);
   // res.send(results);

    
    
 });
    
    
    
    
    
    
    

    
    






app.listen(port, () => {
console.log("App listening at http://%s:%s", host, port);
}); 
