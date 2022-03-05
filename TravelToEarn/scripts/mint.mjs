const CONTRACT_ADDRESS = "0x510421E0319bd58dBE4de9334e87Cf4107770a70"
const META_DATA_URL = "ipfs://XX"

async function mintNFT(contractAddress, metaDataURL) {
   const TravelToEarn = await ethers.getContractFactory("TravelToEarn")
   const [owner] = await ethers.getSigners()
   console.log("NFT Contract address: ", contractAddress)
   const pt = await TravelToEarn.attach(contractAddress).mint3("S1kumvit2311","Thai1",2314,"101.1","22.23","","1",owner.address)
   console.log("NFT minted to: ", owner.address)
   console.log("NFT minted IDX: ", pt)
}

mintNFT(CONTRACT_ADDRESS, META_DATA_URL)
   .then(() => process.exit(0))
   .catch((error) => {
       console.error(error);
       process.exit(1);
   });


