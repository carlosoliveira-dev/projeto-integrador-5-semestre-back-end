const { sequelize } = require('../../database/connection');

function POSTSupplier(app, request) {
 describe('POST /suppliers', () => {
  it('deve cadastrar um novo fornecedor', async () => {
    const resUser = await request(app)
    .post('/users/signup')
    .send({
        name: 'Carlos',
        email: 'carlos@gmail.com',
        password: '123'
    });
    
    const user = resUser.body.user;

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
    expect(resSupplier.status).toBe(201);
    expect(supplier).toHaveProperty('id');
    expect(supplier).toHaveProperty('userId');
    expect(supplier.id).toBe(1);
    expect(supplier.userId).toBe(1);
  });

  it('deve linkar o fornecedor com o produto', async () => {
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
      .post(`/suppliers/${supplier.id}/products/${product.id}`)
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
    POSTSupplier,
}
