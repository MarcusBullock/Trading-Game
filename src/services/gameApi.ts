import { supabase } from './supabase';
import { Database } from '../../types/supabase';

export type GameRow = Database['public']['Tables']['games']['Row'];
export type GameUser = Database['public']['Tables']['gameUser']['Row'];
export type GameInsert = Database['public']['Tables']['games']['Insert'];
export type GameUserInsert = Database['public']['Tables']['gameUser']['Insert'];

export async function getGame(id: string): Promise<GameRow | null> {
    try {
        const { data, error } = await supabase
            .from('games')
            .select('*')
            .eq('id', id)
            .single();

        if (error) throw new Error(`Couldn't fetch game with id: ${id}`);

        return data;
    } catch (error) {
        console.error('Error in getGame:', error);
        throw error;
    }
}

export async function createGame(game: GameInsert) {
    try {
        const { data, error } = await supabase
            .from('games')
            .insert([game])
            .select();

        if (error) throw new Error("Couldn't create game");

        return data;
    } catch (error) {
        console.error('Error in createGame:', error);
        throw error;
    }
}

export async function getGameUser(id: number): Promise<GameUser | null> {
    try {
        const { data, error } = await supabase
            .from('gameUser')
            .select('*')
            .eq('id', id)
            .single();

        if (error) throw new Error(`Couldn't fetch gameUser with id: ${id}`);

        return data;
    } catch (error) {
        console.error('Error in getGameUser:', error);
        throw error;
    }
}

export async function createGameUser(user: GameUserInsert) {
    try {
        const { data, error } = await supabase
            .from('gameUser')
            .insert([user])
            .select();

        if (error) throw new Error("Couldn't create game user");

        return data;
    } catch (error) {
        console.error('Error in createGameUser:', error);
        throw error;
    }
}
