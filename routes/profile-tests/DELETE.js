function DELETEProfile(app, request, Profile, User) {
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
    DELETEProfile,
}
