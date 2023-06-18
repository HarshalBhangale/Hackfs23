pragma solidity ^0.8.0;

contract Bacalhau {
    struct Dataset {
        uint256[] data;
        uint256 result;
        bool computed;
    }

    mapping(address => Dataset) public datasets;

    function uploadDataset(uint256[] memory _data) public {
        require(datasets[msg.sender].data.length == 0, "Dataset already uploaded");
        datasets[msg.sender] = Dataset(_data, 0, false);
    }

    function computeDataset() public {
        Dataset storage dataset = datasets[msg.sender];
        require(dataset.data.length > 0, "No dataset uploaded");
        require(!dataset.computed, "Dataset already computed");

        uint256 sum;
        for (uint256 i = 0; i < dataset.data.length; i++) {
            sum += dataset.data[i];
        }
        dataset.result = sum;
        dataset.computed = true;
    }

    function getDatasetResult() public view returns (uint256) {
        return datasets[msg.sender].result;
    }
}
