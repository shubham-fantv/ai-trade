import { FANTV_API_URL } from "@/src/constant/constants";
import fetcher from "@/src/dataProvider";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { ArrowLeft, Instagram, Send, Twitter } from "lucide-react";
import Head from "next/head";
import Link from "next/link";
import React, { useState } from "react";
import Graph from "../../src/component/Graph/Graph";
import TradeComponent from "../../src/component/TradeComponent";
import TradeTable from "../../src/component/TradeTable/TradeTable";
import { formatWalletAddress, openLink } from "../../src/utils/common";
import { agents } from "../trade";
import CreateAgentModal from "../../src/component/CreateAgentModal";
import { useMediaQuery } from "@mui/system";

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#f5f5f9",
    background: "linear-gradient(180deg, rgba(69, 69, 69, 0.4) 0%, rgba(69, 69, 69, 0.4) 100%)",
    border: "1px solid #6D6D6D",
    borderRadius: "20px",
    boxShadow: "0px 4px 4px 0px #00000073",
    backdropFilter: "blur(34px)",
    padding: "20px",
  },
  [`& .${tooltipClasses.arrow}`]: {
    fontSize: "40px",
    "&::before": {
      border: "1px solid #6D6D6D",
    },
  },
}));

const getCategoryByTag = (tag) => {
  const agent = agents.find((agent) => agent.tag === tag);
  return agent ? agent.category : "Category not found";
};

