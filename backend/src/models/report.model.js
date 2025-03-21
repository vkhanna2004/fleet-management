import mongoose, { Schema } from "mongoose";

const reportSchema = new Schema({
  type: { 
    type: String, 
    enum: [
      'Vehicle Utilization', 
      'Driver Performance', 
      'Fuel Efficiency', 
      'Maintenance Cost', 
      'Fleet Overview',
      'Other'
    ], 
    required: true 
  },
  generatedDate: { 
    type: Date, 
    default: Date.now 
  },
  data: { 
    type: mongoose.Schema.Types.Mixed, 
    required: true 
  },
  createdBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  startDate: { 
    type: Date 
  },
  endDate: { 
    type: Date 
  },
  //can be added - option to add relevant photo or pdfs
  
}, { timestamps: true });

export const Report = mongoose.model('Report', reportSchema);