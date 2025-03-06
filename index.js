const checkOccupiedPlace = require("./functions/checkOccupiedPlace")
const checkParkedCar = require("./functions/checkParkedCar")
const countFreePlaces = require("./functions/countFreePlaces")
const supabase = require('./utils/supabase')
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/parking', (req, res) => {
    res.send('parking')
})

app.get('/reservations', async (req, res) => {
    const { data, error } = await supabase
    .from('reservations')
    .select()
    res.send(data);
})

app.get('/reservations/:id', async (req, res) => {
    const { id } = req.params; // Récupère l'ID depuis l'URL

    const { data, error } = await supabase
        .from('reservations')
        .select()
        .eq('id', id) // Filtre par ID
        .single(); // Assure qu'on récupère un seul élément

    if (error) {
        return res.status(400).json({ error: error.message });
    }

    res.json(data);
})

app.post('/reservations/new', (req, res) => {
    res.send('Hello World!')
})

app.get('/place', async (req, res) => {
    const { data, error } = await supabase
    .from('places')
    .select()
    res.send(data);
})

app.get('/place/:id', async (req, res) => { 
    const { id } = req.params; // Récupère l'ID depuis l'URL

    const { data, error } = await supabase
        .from('places')
        .select()
        .eq('id', id) // Filtre par ID
        .single(); // Assure qu'on récupère un seul élément

    if (error) {
        return res.status(400).json({ error: error.message });
    }

    res.json(data);
});

app.get('/place/type/:type', async (req, res) => { 
    const { type } = req.params; // Récupère le type depuis l'URL

    const { data, error } = await supabase
        .from('places')
        .select()
        .eq('type', type) // Filtre par type

    if (error) {
        return res.status(400).json({ error: error.message });
    }

    res.json(data);
});

app.get('/scan', (req, res) => {
    res.send('Page scan')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})


//countFreePlaces().then(console.log);

//checkParkedCar("0ff2e175-fc31-4fad-bb52-0d36a955fab8").then(console.log);
//checkParkedCar("101dcb5b-65b7-4adc-911c-3d658eafc1fd").then(console.log);

//checkOccupiedPlace("02d7403b-42a2-4f4b-827d-3847b1a22d0f").then(console.log);

// addCar("jambon", 'citadine');
// console.log(await getPlacesByType('citadine'))