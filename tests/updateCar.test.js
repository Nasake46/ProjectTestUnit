const updateCar = require('../functions/updateCar');

test('update citadine', async () => {
    expect(
        await updateCar('03add0c6-f2f5-4d50-be0a-1074fae57601', "Franglish", "citadine")
    ).toStrictEqual({ id: '03add0c6-f2f5-4d50-be0a-1074fae57601', plaque: 'Franglish', type: 'citadine' });
  });