const { GETsuppliers } = require('./supplier-tests/GET');

function supplierTests(app, request) {
  GETsuppliers(app, request);
}

module.exports = {
  supplierTests,
};
