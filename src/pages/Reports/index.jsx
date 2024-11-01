import DefaultLayout from "@layouts/Default";
import StatisticCard from "@mods/Dashboard/statisticCard";
import Header from "@mods/Header/header";
import TabMenu from "@mods/Reports/TabMenu";
import Sidebar from "@mods/Sidebar/sidebar";
import { BRANCH_LIST_REPORT } from "@/constants/branchList";
import { ORDER_TYPE } from "@/constants/orderType";
import { REPORT_STATISTIC_TITLE_LIST, REPORT_TYPE_LIST } from "@/constants/reportList";
import EachUtils from "@/utils/eachUtils";

const Reports = () => {
    return (
        <DefaultLayout>
            <Sidebar />
            <Header hasButton={false} hasDropdown branchList={BRANCH_LIST_REPORT} />
            <div className="my-6 flex flex-col items-center gap-4 justify-center ">
                <TabMenu layoutId="orderType" contents={ORDER_TYPE} />
                <TabMenu layoutId="reportType" contents={REPORT_TYPE_LIST} />
            </div>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-10 mt-10'>
                <EachUtils of={REPORT_STATISTIC_TITLE_LIST} render={(item, index) => {
                    return <StatisticCard title={item.title} />;
                }} />
            </div>
        </DefaultLayout>
    );
};

export default Reports;