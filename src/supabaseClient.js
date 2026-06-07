// Supabase client — kept for reference.
//
// This project originally stored inventory in a Supabase (Postgres) table and
// performed live CRUD against it. The deployed demo now uses a per-visitor
// localStorage store instead (see src/hooks/useInventory.js) so the public
// portfolio version always works and can't be modified by other visitors.
//
// This file is intentionally retained to show the original integration. To run
// against a live Supabase instance, set VITE_SUPABASE_URL and
// VITE_SUPABASE_ANON_KEY in a .env file and wire this client back into the
// inventory hook.

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase =
  supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

export default supabase;
