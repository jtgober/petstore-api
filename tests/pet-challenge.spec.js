const { test, expect } = require('@playwright/test');
const petData = require('../data/pet.json')
const petUpdate = require('../data/updatePet.json')
// comment
test('adding a pet', async ({ request }) => {
    const response = await request.post(`pet`,
        {
            data: petData
        })
    expect(response.status()).toBe(200)
});

test('check that pet was added', async ({ request }) => {
    const response = await request.get(`pet/${petData.id}`)
    let json = await response.json();
    let petName = json.name
    expect(petName).toBe(petData.name)
})

test('updating a pet', async ({ request }) => {
    const response = await request.put(`pet`,
        {
            data: petUpdate
        })
    expect(response.status()).toBe(200)
});

test('check that pet was updated', async ({ request }) => {
    const response = await request.get(`pet/${petUpdate.id}`)
    let json = await response.json();
    let petName = json.name
    expect(petName).toBe(petUpdate.name)
})

test('deleting a pet', async ({ request }) => {
    const response = await request.delete (`pet/${petUpdate.id}`) 
    expect(response.status()).toBe(200)
});

test('check that pet was deleted', async ({ request }) => {
    const response = await request.get(`pet/${petUpdate.id}`)
    expect(response.status()).toBe(404)
})