const TabButton = ({ isActive, onClick, children }) => {
  return (
    <button
      className={`
      px-2 py-2 
      text-[#302249]
      transition-all
      text-base md:text-xl
      ${isActive ? "border-white font-extrabold" : "border-transparent hover:border-white/50"}
    `}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default function AgentDetails({ agentDetail, agentId }) {
  const [copied, setCopied] = useState(false);

  const isMobile = useMediaQuery("(max-width:768px)");

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const tabs = [
    {
      id: 0,
      label: "Trades",
      component: (
        <div className="mt-6 max-w-7xl">
          <h4 className="mb-2 text-[#706383] font-normal">Recent Trades</h4>
          <TradeTable agentDetail={agentDetail} />
        </div>
      ),
    },
    {
      id: 1,
      label: "Summary",
      component: (
        <div className="mt-6">
          <h4 className="mb-2 font-bold text-[#706383]">Summary</h4>
          <p className="mb-4 text-sm text-[#706383]">{agentDetail?.description}</p>

          {agentDetail?.highLights && <h4 className="mb-2 font-bold">Highlights</h4>}
          {agentDetail?.highLights &&
            agentDetail?.highLights?.map((item) => {
              return (
                <ul className="text-sm text-[#706383] list-disc list-inside">
                  <li>{"item"}</li>
                </ul>
              );
            })}
        </div>
      ),
    },
  ];

  const [tab, setTab] = useState(tabs[0]);
  const [graphData, setGraphData] = useState(null);

  return (
    <div className="bg-[#EEEDF1] z-1">
      <div className="min-h-screen  bg-[linear-gradient(90deg,#E7DCFF_0%,#D8EDFF_100%)] text-white pt-14 sm:pt-24 px-4 sm:px-6">
        <Head>
          <title>{agentDetail?.name} AI - Agent Details</title>
          <meta name="description" content="Mona AI Agent Details" />
        </Head>

        <div className=" mx-auto grid grid-cols-1  sm:grid-cols-3  p-6">
          <div className={`rounded-xl col-span-2 gap-6 pr-6`}>
            <div className="rounded-[24px] flex border-[2px] bg-[#FFFFFF80] border-[#FFFFFF]/15 w-full h-auto p-6 ">
              <div>
                <HtmlTooltip
                  placement={"right"}
                  arrow={true}
                  title={
                    <div>
                      <Typography>{agentDetail?.ticker}</Typography>
                      {agentDetail?.description}
                    </div>
                  }
                >
                  <img
                    src={agentDetail.profilePic}
                    alt="Agent_Profile"
                    className="rounded-full w-[120px] h-[120px]"
                  />
                </HtmlTooltip>
              </div>
              <div className="ml-4 w-[90%]">
                <div className="flex flex-col justify-between gap-2 sm:flex-row">
                  <div className="flex text-[#302249] items-center gap-2 mb-1">
                    <h2 className="lex items-center font-spacegrotesk text-[#302249] gap-1 font-medium text-2xl self-end ">
                      {agentDetail?.name}
                    </h2>
                    <span className="text-2xl font-medium self-end uppercase rounded text-[#302249]">
                      {agentDetail?.ticker}
                    </span>
                  </div>
                  <div className="mt-[-10px]">
                    <div className="text-base font-inter text-[#302249]">Market Cap</div>
                    <div className="text-base text-[#302249] font-inter  mt-2  flex justify-center font-normal">
                      {agentDetail?.marketCap}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1 mb-3 ">
                  <div className="w-full sm:w-[auto] h-[32px] px-2 font-normal font-inter   text-[14px] text-[#706383] flex justify-between items-center gap-2 border-[1px] border-[#706383]/70 rounded-[8px] m-[1px]">
                    {formatWalletAddress(agentDetail?.tickerId)}
                    {copied ? (
                      <span className="text-xs">Copied!</span>
                    ) : (
                      <svg
                        className="cursor-pointer"
                        width="14"
                        height="15"
                        viewBox="0 0 12 13"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        onClick={() => copyToClipboard(agentDetail?.tickerId)}
                      >
                        <path
                          d="M5.85986 11.875H3.60986C1.53486 11.875 0.609863 10.95 0.609863 8.875V6.625C0.609863 4.55 1.53486 3.625 3.60986 3.625H5.85986C7.93486 3.625 8.85986 4.55 8.85986 6.625V8.875C8.85986 10.95 7.93486 11.875 5.85986 11.875ZM3.60986 4.375C1.94986 4.375 1.35986 4.965 1.35986 6.625V8.875C1.35986 10.535 1.94986 11.125 3.60986 11.125H5.85986C7.51986 11.125 8.10986 10.535 8.10986 8.875V6.625C8.10986 4.965 7.51986 4.375 5.85986 4.375H3.60986Z"
                          fill="#141617"
                        />
                        <path
                          d="M9.05986 7.375H8.48486C8.27986 7.375 8.10986 7.205 8.10986 7V6.625C8.10986 4.965 7.51986 4.375 5.85986 4.375H5.48486C5.27986 4.375 5.10986 4.205 5.10986 4V3.425C5.10986 1.835 5.81986 1.125 7.40986 1.125H9.05986C10.6499 1.125 11.3599 1.835 11.3599 3.425V5.075C11.3599 6.665 10.6499 7.375 9.05986 7.375ZM8.85986 6.625H9.05986C10.2349 6.625 10.6099 6.25 10.6099 5.075V3.425C10.6099 2.25 10.2349 1.875 9.05986 1.875H7.40986C6.23486 1.875 5.85986 2.25 5.85986 3.425V3.625C7.93486 3.625 8.85986 4.55 8.85986 6.625Z"
                          fill="#141617"
                        />
                      </svg>
                    )}
                  </div>
                  <span className="h-[32px] w-full sm:w-[125px] text-[#706383] font-normal font-inter   text-[12px] rounded-[8px] border-[1px] border-[#706383]/70  flex justify-center items-center">
                    {agentDetail?.category}
                  </span>
                </div>
                <div className="flex justify-between">
                  <div className="flex gap-4">
                    {agentDetail?.instagram && (
                      <a
                        href={agentDetail?.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-4 rounded-full bg-[#fff] transition-colors"
                      >
                        <Instagram className="w-4 h-4 text-black" />
                      </a>
                    )}
                    {agentDetail?.twitter && (
                      <a
                        href={agentDetail?.twitter}
                        className="p-4 rounded-full bg-[#fff] transition-colors"
                      >
                        <Twitter className="w-4 h-4 text-black" />
                      </a>
                    )}
                    {agentDetail?.discord && (
                      <a
                        href={agentDetail?.discord}
                        className="p-4 rounded-full bg-[#fff] transition-colors"
                      >
                        <Send className="w-4 h-4 text-black" />
                      </a>
                    )}
                  </div>
                  {agentDetail?.hireAgent && (
                    <button
                      onClick={() => openLink(agentDetail?.hireAgent)}
                      className="relative flex items-center px-6 py-3 md:py-2 text-white bg-[#715EC2] rounded-full shadow-md  w-full md:w-auto"
                    >
                      <span className="absolute left-1 flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full">
                        <img src="/images/launch.svg" />
                      </span>
                      <span className="ml-10 md:ml-8 text-sm md:text-base  font-inter  font-bold text-center">
                        Try VideoNation Now
                      </span>
                    </button>
                  )}
                </div>
              </div>
            </div>
            <div
              className={`${isMobile ? "gap-0" : "gap-6"} grid grid-cols-1  mt-6 sm:grid-cols-3`}
            >
              <div className="col-span-3">
                <Graph agentDetail={agentDetail} setGraphData={setGraphData} />
              </div>
            </div>
          </div>
          {isMobile ? (
            <div className="bg-[#FFFFFF80] border-[2px] border-[#FFFFFF]/15 gap-0 rounded-xl p-6">
              <div className="flex space-x-4 border-b border-white/10">
                <TabButton isActive={tab.label === tabs[0].label} onClick={() => setTab(tabs[0])}>
                  Trades
                </TabButton>
                <TabButton isActive={tab.label === tabs[1].label} onClick={() => setTab(tabs[1])}>
                  What does it do
                </TabButton>
              </div>
              {agentDetail?.aiAgents && (
                <div className=" flex gap-2 rounded-[24px] p-2 w-full overflow-x-scroll">
                  {agentDetail?.aiAgents.map((agent, index) => (
                    <div key={i} className="relative shrink-0">
                      <img
                        src={agentDetail?.profilePic}
                        alt="Mona AI"
                        className="rounded-[24px] w-[116px] h-[113px]"
                      />
                    </div>
                  ))}
                </div>
              )}
              {tab.component}
            </div>
          ) : (
            <TradeComponent agentDetail={agentDetail} graphData={graphData} />
          )}
        </div>

        {/* <div className=" mx-auto grid grid-cols-1  sm:grid-cols-3  p-6">
          <div className="col-span-2">
            {isMobile ? (
              <TradeComponent agentDetail={agentDetail} graphData={graphData} />
            ) : (
              <div className="bg-[#FFFFFF80] border-[2px] border-[#FFFFFF]/15 rounded-xl p-2 md:p-6">
                <div className="flex space-x-4 border-b border-white/10">
                  <TabButton isActive={tab.label === tabs[0].label} onClick={() => setTab(tabs[0])}>
                    Trades
                  </TabButton>
                  <TabButton isActive={tab.label === tabs[1].label} onClick={() => setTab(tabs[1])}>
                    What does it do
                  </TabButton>
                </div>
                {agentDetail?.aiAgents && (
                  <div className="flex gap-2 rounded-[24px] p-2 w-full overflow-x-scroll">
                    {agentDetail?.aiAgents.map((agent, index) => (
                      <div key={i} className="relative shrink-0">
                        <img
                          src={agentDetail?.profilePic}
                          alt="Mona AI"
                          className="rounded-[24px] w-[116px] h-[113px]"
                        />
                      </div>
                    ))}
                  </div>
                )}
                {tab.component}
              </div>
            )}
          </div>
        </div> */}
      </div>
      <div className="relative w-full">
        <div className="absolute top-[-140px] bg-gradient-to-t from-[#EEEDF1] to-transparent h-[160px] w-full"></div>
      </div>

      <div className="relative mx-auto grid grid-cols-1  sm:grid-cols-3 px-12 mr-6">
        <div className=" col-span-2">
          {isMobile ? (
            <TradeComponent agentDetail={agentDetail} graphData={graphData} />
          ) : (
            <div className="bg-[#FFFFFF80] border-[2px] border-[#FFFFFF]/15 rounded-xl p-2 md:p-6">
              <div className="flex space-x-4 border-b border-white/10">
                <TabButton isActive={tab.label === tabs[0].label} onClick={() => setTab(tabs[0])}>
                  Trades
                </TabButton>
                <TabButton isActive={tab.label === tabs[1].label} onClick={() => setTab(tabs[1])}>
                  What does it do
                </TabButton>
              </div>
              {agentDetail?.aiAgents && (
                <div className="flex gap-2 rounded-[24px] p-2 w-full overflow-x-scroll">
                  {agentDetail?.aiAgents.map((agent, index) => (
                    <div key={i} className="relative shrink-0">
                      <img
                        src={agentDetail?.profilePic}
                        alt="Mona AI"
                        className="rounded-[24px] w-[116px] h-[113px]"
                      />
                    </div>
                  ))}
                </div>
              )}
              {tab.component}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  const { query } = ctx;
  const getAgentUrl = `${FANTV_API_URL}/v1/agent/${query.agentId}`;

  try {
    const response = await fetcher.get(getAgentUrl);
    const agentData = response?.data;

    return {
      props: {
        agentDetail: agentData,
        agentId: query.agentId || null,
      },
    };
  } catch (error) {
    console.error("Error fetching document types:", error);

    return {
      props: {
        agentDetail: [],
        agentId: query.agentId || null,
        error: "Failed to fetch document types.",
      },
    };
  }
}
