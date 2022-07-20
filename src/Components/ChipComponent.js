import React from 'react';
import Chip from '@mui/material/Chip';


const ChipComponent = ({ name }) => {
  const handleClick = () => {
    console.info('You clicked the Chip.');
  };

  return (
    <>
      <Chip label={name} variant="outlined" onClick={handleClick} style={{ margin: ".2em" }} size="small" />
    </>
  );
}

export default ChipComponent;