import React from "react";
import HistoryContainer from "./HistoryContainer";

function History() {
  return (
    <main className="flex flex-col gap-4 items-center justify-center p-4 pb-32">
      <HistoryContainer />
      <HistoryContainer />
      <HistoryContainer />
      <HistoryContainer />
    </main>
  );
}

export default History;
