const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  passportId: {
    type: String,
    required: [true, 'Passport ID is required.'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required.'],
    minlength: [8, 'Password should be at least 8 characters.'],
  },
  cash: {
    type: Number,
    default: 0,
    validate: {
      validator: function (v) {
        return v >= 0;
      },
      message: 'Cash amount cannot be negative.',
    },
  },
  credit: {
    type: Number,
    default: 0,
    validate: {
      validator: function (v) {
        return v >= 0;
      },
      message: 'Credit amount cannot be negative.',
    },
  },
  isActive: { type: Boolean, default: true },
  name: { type: String },
  email: {
    type: String,
    validate: {
      validator: function (v) {
        const emailRegex = /\S+@\S+\.\S+/;
        return emailRegex.test(v);
      },
      message: 'Invalid email address.',
    },
  },
  phone: {
    type: String,
    validate: {
      validator: function (v) {
        const phoneRegex = /^\d{10}$/;
        return phoneRegex.test(v);
      },
      message: 'Invalid phone number.',
    },
  },
  role: {
    type: String,
    enum: ['user', 'manager'],
    default: 'user'
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
