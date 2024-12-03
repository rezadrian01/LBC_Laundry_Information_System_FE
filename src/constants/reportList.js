const ORDER_TYPE_LIST = [
    {
        id: 1,
        title: "Kiloan"
    },
    {
        id: 2,
        title: "Satuan"
    },
];

const REPORT_TYPE_LIST = [
    {
        id: 1,
        title: "Harian"
    },
    {
        id: 1,
        title: "Bulanan"
    },
    {
        id: 1,
        title: "Triwulan"
    },
];

const REPORT_STATISTIC_TITLE_LIST = [
    {
        title: "Penghasilan Harian",
        key: "harian"
    },
    {
        title: "Penghasilan Mingguan",
        key: "mingguan"
    },
    {
        title: "Penghasilan Bulanan",
        key: "bulanan"
    },
    {
        title: "Penghasilan Tahunan",
        key: "tahunan"
    },
];

const REPORT_CONTENT_LIST = [
    {
        id: 1,
        period: "Harian",
        totalIncome: 250_000,
        day: "Senin"
    },
    {
        id: 2,
        period: "Harian",
        totalIncome: 175_000,
        day: "Selasa"
    },
    {
        id: 3,
        period: "Harian",
        totalIncome: 235_000,
        day: "Rabu"
    },
    {
        id: 4,
        period: "Harian",
        totalIncome: 300_000,
        day: "Kamis"
    },
    {
        id: 5,
        period: "Harian",
        totalIncome: 235_000,
        day: "Jumat"
    },
    {
        id: 6,
        period: "Harian",
        totalIncome: 175_000,
        day: "Sabtu"
    },
    {
        id: 7,
        period: "Harian",
        totalIncome: 175_000,
        day: "Minggu"
    },
]

const SUMMARY_REPORT_LIST = [
    {
        id: 1,
        category: "Order",
        title: "Total Pesanan",
        contents: [
            {
                id: 1,
                title: "Dialy Order",
                prev: 110,
                next: 130,
                comparativeWords: "Dari kemarin"

            },
            {
                id: 2,
                title: "Weekly Order",
                prev: 250,
                next: 275,
                comparativeWords: "Dari minggu lalu"
            },
            {
                id: 3,
                title: "Monthly Order",
                prev: 500,
                next: 560,
                comparativeWords: "Dari bulan lalu"
            },

        ]
    },
    {
        id: 2,
        category: "Profit",
        title: "Total Pendapatan",
        contents: [
            {
                id: 1,
                title: "Dialy Profit",
                prev: 90_000,
                next: 130_000,
                comparativeWords: "Dari kemarin"
            },
            {
                id: 2,
                title: "Weekly Profit",
                prev: 500_000,
                next: 700_000,
                comparativeWords: "Dari minggu lalu"
            },
            {
                id: 3,
                title: "Monthly Profit",
                prev: 1_500_000,
                next: 1_900_000,
                comparativeWords: "Dari bulan lalu"
            },

        ]
    },

]


export {
    ORDER_TYPE_LIST,
    REPORT_TYPE_LIST,
    REPORT_STATISTIC_TITLE_LIST,
    REPORT_CONTENT_LIST,
    SUMMARY_REPORT_LIST
};