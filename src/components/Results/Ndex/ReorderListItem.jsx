import React, {Component, useState} from 'react';
import PropTypes from 'prop-types';
import {findDOMNode} from 'react-dom';
import {DragSource, DropTarget} from 'react-dnd';
import ListItem from '@material-ui/core/ListItem'
import DragIcon from '@material-ui/icons/DragIndicator'
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import { makeStyles, withStyles } from '@material-ui/styles'
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography'
import { classes } from 'istanbul-lib-coverage';



const useStyles = makeStyles(theme => ({
  noPadding: {
    padding: '0',
    width: '100%'
  },
  small: {
    minWidth: '0'
  },
  center: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center'
  },
  centerInner: {
    display: 'inlineBlock'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  dense: {
    marginTop: theme.spacing(2),
  },
  inlineBlock: {
    display: 'inlineBlock'
  }
}))

const CssTextField = withStyles({
  root: {
    width: '100px',
    '& label.Mui-focused': {
      color: '#f50057',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#f50057',
    },
    '& .MuiOutlinedInput-root': {
      '&.Mui-focused fieldset': {
        borderColor: '#f50057',
      },
    },
  },
})(TextField);

const ExpansionPanel = withStyles({
  root: {
    width: '100%',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      height: 'auto'
    },
  },
  expanded: {},
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
  root: {
    paddingLeft: '16px',
    paddingRight: '16px',
    paddingTop: '0',
    paddingBottom: '0',
    backgroundColor: 'rgba(0, 0, 0, 0)',
    marginBottom: -1,
    height: '54px',
    minHeight: '54px',
    '&$expanded': {
      height: '54px',
      minHeight: '54px'
    },
  },
  content: {
    margin: '0',
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(MuiExpansionPanelSummary);

const ExpansionPanelDetails = withStyles({
  root: {
    paddingTop: '0',
    paddingBottom: '0',
    paddingRight: '0',
    paddingLeft: '61px'
  }
})(MuiExpansionPanelDetails);

const style = {
  cursor: 'move',
};

const listStyle = {
  borderWidth: '4px',
  borderColor: '#000000',
  width: '100%',
  height: '54px'
}

const iconStyle = {
  minWidth: '0',
  minHeight: '0',
  verticalAlign: 'middle'
}

const textFieldStyle = {
  position: 'relative',
  left: '1em',
  bottom: '12px'
}

const thenByStyle ={
  position: 'relative',
  left: '20px'
}

const cardSource = {
  beginDrag(props) {
    return {
      id: props.id,
      index: props.index,
    };
  },
};

const cardTarget = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return;
    }

    // Determine rectangle on screen
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect()

    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

    // Determine mouse position
    const clientOffset = monitor.getClientOffset();

    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%

    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }

    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }

    // Time to actually perform the action
    props.moveListItem(dragIndex, hoverIndex);

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().index = hoverIndex;
  },
};

const withDropTarget = DropTarget('listItem', cardTarget, connect => ({
  connectDropTarget: connect.dropTarget(),
}));

const withDropSource = DragSource('listItem', cardSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
}));

class ReorderListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pValueFieldValue: '0.05',
      overlapFieldValue: '1'}
  }

  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    handleOnClick: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
    isDragging: PropTypes.bool.isRequired,
    id: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.number.isRequired]),
    text: PropTypes.string.isRequired,
    moveListItem: PropTypes.func.isRequired,
  };

  render() {
    const {
      text,
      isDragging,
      connectDragSource,
      connectDropTarget,
      uiStateActions,
      uiState
    } = this.props;

    const {textFieldValue} = this.state
  
    const opacity = isDragging ? 0 : 1;
    
    let overlapThenBy
    let pValueThenBy
    if (uiState.sortOverlapOn && uiState.sortPValueOn) {
      if (uiState.sortOrder[0] == 'Overlap') {
        overlapThenBy = true
        pValueThenBy = false
      } else {
        pValueThenBy = true
        overlapThenBy = false
      }
    }
 
    const overlapSwitchHandler = () =>  event => {
      uiStateActions.setOverlapOn(event.target.checked)
      if (!event.target.checked) {
        uiStateActions.setOverlapThresholdOn(false)
      }
    }

    const overlapThresholdSwitchHandler = () => event => {
      uiStateActions.setOverlapThresholdOn(event.target.checked)
    }

    const overlapThresholdFieldHandler = () => event => {
      this.setState({overlapFieldValue: event.target.value})
      uiStateActions.setOverlapThresholdValue(event.target.value)
    }

    const pValueSwitchHandler = () => event => {
      uiStateActions.setPValueOn(event.target.checked)
      if (!event.target.checked) {
        uiStateActions.setPValueThresholdOn(false)
      }
    }

    const pValueThresholdSwitchHandler = () => event => {
      uiStateActions.setPValueThresholdOn(event.target.checked)
    }

    const pValueThresholdFieldHandler = () => event => {
      this.setState({pValueFieldValue: event.target.value})
      uiStateActions.setPValueThresholdValue(event.target.value)
    }

    if (text === 'p-Value') {
      if (uiState.selectedSource === 'enrichment') {
        if (uiState.sortPValueOn) {
          return connectDragSource(
            connectDropTarget(
              <div style={{...style, opacity}}>
                  <ExpansionPanel
                    expanded={uiState.sortPValueOn}
                  >
                    <ExpansionPanelSummary>
                      <div className={classes.inlineBlock}>
                        <ListItemIcon style={iconStyle}>
                          <DragIcon />
                        </ListItemIcon>
                        <Switch 
                          onChange={pValueSwitchHandler()}
                          checked={uiState.sortPValueOn}
                        />
                        <Typography variant="body2" display="inline">
                          p-Value
                        </Typography>
                        {pValueThenBy ? 
                          <Typography color="textSecondary" variant="subtitle2" display="inline" style={thenByStyle}>
                            {'then by'}
                          </Typography>
                        :
                          null
                        }
                      </div>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                      <div className={classes.inlineBlock}>
                        <Switch 
                          onChange={pValueThresholdSwitchHandler()}
                          checked={uiState.sortPValueThresholdOn}
                        />
                        <Typography variant="body2" display="inline">
                          Threshold
                        </Typography>
                        {uiState.sortPValueThresholdOn ? 
                          <CssTextField
                            id="outlined-dense"
                            label="p-Value"
                            margin="dense"
                            variant="outlined"
                            color="textSecondary"
                            value={this.state.pValueFieldValue}
                            onChange={pValueThresholdFieldHandler()}
                            style={textFieldStyle}
                          />
                        :
                          null}
                      </div>
                    </ExpansionPanelDetails>
                  </ExpansionPanel>
              </div>
            )
          )
        } else {
          return connectDragSource(
            connectDropTarget(
              <div style={{...style, opacity}}>
                <ListItem style={listStyle}>
                  <div className={classes.inlineBlock}>
                  <ListItemIcon style={iconStyle}>
                    <DragIcon />
                  </ListItemIcon>
                  <Switch 
                    onChange={pValueSwitchHandler()}
                    checked={uiState.sortPValueOn}
                  />
                  <Typography variant="body2" display="inline">
                    p-Value
                  </Typography>
                  </div>
                </ListItem>
              </div>
            )
          )
        }
      } else {
        return null
      }
    } else {
      if (uiState.sortOverlapOn) {
        return connectDragSource(
          connectDropTarget(
            <div style={{...style, opacity}}>
              <ExpansionPanel
                expanded={uiState.sortOverlapOn}
              >
                <ExpansionPanelSummary>
                  <div className={classes.inlineBlock}>
                    {uiState.selectedSource === 'enrichment' ?
                      <ListItemIcon style={iconStyle}>
                        <DragIcon />
                      </ListItemIcon>
                    :
                      null
                    }
                    <Switch
                      onChange={overlapSwitchHandler()}
                      checked={uiState.sortOverlapOn}
                    />
                    <Typography variant="body2" display='inline'>
                      Overlap
                    </Typography>
                    {overlapThenBy ?
                      <Typography color='textSecondary' variant='subtitle2' display='inline' style={thenByStyle}>
                        then by
                      </Typography>
                    :
                      null
                    }
                  </div>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <div className={classes.inlineBlock}>
                    <Switch
                      onChange={overlapThresholdSwitchHandler()}
                      checked={uiState.sortOverlapThresholdOn}
                    />
                    <Typography variant='body2' display='inline'>
                      Threshold
                    </Typography>
                    {uiState.sortOverlapThresholdOn ?
                      <CssTextField
                        id='outlined-dense'
                        label='Overlap'
                        margin='dense'
                        variant='outlined'
                        value={this.state.overlapFieldValue}
                        onChange={overlapThresholdFieldHandler()}
                        style={textFieldStyle}
                      />
                    :
                      null
                    }
                  </div>
                </ExpansionPanelDetails>
              </ExpansionPanel>
            </div>
          )
        )
      } else {
        return connectDragSource(
          connectDropTarget(
            <div style={{...style, opacity}}>
              <ListItem style={listStyle}>
                <div className={classes.inlineBlock}>
                  {uiState.selectedSource === 'enrichment' ?
                    <ListItemIcon style={iconStyle}>
                      <DragIcon />
                    </ListItemIcon>
                  :
                    null
                  }
                  <Switch 
                    onChange={overlapSwitchHandler()}
                  />
                  <Typography variant="body2" display="inline">
                    Overlap
                  </Typography>
                  {overlapThenBy ? 
                    <Typography color="textSecondary" display="inline" variant='subtitle2' style={thenByStyle}>
                      {'then by'}
                    </Typography>
                  :
                    null
                  }
                </div>
              </ListItem>
            </div>
          )
        )
      }
    }
  }
}

export default withDropTarget(withDropSource(ReorderListItem));