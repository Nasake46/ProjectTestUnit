const addParking = require("../functions/addParking");

test('add parking', async () => {
    expect(
        await addParking("23cb4f2a-fa0e-416d-872b-a78d1d23ed12", "2025-02-26T17:29:51")
    ).toStrictEqual({ reservation: '23cb4f2a-fa0e-416d-872b-a78d1d23ed12', date_effective_arrivee: '2025-02-26T17:29:51' });
  });