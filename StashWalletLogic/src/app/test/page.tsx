'use client';
import { Button, Typography } from '@mui/material';

import { forAllCombinations } from '@/lib/utils';

function TestPage() {
  const combinationsTest = ['a', 'b', 'c', 'd'];
  const allCombinations = forAllCombinations(combinationsTest, 0);

  return (
    <>
      <Typography variant='h1'>Test Page</Typography>
      <Button
        onClick={() => {
          console.log('🚀 ~ allCombinations:', allCombinations);
        }}
      >
        TETTS
      </Button>
    </>
  );
}

export default TestPage;
