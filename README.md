# projeto-integrador-5-semestre-back-end
[GRAN FACULDADE](https://faculdade.grancursosonline.com.br/)

## tecnologias
[JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[nodejs](https://nodejs.org/en)
[sqlite](https://sqlite.org/)
[Jest](https://jestjs.io/)
[supertest](https://www.npmjs.com/package/supertest)
[express](https://expressjs.com/)
[sequelize](https://sequelize.org/)

## comandos
### iniciar o backend com live reloader
``` bash
npm run dev
```
### rodar os testes de api
``` bash
npm t
```

## Deploy no Render

O arquivo `render.yaml` configura o serviço web no plano gratuito. O SQLite fica no sistema de arquivos temporário da instância, então os dados podem ser apagados ao reiniciar ou fazer um novo deploy. Para implantar:

1. Envie este repositório para o GitHub.
2. No Render, escolha **New > Blueprint** e conecte o repositório.
3. Confirme a criação do serviço. O Blueprint solicitará os valores de `JWT_SECRET` e `FRONTEND_ORIGIN`.
4. Informe um valor longo e aleatório para `JWT_SECRET` e a URL pública do frontend para `FRONTEND_ORIGIN` (por exemplo, `https://meu-frontend.onrender.com`).
5. Aguarde o deploy e acesse a URL do serviço; a raiz redireciona para `/api-docs`.

O banco SQLite é criado em `db.sqlite` na pasta do projeto e não é persistente no plano gratuito. Isso é adequado para testes, mas os dados e registros criados podem desaparecer quando a instância reiniciar ou for implantada novamente.

# artigos
[Mastering API Testing with Supertest, Express.js, and Jest](https://www.dennisokeeffe.com/blog/2023-10-27-testing-express-apps-with-jest-and-supertest)