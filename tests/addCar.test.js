const addCar = require("../functions/addCar");

test('add citadine', async () => {
    expect(
        await addCar("Metang", "citadine")
    ).toStrictEqual({ plaque: 'Metang', type: 'citadine' });
  });

  