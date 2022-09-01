import { PROTEIN_INTERACTIONS_NETWORKS } from "./config";

const NDEX_API_URL = 'https://dev.ndexbio.org/v2'

const getGeneOverlap = async (networkId, geneList) => {
    // send a query with the genelist to see which genes are found in the network
    const url = `${NDEX_API_URL}/search/network/${networkId}/nodes`;

    const overlap = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
          },
        body: JSON.stringify({
            searchString: geneList.join(' ')
        })
    }).then(res => res.json());

    if(overlap.length > geneList.length){
        // const nodeData = overlap.map(o => test.find(nd => {
        //     // console.log(nd, o.id)
        //     return nd['@id'] === parseInt(o.id)
        // }));

        // console.log(nodeData)
    }

    // console.log(overlap, geneList.join(' '), networkId)

    // const nodesUrl = `${NDEX_API_URL}/network/${networkId}/aspect/nodes`
    // const nodes = await fetch(nodesUrl).then(res => res.json());
    // const processedOverlaps = overlap.map(o => {
    //     const name = nodes.find(n => n['@id'] === parseInt(o.id));

    //     return Object.assign({}, o, {name})
    // })
    // console.log(processedOverlaps.map(po => po.name))
    return { networkId, overlap };
};

const getNetworkSummaries = async (networkIds) => {
    const url = `${NDEX_API_URL}/batch/network/summary`;

    const summaries = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
          },
        body: JSON.stringify(networkIds)
    }).then(res => res.json());

    return summaries;
}


// normal IQuery result example
// description: "GeneHancer Associations"
// details: {parent_network_edges: 2199479, parent_network_nodes: 596569}
// edges: 1354
// hitGenes: (27) ['SETD3', 'DDX1', 'CARF', 'PURB', 'PTBP1', 'RTRAF', 'CPSF6', 'RING1', 'CBX1', 'PAN2', 'EIF3M', 'CDKN2AIPNL', 'EIF3K', 'EIF3L', 'EIF3I', 'XRN2', 'EIF3G', 'REL', 'EIF3H', 'EIF3E', 'NCBP3', 'EIF3F', 'NUP98', 'EIF3C', 'EIF3D', 'EIF3A', 'EIF3B']
// imageURL: "https://www.genecards.org/Images/Companions/Logo_GH.png"
// legendURL: null
// networkUUID: "6a2a4265-0201-11ec-8f77-525400c25d22"
// nodes: 1374
// percentOverlap: 0
// rank: 0
// totalGeneCount: 0
// url: null

// description: "HIPPIE - Human Scored Interactions"
// details: {parent_network_edges: 391410, parent_network_nodes: 17956}
// edges: 90
// hitGenes: (27) ['SETD3', 'DDX1', 'CARF', 'PURB', 'PTBP1', 'RTRAF', 'CPSF6', 'RING1', 'CBX1', 'PAN2', 'EIF3M', 'CDKN2AIPNL', 'EIF3K', 'EIF3L', 'EIF3I', 'XRN2', 'EIF3G', 'REL', 'EIF3H', 'EIF3E', 'NCBP3', 'EIF3F', 'NUP98', 'EIF3C', 'EIF3D', 'EIF3A', 'EIF3B']
// imageURL: "http://cbdm-01.zdv.uni-mainz.de/~mschaefer/hippie/hippie4.png"
// legendURL: null
// networkUUID: "dd60c48a-01fe-11ec-8f77-525400c25d22"
// nodes: 27
// percentOverlap: 0
// rank: 0
// totalGeneCount: 0
// url: null


// summary example retured from the ndex api
// completed: true
// creationTime: 1635531486749
// cx2FileSize: 93562325
// cxFileSize: 160667451
// description: "<p>Staining profiles for proteins in human tumor tissue based on immunohistochemisty using tissue micro arrays and log-rank P value for Kaplan-Meier analysis of correlation between mRNA expression level and patient survival.</p><div>The data include Ensembl gene identifier (&#34;Gene&#34;), gene symbol (&#34;Gene name&#34;), tumor name (&#34;Cancer&#34;), the number of patients annotated for different staining levels (&#34;High&#34;, &#34;Medium&#34;, &#34;Low&#34;, &#34;Not detected&#34;) and log-rank p values for patient survival and mRNA correlation (&#34;prognostic - favorable&#34;, &#34;unprognostic - favorable&#34;, &#34;prognostic - unfavorable&#34;, &#34;unprognostic - unfavorable&#34;).<div><br/></div><div>The data is based on The Human Protein Atlas version 21.0 and Ensembl version 103.38.<br/></div>For more details, please visit <a href=\"https://www.proteinatlas.org/\" target=\"\">The Human Protein Atlas</a>.</div>"
// edgeCount: 401800
// externalId: "904c6f47-38e4-11ec-b3be-0ac135e8bacf"
// hasLayout: true
// hasSample: true
// indexLevel: "ALL"
// isCertified: false
// isDeleted: false
// isReadOnly: false
// isShowcase: false
// isValid: true
// modificationTime: 1639096496424
// name: "HPA  v21.0 - Pathology Atlas - Scored correlations between genes and cancer types"
// nodeCount: 20110
// owner: "hpa"
// ownerUUID: "df813eda-7e7a-11e9-848d-0ac135e8bacf"
const getProteinInteractionsData = async (args) => {
    const geneInfo = args[0]
    const { queryGenes, normalizedGenes, invalid } = geneInfo;
    const validGenes = new Set(queryGenes);
    invalid.forEach(gene => validGenes.delete(gene))
    const defaultIcon = 'http://search.ndexbio.org/static/media/ndex-logo.04d7bf44.svg'

    // const summaries = await Promise.all(proteinInteractomes.map(networkId => ndex.getNetworkSummary(networkId)));
    const summaries = await getNetworkSummaries(PROTEIN_INTERACTIONS_NETWORKS)
    const overlaps = await Promise.all(PROTEIN_INTERACTIONS_NETWORKS.map(networkId => getGeneOverlap(networkId, Array.from(validGenes))));
    const results = summaries.map((s, index) => {
        const imageUrl = s.properties.find(p => p.predicateString === '__iconurl')
        const reference = s.properties.find(p => p.predicateString === 'reference')
        const overlap = overlaps.find(o => o.networkId === s.externalId)
        
        return {
            description: s.name,
            details: {
                parent_network_nodes: s.nodeCount,
                parent_network_edges: s.edgeCount,    
            },
            detailedDescription: s.description,
            legendURL: null,
            imageURL: imageUrl != null ? imageUrl.value : defaultIcon,
            reference: reference != null  ? reference.value : null,
            networkUUID: s.externalId,
            hitGenes: overlap.overlap, // overlaps is an array of ids, we don't have access to the exact gene names, but we have the count via hitgenes.length
            percentOverlap: 0,
            rank: 0,
            totalGeneCount: 0
        }
    }).sort((a, b) => {
        return b.hitGenes.length - a.hitGenes.length
    });


    return Promise.resolve(results);
};

export default getProteinInteractionsData