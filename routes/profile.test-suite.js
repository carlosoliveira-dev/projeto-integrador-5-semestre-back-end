const { POSTProfile } = require('./profile-tests/POST');
const { GETProfile } = require('./profile-tests/GET');
const { PUTProfile } = require('./profile-tests/PUT');
const { DELETEProfile } = require('./profile-tests/DELETE');

function profileTests(app, request, Profile, User) {
  POSTProfile(app, request, Profile);
  GETProfile(app, request);
  PUTProfile(app, request, Profile, User);
  DELETEProfile(app, request, Profile, User);
}

module.exports = {
  profileTests,
};