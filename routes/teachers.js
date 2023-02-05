import express from 'express';
import getDatabase from './../db/mongodb.js';
import fetch from 'node-fetch';
import { JSDOM } from 'jsdom';


var router = express.Router();
router.get('/', async function (request, response, next) {
    const database = await getDatabase();
    const result = await database.collection("teachers").find({}).toArray();
    response.send(result);
});



router.post('/', async function (request, response, next) {
    const info = request.body;
    const database = await getDatabase();

    try {
        const result = await database.collection("teachers").insertOne(info);
        response.send(result);
    } catch (error) {
        response.send(error)
    }

});

router.delete('/:id', async function (request, response, next) {
    const id = request.params.id;
    const database = await getDatabase();
    const query = { employee_ID: id };
    const result = await database.collection("teachers").deleteOne(query);
    response.send(result);
});



router.post('/fetch', async function (request, response, next) {
    const url = request.body.profile

    try {
        const html = await fetch(url);
        const body = await html.text();
        const dom = new JSDOM(body);

        const info = {
            name: dom.window.document.querySelectorAll('.profile-row-right')[0].innerHTML,
            employee_ID: dom.window.document.querySelectorAll('.profile-row-right')[1].innerHTML,
            designation: dom.window.document.querySelectorAll('.profile-row-right')[2].innerHTML,
            department: dom.window.document.querySelectorAll('.profile-row-right')[3].innerHTML,
            email: dom.window.document.querySelectorAll('.profile-row-right')[6].innerHTML,
            phone: dom.window.document.querySelectorAll('.profile-row-right')[8].innerHTML,
        }


        response.send(info);

    } catch (error) {
        response.send(error);
    }
});



export default router;
