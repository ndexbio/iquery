import React from 'react';
import Tab from '@material-ui/core/Tab';
import { withStyles } from '@material-ui/core/styles';
import { Tooltip } from '@material-ui/core';

const HoverTab = (props) => {
  const Hover = withStyles((theme) => ({
    root: {
      '&:hover': {
        backgroundColor: props.backgroundcolor,
        opacity: 1,
      },
    },
  }))((props) =>
    props.tooltip ? (
      <Tooltip title={props.tooltip}>
        <Tab {...props} />
      </Tooltip>
    ) : (
      <Tab {...props} />
    )
  );
  return <Hover {...props} />;
};

export default HoverTab;
