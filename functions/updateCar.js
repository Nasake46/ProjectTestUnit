const supabase = require('../utils/supabase');

async function updateCar(id, plaque, type) {
    try {
        const { data, error } = await supabase
            .from('voitures')
            .update({ plaque, type })
            .eq('id',  id)
            .select('id, plaque, type')
            .single();
            if(error) throw error;
        return data;
    } catch (error) {
        console.log(error)
    }
}

module.exports = updateCar;