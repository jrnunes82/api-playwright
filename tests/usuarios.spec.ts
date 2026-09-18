import { test, expect } from '@playwright/test';

test.describe('API ServeRest - CRUD de Usuários (/usuarios)', () => {
  let userId: string;
  const userPayload = {
    nome: 'Usuario Teste Playwright',
    email: `qa_user_${Date.now()}@teste.com`,
    password: 'senha123password',
    administrador: 'true'
  };

  test('POST /usuarios - Deve cadastrar um novo usuário com sucesso', async ({ request }) => {
    const response = await request.post('/usuarios', {
      data: userPayload
    });

    expect(response.status()).toBe(201);
    
    const body = await response.json();
    expect(body.message).toBe('Cadastro realizado com sucesso');
    expect(body).toHaveProperty('_id');
    
    // Guarda o ID do usuário para usar nos testes seguintes
    userId = body._id;
  });

  test('GET /usuarios - Deve listar todos os usuários cadastrados', async ({ request }) => {
    const response = await request.get('/usuarios');

    expect(response.status()).toBe(200);
    
    const body = await response.json();
    expect(body).toHaveProperty('quantidade');
    expect(Array.isArray(body.usuarios)).toBeTruthy();
  });

  test('GET /usuarios/{id} - Deve buscar os detalhes de um usuário específico por ID', async ({ request }) => {
    const response = await request.get(`/usuarios/${userId}`);

    expect(response.status()).toBe(200);
    
    const body = await response.json();
    expect(body.nome).toBe(userPayload.nome);
    expect(body.email).toBe(userPayload.email);
  });

  test('PUT /usuarios/{id} - Deve atualizar as informações do usuário', async ({ request }) => {
    const updatedPayload = {
      ...userPayload,
      nome: 'Usuario Teste Nome Atualizado'
    };

    const response = await request.put(`/usuarios/${userId}`, {
      data: updatedPayload
    });

    expect(response.status()).toBe(200);
    
    const body = await response.json();
    expect(body.message).toBe('Registro alterado com sucesso');
  });

  test('DELETE /usuarios/{id} - Deve excluir o usuário com sucesso', async ({ request }) => {
    const response = await request.delete(`/usuarios/${userId}`);

    expect(response.status()).toBe(200);
    
    const body = await response.json();
    expect(body.message).toBe('Registro excluído com sucesso');
  });

  test('GET /usuarios/{id} - Deve retornar 400 ao buscar usuário excluído/inexistente', async ({ request }) => {
    const response = await request.get(`/usuarios/${userId}`);

    expect(response.status()).toBe(400);
    
    const body = await response.json();
    expect(body.message).toBe('Usuário não encontrado');
  });

});