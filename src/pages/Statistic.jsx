import { React, useState, useEffect } from 'react';

import { Navbar, Footer, Sidebar, Header } from '../components';
import '../App.css';

//icons
import { IoIosMore } from 'react-icons/io';
import { MdOutlineBarChart, MdAddChart, MdOutlineCancel } from 'react-icons/md';
import { AiOutlineLineChart } from 'react-icons/ai';

//components
import { StackedTopSalesProduct, BarTotalSales, BarTop10Customers, LineTop10Customers, BarSalesByRegion2, Button, SparkLine, ModalBarChart } from '../components';
import { weeklyStats, SparklineAreaData } from '../data/dummy';
import { useStateContext } from '../contexts/ContextProvider';
import { supabase } from "../client";

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

  useEffect(() => {
    const fetchChartDetails = async () => {
      try {
        // Retrieve chart details from the database where chart_status is true
        const { data, error } = await supabase
          .from('chart_generated')
          .select('chart_id, chart_status')
          .eq('chart_status', true)
          .eq('user_name', userName);

        if (error) {
          console.error('Error retrieving chart details:', error);
          return;
        }

        // Set the chart visibility based on the retrieved data
        data.forEach((chart) => {
          if (chart.chart_id === 'totalSales') {
            setChart1Visible(true);
          } else if (chart.chart_id === 'topCustomer') {
            setChart2Visible(true);
          } else if (chart.chart_id === 'topSalesProducts') {
            setChart3Visible(true);
          } else if (chart.chart_id === 'topSalesByRegionByMonth') {
            setChart4Visible(true);
          }
        });
      } catch (error) {
        console.error('Error retrieving chart details:', error);
      }
    };

    // Fetch chart details when the component mounts
    fetchChartDetails();
  }, []);

  // generate specific chart
  const handleGenerateChart  = async (chartTitle) => {
    if (chartTitle === 'totalSales') {
      setChart1Visible(true);
    } else if (chartTitle === 'topCustomer') {
      setChart2Visible(true);
    } else if (chartTitle === 'topSalesProducts') {
      setChart3Visible(true);
    } else if (chartTitle === 'topSalesByRegionByMonth') {
      setChart4Visible(true);
    }

    try {
      const { data: existingData } = await supabase
        .from('chart_generated')
        .select()
        .eq('chart_id', chartTitle)
        .eq('user_name', userName);
    
      if (existingData.length > 0) {
        //console.log('Chart details already exist');
        await supabase
          .from('chart_generated')
          .update({ chart_status: true })
          .eq('chart_id', chartTitle)
          .eq('user_name', userName);
        console.log('Chart status set to TRUE');
        return;
      }
    } catch (error) {
      console.error('Error storing/updating chart details:', error);
    }
  };

  // toggle modal visibility
  const handleOpenModal = () => {
    setModalOpen(true);
  };

  // Retrieve chart details from the database and update chart status
  useEffect(() => {
    const fetchChartDetails = async () => {
      try {
        // Fetch chart details based on the user name
        const { data, error } = await supabase
          .from('chart_generated')
          .select()
          .eq('user_name', userName);

        if (error) {
          console.error('Error retrieving chart details:', error);
          return;
        }

        // Iterate over the fetched data and update chart status
        data.forEach((chart) => {
          const { chart_id, chart_status } = chart;

          // Set the chart status to false to make it not visible
          if (chart_id === 'chart1') {
            setChart1Visible(chart_status);
          } else if (chart_id === 'chart2') {
            setChart2Visible(chart_status);
          } else if (chart_id === 'chart3') {
            setChart3Visible(chart_status);
          } else if (chart_id === 'chart4') {
            setChart4Visible(chart_status);
          }
        });
      } catch (error) {
        console.error('Error retrieving chart details:', error);
      }
    };

    fetchChartDetails();
  }, [userName]);

  // toggle chart visibility
  const toggleChartVisibility = async (chartId) => {
    let updatedChartStatus = false;

    if (chartId === 'totalSales') {
      setChart1Visible(!chart1Visible);
      updatedChartStatus = !chart1Visible;
    } else if (chartId === 'topCustomer') {
      setChart2Visible(!chart2Visible);
      updatedChartStatus = !chart2Visible;
    } else if (chartId === 'topSalesProducts') {
      setChart3Visible(!chart3Visible);
      updatedChartStatus = !chart3Visible;
    } else if (chartId === 'topSalesByRegionByMonth') {
      setChart4Visible(!chart4Visible);
      updatedChartStatus = !chart4Visible;
    }

    try {
      // Update the chart status in the database
      await supabase
        .from('chart_generated')
        .update({ chart_status: updatedChartStatus })
        .eq('chart_id', chartId)
        .eq('user_name', userName);

      console.log('Chart status set to FALSE');
    } catch (error) {
      console.error('Error updating chart status:', error);
    }
  };

  // KPI sections
  const targetedKPI1 = 40, targetedKPI2 = 30, targetedKPI3 = 30;
  const [actualKPI1, setActualKPI1] = useState(0);
  const [actualKPI2, setActualKPI2] = useState(0);
  const [actualKPI3, setActualKPI3] = useState(0);
  const [KPI1, setKPI1] = useState(0);
  const [KPI2, setKPI2] = useState(0);
  const [KPI3, setKPI3] = useState(0);
  const [percentage, setPercentage] = useState(0);

  // for finding date attributes
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

  // Calculate the start and end dates for the current year
  const currentYearStart = new Date(currentDate.getFullYear(), 0, 1);
  const currentYearEnd = new Date(currentDate.getFullYear(), 11, 31);

  // Calculate the start and end dates for the previous year
  const previousYearStart = new Date(currentDate.getFullYear() - 1, 0, 1);
  const previousYearEnd = new Date(currentDate.getFullYear() - 1, 11, 31);

  // Format the dates as strings in the format 'MM/DD/YYYY'
  const currentYearStartStr = `${currentYearStart.getMonth() + 1}/${currentYearStart.getDate()}/${currentYearStart.getFullYear()}`;
  const currentYearEndStr = `${currentYearEnd.getMonth() + 1}/${currentYearEnd.getDate()}/${currentYearEnd.getFullYear()}`;
  const previousYearStartStr = `${previousYearStart.getMonth() + 1}/${previousYearStart.getDate()}/${previousYearStart.getFullYear()}`;
  const previousYearEndStr = `${previousYearEnd.getMonth() + 1}/${previousYearEnd.getDate()}/${previousYearEnd.getFullYear()}`;

