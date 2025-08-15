export type Player = {
  slatePlayerId: number;
  playerId: number;
  operatorPlayerName: string;
  operatorPosition: string;
  operatorSalary: number;
  team: string;
  fantasyPoints?: number;
  fantasyPointsPerDollar?: number;
  projectedOwnership?: number;
};

export type StadiumDetails = {
  stadiumId: number;
  name: string;
  city: string;
  state: string;
  country: string;
  capacity: number;
  playingSurface: string;
  geoLat: number;
  geoLong: number;
  type: string;
};

export type Game = {
  gameId: number;
  awayTeam: string;
  homeTeam: string;
  dateTime: string;
  channel: string;
  pointSpread: number;
  overUnder: number;
  stadiumDetails: StadiumDetails;
  status: string;
};

export type Slate = {
  id: string;
  name: string;
  players: Player[];
  games: Game[];
};

export type GameType = {
  id: string;
  name: string;
  slates: Slate[];
};

export type Operator = {
  id: string;
  name: string;
  gameTypes: GameType[];
};

export type Catalog = {
  operators: Operator[];
};
