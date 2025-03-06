const countFreePlaces = require("../functions/countFreePlaces");

test('free place', async () => { 
    const freePlaces = await countFreePlaces();
    
    // Vérifie que le résultat est bien un nombre
    expect(typeof freePlaces).toBe('number');

    // Vérifie que le nombre de places libres est supérieur ou égal à 0
    expect(freePlaces).toBeGreaterThanOrEqual(0);
});
