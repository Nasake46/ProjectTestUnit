const { createClient } = require('@supabase/supabase-js');
require('dotenv/config').config
const { SUPABASE_DB_API_KEY : key, SUPABASE_DB_URL : url } = process.env;
const supabase = createClient(url, key);

async function getPlacesByType(type) {
    try {
        const { data, error } = await supabase
            .from('places')
            .select("id, type")
            .eq('type', type)
        if(error) throw error;
        return data;
    } catch (error) {
        //console.log(error);
        return [];
    }
}

function getPlacesByTypeTest() {
    
}

async function addCar() {
    try {
        const { data, error } = await supabase
            .from('voitures')
            .insert({ plaque: 'Metalosse', type: 'citadine' })
            .select()
            if(error) throw error;
        return data;
    } catch (error) {
        console.log(error)
    }
}

module.exports = getPlacesByType;

// addCar();
// console.log(await getPlacesByType('citadine'))