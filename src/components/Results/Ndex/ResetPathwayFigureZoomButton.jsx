import React from 'react';
import './style.css';

import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core';

import logo from '../../../assets/images/zoom-logo.svg';
import disabledLogo from '../../../assets/images/zoom-logo-mono.svg';

const styles = (theme) => ({
  buttonIcon: {
    height: '1.75em',
  },
});

const BootstrapButton = withStyles({
  root: {
    height: '3em',
    width: '4.3em',
    minWidth: '4.3em',
    marginLeft: '0.5em',
    borderColor: '#212121',
    color: '#212121',
    '&:active': {
      borderColor: '#212121',
      color: '#212121',
    },
  },
})(Button);

const ResetPathwayFigureZoomButton = (props) => {
  const { classes } = props;

  const disabled = !(props.network.uuid && props.network.uuid.length > 0);

  const handleClick = () => {
    props.uiStateActions.setFitPathwayFigure(true);
  };

  return (
    <Tooltip title='Fit figure to panel' placement='bottom'>
      <div>
        <BootstrapButton
          variant='outlined'
          disabled={disabled}
          onClick={handleClick}
        >
          <img
            alt='Zoom logo'
            src={disabled ? disabledLogo : logo}
            className={classes.buttonIcon}
          />
        </BootstrapButton>
      </div>
    </Tooltip>
  );
};

export default withStyles(styles)(ResetPathwayFigureZoomButton);
