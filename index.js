const checkOccupiedPlace = require("./functions/checkOccupiedPlace")
const checkParkedCar = require("./functions/checkParkedCar")
const countFreePlaces = require("./functions/countFreePlaces")
const supabase = require('./utils/supabase')
const express = require('express')
const app = express()
const port = 3000

app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/voiture/new', async (req, res) => {
    const { plaque, type } = req.body
    if ( !plaque, !type) {
        return res.status(400).json({ error: "Tous les champs sont requis." });
    }

    try {
        const { data, error } = await supabase
            .from('voitures')
            .insert([{ 
                plaque, 
                type
            }])
            .select()
            .single();

        if (error) throw error;

        res.status(201).json({ message: "Voiture ajoutée avec succès", reservation: data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/parking', async (req, res) => {
    const { data, error } = await supabase
    .from('stationnements')
    .select()
    res.send(data);
})

app.post('/parking/new', async (req, res) => {
    console.log(req.body);
    const { id_reservation, date_effective_arrivee } = req.body

    console.log( id_reservation, date_effective_arrivee);

    if ( !id_reservation, !date_effective_arrivee) {
        return res.status(400).json({ error: "Tous les champs sont requis." });
    }

    try {
        const { data, error } = await supabase
            .from('stationnements')
            .insert([{ 
                reservation: id_reservation, 
                date_effective_arrivee
            }])
            .select()
            .single();

        if (error) throw error;

        res.status(201).json({ message: "Stationnement ajoutée avec succès", reservation: data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



app.get('/reservations', async (req, res) => {
    const { data, error } = await supabase
    .from('reservations')
    .select(`
        *,
        voiture(*),
        place(*),
        stationnements(*)
    `)
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

app.post('/reservations/new', async (req, res) => {
    console.log(req.body);
    const { id_voiture, id_place, date_reservation, date_prevue_arrivee, date_prevue_depart } = req.body

    console.log(id_voiture, id_place, date_reservation, date_prevue_arrivee, date_prevue_depart);

    if (!id_voiture || !id_place || !date_reservation || !date_prevue_arrivee || !date_prevue_depart) {
        return res.status(400).json({ error: "Tous les champs sont requis." });
    }

    try {
        const { data, error } = await supabase
            .from('reservations')
            .insert([{ 
                voiture: id_voiture, 
                place: id_place, 
                date_reservation,
                date_prevue_arrivee,
                date_prevue_depart
            }])
            .select()
            .single();

        if (error) throw error;

        res.status(201).json({ message: "Réservation ajoutée avec succès", reservation: data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

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