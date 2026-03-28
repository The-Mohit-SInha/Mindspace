import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "jsr:@supabase/supabase-js@2.49.8";
import * as kv from "./kv_store.tsx";

const app = new Hono();

// Create Supabase client
const supabase = createClient(
  Deno.env.get("SUPABASE_URL") || "",
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "",
);

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-1e942b60/health", (c) => {
  return c.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Test database connection
app.get("/make-server-1e942b60/test-db", async (c) => {
  try {
    const { data, error } = await supabase
      .from("kv_store_1e942b60")
      .select("key")
      .limit(1);

    if (error) {
      console.error("Database test error:", error);
      return c.json({ 
        success: false, 
        error: error.message,
        hint: "Make sure kv_store_1e942b60 table exists" 
      }, 500);
    }

    return c.json({ 
      success: true, 
      message: "Database connection successful",
      hasData: data && data.length > 0
    });
  } catch (err) {
    console.error("Database test exception:", err);
    return c.json({ 
      success: false, 
      error: String(err) 
    }, 500);
  }
});

// User Profile Routes
app.get("/make-server-1e942b60/profile/:userId", async (c) => {
  try {
    const userId = c.req.param("userId");
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (error && error.code !== "PGRST116") {
      return c.json({ error: error.message }, 500);
    }

    return c.json({ data: data || null });
  } catch (err) {
    console.error("Error fetching profile:", err);
    return c.json({ error: String(err) }, 500);
  }
});

app.post("/make-server-1e942b60/profile", async (c) => {
  try {
    const body = await c.req.json();
    const { data, error } = await supabase
      .from("profiles")
      .upsert(body)
      .select()
      .single();

    if (error) {
      return c.json({ error: error.message }, 500);
    }

    return c.json({ data });
  } catch (err) {
    console.error("Error saving profile:", err);
    return c.json({ error: String(err) }, 500);
  }
});

// Mood Tracking Routes
app.get("/make-server-1e942b60/mood/:userId", async (c) => {
  try {
    const userId = c.req.param("userId");
    const { data, error } = await supabase
      .from("mood_entries")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      return c.json({ error: error.message }, 500);
    }

    return c.json({ data: data || [] });
  } catch (err) {
    console.error("Error fetching mood entries:", err);
    return c.json({ error: String(err) }, 500);
  }
});

app.post("/make-server-1e942b60/mood", async (c) => {
  try {
    const body = await c.req.json();
    const { data, error } = await supabase
      .from("mood_entries")
      .insert(body)
      .select()
      .single();

    if (error) {
      return c.json({ error: error.message }, 500);
    }

    return c.json({ data });
  } catch (err) {
    console.error("Error saving mood entry:", err);
    return c.json({ error: String(err) }, 500);
  }
});

// Resources Routes
app.get("/make-server-1e942b60/resources", async (c) => {
  try {
    const category = c.req.query("category");
    let query = supabase.from("resources").select("*");

    if (category) {
      query = query.eq("category", category);
    }

    const { data, error } = await query.order("created_at", { ascending: false });

    if (error) {
      return c.json({ error: error.message }, 500);
    }

    return c.json({ data: data || [] });
  } catch (err) {
    console.error("Error fetching resources:", err);
    return c.json({ error: String(err) }, 500);
  }
});

// Assessment Routes
app.get("/make-server-1e942b60/assessments", async (c) => {
  try {
    const { data, error } = await supabase
      .from("assessments")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return c.json({ error: error.message }, 500);
    }

    return c.json({ data: data || [] });
  } catch (err) {
    console.error("Error fetching assessments:", err);
    return c.json({ error: String(err) }, 500);
  }
});

app.post("/make-server-1e942b60/assessment-results", async (c) => {
  try {
    const body = await c.req.json();
    const { data, error } = await supabase
      .from("assessment_results")
      .insert(body)
      .select()
      .single();

    if (error) {
      return c.json({ error: error.message }, 500);
    }

    return c.json({ data });
  } catch (err) {
    console.error("Error saving assessment result:", err);
    return c.json({ error: String(err) }, 500);
  }
});

