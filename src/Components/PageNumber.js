import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@mui/material/Pagination';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(2),
      justifyContent: "center",
      display: 'flex',
    },
    "& .MuiPaginationItem-root": {
      color: "#f2f8f9"
    }
  },
}));

const PageNumber = ({ pageno, setpage, totalPages }) => {
  const classes = useStyles();
  const handleChange = (page) => {
    setpage(page);
    window.scroll(0, 0);
  }

  return (
    <div className={classes.root}>
      <Pagination count={totalPages || 10} color="primary" page={Number(pageno)} hideNextButton hidePrevButton
        onChange={(e) => handleChange(e.target.textContent)} />
    </div>
  );
}

export default PageNumber;