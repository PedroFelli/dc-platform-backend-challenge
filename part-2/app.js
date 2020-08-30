var fs = require('fs');
const readline = require('readline');
const axios = require('axios');

async function convertDump() {
  const fileStream = fs.createReadStream('./input-dump');
  const dump = [];

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  var logger = fs.createWriteStream('new-dump', {
    flags: 'a' // 'a' means appending (old data will be preserved)
  })
  
  for await (const line of rl) {
    var obj = JSON.parse(line)
 
    const item = {productId: obj.productId, images: [obj.image]}

    const findProduct = checkIfProductExist(item.productId);
    
    const res = await checkIfUrlIsValid(obj.image);

    if(res === 200 ){
      if(!findProduct){
        pushItem(item);
      } else {
        if(findProduct){
          pushImageToArray(findProduct.productId, obj.image)
        }
      } 
    }
  }

   function checkIfUrlIsValid(url){
    const res = axios.get(url)
      .then(function (response) {
        // console.log(response.status);
        return response.status;
      })
      .catch(function (error) {
        // console.log(error.response.status);
        return error.response.status;
      })

    return res;
  }

  function pushItem(item){
    dump.push(item)
  }

  function pushImageToArray(productId, image){
    dump.map(dumpItem => {
      if(dumpItem.productId === productId){
        if(dumpItem.images.length < 3){
          dumpItem.images.push(image)
        };
      }
    });
  }

  function checkIfProductExist(productId){
    const found = dump.find(product => product.productId === productId);
    return found;
  }

  // white file
  dump.map(item => {
    const string = JSON.stringify(item);
    logger.write(string+'\r\n'); 
  });

  logger.end();
}

convertDump();