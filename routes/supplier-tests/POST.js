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
});
}

module.exports = {
    POSTSupplier,
}
