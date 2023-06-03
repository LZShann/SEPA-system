import { React, useState } from 'react';
//icons
import { IoIosMore } from 'react-icons/io';
import { MdOutlineBarChart, MdAddChart, MdOutlineCancel } from 'react-icons/md';
import { AiOutlineLineChart } from 'react-icons/ai';
import { BsFillPieChartFill } from 'react-icons/bs';
import { HiOutlineRefresh } from 'react-icons/hi';

//components
import { StackedTopSalesProduct, BarTotalSales, BarTop10Customers, BarSalesByRegion2, Button, LineChart, SparkLine, ModalBarChart} from '../components';
import { weeklyStats, SparklineAreaData } from '../data/dummy';
import { useStateContext } from '../contexts/ContextProvider';
// import BarChartKPI from '../components/Charts/BarChartKPI';

import './Statistic.css';

const Statistic = () => {
  const { currentColor } = useStateContext();

  const [modalOpen, setModalOpen] = useState(false);
  const [chart1Visible, setChart1Visible] = useState(false);
  const [chart2Visible, setChart2Visible] = useState(false);
  const [chart3Visible, setChart3Visible] = useState(false);
  const [chart4Visible, setChart4Visible] = useState(false);

  // Icon Block Component
  function IconBlock({ icon, desc, title, iconColor, iconBg, onClick }) {
    return (
      <div className="bg-white h-44 md:w-56 p-4 pt-9 rounded-2xl">
        <button
          type="button"
          style={{ color: iconColor, backgroundColor: iconBg }}
          className="text-2xl opacity-0.9 rounded-full  p-4 hover:drop-shadow-xl"
          onClick={onClick}
        >
          {icon}
        </button>
        <p className="mt-3">
          <span className="text-lg font-semibold">{title}</span>
        </p>
        <p className="text-sm text-gray-400  mt-1">{desc}</p>
      </div>
    );
  }

  // generate specific chart
  const handleGenerateChart = (chartTitle) => {
    if (chartTitle === 'totalSales') {
      setChart1Visible(true);
    } else if (chartTitle === 'topCustomer') {
      setChart2Visible(true);
    } else if (chartTitle === 'topSalesProducts') {
      setChart3Visible(true);
    }
  };

  // toggle modal visibility
  const handleOpenModal = () => {
    setModalOpen(true);
  };

  // toggle chart visibility
  const toggleChartVisibility = (chartId) => {
    if (chartId === 'chart1') {
      setChart1Visible(!chart1Visible);
    } else if (chartId === 'chart2') {
      setChart2Visible(!chart2Visible);
    } else if (chartId === 'chart3') {
      setChart3Visible(!chart3Visible);
    }
  };

  return (
    //here can edit background color
    <div className="mt-20">
      <div className="flex flex-wrap lg:flex-nowrap justify-center">
        <div className="flex m-3 flex-wrap justify-center gap-1 items-center">
          <IconBlock
            icon={<MdOutlineBarChart />}
            desc="Chart"
            title="Bar"
            iconColor="#03C9D7"
            iconBg="#E5FAFB"
            onClick={handleOpenModal}
          />

          {modalOpen && <ModalBarChart setOpenModal={setModalOpen} onGenerateChart={handleGenerateChart} />}
          <IconBlock
            icon={<AiOutlineLineChart />}
            desc="Chart"
            title="Line"
            iconColor="rgb(255, 244, 229)"
            iconBg="rgb(254, 201, 15)"
            onClick={() => alert('Display line chart pop-up window2')}
          />
          <IconBlock
            icon={<BsFillPieChartFill />}
            desc=""
            title="Coming Soon"
            iconColor="rgb(228, 106, 118)"
            iconBg="rgb(255, 244, 229)"
            onClick={() => alert('Coming soon')}
          />
          <IconBlock
            icon={<HiOutlineRefresh />}
            desc=""
            title="Coming Soon 1"
            iconColor="rgb(0, 194, 146)"
            iconBg="rgb(235, 250, 242)"
            onClick={() => alert('Coming soon3')}
          />
        </div>
      </div>

      {chart1Visible && (
      <div className="flex gap-10 flex-wrap justify-center">
        <div className="bg-white m-3 p-4 rounded-2xl md:w-780  ">
          <div className="flex justify-between">
            <p className="font-semibold text-xl" id = "totalSalesTitle">Title</p>
            <span className="ml-auto text-2xl cursor-pointer closeChart" onClick={() => toggleChartVisibility('chart1')}>
                <MdOutlineCancel />
              </span>
          </div>
          <div className="mt-10 flex gap-10 flex-wrap justify-center">
            <div className=" border-r-1 border-color m-4 pr-10">
              <div>
                <p>
                  <span className="text-3xl font-semibold" id="totalSales">RM 0</span>
                </p>
                <p className="text-gray-500 mt-1">Total</p>
              </div>
              <div className="mt-10">
                <Button
                  color="white"
                  bgColor={currentColor}
                  text="Download Report"
                  borderRadius="10px"
                />
              </div>
            </div>
            <div>
              <BarTotalSales width="320px" height="360px" />
            </div>
          </div>
        </div>
      </div>
      )}

      {chart3Visible && (
        <div className="flex gap-10 flex-wrap justify-center">
          <div className="bg-white m-3 p-4 rounded-2xl md:w-780  ">
            <div className="flex justify-between">
              <p className="font-semibold text-xl" id="topSalesProductTitle">Title</p>
              <span className="ml-auto text-2xl cursor-pointer closeChart" onClick={() => toggleChartVisibility('chart3')}>
                <MdOutlineCancel />
              </span>
            </div>
            <div className="mt-10 flex gap-10 flex-wrap justify-center">
              <div className=" border-r-1 border-color m-4 pr-10">
                <div>
                  <p>
                    <span className="text-3xl font-semibold" id="highestRevenue">RM 0</span>
                    <span className="p-1.5 hover:drop-shadow-xl cursor-pointer rounded-full text-white bg-green-400 ml-3 text-xs" id="highestRevenuePercentage">
                      00.00%
                    </span>
                  </p>
                  <p className="text-gray-500 mt-1">Highest</p>
                </div>
                <div className="mt-8">
                  <p className="text-3xl font-semibold" id="lowestRevenue">RM 0</p>

                <p className="text-gray-500 mt-1">Lowest</p>
              </div>
              <div className="mt-10">
                <Button
                  color="white"
                  bgColor={currentColor}
                  text="Download Report"
                  borderRadius="10px"
                />
              </div>
            </div>
            <div>
              <StackedTopSalesProduct width="320px" height="360px" />
            </div>
          </div>
        </div>
      </div>

      )}



      <div className="flex gap-10 flex-wrap justify-center">
        <div className="bg-white m-3 p-4 rounded-2xl md:w-780  ">
          <div className="flex justify-between">
            <p className="font-semibold text-xl" id = "top10CustomersTitle">Title</p>
          </div>
          <div className="mt-10 flex gap-10 flex-wrap justify-center">
            <div className=" border-r-1 border-color m-4 pr-10">
              <div>
                <p>
                  <span className="text-3xl font-semibold" id="topCustomerSales">RM 0</span>
                </p>
                <p className="text-gray-500 mt-1">Highest</p>
              </div>
              <div className="mt-8">
                <p className="text-3xl font-semibold" id="lowestCustomerSales">RM 0</p>

                <p className="text-gray-500 mt-1">Lowest</p>
              </div>
              <div className="mt-10">
                <Button
                  color="white"
                  bgColor={currentColor}
                  text="Download Report"
                  borderRadius="10px"
                />
              </div>
            </div>
            <div>
              <BarTop10Customers width="320px" height="360px" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-10 flex-wrap justify-center">
        <div className="bg-white m-3 p-4 rounded-2xl md:w-780  ">
          <div className="flex justify-between">
            <p className="font-semibold text-xl" id = "SalesByRegion2Title">Title</p>
          </div>
          <div className="mt-10 flex gap-10 flex-wrap justify-center">
            <div className=" border-r-1 border-color m-4 pr-10">
              <div>
                <p>
                  <span className="text-3xl font-semibold" id="topSalesByRegion2">0%</span>
                </p>
                <p className="text-gray-500 mt-1">Highest</p>
              </div>
              <div className="mt-8">
                <p className="text-3xl font-semibold" id="lowestSalesByRegion2">0%</p>

                <p className="text-gray-500 mt-1">Lowest</p>
              </div>
              <div className="mt-10">
                <Button
                  color="white"
                  bgColor={currentColor}
                  text="Download Report"
                  borderRadius="10px"
                />
              </div>
            </div>
            <div>
              <BarSalesByRegion2 width="320px" height="360px" />
            </div>
          </div>
        </div>
      </div>
      

      <div className="flex flex-wrap justify-center">
        <div className="md:w-400 bg-white rounded-2xl p-6 m-3">
          <div className="flex justify-between">
            <p className="text-xl font-semibold">Revenue By Month 2021</p>
            <button type="button" className="text-xl font-semibold text-gray-500">
              <IoIosMore />
            </button>
          </div>
          <div className="mt-10 ">
            {weeklyStats.map((item) => (
              <div key={item.title} className="flex justify-between mt-4 w-full">
                <div className="flex gap-4">
                  <button
                    type="button"
                    style={{ background: item.iconBg }}
                    className="text-2xl hover:drop-shadow-xl text-white rounded-full p-3"
                  >
                    {item.icon}
                  </button>
                  <div>
                    <p className="text-md font-semibold">{item.title}</p>
                    <p className="text-sm text-gray-400">{item.desc}</p>
                  </div>
                </div>

                <p className={`text-${item.pcColor}`}>{item.amount}</p>
              </div>
            ))}
            <div className="mt-4">
              <SparkLine currentColor={currentColor} id="area-sparkLine" height="160px" type="Area" data={SparklineAreaData} width="320" color="rgb(242, 252, 253)" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistic;