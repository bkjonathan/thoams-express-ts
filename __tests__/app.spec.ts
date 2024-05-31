import request from 'supertest';
import app from "../src";

describe('GET /', () => {
    it('responds with Hello World!', async () => {
        const response = await request(app).get('/');
        expect(response.status).toBe(200);
        expect(response.text).toBe('Hello World!');
    });
});