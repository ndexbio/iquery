import React, { useRef, useEffect } from 'react';
import { useState } from 'react';
import { MapInteractionCSS } from 'react-map-interaction';
import { findAttributes } from '../TableBrowser/attribute-util';
import { makeStyles } from '@material-ui/styles';
import { Typography } from '@material-ui/core';

/*
Todo:
map button to fit
*/

const useStyles = makeStyles((theme) => ({
  imageContainer: {
    height: '100%',
    width: '100%',
  },
  messageContainer: {
    display: 'flex',
    justifyContent: 'center',
    height: '100%',
  },
  message: {
    top: '40%',
    position: 'relative',
  },
}));

const PathwayFigureViewer = (props) => {
  const classes = useStyles();

  //Set up figure zoom requirements
  const [zoomValue, setZoomValue] = useState({
    scale: 1,
    translation: { x: 0, y: 0 },
  });
  const [imageHeight, setImageHeight] = useState(0);
  const [imageWidth, setImageWidth] = useState(0);

  const imageContainerRef = useRef(null);
  const imageRef = useRef(null);

  const centerFigure = (height, width) => {
    //Resize and center image
    const containerHeight = imageContainerRef.current.offsetHeight;
    const containerWidth = imageContainerRef.current.offsetWidth;

    let heightScale = 1;
    let widthScale = 1;
    //Find scale
    if (height > containerHeight) {
      heightScale = containerHeight / height;
    }
    if (width > containerWidth) {
      widthScale = containerWidth / width;
    }
    if (heightScale < widthScale) {
      //Find translation
      const xValue = (containerWidth - width * heightScale) / 2;
      setZoomValue({ scale: heightScale, translation: { x: xValue, y: 0 } });
    } else {
      //Find translation
      const yValue = (containerHeight - height * widthScale) / 2;
      setZoomValue({ scale: heightScale, translation: { x: 0, y: yValue } });
    }
  };
  const handleLoad = () => {
    const height = imageRef.current.naturalHeight;
    const width = imageRef.current.naturalWidth;
    setImageHeight(height);
    setImageWidth(width);
    centerFigure(height, width);
  };

  //Allow zoom to be controlled by external button
  useEffect(() => {
    if (props.uiState.fitPathwayFigure) {
      centerFigure(imageHeight, imageWidth);
      props.uiStateActions.setFitPathwayFigure(false);
    }
  }, [props.uiState.fitPathwayFigure]);

  //Get pathway figure
  const figureSource = props.uiState.pathwayFigureSource;
  if (figureSource !== null) {
    return (
      <div className={classes.imageContainer} ref={imageContainerRef}>
        <MapInteractionCSS
          value={zoomValue}
          onChange={(value) => setZoomValue(value)}
        >
          <img src={figureSource} ref={imageRef} onLoad={handleLoad} />
        </MapInteractionCSS>
      </div>
    );
  }

  return (
    <div className={classes.messageContainer}>
      <Typography
        variant={'subtitle1'}
        color={'textSecondary'}
        className={classes.message}
      >
        Pathway figure unavailable
      </Typography>
    </div>
  );
};

export default PathwayFigureViewer;
