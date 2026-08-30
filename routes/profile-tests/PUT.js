function PUTProfile(app, request, Profile, User) {
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

}

module.exports = {
    PUTProfile,
}
