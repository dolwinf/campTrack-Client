import React, { useContext } from "react";
import { withStyles } from "@material-ui/core/styles";
import Context from "../context";
import { Paper } from "@material-ui/core";
import { Marker } from "react-map-gl";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import Typography from "@material-ui/core/Typography";

import PinDropIcon from "@material-ui/icons/PinDrop";

const Updates = ({ classes }) => {
  const { state, dispatch } = useContext(Context);
  const { pins, currentPin } = state;

  const handleClick = pin => {
    dispatch({ type: "SET_VIEWPORT", payload: pin });
    dispatch({ type: "SET_USERPOSITION", payload: pin });
    dispatch({ type: "SHOW_PIN_INFO", payload: pin });
    console.log(pin);
    console.log("Clicked pin", pin._id);
  };
  return (
    <Paper className={classes.root}>
      <List style={{ maxWidth: "100%" }}>
        <Typography align="center" gutterBottom>
          <ListItem>
            <ListItemText>
              <div
                style={{
                  fontWeight: "bold",
                  color: "darkblue",
                  fontFamily: "'Nunito', sans-serif",
                  fontSize: "20px"
                }}
              >
                Latest camp sites:
              </div>
            </ListItemText>
          </ListItem>
        </Typography>
        <br></br>
        {pins
          ? pins.map((pin, i) => (
              <Typography>
                <ListItem key={i} alignItems="center" divider="true">
                  <PinDropIcon />

                  <div
                    onClick={e => handleClick(pin)}
                    style={{
                      color: "darkblue",
                      fontFamily: "'Nunito', sans-serif"
                    }}
                  >
                    {pin.title}
                  </div>
                </ListItem>
              </Typography>
            ))
          : null}
      </List>
    </Paper>
  );
};

const styles = {
  root: {
    minWidth: 250,
    maxWidth: 250,
    maxHeight: "calc(100vh - 64px)",
    overflowY: "scroll",
    display: "flex",
    justifyContent: "center"
  },
  rootMobile: {
    maxWidth: "100%",
    maxHeight: 300,
    overflowX: "hidden",
    overflowY: "scroll"
  }
};

export default withStyles(styles)(Updates);
