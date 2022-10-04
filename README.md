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
git clone https://github.com/ndexbio/search-portal.git
cd search-portal
yarn install
yarn start
```

### Configuration

The host name of the web server and endpoint of REST services are hard coded in the file `apiConstants.js`.

```
search-portal
|-- src
    |-- api
        |-- apiConstants.js
```

The variable `SERVICE_SERVER_URL` should point to the NDEx server where the desired networks are stored, and the variable `BASE_URL` should point to the base url for the endpoints of REST services. The variable `GOOGLE_CLIENT_ID` should be the client ID for Google Single Sign On for the particular NDEx server being used. If this is not supplied, then Google SSO won't work.

#### Example configuration
```
export const METHOD_POST = 'POST'
export const METHOD_GET = 'GET'

export const SERVICE_SERVER_URL = 'http://ndexbio.org/'
export const BASE_URL = SERVICE_SERVER_URL + 'integratedsearch/v1/'

export const GOOGLE_CLIENT_ID = '802839698598-8rsr8va0bd0e6lmi0ghemtrvldk9rnla.apps.googleusercontent.com'
```

### Building and deploying with [Docker](https://docs.docker.com/get-started/part2/)

**Step 1**: Build IQuery

```
cd search-portal
yarn install
yarn build
```
The web app is built in the `build` directory.

**Step 2**: Copy build directory contents to Docker directory

```
search-portal
|-- build    <-- copy everything in here . . .
|-- docker
    |-- static    <-- . . . to in here
```

```
cd search-portal
cp -rn build/* docker/static
```

**Step 3**: Build and run Docker image
```
cd search-portal/docker
docker build -t portal .
docker run --name search-portal -d -p 80:80 portal
```

### Building and deploying with Apache

**Step 1**: Build IQuery

```
cd search-portal
yarn install
yarn build
```
The web app is built in the `build` directory.

**Step 2**: Copy build directory to DocumentRoot directory

```
search-portal
|-- build   <-- copy this to your DocumentRoot directory
```