//Production

  const [reducedSetupTime, setReducedSetupTime] = useState(0);
  const [increasedUtilizationRate, setIncreasedUtilizationRate] = useState(0);
  const [reducedUnscheduledMaintenance, setReducedUnscheduledMaintenance] = useState(0);
  
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
  const [fetchError, setFetchError] = useState(null);

  const [currentMonthData, setCurrentMonthData] = useState(null);
  const [CurrentMonthError, setCurrentMonthError] = useState(null);

  const [previousMonthData, setPreviousMonthData] = useState(null);
  const [previousMonthError, setPreviousMonthError] = useState(null);

  const [currentYearData, setCurrentYearData] = useState(null);
  const [currentYearError, setCurrentYearError] = useState(null);

  const [previousYearData, setPreviousYearData] = useState(null);
  const [previousYearError, setPreviousYearError] = useState(null);

  const [productQuantity, setProductQuantity] = useState(null);
  const [productQuantityError, setProductQuantityError] = useState(null);

  // span text setter
  const [churnAccountRate, setChurnAccountRate] = useState(0);
  const [increaseRate, setIncreaseRate] = useState(0);
  const [increaseRevenue, setIncreaseRevenue] = useState(0);

  const [progressPercentage, setProgressPercentage] = useState(0);
  const [newProductLaunched, setNewProductLaunched] = useState(0);
  const [annualChurnRate, setAnnualChurnRate] = useState(0);

  useEffect(() => {
    if (userDepartment === 'Sales') {
      const fetchSalesKPI = async () => {
        // First KPI
        // Formula:(Last Month Churn Rate - Current Churn Rate) * 100
        let { data: isChurned, error: fetchError } = await supabase
          .from('customer_data_entry') // Table name
          .select('is_churned_account')

        if (fetchError) {
          setFetchError('Could not fetch data from customer_data_entry');
          setIsChurned(null);
          console.log('error', fetchError);
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
          //console.log("Current churn rate: " + currentChurnRate);
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
          // Formula:(Current Average Revenue per Customer / Previous Average Revenue per Customer - 1) * 100
          // Retrieve the current month's data and previous month's data based on the order date
          let { data: currentMonthData, error: currentMonthError } = await supabase
            .from('sales_data_entry')
            .select('*, product:products_data_entry(*)')
            .gte('order_date', currentMonthStartStr)
            .lte('order_date', currentMonthEndStr);

          let { data: previousMonthData, error: previousMonthError } = await supabase
            .from('sales_data_entry')
            .select('*, product:products_data_entry(*)')
            .gte('order_date', previousMonthStartStr)
            .lte('order_date', previousMonthEndStr);

          if (currentMonthError || previousMonthError) {
            setFetchError('Could not fetch data from sales_data_entry');
            console.log('error', fetchError);
          }

          if (currentMonthData && previousMonthData) {
            setCurrentMonthData(currentMonthData);
            setPreviousMonthData(previousMonthData);
            setCurrentMonthError(null);
            setPreviousMonthError(null);

            var currentTotalRevenue = 0; // Used to find total revenue for the current month
            currentMonthData.forEach((item) => {
              const revenue = item['quantity'] * item['product']['unit_price']; // Revenue formula
              currentTotalRevenue += revenue;
            });
            // console.log("Current total revenue: " + currentTotalRevenue);
            var previousTotalRevenue = 0; // Used to find total revenue for the previous month
            previousMonthData.forEach((item) => {
              const revenue = item['quantity'] * item['product']['unit_price']; // Revenue formula
              previousTotalRevenue += revenue;
            });
            // console.log("Previous total revenue: " + previousTotalRevenue);
            var currentAverageRevenue = currentTotalRevenue / totalCustomers; // Average revenue for the current month
            var previousAverageRevenue = previousTotalRevenue / totalCustomers; // Average revenue for the previous month
            var increaseRate = Math.ceil(((currentAverageRevenue / previousAverageRevenue) - 1) * 100);
            // console.log("currentAverageRevenue: " + currentAverageRevenue);
            // console.log("previousAverageRevenue: " + previousAverageRevenue);
            setIncreaseRate(increaseRate);
            // console.log("Increase rate: " + increaseRate);
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
          // Formula:((currentRevenue - baseRevenue(lastmonth)) / baseRevenue(lastmonth)) * 100;
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
      setActualKPI1(10);
      setActualKPI2(10);
      setActualKPI3(20);
    }
    if (userDepartment === 'Marketing') {
      setActualKPI1(10);
      setActualKPI2(20);
      setActualKPI3(20);
    }
    
    



    if (userDepartment === 'Production') {
      // Function to fetch data from Supabase and calculate KPIs
      const fetchProductionKPI = async () => {
        try {
          // Fetch data from the Supabase table
          const { data, error } = await supabase
            .from('Production')
            .select('*')
            .eq('Employee', userName);
            console.log(userName)

          if (error) {
            throw new Error(error.message);
          }
      // Find the row that matches the current year
      const currentYearRow = data.find(item => item.Year === currentYear);

      if (currentYearRow) {
        // Calculate KPIs for the current year's row
        const rowWithKPIs = calculateKPIs(currentYearRow, data);
  
        // Print the row with KPIs
        console.table(rowWithKPIs);
  
        // Assign the calculated KPI values to variables
        const {
          kpi1,
          kpi2,
          kpi3
        } = rowWithKPIs;
  
        // Set the KPI values to state variables or use them as needed
        setActualKPI1(kpi1);
        setActualKPI2(kpi2);
        setActualKPI3(kpi3);
        setReducedSetupTime(kpi1); // Assuming reducedSetupTime is the same as kpi1
        setIncreasedUtilizationRate(kpi2);
        setReducedUnscheduledMaintenance(kpi3);
      } else {
        // Data for the current year not found, set KPI values to 0 or handle as desired
        setActualKPI1(0);
        setActualKPI2(0);
        setActualKPI3(0);
        setReducedSetupTime(0);
        setIncreasedUtilizationRate(0);
        setReducedUnscheduledMaintenance(0);
      }
    } catch (error) {
      console.error('Error fetching and calculating KPIs:', error.message);
    }
  };

  // Assuming you have a column for the year in your data, e.g., 'Year'
const currentYear = new Date().getFullYear();
const previousYear = currentYear - 1;

// Calculate KPIs for each row of data
const calculateKPIs = (item, data) => {
  const {
    'Output Units': outputUnits,
    'Set-up Time (%)': setupTime,
    'Utilisation Rate (%)': utilizationRate,
    'Reduce downtime for unscheduled maintenance (%)': unscheduledMaintenance,
    'Year': year
  } = item;



  // Check if the data is from the previous year
  if (year === currentYear) {
    // Calculate the reduction in setup time by 5% for the current year compared to the previous year
    const currentYearSetupTimeSum = data
      .filter((dataItem) => dataItem.Year === currentYear)
      .reduce((sum, dataItem) => sum + dataItem['Set-up Time (%)'], 0);

    const previousYearSetupTimeSum = data
      .filter((dataItem) => dataItem.Year === previousYear)
      .reduce((sum, dataItem) => sum + dataItem['Set-up Time (%)'], 0);

    const kpi1 = currentYearSetupTimeSum - (previousYearSetupTimeSum * 0.05);

    // Calculate the increase in utilization rate by 10% for the current year compared to the previous year
    const currentYearUtilizationRateSum = data
      .filter((dataItem) => dataItem.Year === currentYear)
      .reduce((sum, dataItem) => sum + dataItem['Utilisation Rate (%)'], 0);

    const previousYearUtilizationRateSum = data
      .filter((dataItem) => dataItem.Year === previousYear)
      .reduce((sum, dataItem) => sum + dataItem['Utilisation Rate (%)'], 0);

    const kpi2 = currentYearUtilizationRateSum + (previousYearUtilizationRateSum * 0.1);

    // Calculate the reduction in unscheduled maintenance by 25% for the current year compared to the previous year
    const currentYearUnscheduledMaintenanceSum = data
      .filter((dataItem) => dataItem.Year === currentYear)
      .reduce((sum, dataItem) => sum + dataItem['Reduce downtime for unscheduled maintenance (%)'], 0);

    const previousYearUnscheduledMaintenanceSum = data
      .filter((dataItem) => dataItem.Year === previousYear)
      .reduce((sum, dataItem) => sum + dataItem['Reduce downtime for unscheduled maintenance (%)'], 0);

    const kpi3 = currentYearUnscheduledMaintenanceSum - (previousYearUnscheduledMaintenanceSum * 0.25);

    return {
      ...item,
      kpi1,
      kpi2,
      kpi3
    };
  } else {
    // Data is not from the previous year, set KPI values to 0 or handle as desired
    const kpi1 = 0;
    const kpi2 = 0;
    const kpi3 = 0;

    return {
      ...item,
      kpi1,
      kpi2,
      kpi3
    };
  }
};

    console.log(currentYear)
    console.log(previousYear)
      fetchProductionKPI();
    }
    if (userDepartment === 'Management') {

      // console.log("I reach Management");

      const fetchManagementKPI = async () => {

        // First KPI
        // Formula: (CumulativeRevenue / TargetRevenue) * 100;
        // Retrieve the current year's data and previous year's data based on the order date
        let { data: currentYearData, error: currentYearError } = await supabase
          .from('sales_data_entry')
          .select('*, product:products_data_entry(*)')
          .gte('order_date', currentYearStartStr)
          .lte('order_date', currentYearEndStr);

        let { data: previousYearData, error: previousYearError } = await supabase
          .from('sales_data_entry')
          .select('*, product:products_data_entry(*)')
          .gte('order_date', previousYearStartStr)
          .lte('order_date', previousYearEndStr);

        if (currentYearError || previousYearError) {
          setFetchError('Could not fetch data from sales_data_entry');
          console.log('error', fetchError);
        }

        if (currentYearData && previousYearData) {
          setCurrentYearData(currentYearData);
          setPreviousYearData(previousYearData);
          setCurrentYearError(null);
          setPreviousYearError(null);

          var currentYearTotalRevenue = 0; // Used to find total revenue for the current year
          currentYearData.forEach((item) => {
            const revenue = item['quantity'] * item['product']['unit_price']; // Revenue formula
            currentYearTotalRevenue += revenue;
          });

          var previousYearTotalRevenue = 0; // Used to find total revenue for the previous year
          previousYearData.forEach((item) => {
            const revenue = item['quantity'] * item['product']['unit_price']; // Revenue formula
            previousYearTotalRevenue += revenue;
          });

          previousYearTotalRevenue = 150000;// assume 150000 is previous year revenue
          const cumulativeRevenue = previousYearTotalRevenue + currentYearTotalRevenue;
          console.log(currentYearTotalRevenue);
          // Calculate progress towards 3 million as a percentage
          const targetRevenue = 3000000;
          const progressPercentage = (cumulativeRevenue / targetRevenue) * 100;
          setProgressPercentage(progressPercentage.toFixed(0))

          if (cumulativeRevenue >= targetRevenue) {
            setActualKPI1((100 / 100) * targetedKPI1);
          } else if (cumulativeRevenue >= targetRevenue * 0.8) {
            setActualKPI1((80 / 100) * targetedKPI1);
          } else if (cumulativeRevenue >= targetRevenue * 0.6) {
            setActualKPI1((60 / 100) * targetedKPI1);
          } else if (cumulativeRevenue >= targetRevenue * 0.4) {
            setActualKPI1((40 / 100) * targetedKPI1)
          } else if (cumulativeRevenue >= targetRevenue * 0.2) {
            setActualKPI1((20 / 100) * targetedKPI1);
          } else if (cumulativeRevenue >= targetRevenue * 0.1) {
            setActualKPI1((10 / 100) * targetedKPI1);
          } else {
            setActualKPI1((0 / 100) * targetedKPI1);
          }

          // Second KPI
          // Formula: current year product quantity > last year product quantity by 1
          const previousYearProductQuantity = 4;
          const targetedNewProductQuantity = 1;
          // Retrieve the product data from the table
          let { data: productQuantity, error: productQuantityError } = await supabase
            .from('products_data_entry')
            .select('*');

          if (productQuantityError) {
            setProductQuantityError('Could not fetch data from products_data_entry');
            setProductQuantity(null);
            console.log('error', productQuantityError);
          }

          if (productQuantity) {
            setProductQuantity(productQuantity);
            setProductQuantityError(null);

            // Calculate the total quantity of all products
            let totalProductQuantity = 0;
            totalProductQuantity = productQuantity.length
            var newProductLaunched = totalProductQuantity - previousYearProductQuantity
            setNewProductLaunched(newProductLaunched);
            // Compare the total quantity with the previous year's quantity and the targeted new product quantity
            if (totalProductQuantity >= previousYearProductQuantity + targetedNewProductQuantity) {
              setActualKPI2((100 / 100) * targetedKPI2);
            } else {
              setActualKPI2(0);
            }
          }

          // Third KPI
          // Formula: (Current Year Churn Rate - Previous Year Churn Rate) * 100
          let { data: isChurned, error: fetchError } = await supabase
            .from('customer_data_entry') // Table name
            .select('is_churned_account');

          if (fetchError) {
            setFetchError('Could not fetch data from customer_data_entry');
            setIsChurned(null);
            console.log('error', fetchError);
          }
          if (isChurned) {
            setFetchError(null);
            setIsChurned(isChurned);
            const totalCustomers = isChurned.length;
            const lastYearChurn = 25; // Assuming last year's churn rate is 25%
            const currentChurnAccount = isChurned.reduce((count, account) => {
              if (account.is_churned_account) {
                return count + 1;
              }
              return count;
            }, 0);
            const currentChurnRate = Math.ceil((currentChurnAccount / totalCustomers) * 100);
            console.log("Current churn rate: " + currentChurnRate);
            const annualChurnRate = lastYearChurn - currentChurnRate;
            console.log("Churn rate: " + annualChurnRate);
            setAnnualChurnRate(annualChurnRate);

            if (annualChurnRate >= 5) {
              setActualKPI3((100 / 100) * targetedKPI3);
            } else if (annualChurnRate >= 3 && annualChurnRate <= 4) {
              setActualKPI3((80 / 100) * targetedKPI3);
            } else if (annualChurnRate >= 0 && annualChurnRate <= 2) {
              setActualKPI3((60 / 100) * targetedKPI3);
            } else if (annualChurnRate < 0) {
              setActualKPI3((40 / 100) * targetedKPI3);
            }
          }
        }
      };
      fetchManagementKPI();
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
          <div className="border-l-2 border-gray-300 h-28 mx-4"></div>
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
        <div className="w-0 z-0">
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
        <div className="fixed md:static bg-main-bg navbar w-full">
          <Navbar />
        </div>
        <div className="m-10 md:m-10 mt-20 md:mt-10 p-5 md:p-5 bg-gray-100 rounded-3xl">
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
              <div className="grid grid-cols-2 gap-6 m-5 md:m-10 bg-white p-5 py-8 border-gray-300 border-2 rounded-2xl">
                <div>
                  {/* Content for the first column */}
                  {renderKPIPerformance()}

                </div>
                {/* Second Column */}
                <div>
                  {userDepartment === 'Sales' && (
                    <>
                      <div className="text-lg font-semibold">Objective: Increase revenue growth</div>
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
                    </>
                  )}
     {userDepartment === 'Production' && (
  <>
    <>
      <div className="text-lg font-semibold">Objective: Increase production output by 5%</div>
      
      <ul>
        <li>
          <span className="tooltip target-text" data-tooltip="Reduce machine set-up time by 5%">
            Target 1:
            <span className="percentage-span" data-actual-score={actualKPI1} data-targeted-score={targetedKPI1}>
              {actualKPI1}% | {reducedSetupTime}%/5%
            </span>
          </span>
        </li>

        <li>
          <span className="tooltip target-text" data-tooltip="Increase utilization rates for essential equipment by 10%">
            Target 2:
            <span className="percentage-span" data-actual-score={actualKPI2} data-targeted-score={targetedKPI2}>
              {actualKPI2}% | {increasedUtilizationRate}%/10%
            </span>
          </span>
        </li>
        <li>
          <span className="tooltip target-text" data-tooltip="Reduce downtime for unscheduled maintenance by 25%">
            Target 3:
            <span className="percentage-span" data-actual-score={actualKPI3} data-targeted-score={targetedKPI3}>
              {actualKPI3}% | {reducedUnscheduledMaintenance}%/25%
            </span>
          </span>
        </li>
      </ul>
    </>
  </>
)}
                  {userDepartment === 'Administrative' && (
                    <>
                      <div className="text-lg font-semibold">Objective: Improve the efficiency of the internal document management system</div>
                      <ul>
                        <li>
                          <span className="tooltip target-text" data-tooltip="Ensure that all the teams agree on folder structures and put them into effect">
                            Target 1:
                            <span className="percentage-span" data-actual-score={actualKPI1} data-targeted-score={targetedKPI1}>
                              {KPI1}% | 0/1
                            </span>
                          </span>
                        </li>
                        <li>
                          <span className="tooltip target-text" data-tooltip="Make sure that all the teams complete the transfer and consolidation of all documents into the new structure 100% of the time">
                            Target 2:
                            <span className="percentage-span" data-actual-score={actualKPI2} data-targeted-score={targetedKPI2}>
                              {KPI2}% | 33%/100%
                            </span>
                          </span>
                        </li>
                        <li>
                          <span className="tooltip target-text" data-tooltip="Gather feedback from all users, and make sure >80% (positive)">
                            Target 3:
                            <span className="percentage-span" data-actual-score={actualKPI3} data-targeted-score={targetedKPI3}>
                              {KPI3}% | 53%/80%
                            </span>
                          </span>
                        </li>
                      </ul>
                    </>
                  )}
                  {userDepartment === 'Marketing' && (
                    <>
                      <div className="text-lg font-semibold">Objective: Improve customer acquisition rates</div>
                      <ul>
                        <li>
                          <span className="tooltip target-text" data-tooltip="Increase monthly number of new trial signups by 20%">
                            Target 1:
                            <span className="percentage-span" data-actual-score={actualKPI1} data-targeted-score={targetedKPI1}>
                              {KPI1}% | 5%/20%
                            </span>
                          </span>
                        </li>
                        <li>
                          <span className="tooltip target-text" data-tooltip="Increase Monthly Active Users from 5000 to 8000">
                            Target 2:
                            <span className="percentage-span" data-actual-score={actualKPI2} data-targeted-score={targetedKPI2}>
                              {KPI2}% | 5333/8000
                            </span>
                          </span>
                        </li>
                        <li>
                          <span className="tooltip target-text" data-tooltip="Increase the trial to paid plan conversion rate by 15%">
                            Target 3:
                            <span className="percentage-span" data-actual-score={actualKPI3} data-targeted-score={targetedKPI3}>
                              {KPI3}% | 10%/15%
                            </span>
                          </span>
                        </li>
                      </ul>
                    </>
                  )}
                  {userDepartment === 'Management' && (
                    <>
                      <div className="text-lg font-semibold">Objective: Grow business</div>
                      <ul>
                        <li>
                          <span className="tooltip target-text" data-tooltip="Grow revenue to 3 million">
                            Target 1:
                            <span className="percentage-span" data-actual-score={actualKPI1} data-targeted-score={targetedKPI1}>
                              {KPI1}% | {progressPercentage}%/100%
                            </span>
                          </span>
                        </li>
                        <li>
                          <span className="tooltip target-text" data-tooltip="Launch the new product">
                            Target 2:
                            <span className="percentage-span" data-actual-score={actualKPI2} data-targeted-score={targetedKPI2}>
                              {KPI2}% | {newProductLaunched}/1
                            </span>
                          </span>
                        </li>
                        <li>
                          <span className="tooltip target-text" data-tooltip="Reduce churn to <5% annually">
                            Target 3:
                            <span className="percentage-span" data-actual-score={actualKPI3} data-targeted-score={targetedKPI3}>
                              {KPI3}% | {annualChurnRate}%/5%
                            </span>
                          </span>
                        </li>
                      </ul>
                    </>
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
                  <span className="closeChart" onClick={() => toggleChartVisibility('totalSales')}>
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
                  <span className="closeChart" onClick={() => toggleChartVisibility('topCustomer')}>
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
                  <span className="closeChart" onClick={() => toggleChartVisibility('topSalesProducts')}>
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
                  <span className="closeChart" onClick={() => toggleChartVisibility('topSalesByRegionByMonth')}>
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

          <div className="flex gap-10 flex-wrap justify-center">
            <div className="bg-white m-3 p-4 rounded-2xl md:w-780  ">
              <div className="flex justify-between">
                <p className="font-semibold text-xl" id="top10CustomersTitle">Title</p>
                <span className="closeChart" onClick={() => toggleChartVisibility('topCustomer')}>
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
                  <LineTop10Customers width="320px" height="360px" />
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
