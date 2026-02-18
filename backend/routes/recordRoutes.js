const express = require('express');
const recordController = require('../controllers/recordController');
const authController = require('../controllers/authController');
const router = express.Router();

router.use(authController.protect);

// add & get records of a patient
router
  .route('/patients/:patientId')
  .post(recordController.createRecord)
  .get(recordController.getRecordsByPatient);

// delete record
router
  .route('/:id')
  .delete(recordController.deleteRecord);

module.exports = router;
