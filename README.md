# NDEx Integrated Query (IQuery)

## Table of Contents

* [What is IQuery?](#what-is-iquery)
* [Using the IQuery interface](#using-the-iquery-interface)
    * [Quick start](#quick-start)
    * [Detailed overview](#detailed-overview)
* [Integrating IQuery into your application](#integrating-iquery-into-your-application)
* [Configuring, building, and deploying IQuery locally for development](#configuring-building-and-deploying-iquery-locally-for-development)
    * [Configuration](#configuration)
    * [Building and deploying with Docker](#building-and-deploying-with-docker)
    * [Building and deploying with Apache](#building-and-deploying-with-apache)

## What is IQuery?

IQuery is a web application for querying a curated subset of the online biological network repository [NDEx](https://ndexbio.org). Given a set of query genes, IQuery will return NDEx pathways enriched for the query genes, and networks representing the interactions between those genes and other proteins.

This repo contains the sources for the IQuery web application. 
The source code for the services that support IQuery may be found at: 
* https://github.com/ndexbio/ndexsearch-rest
* https://github.com/ndexbio/ndex-enrichment-rest
* https://github.com/ndexbio/ndex-enrichment-rest-client


## Using the IQuery Interface

### Quick start

Go to [www.ndexbio.org/iquery](https://www.ndexbio.org/iquery) and either:

* Enter a set of query genes into the search box and click the search icon, or
* Click one of the query gene set examples.

This will launch a query and take you to a results page. 

## Integrating IQuery into your application

To launch an IQuery search from your own application, take the following base url:

```
https://www.ndexbio.org/iquery?genes=
```

And append the [URI encoded](https://en.wikipedia.org/wiki/Percent-encoding) list of space-delimited or comma-delimited genes. This will take you to the IQuery results page for that gene set.

### Example

To conduct a query with the following genes:

```
BRCA1 BRCA2 PALB2 CHEK2 CDH1
```

Go to the following url:

```
https://www.ndexbio.org/iquery?genes=BRCA1%20BRCA2%20PALB2%20CHEK2%20CDH1
```

## Configuring, building, and deploying IQuery locally for development

IQuery is implemented using [React](https://reactjs.org/).

```
git clone https://github.com/ndexbio/iquery.git
cd iquery
yarn install
yarn build
```

### Configuration

The host name of the web server and endpoint of REST services is configured in the ndex web app configuration file `ndex-webapp-config.js`. All iQuery parameters are set in the iQuery object in the configuration file.

The variable `SERVICE_SERVER_URL` should point to the NDEx server where the desired networks are stored, and the variable `BASE_URL` should point to the base url for the endpoints of REST services. The variable `GOOGLE_CLIENT_ID` should be the client ID for Google Single Sign On for the particular NDEx server being used. If this is not supplied, then Google SSO won't work.

#### Example configuration
```
  iQuery:
    {
        googleAnalyticsId: '...',
        serviceServerUri: "https://dev.ndexbio.org/",
        baseUri: "https://dev.ndexbio.org/integratedsearch/v1/",
        deployEnvironment: " on dev ..",
        myGeneUri: "https://mygene.info/v3/query",
        geneCardsUri: "https://www.genecards.org/cgi-bin/carddisp.pl?gene=",
        helpUri: "https://github.com/cytoscape/search-portal/blob/master/README.md",
        feedBackUri: "https://home.ndexbio.org/contact-us/",
        ndexUri: "https://dev.ndexbio.org",
        cytoscapeUri: "https://cytoscape.org",
        ucsdUri: "https://medschool.ucsd.edu/som/medicine/research/labs/ideker/Pages/default.aspx",
        copyRight: "Copyright © 2013-@@YEAR@@, The Regents of University of California, The Cytoscape Consortium. All rights reserved.",
        maxNetworkSize: 5000,
        highlightGenes: true,
	     defaultSort: "Similarity",
        hideSearchBar: false,
        tourImages: [
         'https://home.ndexbio.org/iquerytutorials/tour_1_analysis.gif',
         'https://home.ndexbio.org/iquerytutorials/tour_2_sorting.gif',
         'https://home.ndexbio.org/iquerytutorials/tour_3_results.gif',
         'https://home.ndexbio.org/iquerytutorials/tour_4_info.gif'
         ],
        proteinInteractionsNetworks: [ "2b1d940d-2e30-11ed-9208-0242c246b7fb","35a4e415-2e30-11ed-9208-0242c246b7fb","3b0c72a6-2e31-11ed-9208-0242c246b7fb"],
        landingPageText: 'One search finds a variety of pathways and interaction networks relevant to your set of genes.',
        geneSetExamples: [
                     {
                      "name": "Example 1",
                      "genes": "PDLIM1 PFKP PRDX1 PRDX2 PRDX4 PRDX6 PRNP PTPA SBNO2 SCAF4 SELENOS SOD1 SOD2 SRXN1 STK25 TXN TXNRD1 TXNRD2",
                      "description": "The 200 genes comprising the MSigDB Hallmark Gene Set for Hypoxia"
                     },
                     {
                      "name": "Example 2",
                      "genes": "APAF1 BCL2 BID BIRC2 BIRC3 CASP10 CASP3 CASP6 CASP7 CFLAR CHUK DFFA DFFB FADD GAS2 LMNA MAP3K14 NFKB1 RELA RIPK1 SPTAN1 TNFRSF25 TNFSF10 TRADD TRAF2 XIAP",
                      "description": "25 genes involved in the induction of apoptosis through DR3 and DR4/5 Death Receptors"
                     }
                    ]
    }
```

### Building and deploying with [Docker](https://docs.docker.com/get-started/part2/)

**Step 1**: Build IQuery

```
cd iquery
yarn install
yarn build
```
The web app is built in the `build` directory.

**Step 2**: Copy build directory contents to Docker directory

```
iquery
|-- build    <-- copy everything in here . . .
|-- docker
    |-- static    <-- . . . to in here
```

```
cd iquery
cp -rn build/* docker/static
```

**Step 3**: Build and run Docker image
```
cd iquery/docker
docker build -t portal .
docker run --name search-portal -d -p 80:80 portal
```

### Building and deploying with Apache

**Step 1**: Build IQuery

```
cd iquery
yarn install
yarn build
```
The web app is built in the `build` directory.

**Step 2**: Copy build directory to DocumentRoot directory

```
iquery
|-- build   <-- copy this to your DocumentRoot directory
```
