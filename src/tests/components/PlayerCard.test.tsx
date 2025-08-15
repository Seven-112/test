import { render, screen } from "@testing-library/react";
import PlayerCard from "@/components/PlayerCard";

describe("PlayerCard", () => {
  it("renders fallback when no player", () => {
    render(<PlayerCard player={null} />);
    expect(screen.getByText(/Select a player/i)).toBeInTheDocument();
  });
});