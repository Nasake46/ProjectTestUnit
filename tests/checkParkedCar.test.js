const checkParkedCar = require("../functions/checkParkedCar");

test('check if a car is parked', async () => { 
    const id_voiture_test = "e8e8d6db-9811-47c7-acf3-02107de32333"; // ID pour le test
    const isParked = await checkParkedCar(id_voiture_test);
    
    console.log("Résultat de checkParkedCar:", isParked); // Debugging

    // Vérifie que le résultat est bien un booléen
    expect(typeof isParked).toBe('boolean');

    // Vérifie que le résultat est soit true, soit false
    expect([true, false]).toContain(isParked);
});
