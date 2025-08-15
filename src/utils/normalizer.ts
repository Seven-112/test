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

  const operatorMap: Record<string, Operator> = {};

  rawJson.forEach((item: any) => {
    const operatorId = item.operator || item.operatorName || "unknown-operator";
    const operatorName = item.operator || item.operatorName || "Unknown Operator";
    const gameTypeId = item.operatorGameType || "unknown-game-type";
    const gameTypeName = item.operatorGameType || "Unknown Game Type";
    const slateId = String(item.operatorSlateId || item._id || item.slateId || "unknown-slate");
    const slateName = item.operatorName || "Unknown Slate";

    // Operator
    if (!operatorMap[operatorId]) {
      operatorMap[operatorId] = {
        id: operatorId,
        name: operatorName,
        gameTypes: [],
      };
    }
    const operator = operatorMap[operatorId];

    // GameType
    let gameType = operator.gameTypes.find((gt) => gt.id === gameTypeId);
    if (!gameType) {
      gameType = {
        id: gameTypeId,
        name: gameTypeName,
        slates: [],
      };
      operator.gameTypes.push(gameType);
    }

    // Slate
    let slate = gameType.slates.find((s) => s.id === slateId);
    if (!slate) {
      slate = {
        id: slateId,
        name: slateName,
        players: [],
        games: [],
      };
      gameType.slates.push(slate);
    }

    // Games
    if (Array.isArray(item.dfsSlateGames)) {
      item.dfsSlateGames.forEach((sg: any) => {
        if (!sg.game) return;
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
    }

    // Players
    if (Array.isArray(item.dfsSlatePlayers)) {
      item.dfsSlatePlayers.forEach((sp: any) => {
        const player: Player = {
          slatePlayerId: sp.slatePlayerId,
          playerId: sp.playerId,
          operatorPlayerName: sp.operatorPlayerName,
          operatorPosition: sp.operatorPosition,
          operatorSalary: sp.operatorSalary,
          team: sp.team,
          fantasyPoints: sp.fantasyPoints,
          fantasyPointsPerDollar: sp.fantasyPointsPerDollar,
          projectedOwnership: sp.projectedOwnership,
        };
        slate.players.push(player);
      });
    }
  });

  return { operators: Object.values(operatorMap) };
}

