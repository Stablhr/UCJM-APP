-- UCJM Database Schema
-- Unity In Christ Jesus Ministries

-- Profiles (extends Supabase auth.users)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Cell Groups
CREATE TABLE public.cell_groups (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL DEFAULT 'Cell Group',
  leader_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  invite_code TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

ALTER TABLE public.cell_groups ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Leaders can manage their own cell groups"
  ON public.cell_groups FOR ALL
  USING (auth.uid() = leader_id);

CREATE POLICY "Members can view their cell groups"
  ON public.cell_groups FOR SELECT
  USING (
    auth.uid() IN (
      SELECT user_id FROM public.cell_members WHERE group_id = id
    )
  );

-- Cell Members
CREATE TABLE public.cell_members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  group_id UUID REFERENCES public.cell_groups(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('leader', 'member')),
  joined_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  UNIQUE(group_id, user_id)
);

ALTER TABLE public.cell_members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Members can view their own memberships"
  ON public.cell_members FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Leaders can view their group members"
  ON public.cell_members FOR SELECT
  USING (
    auth.uid() IN (
      SELECT leader_id FROM public.cell_groups WHERE id = group_id
    )
  );

CREATE POLICY "Leaders can add members to their groups"
  ON public.cell_members FOR INSERT
  WITH CHECK (
    auth.uid() IN (
      SELECT leader_id FROM public.cell_groups WHERE id = group_id
    )
  );

-- Life Areas
CREATE TABLE public.life_areas (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  is_predefined BOOLEAN DEFAULT false NOT NULL,
  created_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

ALTER TABLE public.life_areas ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view life areas"
  ON public.life_areas FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can create custom life areas"
  ON public.life_areas FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = created_by);

-- Insert predefined life areas
INSERT INTO public.life_areas (name, is_predefined) VALUES
  ('Trusting the Lord', true),
  ('Patience', true),
  ('Joy', true),
  ('Peace', true),
  ('Faith', true),
  ('Love', true),
  ('Forgiveness', true),
  ('Humility', true),
  ('Strength', true),
  ('Wisdom', true),
  ('Gratitude', true),
  ('Hope', true);

-- Reading Plans
CREATE TABLE public.reading_plans (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  duration_days INTEGER NOT NULL,
  life_area_id UUID REFERENCES public.life_areas(id),
  created_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

ALTER TABLE public.reading_plans ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view reading plans"
  ON public.reading_plans FOR SELECT
  TO authenticated
  USING (true);

-- Reading Logs
CREATE TABLE public.reading_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  passage TEXT NOT NULL,
  plan_id UUID REFERENCES public.reading_plans(id),
  completed BOOLEAN DEFAULT true NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

ALTER TABLE public.reading_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own reading logs"
  ON public.reading_logs FOR ALL
  USING (auth.uid() = user_id);

CREATE POLICY "Cell group leaders can view members reading logs"
  ON public.reading_logs FOR SELECT
  USING (
    auth.uid() IN (
      SELECT cg.leader_id FROM public.cell_groups cg
      JOIN public.cell_members cm ON cm.group_id = cg.id
      WHERE cm.user_id = reading_logs.user_id
    )
  );

-- Songs
CREATE TABLE public.songs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  artist TEXT NOT NULL,
  key TEXT,
  lyrics_with_chords TEXT NOT NULL,
  category TEXT,
  created_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

ALTER TABLE public.songs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view songs"
  ON public.songs FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can manage songs"
  ON public.songs FOR ALL
  USING (
    auth.uid() IN (
      SELECT id FROM public.profiles WHERE id = auth.uid()
    )
  );
