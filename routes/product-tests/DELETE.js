function DELETEProduct(app, request, Product, sequelize) {
 describe('DELETE /products', () => {
  it('deve excluir o produto', async () => {
    const resUser = await request(app)
      .post('/users/signup')
      .send({
        name: 'Carlos',
        email: 'carlos@gmail.com',
        password: '123'
      });
    const token = resUser.body.token;
    const user = resUser.body.user;

    const resProduct = await request(app)
      .post(`/products/${user.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'smartphone',
        description: 'easy to use'
      });
    const product = await Product.findByPk(resProduct.body.id);

    expect(product.name).toBe('smartphone');
    expect(product.description).toBe('easy to use');
    
    const res = await request(app)
      .delete(`/products/${product.id}`)
      .set('Authorization', `Bearer ${token}`);
    
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Produto excluído com sucesso!');
  });

   it('deve desassociar o fornecedor do produto', async () => {
    const resUser = await request(app)
      .post('/users/signup')
      .send({
        name: 'Carlos',
        email: 'carlos@gmail.com',
        password: '123'
      });

    const user = resUser.body.user;
    const token = resUser.body.token;

    const resProduct = await request(app)
      .post(`/products/${user.id}`)
      .set('Authorization', `Bearer ${token}`)
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
      .set('Authorization', `Bearer ${token}`)
      .expect(201);
    
    const ProductSupplier = sequelize.models.ProductSupplier;
    const links = await ProductSupplier.findAll();
    
    expect(links[0].dataValues).toHaveProperty('productId');
    expect(links[0].dataValues).toHaveProperty('supplierId');
    expect(links[0].dataValues.productId).toBe(1)
    expect(links[0].dataValues.supplierId).toBe(1)

    const res = await request(app)
      .delete(`/products/${product.id}/suppliers/${supplier.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    const linksRemoved = await ProductSupplier.findAll();

    expect(linksRemoved).toEqual([]);
  });
});

}

module.exports = {
    DELETEProduct,
}
