function profileTests(app, request, Profile) {
 describe('POST /profile', () => {
  it('deve cadastrar um perfil de usuário', async () => {
    const resSignup = await request(app)
    .post('/users/signup')
    .send({
      name: 'Carlos',
      email: 'carlos@gmail.com',
      password: '123'
    });

    const user = resSignup.body.user;

    const res = await request(app)
      .post('/profile')
      .send({
        userId: user.id,
        bio: 'something to say',
        avatarUrl: 'http://www.avatarUrl.com',
        birthDate: '2005-01-01',
        phone: '0099999999',
        location: 'city',
        website: 'website.com'
      });

    // Acessando diretamente o banco de dados para validar se foi salvo de verdade
    const profiles = await Profile.findAll();
    expect(profiles[0].dataValues.id).toBe(1);
    expect(profiles[0].dataValues.userId).toBe(1);

  });
});

 describe('GET /profile', () => {
  it('deve retornar uma lista vazia de perfis de usuários', async () => {
  const res = await request(app)
        .get('/profile')
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200);
      expect(res.body).toEqual([]);
  });
});
}

module.exports = {
  profileTests,
};