// import PropTypes from "prop-types";

// export default function TabNavigation({ tabs, activeTab, onChangeTab, tenant }) {
//   return (
//     <div className="mb-5 flex flex-wrap gap-2">
//       {tabs.map((tab) => {
//         const isDisabled = !tenant && ["cars", "bookings"].includes(tab.key);
//         return (
//           <button
//             key={tab.key}
//             onClick={() => !isDisabled && onChangeTab(tab.key)}
//             disabled={isDisabled}
//             className={`px-4 py-2 rounded border ${
//               activeTab === tab.key
//                 ? "bg-blue-600 text-white"
//                 : "bg-gray-200 text-black"
//             } ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
//           >
//             {tab.label}
//           </button>
//         );
//       })}
//     </div>
//   );
// }

// TabNavigation.propTypes = {
//   tabs: PropTypes.array.isRequired,
//   activeTab: PropTypes.string.isRequired,
//   onChangeTab: PropTypes.func.isRequired,
//   tenant: PropTypes.any,
// };


import PropTypes from "prop-types";

export default function TabNavigation({ tabs, activeTab, onChangeTab, tenant }) {
  return (
    <div className="mb-5">
      {/* Container adjusts layout based on screen size */}
      <div className="flex flex-col sm:flex-row sm:flex-nowrap gap-2 sm:gap-4 overflow-x-auto">
        {tabs.map((tab) => {
          const isDisabled = !tenant && ["cars", "bookings"].includes(tab.key);
          return (
            <button
              key={tab.key}
              onClick={() => !isDisabled && onChangeTab(tab.key)}
              disabled={isDisabled}
              className={`
                px-4 py-2 rounded border text-center transition-colors duration-200
                ${activeTab === tab.key ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"}
                ${isDisabled ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-500 hover:text-white"}
                flex-shrink-0
              `}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

TabNavigation.propTypes = {
  tabs: PropTypes.array.isRequired,
  activeTab: PropTypes.string.isRequired,
  onChangeTab: PropTypes.func.isRequired,
  tenant: PropTypes.any,
};
