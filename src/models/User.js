import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, index: true }, // Index for faster searches
    email: { type: String, required: true, unique: true, index: true }, // Unique index for email
    password: { type: String, required: true },
    role: { type: String, enum: ['Admin', 'User'], default: 'User', index: true } // Index for role-based queries
  },
  { timestamps: true }
);

// Compound index for frequent queries (e.g., authentication)
userSchema.index({ email: 1, role: 1 });

// Pre-save middleware to hash password before saving a new user
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

const User = mongoose.model('User', userSchema);
export default User;
