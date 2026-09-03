function PUTProduct(app, request, Product) {
 describe('PUT /products', () => {
  it('deve atualizar o produto', async () => {
     const resUser = await request(app)
      .post('/users/signup')
      .send({
        name: 'Carlos',
        email: 'carlos@gmail.com',
        password: '123'
      });

    const user = resUser.body.user;

    const resProduct = await request(app)
      .post(`/products/${user.id}`)
      .send({
        name: 'Notebook',
        description: 'baixa performance'
      });

    const res = await request(app)
      .put(`/products/${resProduct.body.id}`)
      .send({
        userId: user.id,
        name: 'Notebook Updated',
        description: 'baixa performance Updated'
      });
    
    expect(res.status).toBe(201);
    expect(res.body.product).toHaveProperty('name');
    expect(res.body.product).toHaveProperty('description');

    expect(res.body.product.name).toBe('Notebook Updated');
    expect(res.body.product.description).toBe('baixa performance Updated');

    const produtoNoBanco = await Product.findByPk(1);
    const produtoJson = produtoNoBanco.toJSON();
    expect(produtoJson).not.toBeNull();
    expect(produtoJson.name).toBe('Notebook Updated');
    expect(produtoJson.description).toBe('baixa performance Updated');
  });
});
}

module.exports = {
    PUTProduct
}