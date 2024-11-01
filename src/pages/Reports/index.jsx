import DefaultLayout from "@/components/Layouts/Default";
import StatisticCard from "@/components/Modules/Dashboard/statisticCard";
import Header from "@/components/Modules/Header/header";
import TabMenu from "@/components/Modules/Reports/TabMenu";
import { BRANCH_LIST_REPORT } from "@/constants/branchList";
import { ORDER_TYPE } from "@/constants/orderType";
import { REPORT_TYPE_LIST } from "@/constants/reportList";

const Reports = () => {
    return (
        <DefaultLayout>
            <Header hasButton={false} hasDropdown branchList={BRANCH_LIST_REPORT} />
            <div className="my-6 flex flex-col items-center gap-4 justify-center">
                <TabMenu layoutId="orderType" contents={ORDER_TYPE} />
                <TabMenu layoutId="reportType" contents={REPORT_TYPE_LIST} />
            </div>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-10 mt-10'>
                <StatisticCard title={"Penghasilan Harian"} />
                <StatisticCard title={"Cuci Basah"} />
                <StatisticCard title={"Cuci Kering"} />
                <StatisticCard title={"Cuci Kering Setrika"} />
                <StatisticCard title={"Setrika"} />
            </div>
        </DefaultLayout>
    );
};

export default Reports;