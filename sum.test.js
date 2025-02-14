const getPlacesByType = require('./index.js');

test('get berlines', async () => {
    expect(
        await getPlacesByType('citadine')
    ).toStrictEqual([
        { id: 'e8e8d6db-9811-47c7-acf3-02107de32333', type: 'citadine' },
        { id: '8ebc65c4-ffdd-4853-b606-d03025ac6325', type: 'citadine' },
        { id: '02d7403b-42a2-4f4b-827d-3847b1a22d0f', type: 'citadine' },
        { id: '8d64c29f-036c-46d8-9054-7c3d58b1e3bb', type: 'citadine' }
    ]);
});