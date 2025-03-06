import Head from "next/head";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import fetcher from "@/src/dataProvider";
import { FANTV_API_URL } from "@/src/constant/constants";
import { formatWalletAddress } from "../src/utils/common";
import { useMediaQuery } from "@mui/material";
import FilterTabs from "../src/component/Filters/TabFilters";
import { ChevronDownIcon } from "lucide-react";
import Loading from "../src/component/loading";

export default function Home() {
  const isMobile = useMediaQuery("(max-width:768px)");
  const [tradeResult, setTradeResult] = useState();

  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ["/trade/dashboard"],
    queryFn: async () => {
      try {
        const repsonse = await fetcher.get(`${FANTV_API_URL}/v1/trade/dashboard`);
        setTradeResult(repsonse.data);
        return repsonse.data;
      } catch (error) {
        throw error;
      }
    },
    refetchOnMount: "always",
    onSuccess: (response) => {
      setTradeResult(response.data);
    },
  });

  const [activeTab, setActiveTab] = useState("all");
  const [newAgent, setNewAgent] = useState(false);
  const [gradAgent, setGradAgent] = useState(false);
  const [filteredResults, setFilteredResults] = useState(null);

  useEffect(() => {
    if (!activeTab || !tradeResult?.agentsRes) return;
    const filteredAgents = tradeResult?.agentsRes?.filter((agent) => {
      if (activeTab.toLowerCase() === "all") {
        return true;
      }
      return agent.category.toLowerCase() === activeTab.toLowerCase();
    });
    setFilteredResults(filteredAgents);
  }, [activeTab, tradeResult]);

  const [expandedAgentId, setExpandedAgentId] = useState(null);

  const toggleAccordion = (agentId) => {
    setExpandedAgentId(expandedAgentId === agentId ? null : agentId);
  };

  return (
    <div className="bg-[#FF0000]  text-white pt-16 sm:pt-24 mx-auto bg-gradient-to-r from-[#E7DCFF] to-[#D8EDFF] ">
      {(isLoading || isFetching) && <Loading />}
      <div>
        <h1 className="text-[#302249] mt-10 mb-2 text-3xl md:text-[56px] font-semibold text-center ">
          Trade AI Agents
        </h1>
        <h4 className=" text-[#706383] mb-4 pt-4 text-lg md:text-[16px] font-inter font-medium font-inter  text-center px-4 leading-[24px]">
          Develop the next generation of Agentic dApps which solves real <br />
          world problems. Dive into the resources to help you ship faster.
        </h4>
      </div>

      {/* <div className="flex  m-auto gap-4 justify-center my-10">
        <button className="relative flex items-center px-6 py-4 text-white bg-[#715EC2] rounded-full shadow-md hover:bg-purple-600">
          <span className="absolute left-2 flex items-center justify-center w-10 h-10 bg-white rounded-full">
            <img src="/images/launch.svg" />
          </span>
          <span className="ml-8">Launch your Agent token</span>
        </button>

        <button className="px-6 py-2 my-2 text-black bg-white border border-gray-300 rounded-full shadow-md hover:bg-gray-100">
          Hire Agent Now
        </button>
      </div> */}

      <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-28 mx-auto px-4">
        <button
          onClick={() => alert("coming soon")}
          className="relative flex items-center px-6 py-3 md:py-4 text-white bg-[linear-gradient(51.35deg,#121749_0%,#466CF7_100%)] rounded-full shadow-md  w-full md:w-auto"
        >
          <span className="absolute left-2 flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full">
            <img src="/images/launch.svg" />
          </span>
          <span className="ml-10 md:ml-8 text-lg md:text-[20px] md:text-base  font-inter  font-medium text-center">
            Launch Agent token
          </span>
        </button>

        <button
          onClick={() => alert("coming soon")}
          className="w-full md:w-auto px-6 py-3 text-lg md:text-[20px] font-inter  font-medium md:py-4 text-[#706383] bg-white border border-gray-300 rounded-full shadow-md hover:bg-gray-100 text-sm md:text-base"
        >
          Hire Agent Now
        </button>
      </div>

      <div
        className="flex flex-col items-center justify-between gap-4 pb-8  px-10 sm:flex-row"
        style={{ background: "linear-gradient(0deg, #B1E1F8 0%, rgba(255, 255, 255, 0) 100%)" }}
      >
        <div className="w-full sm:w-auto">
          <FilterTabs activeTab={activeTab} setActiveTab={setActiveTab} isMobile={isMobile} />
        </div>

        <div className="flex items-center flex-shrink-0 gap-2">
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="hidden"
              onChange={(e) => setNewAgent(e.target.checked)}
            />
            <div
              className={`w-6 h-6 rounded flex items-center justify-center ${
                newAgent ? "bg-[#3c82f6]" : "bg-[#715EC2]"
              }`}
            >
              {newAgent && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="white"
                  className="w-6 h-6"
                  strokeWidth="3"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
          </label>
          <span className="text-sm font-inter font-medium text-[#302249]">All Agents</span>

          <label className="inline-flex items-center gap-2">
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="hidden"
                onChange={(e) => setGradAgent(e.target.checked)}
              />
              <div
                className={`w-6 h-6 rounded flex items-center justify-center ${
                  gradAgent ? "bg-[#3c82f6]" : "bg-[#715EC2]"
                }`}
              >
                {gradAgent && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="white"
                    className="w-6 h-6"
                    strokeWidth="3"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
            </label>
            <span className="text-sm font-inter text-[#302249] font-medium ">Graduated Agents</span>
          </label>
        </div>
      </div>
      <div className="relative overflow-hidden  p-4 pb-8 min-h-[500px] bg-custom-gradient">
        <div className="relative z-10">
          {!isMobile && (
            <div className="grid text-[#302249] mx-8 grid-cols-8 text-sm md:text-[18px] font-bold mb-2 px-4 min-w-[1100px] overflow-x-auto">
              <div className="text-center col-span-2">AI Agents</div>
              <div className="text-center">Category</div>
              <div className="text-center">Market Cap ($MAN)</div>
              <div className="text-center">24H Chg</div>
              <div className="text-center">TVL ($MAN)</div>
              <div className="text-center">Holders</div>
              <div className="text-center">24H vol ($MAN)</div>
            </div>
          )}

          {isMobile ? (
            <div className="space-y-3">
              {filteredResults?.map((agent) => (
                <div
                  key={agent._id}
                  className="rounded-lg bg-[#EEEDF166] backdrop-blur-sm border border-white/10"
                >
                  <div
                    className="flex items-center justify-between p-3 cursor-pointer"
                    onClick={() => toggleAccordion(agent._id)}
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={agent.profilePic}
                        className="h-12 w-12 rounded-full"
                        alt={agent.name}
                      />
                      <div>
                        <div className="flex items-center font-inter text-[#302249] gap-1 text-sm font-semibold">
                          {agent.name}
                          <span className="text-xs font-inter text-[#302249]">{agent.ticker}</span>
                        </div>
                        <div className="text-xs text-[#706383]">
                          {formatWalletAddress(agent.address)}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-sm text-[#302249]`}>
                        <p className="text-xs font-medium font-inter text-[#302249]">(M Cap)</p>
                        <span>${agent.marketCap}</span>
                      </span>
                      <ChevronDownIcon
                        className={`w-5 h-5 transition-transform text-black ${
                          expandedAgentId === agent._id ? "rotate-180" : ""
                        }`}
                      />
                    </div>
                  </div>

                  {expandedAgentId === agent._id && (
                    <div className="p-3 pt-0 border-t border-white/10">
                      <div className="space-y-2 text-sm">
                        <div className="flex pt-3 justify-between">
                          <span className="text-[#302249] font-medium font-inter">Category:</span>
                          <span className=" text-[#302249] font-normal font-inter">
                            {agent.category}
                          </span>
                        </div>
                        <div className="flex justify-between font-medium font-inter">
                          <span className="text-[#302249] font-medium font-inter">Market Cap:</span>
                          <span className="text-[#302249] font-normal font-inter">
                            ${agent.marketCap}
                          </span>
                        </div>
                        <div className="flex justify-between ">
                          <span className="text-[#302249] font-medium font-inter">TVL:</span>
                          <span className="text-[#302249] font-normal font-inter">
                            ${agent.tvl}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#302249] font-medium font-inter">Holders:</span>
                          <span className="text-[#302249] font-normal font-inter">
                            {agent.holders}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#302249] font-medium font-inter">24H Vol:</span>
                          <span className="text-[#302249] font-normal font-inter">
                            ${agent.volume24}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#302249] font-medium font-inter">24H Change:</span>
                          <div
                            className={`text-center font-nohemi text-[14px] font-normal leading-[21px] whitespace-nowrap ${
                              agent?.change24?.text?.startsWith("+")
                                ? "text-[#26C281]"
                                : "text-[#ED1C24]"
                            }`}
                          >
                            {agent?.change24?.text}
                          </div>
                        </div>
                      </div>
                      <a
                        href={`/agent-details/${agent._id}`}
                        className="w-full flex pt-2 text-sm underline btn btn-primary text-[#302249]"
                      >
                        View Details
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-xl overflow-x-auto mx-8  bg-[#EEEDF166] backdrop-blur-sm text-sm">
              <div className={`min-w-[1100px]`}>
                {isMobile && (
                  <div className="grid grid-cols-8 text-sm mb-2 px-4 pt-4 min-w-[800px] overflow-x-auto">
                    <div className="text-center col-span-2">AI Agents</div>
                    <div className=" text-center">Category</div>
                    <div className=" text-center">Market Cap ($MAN)</div>
                    <div className=" text-center">24H Chg</div>
                    <div className="text-center">TVL ($MAN)</div>
                    <div className="text-center">Holders</div>
                    <div className="text-center">24H vol ($MAN)</div>
                  </div>
                )}

                {filteredResults?.map((agent, idx) => {
                  return (
                    <a
                      key={agent?.id}
                      className={`grid grid-cols-8 px-4 py-4 items-center hover:bg-black/20 transition-colors
                    ${idx !== 0 ? "border-b border-white/5" : ""}`}
                      href={`/agent-details/${agent._id}`}
                    >
                      <div className="flex items-center justify-start col-span-2">
                        <div className="flex items-center font-inter gap-3">
                          <img
                            src={agent.profilePic}
                            className="h-[56px] w-[56px] rounded-full flex items-center justify-center"
                            alt={"Token_Icon"}
                          />
                          <div>
                            <div className="text-[16px] text-[#302249] font-medium font-inter flex items-center">
                              {agent?.name}
                              <span className=" px-1.5 ">({agent?.ticker})</span>
                              {/* <svg
                                width="18"
                                height="18"
                                viewBox="0 0 18 18"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <circle cx="9" cy="9" r="8" fill="#242424" />
                                <circle cx="9" cy="9" r="8.5" stroke="white" stroke-opacity="0.2" />
                                <path
                                  d="M8.99972 7.81615C9.11892 8.08403 9.27324 8.32062 9.47612 8.52348C9.67901 8.72634 9.91566 8.88065 10.1836 8.99984C9.91579 9.11895 9.67926 9.27316 9.47644 9.47592C9.27345 9.67885 9.11908 9.91557 8.99986 10.1836C8.88067 9.91584 8.72638 9.67932 8.52355 9.47653C8.32063 9.27363 8.08396 9.11932 7.81598 9.00012C8.08386 8.88092 8.32046 8.7266 8.52331 8.52372C8.7262 8.3208 8.88052 8.08413 8.99972 7.81615Z"
                                  stroke="#0BDA96"
                                />
                                <mask id="path-4-inside-1_23042_3399" fill="white">
                                  <path d="M5.6665 7.66666C5.6086 5.7719 5.56126 5.72486 3.6665 5.66666C5.56126 5.60876 5.60831 5.56142 5.6665 3.66666C5.7244 5.56142 5.77174 5.60847 7.6665 5.66666C5.77174 5.72486 5.7247 5.77132 5.6665 7.66666Z" />
                                </mask>
                                <path
                                  d="M5.6665 7.66666L4.66697 7.69721L6.66603 7.69736L5.6665 7.66666ZM3.6665 5.66666L3.63596 4.66713L3.6358 6.66619L3.6665 5.66666ZM5.6665 3.66666L6.66604 3.63612L4.66698 3.63597L5.6665 3.66666ZM7.6665 5.66666L7.69721 6.66619L7.6972 4.66714L7.6665 5.66666ZM6.66604 7.63612C6.65212 7.18057 6.6378 6.75498 6.58419 6.40961C6.5303 6.0624 6.41424 5.6226 6.06238 5.2708C5.71056 4.91903 5.27078 4.80301 4.92364 4.74911C4.5783 4.69549 4.15273 4.68113 3.69721 4.66714L3.6358 6.66619C4.12766 6.6813 4.41854 6.69465 4.61679 6.72543C4.81323 6.75593 4.74417 6.781 4.64827 6.68511C4.55233 6.58919 4.57738 6.52005 4.60786 6.71639C4.63862 6.91456 4.65194 7.20538 4.66697 7.69721L6.66604 7.63612ZM3.69705 6.6662C4.1526 6.65228 4.57819 6.63796 4.92356 6.58435C5.27077 6.53046 5.71057 6.4144 6.06237 6.06254C6.41414 5.71072 6.53017 5.27094 6.58406 4.9238C6.63768 4.57846 6.65204 4.15289 6.66603 3.69736L4.66698 3.63597C4.65187 4.12782 4.63852 4.4187 4.60774 4.61695C4.57724 4.81339 4.55217 4.74433 4.64806 4.64843C4.74398 4.55249 4.81312 4.57754 4.61678 4.60802C4.41861 4.63878 4.12779 4.6521 3.63596 4.66713L3.69705 6.6662ZM4.66697 3.69721C4.68089 4.15276 4.6952 4.57835 4.74881 4.92372C4.80271 5.27093 4.91877 5.71073 5.27063 6.06253C5.62244 6.4143 6.06223 6.53033 6.40937 6.58422C6.7547 6.63784 7.18028 6.6522 7.63581 6.66619L7.6972 4.66714C7.20535 4.65203 6.91447 4.63869 6.71622 4.6079C6.51977 4.5774 6.58884 4.55233 6.68474 4.64822C6.78068 4.74414 6.75562 4.81328 6.72515 4.61694C6.69438 4.41877 6.68107 4.12795 6.66604 3.63612L4.66697 3.69721ZM7.6358 4.66714C7.18035 4.68113 6.75481 4.69545 6.40956 4.749C6.06251 4.80283 5.62267 4.91875 5.27079 5.27053C4.91888 5.62233 4.80284 6.06218 4.74895 6.40933C4.69533 6.75467 4.68097 7.18031 4.66698 7.63597L6.66603 7.69736C6.68114 7.20535 6.69449 6.91443 6.72527 6.71618C6.75577 6.51973 6.78083 6.58895 6.6848 6.68494C6.5888 6.78092 6.51962 6.75585 6.71611 6.72537C6.9144 6.69461 7.20528 6.6813 7.69721 6.66619L7.6358 4.66714Z"
                                  fill="#0BDA96"
                                  mask="url(#path-4-inside-1_23042_3399)"
                                />
                              </svg> */}
                              {/* <svg
                                width="18"
                                height="18"
                                viewBox="0 0 18 18"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <circle cx="9" cy="9" r="8" fill="#242424" />
                                <circle cx="9" cy="9" r="8.5" stroke="white" stroke-opacity="0.2" />
                                <g clip-path="url(#clip0_23042_3404)">
                                  <path
                                    d="M10.6112 6.84959C10.2363 6.23507 9.92585 5.58348 9.68479 4.90519C9.66858 4.85675 9.64027 4.81325 9.60255 4.77881C9.56482 4.74437 9.51893 4.72013 9.46922 4.70839C9.4195 4.69665 9.36761 4.6978 9.31847 4.71173C9.26932 4.72567 9.22455 4.75191 9.18839 4.78799C8.57441 5.51599 8.25734 6.44863 8.30039 7.39999C8.31142 7.74597 8.21682 8.08711 8.02919 8.37799C7.97475 8.1195 7.86707 7.87518 7.71301 7.66059C7.55896 7.44599 7.3619 7.26584 7.13439 7.13159C7.08864 7.10888 7.03785 7.0982 6.98682 7.10058C6.9358 7.10295 6.88622 7.11829 6.84278 7.14516C6.79934 7.17203 6.76346 7.20953 6.73855 7.25412C6.71363 7.29871 6.7005 7.34892 6.70039 7.39999C6.67921 7.90898 6.55383 8.40821 6.33199 8.86679C5.99 9.53088 5.89297 10.2942 6.05793 11.0228C6.22289 11.7513 6.63929 12.3984 7.23399 12.8504C7.72187 13.1701 8.29393 13.3372 8.87719 13.3304C9.74457 13.3335 10.5802 13.0043 11.2124 12.4104C12.1156 11.5076 12.1376 9.80159 11.2688 8.06439C11.0364 7.59999 10.82 7.21879 10.6112 6.84959Z"
                                    fill="url(#paint0_linear_23042_3404)"
                                  />
                                </g>
                                <defs>
                                  <linearGradient
                                    id="paint0_linear_23042_3404"
                                    x1="8.94245"
                                    y1="4.70036"
                                    x2="8.94245"
                                    y2="13.3306"
                                    gradientUnits="userSpaceOnUse"
                                  >
                                    <stop stop-color="#FF6C00" />
                                    <stop offset="1" stop-color="#F90FF9" />
                                  </linearGradient>
                                  <clipPath id="clip0_23042_3404">
                                    <rect
                                      width="9.6"
                                      height="9.6"
                                      fill="white"
                                      transform="translate(4.2002 4.2)"
                                    />
                                  </clipPath>
                                </defs>
                              </svg> */}
                            </div>
                            <div className=" mt-2 px-2 text-[10px] text-[#706383] bg-[#FFFFFFB2] font-inter font-normal flex justify-between items-center gap-1 border-[0.25px] border-[#706383] rounded-[4px]">
                              {formatWalletAddress(agent?.address)}
                              <svg
                                className="cursor-pointer"
                                width="14"
                                height="15"
                                viewBox="0 0 12 13"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
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
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className={`text-center text-[#302249] text-[16px] font-medium font-inter leading-[21px]`}
                      >
                        &nbsp; {agent.category}
                      </div>
                      <div
                        className={` text-center text-[#302249] text-[16px] font-medium font-inter leading-[21px]`}
                      >
                        {agent?.marketCap}
                      </div>
                      <div
                        className={`text-center text-[16px] font-medium leading-[21px] font-inter whitespace-nowrap ${
                          agent?.change24?.text?.startsWith("+")
                            ? "text-[#26C281]"
                            : "text-[#ED1C24]"
                        }`}
                      >
                        {agent?.change24?.text}
                      </div>
                      <div className="text-center text-[#302249] text-[16px] font-medium font-inter leading-[21px]">
                        {agent.tvl}
                      </div>
                      <div className="text-center text-[#302249] text-[16px] font-medium font-inter leading-[21px]">
                        {agent.holders}
                      </div>
                      <div className="text-center text-[#302249] text-[16px] font-medium font-inter leading-[21px]">
                        {agent.volume24}
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
