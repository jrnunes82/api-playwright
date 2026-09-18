import { test, expect } from '@playwright/test';

test.describe('API ServeRest - Autenticação / Login', () => {
  const usuarioTeste = {
    nome: 'QA Automacao',
    email: `qa_login_${Date.now()}@teste.com`, // Email único para não dar conflito
    password: 'teste',
    administrador: 'true'
  };

  // Cria o usuário na API antes de rodar os testes de login
  test.beforeAll(async ({ request }) => {
    const response = await request.post('/usuarios', {
      data: usuarioTeste
    });
    expect(response.status()).toBe(201);
  });

  test('Deve realizar login com sucesso e retornar token JWT', async ({ request }) => {
    const response = await request.post('/login', {
      data: {
        email: usuarioTeste.email,
        password: usuarioTeste.password
      }
    });

    expect(response.status()).toBe(200);
    
    const body = await response.json();
    expect(body.message).toBe('Login realizado com sucesso');
    expect(body).toHaveProperty('authorization');
  });

  test('Não deve realizar login com credenciais inválidas', async ({ request }) => {
    const response = await request.post('/login', {
      data: {
        email: 'email_inexistente_qa@teste.com',
        password: 'senha_errada'
      }
    });

    expect(response.status()).toBe(401);
    
    const body = await response.json();
    expect(body.message).toBe('Email e/ou senha inválidos');
  });

});