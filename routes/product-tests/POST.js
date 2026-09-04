function POSTProducts(app, request, Product, sequelize) {
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

  it('deve linkar o produto com o fornecedor', async () => {
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

    const res = await request(app)
      .post(`/products/${product.id}/suppliers/${supplier.id}`)
      .expect(201);
    
    const ProductSupplier = sequelize.models.ProductSupplier;
    const links = await ProductSupplier.findAll();
    
    expect(links[0].dataValues).toHaveProperty('productId');
    expect(links[0].dataValues).toHaveProperty('supplierId');
    expect(links[0].dataValues.productId).toBe(1)
    expect(links[0].dataValues.supplierId).toBe(1)
  });
});
}

module.exports = {
    POSTProducts,
}