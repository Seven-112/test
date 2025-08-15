"use client";

import { useState } from "react";
import { useCatalog } from "@/hooks/useCatalog";
import Header from "@/components/Header";
import SelectorRow from "@/components/SelectorRow";
import PlayerTable from "@/components/PlayerTable";
import PlayerCard from "@/components/PlayerCard";
import Pagination from "@/components/Pagination";

export default function Home() {
  const { data, loading, error } = useCatalog();
  const [selectedOperator, setSelectedOperator] = useState<string>("");
  const [selectedGameType, setSelectedGameType] = useState<string>("");
  const [selectedSlate, setSelectedSlate] = useState<string>("");
  const [selectedPlayerId, setSelectedPlayerId] = useState<number | null>(null);

  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  if (loading) return <div>Loading...</div>;
  if (error || !data) return <div>Error: {error}</div>;

  const operators = data.operators;

  const gameTypes = operators.find(op => op.id === selectedOperator)?.gameTypes || [];
  const slates = gameTypes.find(gt => gt.id === selectedGameType)?.slates || [];
  const players = slates.find(sl => sl.id === selectedSlate)?.players || [];

  const totalPages = Math.ceil(players.length / rowsPerPage);
  const paginatedPlayers = players.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  const selectedPlayer = players.find(p => p.playerId === selectedPlayerId) || players[0];

  return (
    <div className="flex flex-col h-screen bg-darkBg">
      <Header />
      <SelectorRow
        operators={operators}
        selectedOperator={selectedOperator}
        onOperatorSelect={setSelectedOperator}
        gameTypes={gameTypes}
        selectedGameType={selectedGameType}
        onGameTypeSelect={setSelectedGameType}
        slates={slates}
        selectedSlate={selectedSlate}
        onSlateSelect={setSelectedSlate}
      />
      <div className="flex flex-1 gap-6 px-6 mb-6 overflow-hidden w-full">
        <div className="flex-[0.7] border border-lightBg rounded-[8px] flex flex-col h-full overflow-hidden">
          <div className="flex-1 overflow-auto">
            <PlayerTable
              players={paginatedPlayers}
              selectedPlayerId={selectedPlayer?.playerId || null}
              onSelect={setSelectedPlayerId}
            />
          </div>
          <Pagination
            page={page}
            totalPages={totalPages}
            rowsPerPage={rowsPerPage}
            totalRows={players.length}
            onPageChange={setPage}
            onRowsPerPageChange={(r) => {
              setRowsPerPage(r);
              setPage(1);
            }}
          />
        </div>
        <div className="flex-[0.3]">
          <PlayerCard player={selectedPlayer || null} />
        </div>
      </div>
    </div>
  );
}
