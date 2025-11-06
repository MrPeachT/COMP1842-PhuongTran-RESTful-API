const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema(
  {
    name: {
      type: String,
      required: 'Kindly enter the name of the task'
    },
    created_date: {
      type: Date,
      default: Date.now
    },
    status: {
      type: [
        {
          type: String,
          enum: ['pending', 'in progress', 'completed']
        }
      ],
      default: ['pending']
    }
  },
  { collection: 'Tasks' } 
);

module.exports = mongoose.model('Task', TaskSchema);
