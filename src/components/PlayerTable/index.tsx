"use client";
import { Player } from "@/utils/type";

type Props = {
  players: Player[];
  selectedPlayerId: number | null;
  onSelect: (id: number) => void;
};

export default function PlayerTable({ players, selectedPlayerId, onSelect }: Props) {
  return (
    <table className="w-full border-collapse font-inter font-normal text-2xl text-white min-w-max">
      <thead>
        <tr className="bg-midBg sticky top-0">
          <th className="border-b border-lightBg text-left px-6 py-2">Name</th>
          <th className="border-b border-lightBg text-center px-6 py-2">Position</th>
          <th className="border-b border-lightBg text-center px-6 py-2">Team</th>
          <th className="border-b border-lightBg text-center px-6 py-2">Points</th>
          <th className="border-b border-lightBg text-right px-6 py-2">Salary</th>
        </tr>
      </thead>
      <tbody>
        {players.map((player) => (
          <tr
            key={player.playerId}
            onClick={() => onSelect(player.playerId)}
            className={`cursor-pointer hover:bg-accent ${selectedPlayerId === player.playerId ? "bg-accent" : ""
              }`}
          >
            <td className="px-6 py-2 text-left">{player.operatorPlayerName}</td>
            <td className="px-6 py-2 text-center">{player.operatorPosition}</td>
            <td className="px-6 py-2 text-center">{player.team}</td>
            <td className="px-6 py-2 text-center">{player.fantasyPoints || 0}</td>
            <td className="px-6 py-2 text-right">{player.operatorSalary}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
