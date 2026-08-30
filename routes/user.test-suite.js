const { POSTuser } = require('./user-tests/POST');
const { GETuser } = require('./user-tests/GET');

function userTests(app, request, User) {
  POSTuser(app, request);
  GETuser(app, request, User);
}

module.exports = {
  userTests,
};
