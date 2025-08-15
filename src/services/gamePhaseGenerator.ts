import { CompanyRow, GamePhase } from './gameApi';

export default function generateGamePhase(
    gameId: string,
    company: CompanyRow,
    latestGamePhase: GamePhase | null | undefined = null
) {
    if (latestGamePhase != null) {
        const volatility = 0.02; // Volatility factor (adjust this to control randomness)
        const trend = 0.0005; // A slight upward trend bias
        const direction = Math.random() > 0.9 ? -1 : 1;

        const randomFactor = Math.random() * volatility * direction;
        const newPrice =
            latestGamePhase.price +
            latestGamePhase.price * (randomFactor + trend);
        const change = newPrice - latestGamePhase.price;
        const changePercent = (latestGamePhase.price / newPrice) * 100;

        return {
            price: newPrice,
            change,
            changePercent,
            gameId,
            created_at: new Date(),
            companyId: company.id,
        };
    } else {
        return {
            price: Number((Math.random() * (700 - 75) + 75).toFixed(4)), // Start first phase with a random price between 75-7
            change: 0,
            changePercent: 0,
            gameId,
            created_at: new Date(),
            companyId: company.id,
        };
    }
}
