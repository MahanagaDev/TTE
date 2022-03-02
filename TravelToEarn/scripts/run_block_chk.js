var request = require('request');

const CONTRACT_ADDRESS = "0xae9eb8b6F8105D538d3C1df56eC813Bcc51b86F4"
const META_DATA_URL = "ipfs://XX"
const UPDATE_DATA_URL = "https://solunic.com/tte/update.php?"
let _processing = 0;
async function blockNFT(contractAddress, bc) {
_processing =1;
   const ExampleNFT = await ethers.getContractFactory("TravelToEarn")
//   const [owner] = await ethers.getSigners()
   const nft = await ExampleNFT.attach(contractAddress);
   const pt = await nft.getTTE(bc);
   const owners = await (nft.ownerOf(1))
//   console.log("NFT minted to: ", owner.address)
   console.log("NFT minted IDX: ", pt) 
   console.log("NFT minted IDX: ", pt.WorkId) 
   console.log("NFT minted owners: ", owners) 
   
   //https://solunic.com/tte/update.php?hash=0x122088718222aa82a6d9873393e2bc56633f8501d7a08940ea1c8a53f00b15fa&nonce=60&key=TTE_1101_UIDX1&idx=1101
   var param = "type=UPBLOCK&idx="+pt.WorkId+"&bID=" + bc+"&lowner="+owners;
   console.log("NFT minted IDX: ", param) 
 request(UPDATE_DATA_URL + param, function (error, response, body) {
    if(response.statusCode== 200){
      console.log('body:', body);  
 
    } 
      
  });
_processing = 0;
}
const URL_CHK_DATA = "https://solunic.com/tte/update.php?type=CHKBLOCK";

function loadReq(){
 request(URL_CHK_DATA, function (error, response, body) {
    if(response.statusCode== 200){
      console.log('body:', body);  
      console.log('response',response.statusCode);
      console.log('bodylen:', body.length);  

      const obj = JSON.parse(body);
      const has = obj.has
      if(has == "Y"){
      
        const block = parseInt(obj.block) + 1;
         blockNFT(CONTRACT_ADDRESS, block) 
      }
    } 
      
  });
}

/*
blockNFT(CONTRACT_ADDRESS, META_DATA_URL)
   .then(() => process.exit(0))
   .catch((error) => {
       console.error(error);
       process.exit(1);
   });

*/

async function main(){
  let slen = 100
  for(let i =0;i < slen;i++){
      console.log('p = ',i);
    var vsec = parseInt((i*2)/10)
    working(i,vsec)
    
    await sleep(500);
    if( i >= slen-1){
      i = 0;
    }
  }
}
function working(pt,sec){
//  console.debug(pt,sec);
  var status = 0;
  var psec = pt %30
  var pisec = pt %7
  if(pisec == 0){
 //   chkReq()
  }
  if(psec == 0){
    status = 1;
  }
  if(_processing == 1) {
    console.log("processing")
    status = 0;
  }
  if(status == 1){
    loadReq();//check and startwork
    status = 0;
  }
  
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
main();
console.log(" > :1")
