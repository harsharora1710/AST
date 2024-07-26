import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';

function EvaluateRules({ combinedAST, inputData, setEvaluationResult, setError }) {
  const [astString, setAstString] = useState('');

  const handleEvaluate = async () => {
    try {
      const astResponse = await fetch('/api/rules', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ruleString: astString }),
      });

      const astData = await astResponse.json();

      if (astResponse.ok) {
        const evalResponse = await fetch('/api/rules/evaluate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ast: astData.ast, data: inputData }),
        });

        const evalData = await evalResponse.json();

        if (evalResponse.ok) {
          setEvaluationResult(evalData.result);
        } else {
          throw new Error(evalData.message || 'Failed to evaluate rule');
        }
      } else {
        throw new Error(astData.message || 'Failed to create AST');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <Typography variant="h5" gutterBottom>Evaluate Rule</Typography>
      <Box display="flex" alignItems="center" mb={2}>
        <TextField
          label="AST String"
          value={astString}
          onChange={(e) => setAstString(e.target.value)}
          placeholder="Enter rule to generate AST"
          fullWidth
        />
        <Button onClick={handleEvaluate} variant="contained" color="primary" style={{ marginLeft: '10px' }}>
          Evaluate
        </Button>
      </Box>
    </div>
  );
}

export default EvaluateRules;
