const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ResultSchema = new Schema({
  inputData: {
    age: Number,
    department: String,
    salary: Number,
    experience: Number
  },
  ruleString: String, // Add this line
  rule: Object, // Change this to Object type to store AST
  combinedAST: Object,
  evaluationResult: Boolean,
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Result', ResultSchema);
