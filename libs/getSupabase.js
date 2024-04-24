import { createClient } from "@supabase/supabase-js";

//기본적인 supabase api 초기화 과정
const supabaseUrl = "https://gladegbtghaybjczkory.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdsYWRlZ2J0Z2hheWJqY3prb3J5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM4MzQzMzIsImV4cCI6MjAyOTQxMDMzMn0.OxDDv24uCPHf9AnH6iwkZd-WfiD17rukZBn2FNQD3X4";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
