function POSTuser(app, request) {
 describe('POST /users/signup', () => {
  it('deve cadastrar novo usuário e devolver token jwt', async () => {
    const res = await request(app)
      .post('/users/signup')
      .send({
        name: 'Carlos',
        email: 'carlos@gmail.com',
        password: '123456'
      });
    
      expect(res.body).toHaveProperty('user');
      expect(res.body).toHaveProperty('token');
      expect(res.body).toHaveProperty('message');
      
      expect(res.body.message).toBe('Usuário criado com sucesso!');
      expect(res.status).toBe(201);
    });
});

 describe('POST users/login', () => {
  it('deve permitir o acesso com a senha correta', async () => {
    const resSignup = await request(app)
      .post('/users/signup')
      .send({
        name: 'Carlos',
        email: 'carlos@gmail.com',
        password: '123456'
      });

    const res = await request(app)
      .post('/users/login')
      .send({
        email: 'carlos@gmail.com',
        password: '123456'
      });
    
      expect(res.body.message).toBe('Login realizado com sucesso!');
      expect(res.status).toBe(200);
  });

  it('deve negar o acesso com a senha errada', async () => {
    const resSignup = await request(app)
      .post('/users/signup')
      .send({
        name: 'Carlos',
        email: 'carlos@gmail.com',
        password: '123456'
      });

    const res = await request(app)
      .post('/users/login')
      .send({
        email: 'carlos@gmail.com',
        password: '123'
      });

      expect(res.body.error).toBe('E-mail ou senha inválidos.');
      expect(res.status).toBe(401);
  });
});

}

module.exports = {
    POSTuser,
}
