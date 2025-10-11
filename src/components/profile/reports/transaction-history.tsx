import { Notebook } from "lucide-react";
import React from "react";

export default function TransactionHistory() {
  const history = [];
  return (
    <div className="text-black w-full h-full">
      {history.length !== 0 ? (
        <div></div>
      ) : (
        <div className="flex flex-col items-center justify-center  w-full mx-auto gap-5">
          <div className="w-20 h-20 rounded-full bg-alternate flex items-center justify-center">
            <Notebook size={30} color="white" className="stroke-3" />
          </div>
          <h1 className="text-center text-primary font-bold text-3xl ">No Transaction Reports</h1>
          <div className="max-w-sm text-2xl text-center ">
            You haven't reported any transaction yet
          </div>
        </div>
      )}
    </div>
  );
}
