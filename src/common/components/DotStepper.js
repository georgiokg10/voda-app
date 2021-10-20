import * as React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
        background: 'none',
        color: 'white'
    },
    stepTitle: { fontWeight: 'bold', fontSize: 'x-large' },
    stepMarginBottom: { marginBottom: '10px' },
    dots: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 25,
    },
    dot: {
        cursor: 'pointer',
        backgroundColor: theme.palette.action.disabled,
        borderRadius: '50%',
        width: 10,
        height: 10,
        margin: '0 4px',
        transform: 'scale(1)',
        transition: 'transform 0.2s ease-out',
        '&:hover': { transform: 'scale(1.5)' },
    },
    dotActive: {
        backgroundColor: theme.palette.info.light,
        borderStyle: 'groove',
        borderBottomColor: 'white',
        borderLeftColor: 'white',
        borderRightColor: 'white',
        borderTopColor: 'white',
    },
    dotMargin: {
        marginRight: 7
    }
});

const DotStepper = (props) => {

    const {
        activeStep,
        classes,
        className,
        steps,
        handleStep,
        ...other
    } = props;

    return (
        <Paper
            square
            elevation={0}
            className={cn(classes.root, className)}
            {...other}
        >
            <Typography variant="subtitle2" className={cn(classes.stepTitle, classes.stepMarginBottom)}>
                {`${steps[activeStep].title}`}
            </Typography>
            <Typography variant="subtitle2" className={classes.stepMarginBottom}>
                {`${steps[activeStep].subtitle}`}
            </Typography>

            <div className={classes.dots}>
                {steps.map((item, index) => (
                    <div
                        onClick={() => handleStep(index)}
                        key={index}
                        className={classes.dotMargin}
                    >
                        <div
                            className={cn(classes.dot, {
                                [classes.dotActive]: index === activeStep,
                            })}
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
    handleStep: PropTypes.func,
};

export default withStyles(styles)(DotStepper);