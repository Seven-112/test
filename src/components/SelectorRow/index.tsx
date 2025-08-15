"use client";

import Selector from "../Selector";
import { Operator, GameType, Slate } from "@/utils/type";

type Props = {
  operators: Operator[];
  selectedOperator: string;
  onOperatorSelect: (id: string) => void;
  gameTypes: GameType[];
  selectedGameType: string;
  onGameTypeSelect: (id: string) => void;
  slates: Slate[];
  selectedSlate: string;
  onSlateSelect: (id: string) => void;
};

export default function SelectorRow({
  operators,
  selectedOperator,
  onOperatorSelect,
  gameTypes,
  selectedGameType,
  onGameTypeSelect,
  slates,
  selectedSlate,
  onSlateSelect,
}: Props) {
  return (
    <div className="w-3/4 bg-white/10 rounded-lg p-6 gap-6 flex my-14 mx-auto">
      <Selector
        options={operators}
        value={selectedOperator}
        onChange={onOperatorSelect}
        labelKey="name"
        valueKey="id"
        placeholder="Select Operator"
      />
      <Selector
        options={gameTypes}
        value={selectedGameType}
        onChange={onGameTypeSelect}
        labelKey="name"
        valueKey="id"
        placeholder="Select Game Type"
      />
      <Selector
        options={slates}
        value={selectedSlate}
        onChange={onSlateSelect}
        labelKey="name"
        valueKey="id"
        placeholder="Select Slate Name"
      />
    </div>
  );
}
