import React from 'react';
import Split from 'react-split';

import { makeStyles } from '@material-ui/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';

import { camelCaseToTitleCase } from './camel-case-util';
import { stripScripts } from './strip-scripts-util';
import { findAttributes } from './attribute-util';

import Linkify from 'linkify-react';
import parse from 'html-react-parser';
import ExpandPanel from './ExpandPanel';

let index = 0;

const useStyles = makeStyles((theme) => ({
  container: {
    padding: '0.2em',
    backgroundColor: '#FFFFFF',
    overflow: 'auto',
    height: '100%',
    boxSizing: 'content-box',
  },
  padding: {
    paddingLeft: '1em',
    paddingTop: '0.75em',
  },
  lessPadding: {
    paddingTop: '2.49px',
  },
  noPadding: {
    paddingTop: '0',
    paddingBottom: '0',
  },
}));

const NetworkProperties = (props) => {
  index = 0;
  const originalCX = props.network.originalCX;
  const context = props.context;
  const classes = useStyles();

  //Find network props
  const networkAttr = findAttributes(originalCX, 'networkAttributes');
  if (networkAttr === null) {
    return;
  }

  const reference = originalCX?.find(attr => attr.networkAttributes != null)?.networkAttributes?.find(attr => attr.n === 'reference')?.v || null
  //What to display
  const leftDisplayItems = [
    'Name',
    'Description',
    // 'Methods',
    // 'Reference',
    '@context',
  ];
  const properties = ['Organism', 'Cell', 'Disease'];
  const contributors = ['Author', 'Reviewers', 'Rights Holder', 'Rights'];
  const wikiPathways = [
    'WikiPathways ID',
    'WikiPathways Version',
    'WikiPathways IRI',
  ];
  const indraGO = ['GO Hierarchy', 'GO ID'];
  const networkInformation = ['Version', 'Network Type', 'Labels'];
  const rightDisplayItems = [
    properties,
    // contributors,
    // wikiPathways,
    // indraGO,
    networkInformation,
  ];

  //Filter properties
  const attributes = [];
  let content;
  let title;

  networkAttr.forEach((element) => {
    content = extractContent(element);
    title = extractTitle(element);
    if (!title.startsWith('__') && content != null && content !== '') {
      if (
        title === 'Description' &&
        (props.uiState.selectedSource === 'interactome-ppi' ||
          props.uiState.selectedSource === 'interactome-association')
      ) {
        const newTitle = 'Description of parent network';
        leftDisplayItems.splice(1, 0, newTitle);
        attributes.push({
          title: newTitle,
          content: content,
          displayed: false,
        });
      } else if (title === 'Organism') {
        const latinName = 'Homo sapiens';
        const latinIndex = content
          .toLowerCase()
          .indexOf(latinName.toLowerCase());
        if (latinIndex !== -1) {
          content =
            content.substring(0, latinIndex) +
            '<em>' +
            latinName +
            '</em>' +
            content.substring(latinIndex + latinName.length);
        }
        attributes.push({
          title: 'Organism',
          content: content,
          displayed: false,
        });
      } else if (title === 'GO hierarchy') {
        attributes.push({
          title: 'GO Hierarchy',
          content: content,
          displayed: false,
        });
      } else if (title === 'GO ID') {
        const id = content.split(':')[1];
        if (id != null) {
          attributes.push({
            title: 'GO ID',
            content:
              '<a href="http://identifiers.org/GO:' +
              id +
              '">' +
              content +
              '</a>',
            displayed: false,
          });
        } else {
          attributes.push({
            title: 'GO ID',
            content: content,
            displayed: false,
          });
        }
      } else if (title !== '@context') {
        attributes.push({
          title: camelCaseToTitleCase(title),
          content: content,
          displayed: false,
        });
      }
    } else if (title === 'Name') {
      attributes.push({
        title: title,
        content: 'Untitled',
        displayed: false,
      });
    }
  });

  //Right side of display
  const rightDisplay = [];
  if(reference != null){
    rightDisplay.push(<ListItem key={`net-${index++}`} className={classes.noPadding}>
      <ListItemText
        primary={
          <React.Fragment>
            <Typography variant='caption' color='textSecondary'>
              Reference
            </Typography>
            <div>
              <Typography variant='body2'>
                {parse(reference)}
              </Typography>
            </div>
          </React.Fragment>
        }
      />
    </ListItem>)
  }
  rightDisplayItems.forEach((list) => {
    // console.log(list);
    let primaryString = '';
    let currentEntry;
    list.forEach((element) => {
      currentEntry = attributes.filter((entry) => {
        return entry.title === element;
      })[0];
      if (currentEntry != null) {
        primaryString +=
          currentEntry.title + ': ' + currentEntry.content + '<br>';
        currentEntry.displayed = true;
      }
    });
    let secondaryString;
    switch (list) {
      case properties:
        secondaryString = 'Properties';
        break;
      case contributors:
        secondaryString = 'Contributors';
        break;
      case wikiPathways:
        secondaryString = 'WikiPathways';
        break;
      case indraGO:
        secondaryString = 'Gene Ontology';
        break;
      case networkInformation:
        secondaryString = 'Network Information';
        break;
    }


    primaryString = formatPrimary(primaryString);
    if (primaryString !== '') {
      rightDisplay.push(
        <ListItem key={`net-${index++}`} className={classes.noPadding}>
          <ListItemText
            primary={
              <React.Fragment>
                <Typography variant='caption' color='textSecondary'>
                  {secondaryString}
                </Typography>
                <div>
                  <Typography variant='body2'>{primaryString}</Typography>
                </div>
              </React.Fragment>
            }
          />
        </ListItem>
      );
    }
  });

  //Left side of display
  const leftDisplay = [];

  const uuid = props.network?.uuid;
  const searchResults = props.search?.actualResults;
  let similarity = null;
  let pvalue = null;

  if(searchResults && uuid){
    const currentNetworkInfo = searchResults.find(entry => entry.networkUUID === uuid);
    similarity = currentNetworkInfo?.details?.similarity;
    similarity = similarity?.toFixed(2);
    pvalue = currentNetworkInfo?.details?.PValue;

    if(pvalue){
      const networkCount = currentNetworkInfo.totalNetworkCount
      const threshold = Math.pow(10, Math.ceil(Math.log(1e-16 * networkCount) / Math.LN10))
      if (pvalue < threshold) {
        pvalue = '< ' + threshold
      } else if (pvalue > 1) {
        pvalue = '~ 1'
      } else {
        pvalue = pvalue.toExponential(2)
      } 
    }
  }
  
  //Get the network name attribute and display it as a title
  const nameAttribute = attributes.find(entry => entry.title === 'Name');
  leftDisplay.push(nameAttribute == null ? null : 
    <ListItem style={{display: 'flex', flexDirection: 'column'}} key={'net-' + index++}>
      <ListItemText
        primary={
          <React.Fragment>
              <Typography component='span' variant='h5'>
                {formatPrimary(nameAttribute.content)}
              </Typography>
          </React.Fragment>
        }
      />
      {/* <ListItemText
        primary={
          <React.Fragment>
              <Typography component='span' variant='body2'>
                {`p-value: ${pvalue}`}
              </Typography>
          </React.Fragment>
        }
      />
      <ListItemText
        primary={
          <React.Fragment>
              <Typography component='span' variant='body2'>
                {`Similarity: ${similarity}`}
              </Typography>
          </React.Fragment>
        }
      /> */}
    </ListItem>
  );

  leftDisplay.push(<Divider/>);

  //Get the network description attribute and display it in the body
  const descriptionAttribute = attributes.find(entry => entry.title === 'Description');
  leftDisplay.push(descriptionAttribute == null ? null : 
    <ListItem key={'net-' + index++}>
      <ListItemText
        primary={
          <React.Fragment>
              <Typography component='span' variant='body2'>
                {formatPrimary(descriptionAttribute.content)}
              </Typography>
          </React.Fragment>
        }
      />
    </ListItem>
  );

  //Display panes
  return (
    <Split sizes={[70, 30]} gutterSize={7} className='network-info'>
      <div className={'network-info-panel'}>
        <List className={classes.lessPadding}>{leftDisplay}</List>
      </div>
      <div className={'network-info-panel'}>
        <List className={classes.lessPadding}>{rightDisplay}</List>
      </div>
    </Split>
  );
};

