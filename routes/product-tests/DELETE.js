function DELETEProduct(app, request, Product, User, sequelize) {
 describe('DELETE /products', () => {
  it('deve excluir o produto', async () => {
    const newUser = await User.create({
      name: 'Carlos',
      email: 'carlos@gmail.com',
      password: '123'
    });

    const newProduct = await newUser.createProduct({
        name: 'smartphone',
        description: 'easy to use',
    });
 
    const user = await User.findOne({
      include: [Product]
    });

    expect(user.Products[0].dataValues.name).toBe('smartphone');
    expect(user.Products[0].dataValues.description).toBe('easy to use');
    
    const res = await request(app)
      .delete(`/products/${user.Products[0].dataValues.id}`);
    
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Produto excluído com sucesso!');
  });

   it('deve desassociar o produto do fornecedor', async () => {
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
    
    const ProductSupplier = sequelize.models.ProductSupplier;
    const links = await ProductSupplier.findAll();
    
    expect(links[0].dataValues).toHaveProperty('productId');
    expect(links[0].dataValues).toHaveProperty('supplierId');
    expect(links[0].dataValues.productId).toBe(1)
    expect(links[0].dataValues.supplierId).toBe(1)

    const res = await request(app)
      .delete(`/products/${product.id}/suppliers/${supplier.id}`)
      .expect(200);

    const linksRemoved = await ProductSupplier.findAll();

    expect(linksRemoved).toEqual([]);
  });
});

}

module.exports = {
    DELETEProduct,
}
