const CREATE_ITEM_INPUT_LIST = [
    {
        id: 1,
        label: "Nama Barang",
        id: "item-name",
        name: "itemName",
    },
    {
        id: 2,
        label: "Original (Lipat)",
        id: "original-price",
        name: "originalPrice",
    },
    {
        id: 3,
        label: "Gantung",
        id: "hang-price",
        name: "hangPrice",
    },
    {
        id: 4,
        label: "Dry Clean",
        id: "dry-clean-price",
        name: "dryCleanPrice",
    },
];

const CREATE_WEIGHT_INPUT_LIST = [
    {
        id: 1,
        label: "Kiloan (start)",
        id: "start-price",
        name: "startPrice",
    },
    {
        id: 2,
        label: "Kiloan (end)",
        id: "end-price",
        name: "endPrice"
    }
];

const CREATE_BRANCH_INPUT_LIST = [
    {
        id: 1,
        label: "Nama Cabang",
        id: "branch-name",
        name: "branchName"
    },
    {
        id: 2,
        label: "Alamat",
        id: "branch-address",
        name: "branchAddress"
    },
];


export { CREATE_ITEM_INPUT_LIST, CREATE_WEIGHT_INPUT_LIST, CREATE_BRANCH_INPUT_LIST };