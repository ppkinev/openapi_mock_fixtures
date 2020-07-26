const axios = require('axios')
const fs = require('fs')
const { getHttpOperationsFromResource } = require('@stoplight/prism-http/dist/getHttpOperations')

const OPEN_API_MAIN_FILE_PATH = process.env['SPEC_PATH']
const PORT = process.env['SERVER_PORT'] || 4010
axios.defaults.baseURL = `http://localhost:${PORT}/`


/**
 * If need to pass specific value for a curly id /animals/{animalId}
 *  specify it in queryParams hash
 *  otherwise default one from proxy will be used
 */
const queryParams = {
  animalId: 355
}
const queryParamsProxy = new Proxy(queryParams, {
  get: (_, prop) => queryParams[prop] ? queryParams[prop] : 123
})

// Finds param name in curly braces for replacement
const curlyParamRegex = /{([^{]+)}/g

void async function() {
  const operations = await getHttpOperationsFromResource(OPEN_API_MAIN_FILE_PATH)
  // Loops over all APIs tto create fixtures from
  const buildFixturesLoop = async _ => {
    for (let index = 0; index < operations.length; index++) {
      const o = operations[index]
      
      // Replaces values from curly braces to specified in hash above (or proxies used)
      const url = o.path.replace(curlyParamRegex, match => queryParamsProxy[match.replace(/[{}]/g, '')])

      try {
        const { data } = await axios({ method: o.method, url })
        fs.writeFile(`./fixtures/${o.iid}.json`, JSON.stringify(data, null, 2), err => {
          if (err) console.log(err)
          else console.log(`${index}: ${o.method.toUpperCase()} ${url} created`)
        })
      } catch(error) {
        console.log(error)
      }
    }
  }

  buildFixturesLoop()
}()