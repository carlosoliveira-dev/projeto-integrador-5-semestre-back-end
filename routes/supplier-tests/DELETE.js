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
});
}

module.exports = {
    DELETESupplier,
}