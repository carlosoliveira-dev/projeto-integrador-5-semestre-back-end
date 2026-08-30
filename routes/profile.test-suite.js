function profileTests(app, request, Profile, User) {
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

describe('PUT /profile', () => {
  it('deve atualizar o perfil do usuário', async () => {
    const newUser = await User.create({
      name: 'Carlos',
      email: 'carlos@gmail.com',
      password: '123'
    });

    const newProfile = await newUser.createProfile({
        bio: 'something to say',
        avatarUrl: 'http://www.avatarUrl.com',
        birthDate: '2005-01-01',
        phone: '0099999999',
        location: 'city',
        website: 'website.com'
    });
    
    const res = await request(app)
      .put('/profile')
      .send({
        userId: newUser.id,
        bio: 'bio',
        avatarUrl: 'http://www.avatar.com.br',
        birthDate: '2010-05-15',
        phone: '1188887777',
        location: 'new city',
        website: 'mywebsite.com.br'
    });

    // Acessando diretamente o banco de dados para validar se foi salvo de verdade
    const user = await User.findOne({
      include: [Profile]
    });

    expect(user.Profile.id).toBe(1);
    expect(user.Profile.userId).toBe(1);
    expect(user.Profile.bio).toBe('bio');
    expect(user.Profile.avatarUrl).toBe('http://www.avatar.com.br');
    expect(user.Profile.birthDate).toBe('2010-05-15');
    expect(user.Profile.phone).toBe('1188887777');
    expect(user.Profile.location).toBe('new city');
    expect(user.Profile.website).toBe('mywebsite.com.br');
  });
});

 describe('DELETE /profile', () => {
  it('deve apagar o perfil do usuário', async () => {
    const newUser = await User.create({
      name: 'Carlos',
      email: 'carlos@gmail.com',
      password: '123'
    });

    const newProfile = await newUser.createProfile({
        bio: 'something to say',
        avatarUrl: 'http://www.avatarUrl.com',
        birthDate: '2005-01-01',
        phone: '0099999999',
        location: 'city',
        website: 'website.com'
    });

    // Acessando diretamente o banco de dados para validar se foi salvo de verdade
    const user = await User.findOne({
      include: [Profile]
    });

    expect(user.Profile.bio).toBe('something to say');

    const res = await request(app)
      .delete(`/profile/${user.id}`);
    
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Perfil deletado com sucesso!');
  });
});

}

module.exports = {
  profileTests,
};