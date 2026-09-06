const { GETsuppliers } = require('./GET');
const { POSTSupplier } = require('./POST');
const { PUTSupplier } = require('./PUT');

function supplierTests(app, request) {
  GETsuppliers(app, request);
  POSTSupplier(app, request);
  PUTSupplier(app, request);
}

module.exports = {
  supplierTests,
};
