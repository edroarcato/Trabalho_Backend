const supertest = require('supertest');

const app = require('../app');

const request = supertest(app);

const url = '/livros';

// Adicione aqui o novo token gerado no postman
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJNaW5oYSBBUEkiLCJlbWFpbCI6InBlZHJvcm9kcmlndWVzQGdtYWlsLmNvbSIsIm5vbWUiOiJQZWRybyBSb2RyaWd1ZXMiLCJwZXJmaWwiOiJ1c2VyIiwiaWF0IjoxNzYyNTY5NDk4LCJleHAiOjE3NjI1Njk3OTh9.cTQmWI_JJwf_XaibB--8yV1JJKE_sTbXhfHGLncNqXM";

let id = null;

describe('Testes do recurso /livros', () => {

    test('POST / deve retornar 201', async () => {
        const response = await request
            .post(url)
            .set("Authorization", `Bearer ${token}`)
            .send({
                titulo: "Node.js para Iniciantes",
                autor: "Pedro Marcato",
                publicadoEm: "2025-11-02",
                disponivel: true
            });

        expect(response.status).toBe(201);
        expect(response.body._id).toBeDefined();
        expect(response.body.titulo).toBe("Node.js para Iniciantes");
        id = response.body._id;
    });

    test('POST / deve retornar 422 (título curto)', async () => {
        const response = await request
            .post(url)
            .set("Authorization", `Bearer ${token}`)
            .send({ titulo: "No", autor: "Pedro" });
        expect(response.status).toBe(422);
        expect(response.body.msg).toBe("Título deve ter pelo menos 3 caracteres");
    });

    test('POST / deve retornar 422 (título vazio)', async () => {
        const response = await request
            .post(url)
            .set("Authorization", `Bearer ${token}`)
            .send({ titulo: "   ", autor: "Pedro" });
        expect(response.status).toBe(422);
        expect(response.body.msg).toBe("Título é obrigatório");
    });

    test('GET / deve retornar 200', async () => {
        const response = await request.get(url);
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    test('GET / id deve retornar 200', async () => {
        const response = await request.get(`${url}/${id}`);
        expect(response.status).toBe(200);
        expect(response.body._id).toBeDefined();
        expect(response.body.titulo).toBe("Node.js para Iniciantes");
    });

    test('GET / id deve retornar 400', async () => {
        const response = await request.get(`${url}/0`);
        expect(response.status).toBe(400);
        expect(response.body.msg).toBe("ID inválido");
    });

    test('GET / id deve retornar 404', async () => {
        const response = await request.get(`${url}/000000000000000000000000`);
        expect(response.status).toBe(404);
        expect(response.body.msg).toBe("Livro não encontrado");
    });

    test('PUT / id deve retornar 200', async () => {
        const response = await request
            .put(`${url}/${id}`)
            .set("Authorization", `Bearer ${token}`)
            .send({
                titulo: "Node.js e Express",
                disponivel: false
            });
        expect(response.status).toBe(200);
        expect(response.body.titulo).toBe("Node.js e Express");
        expect(response.body.disponivel).toBe(false);
    });

    test('PUT / id deve retornar 400', async () => {
        const response = await request
            .put(`${url}/0`)
            .set("Authorization", `Bearer ${token}`);
        expect(response.status).toBe(400);
        expect(response.body.msg).toBe("ID inválido");
    });

    test('PUT / id deve retornar 404', async () => {
        const response = await request
            .put(`${url}/000000000000000000000000`)
            .set("Authorization", `Bearer ${token}`);
        expect(response.status).toBe(404);
        expect(response.body.msg).toBe("Livro não encontrado");
    });

    test('PUT / id deve retornar 422 (título vazio)', async () => {
        const response = await request
            .put(`${url}/${id}`)
            .set("Authorization", `Bearer ${token}`)
            .send({ titulo: "   " });
        expect(response.status).toBe(422);
        expect(response.body.msg).toBe("Título é obrigatório");
    });

    test('PUT /:id deve retornar 422 (título curto)', async () => {
        const response = await request
            .put(`${url}/${id}`)
            .set("Authorization", `Bearer ${token}`)
            .send({ titulo: "No" });
        expect(response.status).toBe(422);
        expect(response.body.msg).toBe("Título deve ter pelo menos 3 caracteres");
    });

    test('DELETE / id deve retornar 204', async () => {
        const response = await request
            .delete(`${url}/${id}`)
            .set("Authorization", `Bearer ${token}`);
        expect(response.status).toBe(204);
    });

    test('DELETE /:id deve retornar 400', async () => {
        const response = await request
            .delete(`${url}/0`)
            .set("Authorization", `Bearer ${token}`);
        expect(response.status).toBe(400);
        expect(response.body.msg).toBe("ID inválido");
    });

    test('DELETE /:id deve retornar 404', async () => {
        const response = await request
            .delete(`${url}/${id}`)
            .set("Authorization", `Bearer ${token}`);
        expect(response.status).toBe(404);
        expect(response.body.msg).toBe("Livro não encontrado");
    });

});
