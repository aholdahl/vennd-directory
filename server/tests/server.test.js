let app = require('../server.js');
let testServer = require('supertest');

describe('Test the root path', ()=>{
    test('testing get route for /api/details', async ()=>{
        let response = await testServer(app).get(`/api/details/1`)
        expect(response.statusCode).toBe(200)
    })
    test('testing post route for /api/details', async ()=>{
        let response = await testServer(app).post(`/api/details`)
            .send({ 
                name: 'Lush', 
                selectedCategoryId: 9, 
                address: '', 
                city: '', 
                state_code: '', 
                zip: 10000, 
                image_url: '', 
                business_url: '', 
                google_places_url: '', 
                verified: false, 
                warning: false})
        expect(response.statusCode).toBe(200)
    })
    test('testing put route for /api/details', async () => {
        let response = await testServer(app).put(`/api/details`)
            .send({
                id: 26,
                name: 'Fraser',
                selectedCategoryId: 1,
                address: '',
                city: '',
                state_code: '',
                zip: 10000,
                image_url: '',
                business_url: '',
                google_places_url: '',
                verified: false,
                warning: true,
            })
        expect(response.statusCode).toBe(200)
    })
    // test('testing delete route for /api/details', async () => {
    //     let response = await testServer(app).delete(`/api/details/38`)
    //     expect(response.statusCode).toBe(200)
    // })
})