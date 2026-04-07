const Patient = require('../models/patientModel');


exports.createPatient = async (req, res) => {
  try {
    const { name, relation, dateOfBirth } = req.body;

    const newPatient = await Patient.create({
      name,
      relation,
      dateOfBirth,
      user: req.user.id
    });

    res.status(201).json({
      status: 'success',
      data: newPatient
    });

  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};


exports.getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.find({ user: req.user.id });

    res.status(200).json({
      status: 'success',
      results: patients.length,
      data: patients
    });

  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};


exports.getPatientById = async (req, res) => {
  try {
    const patient = await Patient.findOne({
      _id: req.params.id,
      user: req.user.id
    });

    if (!patient) {
      return res.status(404).json({
        status: 'fail',
        message: 'Patient not found'
      });
    }

    res.status(200).json({
      status: 'success',
      data: patient
    });

  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};


exports.deletePatient = async (req, res) => {
  try {
    const patient = await Patient.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id
    });

    if (!patient) {
      return res.status(404).json({
        status: 'fail',
        message: 'Patient not found'
      });
    }

    res.status(204).json({
      status: 'success',
      message: 'Patient deleted'
    });

  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};
