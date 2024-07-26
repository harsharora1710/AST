import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, Grid, Paper } from '@mui/material';
import RuleForm from './components/RuleForm';
import CombineRules from './components/CombineRules';
import EvaluateRules from './components/EvaluateRules';

function App() {
  const [rules, setRules] = useState([]);
  const [combinedAST, setCombinedAST] = useState(null);
  const [evaluationResult, setEvaluationResult] = useState(null);
  const [error, setError] = useState(null);
  const [inputData, setInputData] = useState({
    age: '',
    department: '',
    salary: '',
    experience: '',
  });
  const [astRule, setAstRule] = useState('');

  const addRule = (rule) => {
    setRules([...rules, rule]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputData({
      ...inputData,
      [name]: value,
    });
  };

  const handleAstRuleChange = (e) => {
    setAstRule(e.target.value);
  };

  const handleEvaluate = async () => {
    try {
      // Generate AST from the input AST rule
      const astResponse = await fetch('http://localhost:5000/api/rules', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ruleString: astRule }),
      });

      const astData = await astResponse.json();
      if (!astResponse.ok) {
        throw new Error(astData.message || 'Failed to generate AST');
      }

      // Evaluate the generated AST with the input data
      const evaluationResponse = await fetch('http://localhost:5000/api/rules/evaluate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ast: astData.ast, data: inputData }),
      });

      const evaluationData = await evaluationResponse.json();
      if (!evaluationResponse.ok) {
        throw new Error(evaluationData.message || 'Failed to evaluate rule');
      }

      setEvaluationResult(evaluationData.result);
      setError(null);
    } catch (error) {
      setError(error.message);
      setEvaluationResult(null);
    }
  };

  return (
    <Container>
      <Typography variant="h3" align="center" gutterBottom>
        Rule Engine
      </Typography>
      <Box my={4}>
        <Paper elevation={3} style={{ padding: '20px' }}>
          <RuleForm onAddRule={addRule} />
        </Paper>
      </Box>
      <Box my={4}>
        <Paper elevation={3} style={{ padding: '20px' }}>
          <CombineRules rules={rules} setCombinedAST={setCombinedAST} setError={setError} />
        </Paper>
        {}
      </Box>
      <Box my={4}>
        <Paper elevation={3} style={{ padding: '20px' }}>
          <div>
            <Typography variant="h5" gutterBottom>Evaluate Rule</Typography>
            <TextField
              fullWidth
              label="AST Rule"
              value={astRule}
              onChange={handleAstRuleChange}
              placeholder="Enter AST rule"
              margin="normal"
            />
            <form>
              <Grid container spacing={2}>
                <Grid item xs={6} md={3}>
                  <TextField
                    fullWidth
                    label="Age"
                    type="number"
                    name="age"
                    value={inputData.age}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={6} md={3}>
                  <TextField
                    fullWidth
                    label="Department"
                    name="department"
                    value={inputData.department}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={6} md={3}>
                  <TextField
                    fullWidth
                    label="Salary"
                    type="number"
                    name="salary"
                    value={inputData.salary}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={6} md={3}>
                  <TextField
                    fullWidth
                    label="Experience"
                    type="number"
                    name="experience"
                    value={inputData.experience}
                    onChange={handleInputChange}
                  />
                </Grid>
              </Grid>
            </form>
            <Box my={2}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleEvaluate}
              >
                Evaluate
              </Button>
            </Box>
            {evaluationResult !== null && (
              <Box my={2}>
                <Typography variant="h5">Evaluation Result:</Typography>
                <Typography variant="body1">{evaluationResult ? 'True' : 'False'}</Typography>
              </Box>
            )}
          </div>
        </Paper>
      </Box>
      {error && <Typography color="error">{error}</Typography>}
    </Container>
  );
}

export default App;
