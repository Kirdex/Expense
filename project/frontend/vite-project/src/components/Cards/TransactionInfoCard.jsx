import React from "react";
import {
  LuTrendingUp,
  LuTrendingDown,
  LuUtensils,
  LuTrash,
} from "react-icons/lu";

const TransactionInfoCard = ({
  // Fixed: TransactionInfoCard (was TransctionInfoCard)
  title,
  icon,
  date,
  amount,
  type,
  hiddenDeleteBtn,
  onDelete,
}) => {
  const getAmountStyles = () =>
    type === "income"
      ? "bg-green-50 text-green-500" // Fixed: text-green-500 (was text-green 500:)
      : "bg-red-50 text-red-500";

  return (
    <div className="group relative flex items-center gap-4 mt-2 p-3 rounded-lg hover:bg-gray-100/60">
      <div className="w-12 h-12 flex items-center justify-center text-xl text-gray-800 bg-gray-100 rounded-full">
        {" "}
        {/* Fixed: items-center */}
        {icon ? (
          <img src={icon} alt={title} className="w-6 h-6" />
        ) : (
          <LuUtensils className="w-5 h-5 text-gray-600" />
        )}
      </div>

      <div className="flex-1">
        <p className="text-sm text-gray-700 font-medium">{title}</p>{" "}
        {/* Fixed: font-medium */}
        <p className="text-xs text-gray-400 mt-1">{date}</p>
      </div>

      <div className="flex items-center gap-2">
        {!hiddenDeleteBtn && (
          <button
            className="text-gray-400 hover:text-red-500 transition-colors" // Fixed: added hover class
            onClick={onDelete}
          >
            <LuTrash size={18} />
          </button>
        )}

        <div
          className={`flex items-center gap-2 px-3 py-1.5 rounded-md ${getAmountStyles()}`}
        >
          <h6 className="text-xs font-medium">
            {type === "income" ? "+" : "-"} ${amount}
          </h6>
          {type === "income" ? <LuTrendingUp /> : <LuTrendingDown />}
        </div>
      </div>
    </div>
  );
};

export default TransactionInfoCard; // Fixed: export name
