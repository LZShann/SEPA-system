import { React, useState } from 'react';
//icons
import { IoIosMore } from 'react-icons/io';
import { MdOutlineBarChart, MdAddChart } from 'react-icons/md';
import { AiOutlineLineChart } from 'react-icons/ai';
import { BsFillPieChartFill } from 'react-icons/bs';
import { HiOutlineRefresh } from 'react-icons/hi';

//components
import { Stacked, Pie, Button, LineChart, SparkLine, Modal } from '../components';
import { weeklyStats, SparklineAreaData } from '../data/dummy';
import { useStateContext } from '../contexts/ContextProvider';
import BarChartKPI from '../components/Charts/BarChartKPI';

const Statistic = () => {
  const { currentColor } = useStateContext();

  const [modalOpen, setModalOpen] = useState(false);
  function IconBlock({ icon, desc, title, iconColor, iconBg, onClick }) {
    return (
      <div className="bg-white h-44 md:w-56  p-4 pt-9 rounded-2xl">
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
  return (
    <div className="mt-24">
      <div className="flex flex-wrap lg:flex-nowrap justify-center">
        <div className="flex m-3 flex-wrap justify-center gap-1 items-center">
          <IconBlock
            icon={<MdOutlineBarChart />}
            desc="Chart"
            title="Bar"
            iconColor="#03C9D7"
            iconBg="#E5FAFB"
            onClick={() => {setModalOpen(true);}}
          />      
          {modalOpen && <Modal setOpenModal={setModalOpen} />}
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

      <div className="flex gap-10 flex-wrap justify-center">
        <div className="bg-white m-3 p-4 rounded-2xl md:w-780  ">
          <div className="flex justify-between">
            <p className="font-semibold text-xl">Grand Total % 2021</p>
          </div>
          <div className="mt-10 flex gap-10 flex-wrap justify-center">
            <div className=" border-r-1 border-color m-4 pr-10">
              <div>
                <p>
                  <span className="text-3xl font-semibold">RM 10,800</span>
                  <span className="p-1.5 hover:drop-shadow-xl cursor-pointer rounded-full text-white bg-green-400 ml-3 text-xs">
                    28.95%
                  </span>
                </p>
                <p className="text-gray-500 mt-1">Highest</p>
              </div>
              <div className="mt-8">
                <p className="text-3xl font-semibold">RM 4,000</p>

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
              {/* < BarChartKPI width="320px" height="360px" /> */}
              <Stacked width="320px" height="360px" />
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