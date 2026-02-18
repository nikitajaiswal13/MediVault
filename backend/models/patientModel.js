const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Patient must have a name']
    },

    relation: {
      type: String,
      required: [true, 'Please specify relation']
    },

    dateOfBirth: {
      type: Date
    },

    // link patient to logged-in user
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Patient', patientSchema);
