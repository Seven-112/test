"use client";
import { Player } from "@/utils/type";

type Props = {
  player: Player | null;
};

export default function PlayerCard({ player }: Props) {
  if (!player) return <div className="px-6 py-4text-white">Select a player</div>;

  return (
    <div className="border border-lightBg rounded-[8px] shadow-md shadow-lg w-full h-full flex flex-col overflow-hidden">
      <div className="h-1/2 w-full relative flex items-end">
        <img
          src="/icons/player.png"
          alt={player.operatorPlayerName}
          className="w-full h-[95%] object-contain absolute bottom-0 left-0"
        />
      </div>
      <div className="h-1/2 w-full flex flex-col bg-lightBg">
        <div className="h-1/4 flex items-center justify-center">
          <p className="font-inter font-normal text-[32px] text-white text-center">
            {player.operatorPlayerName}
          </p>
        </div>
        <div className="h-1/2 flex items-center justify-center">
          <p className="font-inter font-bold text-[128px] text-white">
            {player.fantasyPoints || 0}
          </p>
        </div>
        <div className="h-1/4 flex items-start justify-center pt-0">
          <p className="font-inter font-normal text-sm text-white">Points</p>
        </div>
      </div>
    </div>
  );
}
