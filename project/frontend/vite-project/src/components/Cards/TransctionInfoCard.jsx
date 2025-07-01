import React from "react";
import { LuTrendingUp, LuUtensils } from "react-icons/lu";

const TransctionInfoCard = ({
  title,
  icon,
  date,
  amount,
  type,
  hiddenDeleteBtn,
}) => {
  return (
    <div className="group relative flex items-center gap-4 mt-2 p-3 rounded-lg hover:bg-gray-100/60">
      <div className="w-12 h-12 flex itmes-center justify-center text-xl text-gray-800 bg-gray-100 rounded-full">
        {icon ? (
          <img src={icon} alt={title} className="w-6 h-6 " />
        ) : (
          <LuUtensils className="w-5 h-5 text-gray-600" />
        )}
      </div>
      <div clasName="flex-1 flex items-center justify-between">
        <p className="text-sm text-gray-700 font medium">{title}</p>
        <p className="text-xs text-gray-400 mt-1">{date}</p>
      </div>
      <div className="flex items-center gap-2">
        {!hiddenDeleteBtn && (
          <button className="text-gray-400 hover" onClick={onDelete}>
            <LuTrash2 size={18} />
          </button>
        )}
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-md`}>
          <h6 className="">
            {type === "income" ? "+" : "-"} ${amount}
          </h6>
          {type === "income" ? <LuTrendingUp /> : <LuTrendingDown />}
        </div>
      </div>
    </div>
  );
};

export default TransctionInfoCard;
