import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';

import { Pagination } from 'swiper/modules';

import { RiMoneyEuroCircleFill } from "react-icons/ri";
import { LuClipboardList } from "react-icons/lu";
import { BsGraphDownArrow } from "react-icons/bs";
import { BsGraphUpArrow } from "react-icons/bs";

const ReportSummaryCard = ({ content }) => {

    const currentSummary = content.contents[0];
    const { prev, next } = currentSummary;
    const isIncrease = prev < next;
    const precentage = ((next - prev) / prev) * 100;
    const formatedPrice = content.category.toLowerCase() === "profit" ? new Intl.NumberFormat('id-ID').format(next) : next;

    return (
        <div className="flex gap-2 items-center border rounded shadow p-2">
            <div className="bg-blue-200 p-1 rounded">
                <RiMoneyEuroCircleFill color="#3b82f6" size={30} />
            </div>
            <div className="flex flex-col gap-1">
                <h4>{content.title}</h4>
                <p className="font-semibold">{formatedPrice}</p>
                <div className="flex items-center gap-1">
                    <div className="flex items-center gap-1 font-semibold" style={{ color: isIncrease ? '#22c55e' : '#ef4444' }}>
                        {isIncrease ? <BsGraphUpArrow /> : <BsGraphDownArrow />}
                        <p>{`${precentage.toFixed(2)}%`} </p>
                    </div>
                    {currentSummary.comparativeWords.toLowerCase()}.
                </div>
            </div>
        </div>
    )
}

export default ReportSummaryCard