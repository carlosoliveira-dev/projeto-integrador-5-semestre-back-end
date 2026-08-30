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
    const p1 = await request(app)
    .post('/products')
    .send({
      name: 'smartphone',
      description: 'baixa performance'
    });

    const p2 = await request(app)
    .post('/products')
    .send({
      name: 'Notebook',
      description: 'media performance'
    });

    const p3 = await request(app)
    .post('/products')
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

 });
}

module.exports = {
    GETProducts,
}