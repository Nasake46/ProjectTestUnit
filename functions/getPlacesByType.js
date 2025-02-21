const supabase = require('../utils/supabase');

async function getPlacesByType(type) {
    try {
        const { data, error } = await supabase
            .from('places')
            .select("id, type")
            .eq('type', type)
        if(error) throw error;

        //const places = data.map(place => place.id);
        console.log(data);
        return data;
    } catch (error) {
        //console.log(error);
        return [];
    }
}

// getPlacesByType("citadine");

module.exports = getPlacesByType;