import {
  Catalog,
  Operator,
  GameType,
  Slate,
  Game,
  StadiumDetails,
  Player,
} from "./type";

export function normalizeToCatalog(rawJson: any): Catalog {
  if (!rawJson || !Array.isArray(rawJson)) return { operators: [] };

  // Group raw data by operator
  const operatorMap: Record<string, Operator> = {};

  rawJson.forEach((item: any) => {
    const operatorId = item._id || "unknown-operator";
    const operatorName = item.operatorName || item.name || "Unknown Operator";

    if (!operatorMap[operatorId]) {
      operatorMap[operatorId] = {
        id: operatorId,
        name: operatorName,
        gameTypes: [],
      };
    }

    // Each item corresponds to a gameType (season + seasonType)
    const gameTypeId = `season-${item.season}-type-${item.seasonType}`;
    let gameType = operatorMap[operatorId].gameTypes.find(
      (gt) => gt.id === gameTypeId
    );

    if (!gameType) {
      gameType = {
        id: gameTypeId,
        name: `Season ${item.season} Type ${item.seasonType}`,
        slates: [],
      };
      operatorMap[operatorId].gameTypes.push(gameType);
    }

    // Each dfsSlateGames entry corresponds to a slate
    item.dfsSlateGames.forEach((sg: any) => {
      const slateId = String(sg.slateId);
      let slate = gameType.slates.find((s) => s.id === slateId);
      if (!slate) {
        slate = {
          id: slateId,
          name: `Week ${item.week || 1}`,
          players: [],
          games: [],
        };
        gameType.slates.push(slate);
      }

      // Map player
      const player: Player = {
        slatePlayerId: sg.slateGameId,
        playerId: sg.game?.globalGameId || 0,
        operatorPlayerName: sg.game?.awayTeam || "Unknown",
        operatorPosition: "Unknown",
        operatorSalary: 0,
        team: sg.game?.homeTeam || "Unknown",
        fantasyPoints: undefined,
        fantasyPointsPerDollar: undefined,
        projectedOwnership: undefined,
      };
      slate.players.push(player);

      // Map game
      const game: Game = {
        gameId: sg.game.globalGameId,
        awayTeam: sg.game.awayTeam,
        homeTeam: sg.game.homeTeam,
        dateTime: sg.game.dateTime,
        channel: sg.game.channel,
        pointSpread: Number(sg.game.pointSpread) || 0,
        overUnder: Number(sg.game.overUnder) || 0,
        stadiumDetails: {
          stadiumId: sg.game.stadiumDetails.stadiumId,
          name: sg.game.stadiumDetails.name,
          city: sg.game.stadiumDetails.city,
          state: sg.game.stadiumDetails.state,
          country: sg.game.stadiumDetails.country,
          capacity: Number(sg.game.stadiumDetails.capacity) || 0,
          playingSurface: sg.game.stadiumDetails.playingSurface,
          geoLat: Number(sg.game.stadiumDetails.geoLat) || 0,
          geoLong: Number(sg.game.stadiumDetails.geoLong) || 0,
          type: sg.game.stadiumDetails.type,
        } as StadiumDetails,
        status: sg.game.status,
      };
      slate.games.push(game);
    });
  });

  return { operators: Object.values(operatorMap) };
}



