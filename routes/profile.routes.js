const express = require('express');
const router = express.Router();
const {
  getProfiles,
  addProfile,
  updateProfile,
  deleteProfile
} = require('../controllers/profile.controller')

router.get('/', getProfiles);
router.post('/', addProfile);
router.put('/', updateProfile);
router.delete('/:userId', deleteProfile);

module.exports = router;
