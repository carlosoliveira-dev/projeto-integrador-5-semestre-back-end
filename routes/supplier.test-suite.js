function supplierTests(app, request) {
 describe('GET /suppliers', () => {
  it('deve retornar uma lista vazia de fornecedores', async () => {
    const res = await request(app)
    .get('/suppliers')
    .expect('Content-Type', 'application/json; charset=utf-8')
    .expect(200);
    expect(res.body).toEqual([]);
  });
});

}

module.exports = {
  supplierTests,
};
