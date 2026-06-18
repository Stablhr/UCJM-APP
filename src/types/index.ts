export interface Profile {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  created_at: string;
}

export interface CellGroup {
  id: string;
  name: string;
  leader_id: string;
  invite_code: string;
  created_at: string;
}

export interface CellMember {
  id: string;
  group_id: string;
  user_id: string;
  role: 'leader' | 'member';
  joined_at: string;
}

export interface LifeArea {
  id: string;
  name: string;
  is_predefined: boolean;
  created_by?: string;
}

export interface ReadingPlan {
  id: string;
  title: string;
  description?: string;
  duration_days: number;
  life_area_id?: string;
  created_by?: string;
  created_at: string;
}

export interface ReadingLog {
  id: string;
  user_id: string;
  date: string;
  passage: string;
  plan_id?: string;
  completed: boolean;
  created_at: string;
}

export interface Song {
  id: string;
  title: string;
  artist: string;
  key?: string;
  lyrics_with_chords: string;
  category?: string;
  created_by?: string;
  created_at: string;
}
