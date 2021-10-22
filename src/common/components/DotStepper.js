import * as React from "react";
import cn from "classnames";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    background: "none"
  },
  stepMenuTitle: { fontWeight: "bold", fontSize: "small", color: "white" },
  stepTitle: { fontWeight: "bold", fontSize: "xxx-large", color: "white" },
  stepMarginBottom: { marginBottom: "10px" },
  dots: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 15
  },
  dot: {
    cursor: "pointer",
    backgroundColor: theme.palette.action.disabled,
    borderRadius: "50%",
    width: 20,
    height: 20,
    margin: "0 4px",
    transform: "scale(1)",
    transition: "transform 0.2s ease-out",
    "&:hover": { transform: "scale(1.5)" }
  },
  dotActiveSliderColor: {
    backgroundColor: theme.palette.info.light
  },
  dotActiveMenuColor: {
    backgroundColor: "green"
  },
  dotActiveBorder: {
    borderStyle: "groove",
    borderBottomColor: "white",
    borderLeftColor: "white",
    borderRightColor: "white",
    borderTopColor: "white"
  },
  dotMargin: {
    marginRight: 9,
    marginLeft: 5
  },
  dotMarginMenu: {
    marginLeft: 30
  },
  paddingTopNone: {
    paddingTop: 0
  },
  displayTitle: {
    display: "flex"
  },
  paddingSection: {
    paddingLeft: 25
  }
});

const DotStepper = props => {
  const {
    activeStep,
    classes,
    className,
    steps,
    handleStep,
    isMenu,
    isSection,
    updatePath
  } = props;

  return (
    <Paper
      square
      elevation={0}
      className={cn(
        classes.root,
        className,
        isMenu
          ? classes.paddingTopNone
          : isSection
          ? classes.paddingSection
          : ""
      )}
    >
      {isMenu || isSection ? (
        <div className={classes.displayTitle}>
          {steps.map((item, idx) => {
            return (
              <div
                key={idx}
                className="item clickable"
                style={{
                  fontWeight: idx === activeStep ? "bold" : "",
                  color: isSection ? "black" : "white"
                }}
              >
                {item.title}
              </div>
            );
          })}
        </div>
      ) : (
        <>
          <Typography
            variant="subtitle2"
            className={cn(classes.stepMarginBottom, classes.stepTitle)}
          >
            {`${steps[activeStep].title}`}
          </Typography>
          <Typography
            variant="subtitle2"
            className={cn(classes.stepMarginBottom, classes.stepMenuTitle)}
          >
            {`${steps[activeStep].subtitle}`}
          </Typography>
        </>
      )}

      <div className={classes.dots}>
        {steps.map((item, index) => (
          <div
            onClick={(e) => {
              handleStep(index);
              isMenu ? updatePath(index) : e.preventDefault();
            }}
            key={index}
            className={classes.dotMargin}
          >
            <div
              className={cn(
                classes.dot,
                classes.dotActiveBorder,
                isMenu
                  ? [
                      {
                        [classes.dotActiveMenuColor]: index === activeStep
                      },
                      classes.dotMarginMenu
                    ]
                  : { [classes.dotActiveSliderColor]: index === activeStep }
              )}
            />
          </div>
        ))}
      </div>
    </Paper>
  );
};

DotStepper.propTypes = {
  activeStep: PropTypes.number,
  classes: PropTypes.object,
  handleStep: PropTypes.func
};

export default withStyles(styles)(DotStepper);
