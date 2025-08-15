import { Database } from '../../types/supabase';
import { supabase } from './supabase';
import {
    useMutation,
    UseMutationResult,
    useQuery,
    useQueryClient,
    UseQueryResult,
} from '@tanstack/react-query';

export type GameRow = Database['public']['Tables']['games']['Row'];
export type GameUser = Database['public']['Tables']['gameUser']['Row'];
export type GameInsert = Database['public']['Tables']['games']['Insert'];
export type GameUpdate = Database['public']['Tables']['games']['Update'];
export type GameUserInsert = Database['public']['Tables']['gameUser']['Insert'];
export type GamePhase = Database['public']['Tables']['gamePhase']['Row'];
export type GamePhaseInsert =
    Database['public']['Tables']['gamePhase']['Insert'];
export type CompanyRow = Database['public']['Tables']['company']['Row'];
export type GameWithUser = {
    game: GameRow;
    user: GameUser;
};

export const useGame = (id: string): UseQueryResult<GameWithUser, Error> => {
    return useQuery({
        queryKey: ['getGame'],
        queryFn: async () => {
            const { data: game, error: gameError } = await supabase
                .from('games')
                .select('*')
                .eq('id', id)
                .single();

            if (gameError) throw new Error(gameError.message);

            const { data: user, error: userError } = await supabase
                .from('gameUser')
                .select('*')
                .eq('id', game.userId)
                .single();

            if (userError) throw new Error(userError.message);

            return { game, user };
        },
    });
};

async function createGame(game: GameInsert): Promise<GameInsert[]> {
    const { data, error } = await supabase
        .from('games')
        .insert([game])
        .select();

    if (error) {
        throw new Error("Couldn't create game");
    }

    return data;
}

export function useCreateGame(): UseMutationResult<
    GameInsert[],
    Error,
    GameInsert
> {
    const queryClient = useQueryClient();

    return useMutation<GameInsert[], Error, GameInsert>({
        mutationFn: createGame,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['getGame'] });
            return data;
        },
        onError: (error) => {
            throw new Error(error.message);
        },
    });
}

async function createGameUser(user: GameUserInsert): Promise<GameUserInsert[]> {
    const { data, error } = await supabase
        .from('gameUser')
        .insert([user])
        .select();

    if (error) {
        throw new Error("Couldn't create game user");
    }

    return data;
}

export function useCreateGameUser(): UseMutationResult<
    GameUserInsert[],
    Error,
    GameUserInsert
> {
    const queryClient = useQueryClient();

    return useMutation<GameUserInsert[], Error, GameUserInsert>({
        mutationFn: createGameUser,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['getGameUser'] });
            return data;
        },
        onError: (error) => {
            throw new Error(error.message);
        },
    });
}

async function updateGame(
    id: string,
    gameUpdates: Partial<GameUpdate>
): Promise<GameUpdate[]> {
    const { data, error } = await supabase
        .from('games')
        .update(gameUpdates)
        .eq('id', id)
        .select();

    if (error) {
        throw new Error("Couldn't update game");
    }

    return data;
}

export function useUpdateGame(): UseMutationResult<
    GameUpdate[],
    Error,
    { gameId: string; gameUpdates: Partial<GameUpdate> }
> {
    const queryClient = useQueryClient();

    return useMutation<
        GameUpdate[],
        Error,
        { gameId: string; gameUpdates: Partial<GameUpdate> }
    >({
        mutationFn: ({ gameId, gameUpdates }) =>
            updateGame(gameId, gameUpdates),
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries({
                queryKey: ['getGame', variables.gameId],
            });
            queryClient.refetchQueries({ queryKey: ['getGame'], exact: true });
            return data;
        },
        onError: (error) => {
            throw new Error(error.message);
        },
    });
}

async function createGamePhases(
    gamePhases: GamePhaseInsert[]
): Promise<GamePhaseInsert[]> {
    const { data, error } = await supabase
        .from('gamePhase')
        .insert(gamePhases)
        .select();

    if (error) {
        throw new Error("Couldn't create game phases");
    }

    return data;
}

export function useCreateGamePhases(): UseMutationResult<
    GamePhaseInsert[],
    Error,
    GamePhaseInsert[]
> {
    return useMutation<GamePhaseInsert[], Error, GamePhaseInsert[]>({
        mutationFn: createGamePhases,
        onSuccess: (data) => {
            return data;
        },
        onError: (error) => {
            throw new Error(error.message);
        },
    });
}

export const useCompanies = (): UseQueryResult<CompanyRow[], Error> => {
    return useQuery({
        queryKey: ['getCompanies'],
        queryFn: async () => {
            const { data, error } = await supabase.from('company').select('*');
            if (error) throw new Error(error.message);
            return data;
        },
    });
};

export const useLatestGamePhase = (
    id: string
): UseQueryResult<GamePhase, Error> => {
    return useQuery({
        queryKey: ['getLatestGamePhase'],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('gamePhase')
                .select('*')
                .eq('gameId', id)
                .order('created_at', { ascending: false })
                .limit(1)
                .single();

            if (error) throw new Error(error.message);
            return data;
        },
    });
};
