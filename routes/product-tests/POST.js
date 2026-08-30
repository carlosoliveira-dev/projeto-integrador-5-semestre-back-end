function POSTProducts(app, request, Product) {
 describe('POST /products', () => {
  it('deve cadastrar um novo produto', async () => {
    const res = await request(app)
      .post('/products')
      .send({
        name: 'Notebook',
        description: 'baixa performance'
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
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