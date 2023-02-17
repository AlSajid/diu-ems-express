import express from 'express';
import database from './../db/mongodb.js';
import { ObjectId } from 'mongodb';


var router = express.Router();


router.get('/', async function (request, response, next) {
    try {
        const result = await database.collection("courses").find({}).toArray();
        response.send(result);
    } catch (error) {
        response.send(error);
    }
});



router.post('/', async function (request, response, next) {
    const info = request.body;

    try {
        const result = await database.collection("courses").insertOne(info);
        response.send(result);
    } catch (error) {
        response.send(error)
    }

});

router.delete('/:id', async function (request, response, next) {
    const id = request.params.id;
    const query = { _id: ObjectId(id) };

    try {
        const result = await database.collection("courses").deleteOne(query);
        response.send(result);
    } catch (error) {
        response.send(error);
    }

});




export default router;
