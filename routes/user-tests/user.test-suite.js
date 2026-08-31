const { POSTuser } = require('./POST');
const { GETuser } = require('./GET');

function userTests(app, request, User) {
  POSTuser(app, request);
  GETuser(app, request, User);
}

module.exports = {
  userTests,
};
