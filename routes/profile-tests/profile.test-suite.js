const { POSTProfile } = require('./POST');
const { GETProfile } = require('./GET');
const { PUTProfile } = require('./PUT');
const { DELETEProfile } = require('./DELETE');

function profileTests(app, request, Profile, User) {
  POSTProfile(app, request, Profile);
  GETProfile(app, request);
  PUTProfile(app, request, Profile, User);
  DELETEProfile(app, request, Profile, User);
}

module.exports = {
  profileTests,
};