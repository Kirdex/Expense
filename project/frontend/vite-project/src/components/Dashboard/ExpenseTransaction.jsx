import React from "react";
import { LuArrowRight } from "react-icons/lu";
import TransctionInfoCard from "../Cards/TransactionInfoCard";
const ExpenseTransaction = ({ transactions, onSeeMore }) => {
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Exapanses</h5>
        <button className="card-btn " onClick={onSeeMore}>
          See All <LuArrowRight className="text-base" />s
        </button>
      </div>

      <div className="mt-6">
        {transactions?.slice(0, 5)?.map((expense) => (
          <TransctionInfoCard
            key={expense._id}
            title={expense.category}
            icon={expense.icon}
            date={moment(expense.date).format("Do MMM YYYY")}
            amount={expense.amount}
            type="expense"
            hiddenDeleteBtn
          />
        ))}
      </div>
    </div>
  );
};

export default ExpenseTransaction;
