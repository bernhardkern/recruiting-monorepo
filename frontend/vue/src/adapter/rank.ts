import type {RankingFrontend, RankingResource} from "@/models/ranking";

export function rankingResourceToRankingFrontend(rankingResource: RankingResource): RankingFrontend {
    return {
        id: rankingResource.player.id!!,
        username: rankingResource.player.username,
        displayName: rankingResource.player.displayName,
        email: rankingResource.player.email,
        elo: rankingResource.player.elo!!,
        rank: rankingResource.rank
    }
}
