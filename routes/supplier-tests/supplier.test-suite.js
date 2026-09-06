const { GETsuppliers } = require('./GET');
const { POSTSupplier } = require('./POST');
const { PUTSupplier } = require('./PUT');
const { DELETESupplier } = require('./DELETE');

function supplierTests(app, request) {
  GETsuppliers(app, request);
  POSTSupplier(app, request);
  PUTSupplier(app, request);
  DELETESupplier(app, request);
}

module.exports = {
  supplierTests,
};
