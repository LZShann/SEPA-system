import { React, useState, useEffect } from 'react';

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
import { supabase } from "../client";

import './Statistic.css';
import { func } from 'prop-types';

const Statistic = () => {
  const { activeMenu } = useStateContext();
  const { currentColor } = useStateContext();

  const [modalOpen, setModalOpen] = useState(false);
  const [chart1Visible, setChart1Visible] = useState(false);
  const [chart2Visible, setChart2Visible] = useState(false);
  const [chart3Visible, setChart3Visible] = useState(false);
  const [chart4Visible, setChart4Visible] = useState(false);

  const userName = sessionStorage.getItem('currentUserName');
  const userDepartment = sessionStorage.getItem('currentUserDepartment');
  // console.log('User:', userName);
  // console.log('Department:', userDepartment);

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

  // KPI sections
  const targetedKPI1 = 20, targetedKPI2 = 30, targetedKPI3 = 50;
  const [actualKPI1, setActualKPI1] = useState(0);
  const [actualKPI2, setActualKPI2] = useState(0);
  const [actualKPI3, setActualKPI3] = useState(0);
  const [KPI1, setKPI1] = useState(0);
  const [KPI2, setKPI2] = useState(0);
  const [KPI3, setKPI3] = useState(0);
  const [percentage, setPercentage] = useState(0);

  // calculate percentage for KPI 1, 2, 3
  useEffect(() => {
    function calculateKPI() {
      setKPI1(Math.ceil((actualKPI1 / targetedKPI1) * 100));
      setKPI2(Math.ceil((actualKPI2 / targetedKPI2) * 100));
      setKPI3(Math.ceil((actualKPI3 / targetedKPI3) * 100));
    }
    calculateKPI();

    setPercentage(actualKPI1 + actualKPI2 + actualKPI3);
    // console.log("actualKPI1:" + actualKPI1);
    // console.log("actualKPI2:" + actualKPI2);
    // console.log("actualKPI3:" + actualKPI3);
    // console.log("KPI1:" + KPI1);
    // console.log("percentage:" + percentage);
  }, [actualKPI1, actualKPI2, actualKPI3]);

  // Data Setter
  const [isChurned, setIsChurned] = useState(null);
  const [currentMonthData, setCurrentMonthError] = useState(null);
  const [previousMonthData, setPreviousMonthError] = useState(null);
  const [churnAccountRate, setChurnAccountRate] = useState(null);

  const [increaseRate, setIncreaseRate] = useState(null);
  const [increaseRevenue, setIncreaseRevenue] = useState(null);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    if (userDepartment === 'Sales') {
      const fetchSalesKPI = async () => {
        // First KPI
        // Formula:
        // First KPI = (Last Month Churn Rate - Current Churn Rate) * 100
        let { data: isChurned, error } = await supabase
          .from('customer_data_entry') // Table name
          .select('is_churned_account')

        if (error) {
          setFetchError('Could not fetch data from customer_data_entry');
          setIsChurned(null);
          console.log('error', error);
        }

        if (isChurned) {
          setFetchError(null);
          setIsChurned(isChurned);
          const totalCustomers = isChurned.length;
          const lastMonthChurn = 30; // Assuming last month's churn rate is 45%
          const currentChurnAccount = isChurned.reduce((count, account) => {
            if (account.is_churned_account) {
              return count + 1;
            }
            return count;
          }, 0);
          const currentChurnRate = Math.ceil((currentChurnAccount / totalCustomers) * 100);
          const churnRate = lastMonthChurn - currentChurnRate;
          setChurnAccountRate(churnRate);
          // KPI 1 formula
          if (churnRate >= 4) {
            setActualKPI1((100 / 100) * targetedKPI1);
          } else if (churnRate >= 2 && churnRate <= 3) {
            setActualKPI1((80 / 100) * targetedKPI1);
          } else if (churnRate >= 0 && churnRate <= 1) {
            setActualKPI1((60 / 100) * targetedKPI1);
          } else if (churnRate < 0) {
            setActualKPI1((40 / 100) * targetedKPI1);
          }


          // Second KPI
          // Formula: 
          // Second KPI = (Current Average Revenue per Customer / Previous Average Revenue per Customer - 1) * 100
          // Get the current date
          const currentDate = new Date();

          // Calculate the start and end dates for the current month
          const currentMonthStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
          const currentMonthEnd = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

          // Calculate the start and end dates for the previous month
          const previousMonthStart = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
          const previousMonthEnd = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);

          // Format the dates as strings in the format 'MM/DD/YYYY'
          const currentMonthStartStr = `${currentMonthStart.getMonth() + 1}/${currentMonthStart.getDate()}/${currentMonthStart.getFullYear()}`;
          const currentMonthEndStr = `${currentMonthEnd.getMonth() + 1}/${currentMonthEnd.getDate()}/${currentMonthEnd.getFullYear()}`;
          const previousMonthStartStr = `${previousMonthStart.getMonth() + 1}/${previousMonthStart.getDate()}/${previousMonthStart.getFullYear()}`;
          const previousMonthEndStr = `${previousMonthEnd.getMonth() + 1}/${previousMonthEnd.getDate()}/${previousMonthEnd.getFullYear()}`;

          // Retrieve the current month's data and previous month's data based on the order date
          const { data: currentMonthData, error: currentMonthError } = await supabase
            .from('sales_data_entry')
            .select('*, product:products_data_entry(*)')
            .gte('order_date', currentMonthStartStr)
            .lte('order_date', currentMonthEndStr);

          const { data: previousMonthData, error: previousMonthError } = await supabase
            .from('sales_data_entry')
            .select('*, product:products_data_entry(*)')
            .gte('order_date', previousMonthStartStr)
            .lte('order_date', previousMonthEndStr);

          if (currentMonthData && previousMonthData) {
            setCurrentMonthError(null);
            setPreviousMonthError(null);

            var currentTotalRevenue = 0; // Used to find total revenue for the current month
            currentMonthData.forEach((item) => {
              const revenue = item['quantity'] * item['product']['unit_price']; // Revenue formula
              currentTotalRevenue += revenue;
            });
            console.log("Current total revenue: " + currentTotalRevenue);
            var previousTotalRevenue = 0; // Used to find total revenue for the previous month
            previousMonthData.forEach((item) => {
              const revenue = item['quantity'] * item['product']['unit_price']; // Revenue formula
              previousTotalRevenue += revenue;
            });
            console.log("Previous total revenue: " + previousTotalRevenue);
            var currentAverageRevenue = currentTotalRevenue / totalCustomers; // Average revenue for the current month
            var previousAverageRevenue = previousTotalRevenue / totalCustomers; // Average revenue for the previous month
            var increaseRate = Math.ceil(((currentAverageRevenue / previousAverageRevenue) - 1) * 100);
            console.log("currentAverageRevenue: " + currentAverageRevenue);
            console.log("previousAverageRevenue: " + previousAverageRevenue);
            setIncreaseRate(increaseRate);
            console.log("Increase rate: " + increaseRate);
            if (increaseRate >= 8) {
              setActualKPI2((100 / 100) * targetedKPI2);
            } else if (increaseRate >= 4 && increaseRate <= 7) {
              setActualKPI2((80 / 100) * targetedKPI2);
            } else if (increaseRate >= 1 && increaseRate <= 3) {
              setActualKPI2((60 / 100) * targetedKPI2);
            } else {
              setActualKPI2((40 / 100) * targetedKPI2);
            }
          }

          // Third KPI
          // Formula: 
          // Second KPI = ((currentRevenue - baseRevenue(lastmonth)) / baseRevenue(lastmonth)) * 100;
          var increaseRevenue = Math.ceil(((currentTotalRevenue - previousTotalRevenue) / previousTotalRevenue) * 100);
          console.log("Increase revenue: " + increaseRevenue);
          setIncreaseRevenue(increaseRevenue);
          if (increaseRevenue >= 4) {
            setActualKPI3((100 / 100) * targetedKPI3);
          } else if (increaseRevenue >= 2 && increaseRevenue <= 3) {
            setActualKPI3((80 / 100) * targetedKPI3);
          } else if (increaseRevenue >= 0 && increaseRevenue <= 1) {
            setActualKPI3((60 / 100) * targetedKPI3);
          } else if (increaseRevenue < 0) {
            setActualKPI3((40 / 100) * targetedKPI3);
          }
        }
      };
      fetchSalesKPI();
    }

    if (userDepartment === 'Administrative') {
      // const fetchAccount = async () => {
      //   let { data, error } = await supabase
      //     .from('customer_data_entry') // Table name
      //     .select('increase_average_revenue')

      //   if (error) { // for error checking only 
      //   }
      // };
      // fetchAccount();
      setActualKPI1(10);
      setActualKPI2(10);
      setActualKPI3(20);
    }
    if (userDepartment === 'Marketing') {
      setActualKPI1(10);
      setActualKPI2(20);
      setActualKPI3(40);
    }
  }, []);



  // Function to render KPI Performance section (reusable)
  const renderKPIPerformance = () => {
    return (
      <div className="grid grid-cols-2 pt-4">
        <div>
          <div className="grid grid-rows-2 gap-1">
            <div className="text-lg font-semibold">KPI Performance</div>
            <div className="flex">
              <span
                className={`text-statistic ${percentage >= 90
                  ? 'text-excellent'
                  : percentage >= 70
                    ? 'text-good'
                    : percentage >= 50
                      ? 'text-average'
                      : 'text-worst'
                  }`}
              >
                {percentage >= 90
                  ? 'Excellent'
                  : percentage >= 70
                    ? 'Good'
                    : percentage >= 50
                      ? 'Average'
                      : 'Worst'}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div className="border-l-2 border-gray-300 h-16 mx-4"></div>
          <span
            className={`percentage ${percentage >= 90
              ? 'bg-excellent'
              : percentage >= 70
                ? 'bg-good'
                : percentage >= 50
                  ? 'bg-average'
                  : 'bg-worst'
              } text-white ml-3`}
          >
            {percentage}%
          </span>
        </div>
      </div>
    );
  };

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
                  {renderKPIPerformance()}

                </div>
                {/* Second Column */}
                <div>
                  <div className="text-lg font-semibold">Objective: Increase revenue growth</div>
                  {userDepartment === 'Sales' && (
                    <ul>
                      <li>
                        <span className="tooltip target-text" data-tooltip="Reduce key account churn rate by 5%">
                          Target 1:
                          <span className="percentage-span" data-actual-score={actualKPI1} data-targeted-score={targetedKPI1}>
                            {KPI1}% | {churnAccountRate}/5%
                          </span>
                        </span>
                      </li>
                      <li>
                        <span className="tooltip target-text" data-tooltip="Increase total average revenue per customer by at least 7%">
                          Target 2:
                          <span className="percentage-span" data-actual-score={actualKPI2} data-targeted-score={targetedKPI2}>
                            {KPI2}% | {increaseRate}/7%
                          </span>
                        </span>
                      </li>
                      <li>
                        <span className="tooltip target-text" data-tooltip="Increase revenue from current base on existing product lines by 5%">
                          Target 3:
                          <span className="percentage-span" data-actual-score={actualKPI3} data-targeted-score={targetedKPI3}>
                            {KPI3}% | {increaseRevenue}/5%
                          </span>
                        </span>
                      </li>
                    </ul>
                  )}
                  {userDepartment === 'Administrative' && (
                    <ul>
                      <li>
                        <span className="tooltip target-text" data-tooltip="Ensure that all the teams agree on folder structures and put them into effect">
                          Target 1:
                          <span className="percentage-span" data-actual-score={actualKPI1} data-targeted-score={targetedKPI1}>
                            {KPI1}% |
                          </span>
                        </span>
                      </li>
                      <li>
                        <span className="tooltip target-text" data-tooltip="Make sure that all the teams complete the transfer and consolidation of all documents into the new structure 100% of the time">
                          Target 2:
                          <span className="percentage-span" data-actual-score={actualKPI2} data-targeted-score={targetedKPI2}>
                            {KPI2}% | 
                          </span>
                        </span>
                      </li>
                      <li>
                        <span className="tooltip target-text" data-tooltip="Gather feedback from all users, and make sure >80% (positive)">
                          Target 3:
                          <span className="percentage-span" data-actual-score={actualKPI3} data-targeted-score={targetedKPI3}>
                            {KPI3}% | 
                          </span>
                        </span>
                      </li>
                    </ul>
                  )}
                  {userDepartment === 'Marketing' && (
                    <ul>
                      <li>
                        <span className="tooltip target-text" data-tooltip="Increase monthly number of new trial signups by 20%">
                          Target 1:
                          <span className="percentage-span" data-actual-score={actualKPI1} data-targeted-score={targetedKPI1}>
                            {KPI1}% | 
                          </span>
                        </span>
                      </li>
                      <li>
                        <span className="tooltip target-text" data-tooltip="Increase Monthly Active Users from 5000 to 8000">
                          Target 2:
                          <span className="percentage-span" data-actual-score={actualKPI2} data-targeted-score={targetedKPI2}>
                            {KPI2}% | 
                          </span>
                        </span>
                      </li>
                      <li>
                        <span className="tooltip target-text" data-tooltip="Increase the trial to paid plan conversion rate by 15%">
                          Target 3:
                          <span className="percentage-span" data-actual-score={actualKPI3} data-targeted-score={targetedKPI3}>
                            {KPI3}% | 
                          </span>
                        </span>
                      </li>
                    </ul>
                  )}
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