import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
  {
    employeeId: {
      type: String,
      required: [true, "Employee ID is required"],
      unique: true,
      trim: true,
      uppercase: true,
    },

    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
     
    },

    department: {
      type: String,
      required: [true, "Department is required"],
      trim: true,
    },
  },
  {
    timestamps: true,
    
  }
);

/**
 * Indexing (Performance + Duplicate Safety)
 */
// employeeSchema.index({ employeeId: 1 });
// employeeSchema.index({ email: 1 });

const Employee = mongoose.model("Employee", employeeSchema);

export default Employee;