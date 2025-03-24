const checkOccupiedPlace = require("../functions/checkOccupiedPlace");

test('occupied place', async () => { 
    const isOccupied = await checkOccupiedPlace("e8e8d6db-9811-47c7-acf3-02107de32333");
    
    // Vérifie que le résultat est bien un booléen
    expect(typeof isOccupied).toBe('boolean');

    // Vérifie que le résultat est soit true, soit false
    expect([true, false]).toContain(isOccupied);
});