// Community Routes - Support Groups
app.get("/make-server-1e942b60/support-groups", async (c) => {
  try {
    const { data, error } = await supabase
      .from("support_groups")
      .select("*")
      .eq("is_active", true)
      .order("created_at", { ascending: false });

    if (error) {
      return c.json({ error: error.message }, 500);
    }

    return c.json({ data: data || [] });
  } catch (err) {
    console.error("Error fetching support groups:", err);
    return c.json({ error: String(err) }, 500);
  }
});

// Forum Topics
app.get("/make-server-1e942b60/forum-topics", async (c) => {
  try {
    const category = c.req.query("category");
    let query = supabase.from("forum_topics").select("*");

    if (category) {
      query = query.eq("category", category);
    }

    const { data, error } = await query.order("created_at", { ascending: false });

    if (error) {
      return c.json({ error: error.message }, 500);
    }

    return c.json({ data: data || [] });
  } catch (err) {
    console.error("Error fetching forum topics:", err);
    return c.json({ error: String(err) }, 500);
  }
});

app.post("/make-server-1e942b60/forum-topics", async (c) => {
  try {
    const body = await c.req.json();
    const { data, error } = await supabase
      .from("forum_topics")
      .insert(body)
      .select()
      .single();

    if (error) {
      return c.json({ error: error.message }, 500);
    }

    return c.json({ data });
  } catch (err) {
    console.error("Error creating forum topic:", err);
    return c.json({ error: String(err) }, 500);
  }
});

// Events
app.get("/make-server-1e942b60/events", async (c) => {
  try {
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .order("date", { ascending: true });

    if (error) {
      return c.json({ error: error.message }, 500);
    }

    return c.json({ data: data || [] });
  } catch (err) {
    console.error("Error fetching events:", err);
    return c.json({ error: String(err) }, 500);
  }
});

// Calendar Events
app.get("/make-server-1e942b60/calendar/:userId", async (c) => {
  try {
    const userId = c.req.param("userId");
    const { data, error } = await supabase
      .from("user_calendar_events")
      .select("*")
      .eq("user_id", userId)
      .order("start_date", { ascending: true });

    if (error) {
      return c.json({ error: error.message }, 500);
    }

    return c.json({ data: data || [] });
  } catch (err) {
    console.error("Error fetching calendar events:", err);
    return c.json({ error: String(err) }, 500);
  }
});

app.post("/make-server-1e942b60/calendar", async (c) => {
  try {
    const body = await c.req.json();
    const { data, error } = await supabase
      .from("user_calendar_events")
      .insert(body)
      .select()
      .single();

    if (error) {
      return c.json({ error: error.message }, 500);
    }

    return c.json({ data });
  } catch (err) {
    console.error("Error creating calendar event:", err);
    return c.json({ error: String(err) }, 500);
  }
});

// Chat Messages
app.get("/make-server-1e942b60/chat-messages", async (c) => {
  try {
    const limit = c.req.query("limit") || "50";
    const { data, error } = await supabase
      .from("chat_messages")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(parseInt(limit));

    if (error) {
      return c.json({ error: error.message }, 500);
    }

    return c.json({ data: data || [] });
  } catch (err) {
    console.error("Error fetching chat messages:", err);
    return c.json({ error: String(err) }, 500);
  }
});

app.post("/make-server-1e942b60/chat-messages", async (c) => {
  try {
    const body = await c.req.json();
    const { data, error } = await supabase
      .from("chat_messages")
      .insert(body)
      .select()
      .single();

    if (error) {
      return c.json({ error: error.message }, 500);
    }

    return c.json({ data });
  } catch (err) {
    console.error("Error saving chat message:", err);
    return c.json({ error: String(err) }, 500);
  }
});

// Crisis Resources
app.get("/make-server-1e942b60/crisis-resources", async (c) => {
  try {
    const { data, error } = await supabase
      .from("crisis_resources")
      .select("*")
      .order("is_emergency", { ascending: false });

    if (error) {
      return c.json({ error: error.message }, 500);
    }

    return c.json({ data: data || [] });
  } catch (err) {
    console.error("Error fetching crisis resources:", err);
    return c.json({ error: String(err) }, 500);
  }
});

Deno.serve(app.fetch);