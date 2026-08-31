const { GETsuppliers } = require('./GET');

function supplierTests(app, request) {
  GETsuppliers(app, request);
}

module.exports = {
  supplierTests,
};
