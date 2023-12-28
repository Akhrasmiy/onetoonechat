const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
    },
    user2: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
    },
    delUser1:{
      type:mongoose.SchemaTypes.Boolean,
      default:false
    },
    delUser2:{
      type:mongoose.SchemaTypes.Boolean,
      default:false
    }
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
);

chatSchema.virtual('user', {
  ref: 'User',
  foreignField: '_id',
  localField: 'user_id'
})

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;
