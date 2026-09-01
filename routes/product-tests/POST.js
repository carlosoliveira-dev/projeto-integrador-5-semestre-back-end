function POSTProducts(app, request, Product) {
 describe('POST /products', () => {
  it('deve cadastrar um novo produto', async () => {
     const resUser = await request(app)
      .post('/users/signup')
      .send({
        name: 'Carlos',
        email: 'carlos@gmail.com',
        password: '123'
      });

    const user = resUser.body.user;

    const res = await request(app)
      .post(`/products/${user.id}`)
      .send({
        name: 'Notebook',
        description: 'baixa performance'
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('userId');
    expect(res.body.name).toBe('Notebook');
    expect(res.body.description).toBe('baixa performance');

    const produtoNoBanco = await Product.findByPk(1);
    expect(produtoNoBanco).not.toBeNull();
    expect(produtoNoBanco.name).toBe('Notebook');
    expect(produtoNoBanco.description).toBe('baixa performance');
  });
});
}

module.exports = {
    POSTProducts,
}