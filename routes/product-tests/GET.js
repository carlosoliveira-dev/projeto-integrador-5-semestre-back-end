function GETProducts(app, request, Product) {
 describe('GET /products', () => {
  it('deve retornar uma lista vazia de produtos', async () => {
    const res = await request(app)
      .get('/products')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200);
    expect(res.body).toEqual([]);
  });

  it('deve retornar uma lista com 3 produtos', async () => {
      const resUser = await request(app)
      .post('/users/signup')
      .send({
        name: 'Carlos',
        email: 'carlos@gmail.com',
        password: '123'
      });

    const user = resUser.body.user;

    const p1 = await request(app)
    .post(`/products/${user.id}`)
    .send({
      name: 'smartphone',
      description: 'baixa performance'
    });

    const p2 = await request(app)
    .post(`/products/${user.id}`)
    .send({
      name: 'Notebook',
      description: 'media performance'
    });

    const p3 = await request(app)
    .post(`/products/${user.id}`)
    .send({
      name: 'Computador',
      description: 'alta performance'
    });

    const res = await request(app)
      .get('/products')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body).toHaveLength(3);

    const produtos = await Product.findAll();
    expect(Array.isArray(produtos)).toBe(true);
    expect(produtos).toHaveLength(3);
  });

  it('deve retornar o produto com userId preenchido', async () => {
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
        name: 'produto',
        description: 'alta performance'
      });
    
      const produtoDB = await Product.findByPk(1);
      const produto = produtoDB.toJSON(); 
      
      expect(produto.userId).toBe(1);

  });

   it('deve retornar o fornecedor que está associado com o produto', async () => {
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
    
    const resGetSuppliers = await request(app)
      .get(`/products/${product.id}/suppliers/`)
      .send({
        userId: user.id
      })
      .expect(200);
    
    console.log(resGetSuppliers.body);

    expect(resGetSuppliers.body[0]).toHaveProperty('productId');
    expect(resGetSuppliers.body[0]).toHaveProperty('supplierId');
    expect(resGetSuppliers.body[0].productId).toBe(1)
    expect(resGetSuppliers.body[0].supplierId).toBe(1)
  });
 });
}

module.exports = {
    GETProducts,
}