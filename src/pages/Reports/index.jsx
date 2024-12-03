import { useEffect, useState } from "react";

import DefaultLayout from "@layouts/Default";
import StatisticCard from "@mods/Dashboard/statisticCard";
import Header from "@mods/Header/header";
import TabMenu from "@mods/Reports/TabMenu";
import Sidebar from "@mods/Sidebar/sidebar";
import { ORDER_TYPE } from "@/constants/orderType";
import { BRANCH_LIST_REPORT } from "@/constants/branchList";
import { REPORT_STATISTIC_TITLE_LIST, REPORT_TYPE_LIST, SUMMARY_REPORT_LIST } from "@/constants/reportList";
import EachUtils from "@/utils/eachUtils";

import useAuth from "@/hooks/useAuth";
import ReportSummaryCard from "@/components/Modules/ReportSummary";
import { useQuery } from "@tanstack/react-query";
import apiInstance from "@/utils/apiInstance";

const Reports = () => {
    const { isLoading: loadAuthData } = useAuth();
    const [branchList, setBranchList] = useState([]);
    const [selectedBranchReport, setSelectedBranchReport] = useState({
        id: "",
        name: ""
    });
    const [reportList, setReportList] = useState({
        harian: [],
        mingguan: [],
        bulanan: [],
        tahunan: []
    });
    const [reportSummary, setReportSummary] = useState(null);

    let { data: fetchedBranchList, isPending: isPendingBranchList, isError: isErrorBranchList, } = useQuery({
        queryKey: ['branches'],
        queryFn: async () => {
            const response = await apiInstance('branch');
            return response.data.data;
        },
        retry: false,
        enabled: !loadAuthData,
        refetchOnWindowFocus: false,
        throwOnError: true
    });

    const { data: fetchedReportList, isPending: isPendingReportList, isFetched: isFetchedReportList, refetch: refetchReportList } = useQuery({
        queryKey: ['reports', { period: 'all' }, { branchId: selectedBranchReport?.id }],
        queryFn: async () => {
            const response = await apiInstance(`report/reportByBranch/${selectedBranchReport?.id || "all"}`);
            return response.data.data;
        },
        enabled: !isPendingBranchList,
        throwOnError: true,
        refetchOnWindowFocus: false
    });

    // Branch
    useEffect(() => {
        if (!isPendingBranchList) {
            setBranchList(() => {
                const updatedBranchList = [...fetchedBranchList, { name: "Semua", _id: "all" }];
                return updatedBranchList;
            });
            setSelectedBranchReport({
                id: fetchedBranchList[0]?._id || "",
                name: fetchedBranchList[0]?.name || ""
            })

        }
    }, [isPendingBranchList, fetchedBranchList]);

    //  Report
    useEffect(() => {
        if (!isPendingReportList) {
            for (let key in fetchedReportList) {
                const currentReportList = fetchedReportList[key].map(report => {
                    let label;
                    if (key === 'harian' || key === 'mingguan') {
                        label = new Date(report.endDate).toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit' });
                    }
                    if (key === 'bulanan') {
                        label = new Date(report.endDate).toLocaleDateString('id-ID', { month: 'long' });
                    }
                    if (key === 'tahunan') {
                        label = new Date(report.endDate).getFullYear();
                    }

                    return { ...report, label };
                });

                currentReportList.reverse();
                fetchedReportList[key] = [...currentReportList];
                setReportList(prev => ({
                    ...prev,
                    [key]: [...currentReportList]
                }))
            }
        }
    }, [isPendingReportList, fetchedReportList]);



    const handleSelectBranchReport = (branch) => {
        setSelectedBranchReport({
            id: branch?._id || "all",
            name: branch?.name || ""
        });
        refetchReportList();
    }

    // console.table(reportList.harian);

    return (
        <DefaultLayout>
            <Sidebar />
            {!isPendingBranchList &&
                <Header hasButton={false} hasBranchBtn isReports selectedBranch={selectedBranchReport} branchList={branchList} onSelect={handleSelectBranchReport} />
            }
            {true && <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                <EachUtils of={calculateReportSummary(reportList)} render={(item, index) => {
                    const reportSummary = calculateReportSummary(reportList);
                    return <ReportSummaryCard isPending={isPendingReportList} content={item} key={index} />
                    }} />
            </div>}

            {isFetchedReportList && !isPendingReportList && <>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-10 mt-10'>
                <EachUtils of={REPORT_STATISTIC_TITLE_LIST} render={(item, index) => {
                        let datasets = [];
                        switch (index) {
                            case 0:
                                datasets = reportList.harian;
                                break;
                            case 1:
                                datasets = reportList.mingguan;
                                break;
                            case 2:
                                datasets = reportList.bulanan;
                                break;
                            case 3:
                                datasets = reportList.tahunan;
                                break;
                        }
                        return <StatisticCard datasets={datasets} title={item.title} labelKey="label" />;
                }} />
            </div>
            </>}
        </DefaultLayout>
    );
};

