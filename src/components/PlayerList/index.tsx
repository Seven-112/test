"use client";
import { Player } from "@/utils/type";
import PlayerCard from "../PlayerCard";

type Props = {
  players: Player[];
  selectedPlayerId: number | null;
  onSelect: (playerId: number) => void;
};

export default function PlayerList({ players, selectedPlayerId, onSelect }: Props) {
  if (!players.length) return <div>No players available</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
      {players.map((player) => (
        <div
          key={player.playerId}
          className={`cursor-pointer ${selectedPlayerId === player.playerId ? "border-2 border-blue-500 rounded" : ""}`}
          onClick={() => onSelect(player.playerId)}
        >
          <PlayerCard player={player} />
        </div>
      ))}
    </div>
  );
}
