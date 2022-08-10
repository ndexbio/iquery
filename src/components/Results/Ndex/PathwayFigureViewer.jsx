import React, { useRef, useEffect } from 'react';
import { useState } from 'react';
import { MapInteractionCSS } from 'react-map-interaction';
import { makeStyles } from '@material-ui/styles';
import { Typography, Container, Divider } from '@material-ui/core';
import _ from 'lodash';
import Split from 'react-split'


import LoadingPanel from '../../LoadingPanel';
import Linkify from 'linkify-react';
import parse from 'html-react-parser';

const useStyles = makeStyles((theme) => ({
  container: {
    height: '100%',
    width: '100%',
    display: 'flex',
    borderTop: '1px solid #D6D6D6',
    borderBottom: '1px solid #D6D6D6',
  },
  imageContainer: {
    height: '100%',
    width: '100%'
  },
  descriptionContainer: {
    width: '400px',
    height: '100%',
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
    const description = cx?.find(attr => attr.networkAttributes != null)?.networkAttributes?.find(attr => attr.n === 'description')?.v || ''
    const reference = cx?.find(attr => attr.networkAttributes != null)?.networkAttributes?.find(attr => attr.n === 'reference')?.v || ''

    return { description, reference }
  }

  const { reference, description } = getNetworkInfo()
  const [imageHeight, setImageHeight] = useState(0);
  const [imageWidth, setImageWidth] = useState(0);

  const imageContainerRef = useRef(null);
  const imageRef = useRef(null);

  const centerFigure = () => {
    //Resize and center image
    const containerHeight = imageContainerRef.current.offsetHeight;
    const containerWidth = imageContainerRef.current.offsetWidth;
    
    const imageHeight = imageRef.current.naturalHeight;
    const imageWidth = imageRef.current.naturalWidth;

    const imageAspectRatio = imageHeight / imageWidth;
    const containerAspectRatio = containerHeight / containerWidth;

    // basic idea:
    // compare aspect ratios into two cases:
    // 1. scale by width and then translate by Y
    // 2. scale by height and then translate by X
    // translations are computed by halving the dimension difference between the scaled image
    // and the container dimension


    if(containerAspectRatio > imageAspectRatio) {
      const scale = containerWidth / imageWidth
      const translationY = (containerHeight - (imageHeight * scale)) / 2
      props.uiStateActions.setPathwayFigureZoom({ 
        scale: (containerWidth / imageWidth), 
        translation: { 
          x: 0,
          y: translationY
        } 
      });
  
    } else {
      const scale = containerHeight / imageHeight
      const translationX = (containerWidth - (imageWidth * scale)) / 2
      props.uiStateActions.setPathwayFigureZoom({ 
        scale: containerHeight / imageHeight, 
        translation: { 
          x: translationX,
          y: 0
        } 
      });
    }

  };

  const handleLoad = () => {
    const height = imageRef.current.naturalHeight;
    const width = imageRef.current.naturalWidth;
    setImageHeight(height);
    setImageWidth(width);
    centerFigure();
  };

  //Allow zoom to be controlled by external button
  useEffect(() => {
    if (props.uiState.fitPathwayFigure) {
      centerFigure();
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

      <Split sizes={[70, 30]} gutterSize={4} className={classes.container}>
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
      </Split>
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
