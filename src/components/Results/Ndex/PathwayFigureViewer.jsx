import React, { useRef, useEffect } from 'react';
import { useState } from 'react';
import { MapInteractionCSS } from 'react-map-interaction';
import { makeStyles } from '@material-ui/styles';
import { Typography, Container, Divider } from '@material-ui/core';
import _ from 'lodash';


import LoadingPanel from '../../LoadingPanel';
import Linkify from 'linkify-react';
import parse from 'html-react-parser';

const useStyles = makeStyles((theme) => ({
  container: {
    height: '100%',
    width: '100%',
    display: 'flex'
  },
  imageContainer: {
    height: '100%',
    width: 'calc(100% - 400px)',
  },
  descriptionContainer: {
    width: '400px',
    height: '100%',
    border: '1px solid gray',
    overflow: 'scroll',
    paddingTop: '20px',
    paddingBottom: '20px'
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

  const getNetworkInfo = () => {
    const cx = props.network.originalCX
    const description = cx?.find(attr => attr.networkAttributes != null)?.networkAttributes?.find(attr => attr.n === 'description').v || ''
    const reference = cx?.find(attr => attr.networkAttributes != null)?.networkAttributes?.find(attr => attr.n === 'reference').v || ''

    return { description, reference }
  }

  const { reference, description } = getNetworkInfo()
  console.log(reference, description)

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

    const xValue = (containerWidth - width * heightScale) / 2;
    const yValue = (containerHeight - height * widthScale) / 2;
    props.uiStateActions.setPathwayFigureZoom({ scale: heightScale, translation: { x: xValue, y: yValue } });
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
  if (figureSource === 'loading') {
    return <LoadingPanel title={'Loading Figure...'} />;
  }

  if (figureSource !== null) {
    return (
      <div className={classes.container}>
        <div className={classes.imageContainer} ref={imageContainerRef}>
          <MapInteractionCSS
            value={props.uiState.pathwayFigureZoom}
            onChange={(value) => props.uiStateActions.setPathwayFigureZoom(value)}
          >
            <img src={figureSource} ref={imageRef} onLoad={handleLoad} />
          </MapInteractionCSS>
        </div>
        <Container className={classes.descriptionContainer}>
            <Typography style={{marginTop: '30px'}} variant="body1" color="textSecondary">Reference</Typography>
            <Linkify>
              {parse(reference)}
            </Linkify>
            <Divider style={{marginTop: '20px', marginBottom: '20px'}}/>
          <Typography variant="body1" color="textSecondary">Description</Typography>
           <Typography variant="body2">
              <Linkify>
                {parse(description, { replace: domNode => domNode.name === 'img' ? <></> : null})}
              </Linkify>
            </Typography>
        </Container>
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
