const CONTRACT_ADDRESS = "0x130647240e9228E65Fd2475081bE01d78564cB2f"
const META_DATA_URL = "ipfs://XX"

async function mintNFT(contractAddress, metaDataURL) {
   const TTEToken = await ethers.getContractFactory("TTEToken")
   const [owner] = await ethers.getSigners()
   const pt = await TTEToken.attach(contractAddress).mint3("Skumvit23","Thai",2,"101.1","22.23","",owner.address)
   console.log("NFT minted to: ", owner.address)
   console.log("NFT minted IDX: ", pt)
}

mintNFT(CONTRACT_ADDRESS, META_DATA_URL)
   .then(() => process.exit(0))
   .catch((error) => {
       console.error(error);
       process.exit(1);
   });

