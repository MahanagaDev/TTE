var request = require('request');
const CONTRACT_ADDRESS = "0xae9eb8b6F8105D538d3C1df56eC813Bcc51b86F4"

var URL_CHK_DATA= "https://solunic.com/tte/makework.php"
var URL_CHK_REQ = "http://solunic.com/p1.php"
var URL_UPDATE_MINT = "https://solunic.com/tte/update.php?"
 
var status = 0;
var minting = 0;
async function mintNFT(idx,key,uaddress, cityname,country,level,lat,lng,desc) {
  minting =1;
   const ExampleNFT = await ethers.getContractFactory("TravelToEarn")
   const [owner] = await ethers.getSigners()
   const pt = await ExampleNFT.attach(CONTRACT_ADDRESS).mint3(cityname,country,level,lat,lng,desc,idx,uaddress)
   console.log("NFT minted to: ", uaddress)
   console.log("NFT minted to: ", pt)
   const hash = pt.hash;
   const nonce = pt.nonce;
   
   console.log("NFT minted IDX: ", hash)
   console.log("NFT minted nonce: ", nonce)
   console.log("KEY: ", key)
   console.log("IDX: ", idx)
   let param = "hash=" + hash + "&nonce="+nonce + "&key="+key+"&idx="+idx;
   console.log("param: ", param)
   request(URL_UPDATE_MINT+param, function (error, response, body) {
    console.log('body:', body); 
     minting = 0;
    });
}



function chkReq(){
  request(URL_CHK_REQ, function (error, response, body) {
  console.log('response',response.statusCode);
    if(response.statusCode== 200){
      console.log('body:', body);  
      console.log('response',response.statusCode);
      console.log('bodylen:', body.length);  
      if(body.length >10){
        status=1;
      }
    } 
      
  });
}
function loadReq(){
  request(URL_CHK_DATA, function (error, response, body) {
    if(response.statusCode== 200){
      console.log('body:', body);  
      console.log('response',response.statusCode);
      console.log('bodylen:', body.length);  

      const obj = JSON.parse(body);
      const exec = obj.exec
      const addr = obj.addr;
      const idx = obj.idx;
      const key = obj.key;
      const cityname = obj.cityname;
      const country = obj.country;
      const level = obj.level;
      const lat = obj.lat;
      const lng = obj.lng;
      const desc = obj.desc; 
      
      if(exec == "Y"){
        console.log("Minting")
        console.log(obj.addr);
      
        mintNFT(idx,key, addr, cityname,country,level,lat,lng,desc)
        
      }else{
        console.log("NOHAVE")
      }
    } 
      
  });
}
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
  var psec = pt %50
  var pisec = pt %7
  if(pisec == 0){
    chkReq()
  }
  if(psec == 0){
    status = 1;
  }
  if(minting == 1) {
    console.log("minting")
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
