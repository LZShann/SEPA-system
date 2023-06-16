import { React, useState } from 'react';

import { Navbar, Footer, Sidebar, Header } from '../components';
import '../App.css';

//icons
import { IoIosMore } from 'react-icons/io';
import { MdOutlineBarChart, MdAddChart, MdOutlineCancel } from 'react-icons/md';
import { AiOutlineLineChart } from 'react-icons/ai';

//components
import { StackedTopSalesProduct, BarTotalSales, BarTop10Customers, BarSalesByRegion2, Button, LineChart, SparkLine, ModalBarChart } from '../components';
import { weeklyStats, SparklineAreaData } from '../data/dummy';
import { useStateContext } from '../contexts/ContextProvider';
// import BarChartKPI from '../components/Charts/BarChartKPI';

import './Statistic.css';

const Statistic = () => {
  const { activeMenu } = useStateContext();
  const { currentColor } = useStateContext();

  const [modalOpen, setModalOpen] = useState(false);
  const [chart1Visible, setChart1Visible] = useState(false);
  const [chart2Visible, setChart2Visible] = useState(false);
  const [chart3Visible, setChart3Visible] = useState(false);
  const [chart4Visible, setChart4Visible] = useState(false);

  const userName = sessionStorage.getItem('currentUserName');
  console.log('HERE:', userName);

  // Icon Block Component
  function IconBlock({ icon, desc, title, iconColor, iconBg, onClick }) {
    return (
      <div className="bg-white h-44 md:w-44 p-8 pt-7 border-gray-300 border-2 rounded-2xl">
        <button
          type="button"
          style={{ color: iconColor, backgroundColor: iconBg }}
          className="text-3xl opacity-0.9 rounded-full p-4 hover:drop-shadow-xl"
          onClick={onClick}
        >
          {icon}
        </button>
        <p className="mt-3">
          <span className="text-2xl font-semibold">{title}</span>
        </p>
        <p className="text-sm text-gray-400">{desc}</p>
      </div>
    );
  };

  // generate specific chart
  const handleGenerateChart = (chartTitle) => {
    if (chartTitle === 'totalSales') {
      setChart1Visible(true);
    } else if (chartTitle === 'topCustomer') {
      setChart2Visible(true);
    } else if (chartTitle === 'topSalesProducts') {
      setChart3Visible(true);
    } else if (chartTitle === 'topSalesByRegionByMonth') {
      setChart4Visible(true);
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
    } else if (chartId === 'chart4') {
      setChart4Visible(!chart4Visible);
    }
  };
  const percentage = 90;
  var actual = 10;
  var targeted = 20;
  const KPI1 = actual/targeted*100;
  const KPI2 = 50;
  const KPI3 = 70;

  return (
    //here can edit background color
    <div className='flex relative'>
      {activeMenu ? (
        <div className="w-72 fixed sidebar bg-main-bg">
          <Sidebar />
        </div>
      ) : (
        <div className="w-0">
          <Sidebar />
        </div>
      )}
      <div
        className={
          activeMenu
            ? 'bg-main-bg min-h-screen md:ml-72 w-full  '
            : 'bg-main-bg w-full min-h-screen flex-2 '
        }
      >
        <div className="fixed md:static bg-main-bg navbar w-full ">
          <Navbar />
        </div>
        <div className="m-2 md:m-10 mt-5 md:mt-10 p-2 md:p-5 bg-gray-100 rounded-3xl">
          <Header category="Dashboard" title="Statistic" />
          <div className="flex flex-wrap lg:flex-nowrap justify-center">
            <div className="flex m-3 flex-wrap justify-center gap-1 items-center">
              <div className="m-2 md:m-4">
                <IconBlock
                  icon={<MdOutlineBarChart />}
                  desc="Chart"
                  title="Bar"
                  iconColor="#03C9D7"
                  iconBg="#E5FAFB"
                  onClick={handleOpenModal}
                />
                {modalOpen && <ModalBarChart setOpenModal={setModalOpen} onGenerateChart={handleGenerateChart} />}
              </div>
              <div className="m-2 md:m-4">
                <IconBlock
                  icon={<AiOutlineLineChart />}
                  desc="Chart"
                  title="Line"
                  iconColor="rgb(255, 244, 229)"
                  iconBg="rgb(254, 201, 15)"
                  onClick={() => alert('Display line chart pop-up window2')}
                />
              </div>

              {/* KPI Performance */}
              <div className="grid grid-cols-2 gap-6 m-5 md:m-10 bg-white p-5 pt-6 border-gray-300 border-2 rounded-2xl">
                <div>
                  {/* Content for the first column */}
                  <div className="grid grid-cols-2 pt-4">
                    <div>
                      <div className="grid grid-rows-2 gap-1">
                        <div className="text-lg font-semibold">KPI Performance</div>
                        <div className="flex">
                          <span className={`text-statistic ${percentage >= 90 ? 'text-excellent' : percentage >= 70 ? 'text-good' : percentage >= 50 ? 'text-average' : 'text-worst'}`}>
                            {percentage >= 90 ? 'Excellent' : percentage >= 70 ? 'Good' : percentage >= 50 ? 'Average' : 'Worst'}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-center">
                      <div className="border-l-2 border-gray-300 h-16 mx-4"></div>
                      <span className={`percentage ${percentage >= 90 ? 'bg-excellent' : percentage >= 70 ? 'bg-good' : percentage >= 50 ? 'bg-average' : 'bg-worst'} text-white ml-3`}>
                        {percentage}%
                      </span>
                    </div>
                  </div>
                </div>
                {/* Second Column */}
                <div>
                  <div className="text-lg font-semibold">Objective: Increase revenue growth</div>
                  <ul>
                    <li>
                      <span className="tooltip target-text" data-tooltip="Reduce key account churn rate by 5%">
                        Target 1 :
                        <span className="percentage-span" data-actual-score="10" data-targeted-score="20">{KPI1}%</span>
                      </span>
                    </li>
                    <li>
                      <span className="tooltip target-text" data-tooltip="Increase total average revenue per customer by at least 7%">
                        Target 2 :
                        <span className="percentage-span" data-actual-score="30" data-targeted-score="30">{KPI2}%</span>
                      </span>
                    </li>
                    <li>
                      <span className="tooltip target-text" data-tooltip="Increase revenue from current base on existing product lines by 5%">
                        Target 3 :
                        <span className="percentage-span" data-actual-score="50" data-targeted-score="50">{KPI3}%</span>
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
              {/* END here */}
            </div>
          </div>

          {chart1Visible && (
            <div className="flex gap-10 flex-wrap justify-center">
              <div className="bg-white m-3 p-4 rounded-2xl md:w-780  ">
                <div className="flex justify-between">
                  <p className="font-semibold text-xl" id="totalSalesTitle">Title</p>
                  <span className="closeChart" onClick={() => toggleChartVisibility('chart1')}>
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

          {chart2Visible && (
            <div className="flex gap-10 flex-wrap justify-center">
              <div className="bg-white m-3 p-4 rounded-2xl md:w-780  ">
                <div className="flex justify-between">
                  <p className="font-semibold text-xl" id="top10CustomersTitle">Title</p>
                  <span className="closeChart" onClick={() => toggleChartVisibility('chart2')}>
                    <MdOutlineCancel />
                  </span>
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
          )}

          {chart3Visible && (
            <div className="flex gap-10 flex-wrap justify-center">
              <div className="bg-white m-3 p-4 rounded-2xl md:w-780  ">
                <div className="flex justify-between">
                  <p className="font-semibold text-xl" id="topSalesProductTitle">Title</p>
                  <span className="closeChart" onClick={() => toggleChartVisibility('chart3')}>
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

          {chart4Visible && (
            <div className="flex gap-10 flex-wrap justify-center">
              <div className="bg-white m-3 p-4 rounded-2xl md:w-780  ">
                <div className="flex justify-between">
                  <p className="font-semibold text-xl" id="SalesByRegion2Title">Title</p>
                  <span className="closeChart" onClick={() => toggleChartVisibility('chart4')}>
                    <MdOutlineCancel />
                  </span>
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
          )}


          <div className="flex flex-wrap justify-center">
            <div className="md:w-400 bg-white p-6 m-3 border-gray-300 border-2 rounded-2xl">
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
        <Footer />
      </div>
    </div >
  );
};

export default Statistic;