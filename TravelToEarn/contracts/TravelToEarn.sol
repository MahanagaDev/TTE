// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.11;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";

contract TravelToEarn is ERC721, Ownable {
     struct TTE {
        string  CityName;  
        string  CounrtyName;  
        uint256 level; 
        string Latitude;
        string Longitude;
        string Description;
        string WorkId;
    }

 




    constructor() ERC721("TravelToEarn", "TTE") {  }

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
 

    mapping(uint => TTE) mapTTEs;
    
 

    function getTTE(uint256 tokenId) public view  returns (TTE memory) {
      return mapTTEs[tokenId];
    }

 

 

    function mint3(string memory _ctyname,string memory _countrytname,uint256 _level,string memory _lat,string memory _lng,string memory _desc,string memory workId, address account) public  onlyOwner returns (uint256) {
        //require(msg.value >= 10, "Not enough ETH sent; check price!"); 
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _mint(account, newItemId); // ERC721  
        mapTTEs[newItemId] = TTE(_ctyname,_countrytname, _level,_lat,_lng,_desc,workId);



        return newItemId;
    } 
}
