function GETsuppliers(app, request) {
 describe('GET /suppliers', () => {
  it('deve retornar uma lista vazia de fornecedores', async () => {
    const res = await request(app)
    .get('/suppliers')
    .expect('Content-Type', 'application/json; charset=utf-8')
    .expect(200);
    expect(res.body).toEqual([]);
  });

  it('deve retornar o produto que está associado com o fornecedor', async () => {
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

    const product = resProduct.body;
    
    const resSupplier = await request(app)
    .post(`/suppliers/${user.id}`)
    .send({
      companyName: 'Ifoody LTDA',
      cnpj: '22.111.222-05',
      primaryContactName: 'iFoody',
      address: 'street 123',
      phone: '0555468547',
      email: 'ifood@dy.com.br'
    });

    const supplier = resSupplier.body;

    const resLink = await request(app)
      .post(`/products/${product.id}/suppliers/${supplier.id}`)
      .expect(201);
    
    const resGetProducts = await request(app)
      .get(`/suppliers/${supplier.id}/products`)
      .send({
        userId: user.id
      })
      .expect(200);

    expect(resGetProducts.body[0]).toHaveProperty('productId');
    expect(resGetProducts.body[0]).toHaveProperty('supplierId');
    expect(resGetProducts.body[0].productId).toBe(1)
    expect(resGetProducts.body[0].supplierId).toBe(1)
  });
});

}

module.exports = {
    GETsuppliers,
};
