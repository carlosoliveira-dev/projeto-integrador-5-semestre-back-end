function GETuser(app, request, User) {
 describe('GET /users', () => {
  it('deve retornar uma lista vazia de usuários', async () => {
  const res = await request(app)
        .get('/users')
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200);
      expect(res.body).toEqual([]);
  });

  it('deve retornar uma lista com 3 usuários', async () => {
    const user1 = await request(app)
      .post('/users/signup')
      .send({
        name: 'Carlos',
        email: 'carlos@gmail.com',
        password: '123'
      });

    const user2 = await request(app)
      .post('/users/signup')
      .send({
        name: 'Maria',
        email: 'maria@gmail.com',
        password: '1234'
      });

    const user3 = await request(app)
      .post('/users/signup')
      .send({
        name: 'Joana',
        email: 'Joana@gmail.com',
        password: '12345'
      });
    
    const res = await request(app)
      .get('/users')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body).toHaveLength(3);

    const users = await User.findAll();
    expect(users[0].dataValues.id).toBe(1);
    expect(users[1].dataValues.id).toBe(2);
    expect(users[2].dataValues.id).toBe(3);
    expect(Array.isArray(users)).toBe(true);
    expect(users).toHaveLength(3);
  });
});

}

module.exports = {
    GETuser,
}
