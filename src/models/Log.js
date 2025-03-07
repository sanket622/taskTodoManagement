import mongoose from 'mongoose';

const logSchema = new mongoose.Schema({
  action: { type: String, required: true }, // e.g., "CREATE_TASK", "UPDATE_TASK", "DELETE_TASK"
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  task: { type: mongoose.Schema.Types.ObjectId, ref: 'Task' },
  timestamp: { type: Date, default: Date.now },
  details: { type: Object }, // Store relevant details about the change
});

export default mongoose.model('Log', logSchema);
