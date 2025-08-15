import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import Home from "@/app/page";

jest.mock("@/hooks/useCatalog", () => ({
  useCatalog: () => ({
    data: {
      operators: [
        {
          id: "1",
          name: "Operator 1",
          gameTypes: [
            {
              id: "gt1",
              name: "GameType 1",
              slates: [
                {
                  id: "sl1",
                  name: "Slate 1",
                  players: [
                    {
                      slatePlayerId: 1,
                      playerId: 1,
                      operatorPlayerName: "John Doe",
                      operatorPosition: "QB",
                      operatorSalary: 5000,
                      team: "ABC",
                      fantasyPoints: 10,
                    },
                  ],
                  games: [],
                },
              ],
            },
          ],
        },
      ],
    },
    loading: false,
    error: null,
  }),
}));

describe("Home Page", () => {
  it("renders header and selectors", () => {
    render(<Home />);
    expect(screen.getByText(/Fantasy Football/i)).toBeInTheDocument();
    // Check for select options instead of placeholder
    expect(screen.getByRole('option', { name: /Select Operator/i })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: /Select Game Type/i })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: /Select Slate Name/i })).toBeInTheDocument();
  });

  it("renders player table and card after selections", () => {
    render(<Home />);
    // Select Operator
    fireEvent.change(screen.getAllByRole('combobox')[0], { target: { value: "1" } });
    // Select Game Type
    fireEvent.change(screen.getAllByRole('combobox')[1], { target: { value: "gt1" } });
    // Select Slate
    fireEvent.change(screen.getAllByRole('combobox')[2], { target: { value: "sl1" } });

    // There should be at least two "John Doe" (table + card)
    expect(screen.getAllByText(/John Doe/i).length).toBeGreaterThanOrEqual(2);
    expect(screen.getAllByText(/Points/i).length).toBeGreaterThanOrEqual(2);
  });
});