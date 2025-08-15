"use client";
import { Player } from "@/utils/type";

type Props = {
  players: Player[];
  selectedPlayerId: number | null;
  onSelect: (id: number) => void;
};

export default function PlayerTable({ players, selectedPlayerId, onSelect }: Props) {
  const formatSalary = (salary: number) => {
    return `$${salary.toLocaleString("en-US")}`;
  };

  return (
    <table className="w-full border-collapse font-inter font-normal text-2xl text-white min-w-max">
      <thead>
        <tr className="bg-midBg sticky top-0">
          <th className="border-b border-lightBg text-left px-6 py-4">Name</th>
          <th className="border-b border-lightBg text-center px-6 py-4">Team</th>
          <th className="border-b border-lightBg text-center px-6 py-4">Position</th>
          <th className="border-b border-lightBg text-center px-6 py-4">Salary</th>
          <th className="border-b border-lightBg text-right px-6 py-4">Points</th>
        </tr>
      </thead>
      <tbody>
        {players.map((player, idx) => (
          <tr
            key={`${player.slatePlayerId}-${player.playerId}-${idx}`}
            onClick={() => onSelect(player.playerId)}
            className={`cursor-pointer hover:bg-accent ${selectedPlayerId === player.playerId ? "bg-accent" : "bg-lightBg"}`}
          >
            <td className="px-6 py-4 text-left">{player.operatorPlayerName}</td>
            <td className="px-6 py-4 text-center">{player.team}</td>
            <td className="px-6 py-4 text-center">{player.operatorPosition}</td>
            <td className="px-6 py-4 text-center">
              {formatSalary(player.operatorSalary)}
            </td>
            <td className="px-6 py-4 text-right">{player.fantasyPoints || 0}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
