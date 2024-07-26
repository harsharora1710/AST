const express = require('express');
const router = express.Router();
const { createRule, combineRules, evaluateRule } = require('../utils/ruleEngine'); // Import your rule engine functions
const Result = require('../models/rule'); // Import the Result model

// Create a new rule
router.post('/', async (req, res) => {
  try {
    const { ruleString, inputData } = req.body;
    const ast = createRule(ruleString);

    // Save the result in MongoDB
    const newResult = new Result({
      inputData,
      ruleString,
      rule: ast,
      combinedAST: null,
      evaluationResult: null,
    });

    await newResult.save();

    res.json({ ast });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating rule' });
  }
});

// Combine rules
router.post('/combine', async (req, res) => {
  try {
    const { rules } = req.body;
    const combinedAST = combineRules(rules);

    // Save the combined AST in MongoDB
    const newResult = new Result({
      inputData: {}, // No input data for combining rules
      ruleString: rules.join(', '),
      rule: null,
      combinedAST,
      evaluationResult: null,
    });

    await newResult.save();

    res.json({ combinedAST });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error combining rules' });
  }
});

// Evaluate rule
router.post('/evaluate', async (req, res) => {
  try {
    const { ast, data } = req.body;
    const result = evaluateRule(ast, data);

    // Save the evaluation result in MongoDB
    const newResult = new Result({
      inputData: data,
      ruleString: null, // No rule string for direct AST evaluation
      rule: ast,
      combinedAST: null,
      evaluationResult: result,
    });

    await newResult.save();

    res.json({ result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error evaluating rule' });
  }
});

module.exports = router;
