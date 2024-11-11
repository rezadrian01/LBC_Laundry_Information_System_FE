const ITEM_DETAIL_FIELDS = [
    {
        label: "Nama Barang",
        id: "item-name",
        name: ["itemName", "updatedItemName"],
    },
    {
        label: "Original (Lipat)",
        id: "original-price",
        name: ["originalPrice", "updatedOriginalPrice"],
    },
    {
        label: "Gantung",
        id: "hang-price",
        name: ["hangPrice", "updatedHangPrice"],
    },
    {
        label: "Dry Clean",
        id: "dry-clean-price",
        name: ["dryCleanPrice", "updatedDryCleanPrice"],
    },
];

const WEIGHT_DETAIL_FIELDS = [
    {
        label: "Kiloan (end)",
        id: "end-weight",
        name: ["maxWeight", "updatedMaxWeight"]
    },
    {
        label: "Harga",
        id: "price",
        name: ["price", "updatedPrice"]
    },
];

const BRANCH_DETAIL_FIELDS = [
    {
        label: "Nama Cabang",
        id: "branch-name",
        name: ["branchName", "updatedBranchName"]
    },
    {
        label: "Alamat",
        id: "branch-address",
        name: ["branchAddress", "updatedBranchAddress"]
    },
];

const USER_PROFILE_FIELDS = [
    {
        label: "Username",
        id: "username",
        name: ["username", "updatedUsername"],
    },
    {
        label: "No. HP",
        id: "contact",
        name: ["contact", "updatedContact"],
    },
    {
        label: "Role",
        id: "role",
        name: ["role", "updatedRole"],
    },
    {
        label: "Password",
        id: "password",
        name: ["password", "updatedPassword"],
    },
    {
        label: "Confirm Password",
        id: "confirm-password",
        name: ["confirmPassword", "updatedConfirmPassword"],
    },
];


const ORDER_DETAIL_FIELDS = [
    {
        id: 'receipt-number',
        label: 'No. Nota',
        name: ['receiptNumber'],
    },
    {
        id: 'entry-date',
        label: 'Tanggal Masuk',
        name: ['entryDate'],
    },
    {
        id: 'branch',
        label: 'Cabang',
        name: ['branch'],
    },
    {
        id: 'customer-name',
        label: 'Nama',
        name: ['customerName'],
    },
    {
        id: 'customer-address',
        label: 'Alamat',
        name: ['customerAddress'],
    },
    {
        id: 'customer-phone ',
        label: 'No. Hp',
        name: ['customerPhone'],
    },
    // {
    //     id: 'service',
    //     label: 'Layanan',
    //     name: 'service',
    // },
    {
        id: 'price',
        label: 'Harga',
        name: ['price'],
    },
    {
        id: 'status',
        label: 'Status',
        name: ['status'],
    },
    // {
    //     id: 'estimate-day',
    //     label: 'Estimasi',
    //     name: 'estimateDay',
    // },
    {
        id: 'is-paid-off',
        label: 'Pelunasan',
        name: ['isPaidOff'],
    },
];

const SERVICE_DETAIL_LIST = [
    {
        id: 'service-name',
        label: 'Nama Layanan',
        name: ['serviceName', 'updatedServiceName']
    },
    {
        id: 'service-price',
        label: 'Harga',
        name: ['servicePrice', 'updatedServicePrice']
    },
]


export { ITEM_DETAIL_FIELDS, WEIGHT_DETAIL_FIELDS, BRANCH_DETAIL_FIELDS, USER_PROFILE_FIELDS, ORDER_DETAIL_FIELDS, SERVICE_DETAIL_LIST };