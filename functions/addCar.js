const supabase = require('../utils/supabase');

async function addCar(plaque, type) {
    try {
        const { data, error } = await supabase
            .from('voitures')
            .insert({ plaque, type })
            .select('plaque, type')
            .single();
            if(error) throw error;
        return data;
    } catch (error) {
        console.log(error)
    }
}

module.exports = addCar;