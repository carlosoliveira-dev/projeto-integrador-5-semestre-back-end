function GETProfile(app, request) {
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
    GETProfile,
}
