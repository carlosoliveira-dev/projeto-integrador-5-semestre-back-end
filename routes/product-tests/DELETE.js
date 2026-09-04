function DELETEProduct(app, request, Product, User) {
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
});

}

module.exports = {
    DELETEProduct,
}