export default Reports;

const calculateReportSummary = (reportList) => {
    const dialyReport = reportList.harian;
    const weeklyReport = reportList.mingguan;
    const monthlyReport = reportList.bulanan;
    const yearlyReport = reportList.tahunan;

    const prevDialy = dialyReport[dialyReport?.length - 2] || 0;
    const nextDialy = dialyReport[dialyReport?.length - 1] || 0;

    const prevWeekly = weeklyReport[weeklyReport?.length - 2] || 0;
    const nextWeekly = weeklyReport[weeklyReport?.length - 1] || 0;

    const prevMonthly = monthlyReport[monthlyReport?.length - 2] || 0;
    const nextMonthly = monthlyReport[monthlyReport?.length - 1] || 0;

    const prevYearly = yearlyReport[yearlyReport?.length - 2] || 0;
    const nextYearly = yearlyReport[yearlyReport?.length - 1] || 0;
    // console.log({ prevDialy, nextDialy, prevWeekly, nextWeekly, prevMonthly, nextMonthly, prevYearly, nextYearly });

    const result = [
        {
            id: 1,
            category: "Order",
            title: "Total Pesanan",
            contents: [
                {
                    id: 1,
                    title: "Dialy Order",
                    prev: prevDialy?.totalTransactions || 0,
                    next: nextDialy?.totalTransactions || 0,
                    comparativeWords: "Dari kemarin."
                },
                {
                    id: 2,
                    title: "Weekly Order",
                    prev: prevWeekly?.totalTransactions || 0,
                    next: nextWeekly?.totalTransactions || 0,
                    comparativeWords: "Dari minggu lalu."
                },
                {
                    id: 3,
                    title: "Monthly Order",
                    prev: prevMonthly?.totalTransactions || 0,
                    next: nextMonthly?.totalTransactions || 0,
                    comparativeWords: "Dari bulan lalu."
                },
                {
                    id: 4,
                    title: "Yearly Order",
                    prev: prevYearly?.totalTransactions || 0,
                    next: nextYearly?.totalTransactions || 0,
                    comparativeWords: "Dari tahun lalu."
                },
            ]
        },
        {
            id: 2,
            category: "Income",
            title: "Total Pendapatan",
            contents: [
                {
                    id: 1,
                    title: "Dialy Income",
                    prev: prevDialy?.totalIncome || 0,
                    next: nextDialy?.totalIncome || 0,
                    comparativeWords: "Dari kemarin."
                },
                {
                    id: 2,
                    title: "Weekly Income",
                    prev: prevWeekly?.totalIncome || 0,
                    next: nextWeekly?.totalIncome || 0,
                    comparativeWords: "Dari minggu lalu."
                },
                {
                    id: 3,
                    title: "Monthly Income",
                    prev: prevMonthly?.totalIncome || 0,
                    next: nextMonthly?.totalIncome || 0,
                    comparativeWords: "Dari bulan lalu."
                },
                {
                    id: 4,
                    title: "Yearly Income",
                    prev: prevYearly?.totalIncome || 0,
                    next: nextYearly?.totalIncome || 0,
                    comparativeWords: "Dari tahun lalu."
                },
            ]
        },

    ]
    return result;
}