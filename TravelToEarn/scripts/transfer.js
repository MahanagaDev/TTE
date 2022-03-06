const CONTRACT_ADDRESS = "0xF4E25dA24Bb48b8Da5e02AD5c13A9B045bA5cf3A"
const META_DATA_URL = "ipfs://XX"
let addr1 = "0x91fd9226A321174c63E551fd1a07638a6Cc52BE1";
let addr2 = "0x91fd9226A321174c63E551fd1a07638a6Cc52BE1";
async function mintNFT(contractAddress, metaDataURL) {
   const eTravelToEarn = await ethers.getContractFactory("TravelToEarn2")
   const [owner] = await ethers.getSigners() 
   const nft = await eTravelToEarn.attach(contractAddress);
   const pt = await nft.transferFrom(addr1,addr2,2);
   console.log("NFT minted to: ", owner.address)
   console.log("NFT minted IDX: ", pt)
}

mintNFT(CONTRACT_ADDRESS, META_DATA_URL)
   .then(() => process.exit(0))
   .catch((error) => {
       console.error(error);
       process.exit(1);
   });

