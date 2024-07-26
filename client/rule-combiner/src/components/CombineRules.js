import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Paper } from '@mui/material';

function CombineRules({ setCombinedAST, setError }) {
  const [rulesArray, setRulesArray] = useState('');
  const [combinedAST, setLocalCombinedAST] = useState(null);

  const handleCombine = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/rules/combine', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rules: rulesArray.split(',').map(rule => rule.trim()) }),
      });
      console.log(rulesArray.split(',').map(rule => rule.trim()));
      const data = await response.json();
      console.log("data");
      if (response.ok) {
        setCombinedAST(data.combinedAST);
        setLocalCombinedAST(data.combinedAST);
        setError(null);
      } else {
        throw new Error(data.message || 'Failed to combine rules');
      }
    } catch (error) {
      setError(error.message);
      setLocalCombinedAST(null);
    }
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>Combine Rules</Typography>
      <Box display="flex" alignItems="center">
        <TextField
          label="Rules Array"
          value={rulesArray}
          onChange={(e) => setRulesArray(e.target.value)}
          placeholder="e.g., age > 30 AND department = 'Sales', salary > 50000"
          fullWidth
        />
        <Button onClick={handleCombine} variant="contained" color="secondary" style={{ marginLeft: '10px' }}>
          Combine
        </Button>
      </Box>
      {combinedAST && (
        <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
          <Typography variant="h6">Combined AST:</Typography>
          <pre>{JSON.stringify(combinedAST, null, 2)}</pre>
        </Paper>
      )}
    </Box>
  );
}

export default CombineRules;
