const Record = require('../models/recordModel');
const cloudinary = require('../config/cloudinary');

exports.createRecord = async (req, res) => {
  try {
    const { recordType, hospital, date } = req.body;

    if (!req.file) {
      return res.status(400).json({
        status: 'fail',
        message: 'File is required'
      });
    }

    const newRecord = await Record.create({
      recordType,
      hospital,
      date,
      file: req.file.path,          // URL
      filePublicId: req.file.filename, // Cloudinary public_id
      patient: req.params.patientId,
      user: req.user.id
    });

    res.status(201).json({
      status: 'success',
      data: newRecord
    });

  } catch (err) {
    console.error(err);
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

    const record = await Record.findOne({
      _id: req.params.id,
      user: req.user.id
    });

    if (!record) {
      return res.status(404).json({
        status: 'fail',
        message: 'Record not found'
      });
    }

    // 🔥 Delete from Cloudinary (if exists)
    if (record.filePublicId) {
      try {
        const result = await cloudinary.uploader.destroy(
          record.filePublicId,
          { resource_type: "raw" } // important for PDFs/files
        );

        console.log("Cloudinary delete result:", result);

      } catch (err) {
        console.log("Cloudinary delete error:", err.message);
        // ❗ DO NOT stop execution
      }
    }

    // ✅ Delete from DB
    await Record.findByIdAndDelete(record._id);

    return res.status(200).json({
      status: 'success',
      message: 'Record deleted successfully'
    });

  } catch (err) {
    console.error("Delete error:", err);

    return res.status(400).json({
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

