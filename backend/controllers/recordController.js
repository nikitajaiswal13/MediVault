const Record = require('../models/recordModel');


exports.createRecord = async (req, res) => {
  try {
    const { recordType, hospital, date } = req.body;

    const newRecord = await Record.create({
      recordType,
      hospital,
      date,
      file: req.file.filename,  
      patient: req.params.patientId,
      user: req.user.id
    });

    res.status(201).json({
      status: 'success',
      data: newRecord
    });

  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};



exports.getRecordsByPatient = async (req, res) => {
  try {
    const records = await Record.find({
      patient: req.params.patientId,
      user: req.user.id
    });

    res.status(200).json({
      status: 'success',
      results: records.length,
      data: records
    });

  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};


exports.deleteRecord = async (req, res) => {
  try {
    const record = await Record.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id
    });

    if (!record) {
      return res.status(404).json({
        status: 'fail',
        message: 'Record not found'
      });
    }

    res.status(204).json({
      status: 'success',
      message: 'Record deleted'
    });

  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

exports.getAllRecords = async(req, res) => {
  try {
    const records = await Record.find({ user: req.user.id }).sort({ date: -1 });

    res.status(200).json({
      status: 'success',
      results: records.length,
      data: records
    });
  }catch(err){
        res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
}