const extractContent = (entry) => {
  let modifiedText = entry.v;
  if (Array.isArray(entry.v)) {
    modifiedText = entry.v.join(', ');
  }
  return stripScripts(modifiedText.trim());
};

const extractTitle = (entry) => {
  let modifiedText;
  if (entry.n != null) {
    modifiedText = entry.n.charAt(0).toUpperCase() + entry.n.slice(1);
  } else {
    modifiedText = '';
  }
  return stripScripts(modifiedText.trim());
};

const formatPrimary = (entry) => {
  if (entry === '') {
    return entry;
  }
  let modifiedText = entry
    .replace(/<\/?p\/?>/gi, '<br>')
    .replace(/(<\/?br\/?>)+/gi, '<br>')
    .replace(/(\n)+/gi, '\n')
    .replace(/<a\s+href=/gi, '<a class="table-property-link" target="_blank" href=')
    .trim();
  if (modifiedText.startsWith('<br>')) {
    modifiedText = modifiedText.slice(4, modifiedText.length - 1);
  }
  if (modifiedText.endsWith('<br>')) {
    modifiedText = modifiedText.slice(0, modifiedText.length - 4);
  }
  modifiedText = modifiedText.charAt(0).toUpperCase() + modifiedText.slice(1);
  modifiedText = parse(modifiedText);
  return <Linkify options={{className: "table-property-link"}} key={Math.random().toString()}>{modifiedText}</Linkify>;
};

const formatContext = (context) => {
  const returnArray = [];
  for (const key in context) {
    returnArray.push(
      <tr key={Math.random().toString()}>
        <td valign='top'>
          <Typography variant='body2'>{key}</Typography>
        </td>
        <td valign='top'>
          <Typography variant='body2'>{context[key]}</Typography>
        </td>
      </tr>
    );
  }

  return (
    <table>
      <tbody>{returnArray}</tbody>
    </table>
  );
};

export default NetworkProperties;
