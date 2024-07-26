import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Paper } from '@mui/material';

function RuleForm({ onAddRule }) {
  const [ruleString, setRuleString] = useState('');
  const [ast, setAst] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/rules', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ruleString }),
      });

      const data = await response.json();

      if (response.ok) {
        setAst(data.ast);
        onAddRule(ruleString);
        setRuleString('');
        setError(null);  // Clear any previous error message
      } else {
        throw new Error(data.message || 'Failed to generate AST');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <Typography variant="h5" gutterBottom>Create Rule</Typography>
        <Box display="flex" alignItems="center">
          <TextField
            label="Rule"
            value={ruleString}
            onChange={(e) => setRuleString(e.target.value)}
            placeholder="e.g., age > 30 AND department = 'Sales'"
            fullWidth
          />
          <Button type="submit" variant="contained" color="primary" style={{ marginLeft: '10px' }}>
            Add Rule
          </Button>
        </Box>
      </form>
      {ast && (
        <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
          <Typography variant="h6">Generated AST:</Typography>
          <pre>{JSON.stringify(ast, null, 2)}</pre>
        </Paper>
      )}
      {error && <Typography color="error">{error}</Typography>}
    </Box>
  );
}

export default RuleForm;
