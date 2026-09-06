function PUTSupplier(app, request) {
 describe('PUT /profile', () => {
  it('deve atualizar o fornecedor', async () => {
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

    const resGETSuppliers = await request(app)
    .get('/suppliers')
    .expect('Content-Type', 'application/json; charset=utf-8')
    .expect(200);
    
    const resPUTSupplier = await request(app)
    .put(`/suppliers/${resPostSupplier.body.id}`)
    .send({
        companyName: 'new company',
        cnpj: '11.111.111-11',
        primaryContactName: 'New iFoody',
        address: 'street 123 New',
        phone: '555555555555',
        email: 'ifood@dy.com'
    })
    .expect(200);
    
    const supplier = resPUTSupplier.body.supplier;
    expect(supplier.id).toBe(1);
    expect(supplier.userId).toBe(1);
    expect(supplier.companyName).toBe('new company');
    expect(supplier.cnpj).toBe('11.111.111-11');
    expect(supplier.primaryContactName).toBe('New iFoody');
    expect(supplier.address).toBe('street 123 New');
    expect(supplier.phone).toBe('555555555555');
    expect(supplier.email).toBe('ifood@dy.com');
  
});
});
};

module.exports = {
    PUTSupplier,
}