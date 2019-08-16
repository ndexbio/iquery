export const camelCaseToTitleCase = (camelCaseString) => {
    if (camelCaseString.slice(0, 4) === "http" ||
        camelCaseString.slice(0, 5) === 'Prov:') {
        return camelCaseString
    }
    let result = camelCaseString
        .replace(/([a-z])([A-Z][a-z])/g, "$1 $2")           
        .replace(/([A-Z][a-z])([A-Z])/g, "$1 $2")           
        .replace(/([a-z])([A-Z]+[a-z])/g, "$1 $2")          
        .replace(/([A-Z]+)([A-Z][a-z][a-z])/g, "$1 $2")     
        .replace(/([a-z]+)([A-Z0-9]+)/g, "$1 $2")    
        .replace(/([A-Z]+)([A-Z][a-rt-z][a-z]*)/g, "$1 $2")
        .replace(/([0-9])([A-Z][a-z]+)/g, "$1 $2") 
        .replace(/([0-9]{2,})([A-Z]{2,})/g, "$1 $2")      
        .trim();
    result = result.charAt(0).toUpperCase() + result.slice(1)
    result = result.replace('Wiki Pathways', 'WikiPathways')
        .replace('Wikipathways', 'WikiPathways')
    return result
  }