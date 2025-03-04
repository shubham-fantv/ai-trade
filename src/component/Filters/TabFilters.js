import { useState } from "react";
import { ChevronDown } from "lucide-react";

const FilterTabs = ({ activeTab, setActiveTab, isMobile }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const tabs = [
    { id: "all", label: "All" },
    { id: "video", label: "Video" },
    { id: "chat", label: "Chat" },
    { id: "audio", label: "Audio" },
    { id: "character", label: "Character" },
    { id: "entertainment", label: "Entertainment" },
  ];

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    setIsDropdownOpen(false);
  };

  if (isMobile) {
    return (
      <div className="relative w-full">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className={`flex items-center justify-between w-full px-4 py-2 text-sm font-medium transition-all
            bg-white/20 backdrop-blur-sm
            ${isDropdownOpen ? "rounded-t-full" : "rounded-full"}`}
        >
          <span className="text-[#302249]">
            {tabs.find((tab) => tab.id === activeTab)?.label || "All"}
          </span>
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-200 ${
              isDropdownOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {isDropdownOpen && (
          <div
            className="absolute top-full left-0 right-0 bg-white/10 backdrop-blur-md 
            border border-white/10 rounded-b-xl shadow-lg overflow-hidden z-50
            [&>*:last-child]:border-b-0"
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`w-full px-4 py-3 text-left text-sm text-[#302249] transition-colors
                  border-b border-white/5
                  ${
                    activeTab === tab.id
                      ? "bg-[#302249] text-[#FFFFFF] shadow-inner"
                      : "hover:bg-white/10"
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className="flex gap-1 p-2 overflow-x-auto rounded-full bg-white/20 backdrop-blur-3xl"
      style={{
        backdropFilter: " blur(44px)",

        boxShadow: "0px 0px 8px 0px #00000026",
      }}
    >
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => handleTabClick(tab.id)}
          className={`px-5 py-2 rounded-full text-base text-[#302249] font-bold transition-all flex-shrink-0
            ${
              activeTab === tab.id
                ? "bg-[#302249] text-[#FFFFFF] shadow-inner"
                : "hover:bg-white/10"
            }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default FilterTabs;
