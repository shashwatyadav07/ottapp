import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MovieIcon from '@mui/icons-material/Movie';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    width: "100%",
    position: "fixed",
    bottom: 0,
    backgroundColor: "grey",
    zIndex: 10,
  },
});

export default function SimpleBottomNavigation() {
  const navigate = useNavigate();
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleNavigation = (id) => {
    if (id === 0)
      navigate("/home");
    if (id === 1)
      navigate("/trending");
    if (id === 2)
      navigate("/movies");
    if (id === 3)
      navigate("/tvseries");
    if (id === 4)
      navigate("/search");
  }

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classes.root}
      style={{ backgroundColor: "rgba(129, 124, 124, 0.6)" }}
    //   sx={{ 
    //     "& .MuiBottomNavigationAction-root,.Mui-selected, svg": {
    //       color: "#4285F4",
    //       fontWeight:700,
    //     }
    //  }}
    >

      <BottomNavigationAction label="Home" icon={<HomeIcon />} onClick={() => handleNavigation(0)} />
      <BottomNavigationAction label="Trending" icon={<WhatshotIcon />} onClick={() => handleNavigation(1)} />
      <BottomNavigationAction label="Movies" icon={<MovieIcon />} onClick={() => handleNavigation(2)} />
      <BottomNavigationAction label="TV Series" icon={<FavoriteIcon />} onClick={() => handleNavigation(3)} />
      <BottomNavigationAction label="Search" icon={<RestoreIcon />} onClick={() => handleNavigation(4)} />

    </BottomNavigation >
  );
}