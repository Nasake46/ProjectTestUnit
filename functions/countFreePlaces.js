const filterPlaces = require('./filterPlaces');

async function countFreePlaces() {
    try {   
        const { count, occupied } = await filterPlaces();
        //console.log(all.length, occupied.length);

        return count - occupied.length;
    } catch (error) {
        console.log(error);
        return [];
    }
}

module.exports = countFreePlaces;