const { sequelize } = require('../../database/connection');

function DELETESupplier(app, request) {
 describe('DELETE /suppliers', () => {
  it('deve excluir o fornecedor', async () => {
    const resPostUser = await request(app)
    .post('/users/signup')
    .send({
        name: 'Carlos',
        email: 'carlos@gmail.com',
        password: '123'
    });
    
    const user = resPostUser.body.user;

    const resPostSupplier = await request(app)
      .post(`/suppliers/${user.id}`)
      .send({
        companyName: 'Ifoody LTDA',
        cnpj: '22.111.222-05',
        primaryContactName: 'iFoody',
        address: 'street 123',
        phone: '0555468547',
        email: 'ifood@dy.com.br'
      });

    const supplier = resPostSupplier.body;
    
    const resDeleteSupplier = await request(app)
        .delete(`/suppliers/${supplier.id}`)
        .expect(200);
    
    expect(resDeleteSupplier.body.message).toBe('Fornecedor excluído com sucesso!');

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
      .post(`/suppliers/${supplier.id}/products/${product.id}`)
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
    DELETESupplier,
}