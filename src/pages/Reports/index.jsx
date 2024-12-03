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
    })

    let { data: fetchedBranchList, isPending: isPendingBranchList, isError: isErrorBranchList, } = useQuery({
        queryKey: ['branches'],
        queryFn: async () => {
            const response = await apiInstance('branch');
            setBranchList(response.data.data);
            return response.data.data;
        },
        retry: false,
        enabled: !loadAuthData,
        refetchOnWindowFocus: false
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

    useEffect(() => {
        if (!isPendingBranchList) {
            setSelectedBranchReport({
                id: branchList[0]._id || "",
                name: branchList[0].name
            })
            setBranchList(prev => {
                const updatedBranchList = [...prev, { name: "Semua", _id: "all" }];
                return updatedBranchList;
            });
        }
    }, [isPendingBranchList]);

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

                // if (key === 'harian') console.table(currentReportList);
                currentReportList.reverse();
                // if (key === 'harian') console.table(currentReportList);
                fetchedReportList[key] = [...currentReportList];
                setReportList(prev => ({
                    ...prev,
                    [key]: [...currentReportList]
                }))
            }

        }
    }, [isPendingReportList, fetchedReportList])

    const handleSelectBranchReport = (branch) => {
        setSelectedBranchReport({
            id: branch?._id || "all",
            name: branch?.name || ""
        });
        refetchReportList();
    }

    return (
        <DefaultLayout>
            <Sidebar />
            {!isPendingBranchList && !isPendingReportList && <>
                <Header hasButton={false} hasBranchBtn isReports selectedBranch={selectedBranchReport} branchList={branchList} onSelect={handleSelectBranchReport} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                    <EachUtils of={SUMMARY_REPORT_LIST} render={(item, index) => {
                        return <ReportSummaryCard content={item} key={index} />
                    }} />
                </div>

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