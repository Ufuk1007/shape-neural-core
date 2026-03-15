import { useState } from "react";
import BindruneLogo from "./BindruneLogo";

// ═══════════════════════════════════════════════════════════
// AUTOFORGE v4 — Content Automation Pipeline Generator
// ShapeNeural Labs · shapeneural.com
//
// v4 changes:
// - Download reduced to 2 files: main.py + README.md
// - All config inline in main.py (no .env)
// - Delivery choice in wizard UI
// - Prompts + setup instructions in README
// ═══════════════════════════════════════════════════════════

const C = {
  bg: "#06060a", surface: "#0c0c14", border: "#1a1a2e",
  green: "#00ff41", magenta: "#ff0055", cyan: "#00ccff",
  text: "#d4d4dc", dim: "#8888a0", white: "#eeeef0",
};

const PRESETS = {
  radar: {
    id: "radar", name: "INDUSTRY RADAR", icon: "◉",
    tagline: "Scan → Score → Brief → Deliver",
    desc: "Monitors your industry automatically. Finds relevant news, scores importance, generates weekly briefings and post drafts. Delivered to your inbox.",
    stages: ["News Sources", "Relevance Scoring", "Briefing + Posts", "Email Delivery"],
    fields: [
      { key: "industry", label: "Your industry or niche", ph: "e.g. B2B SaaS, FinTech, Healthcare Marketing" },
      { key: "focus", label: "What matters most to your audience?", ph: "e.g. AI adoption, marketing automation, privacy regulations" },
      { key: "voice", label: "Signal character", type: "select", opts: ["Sharp & Direct", "Analytical & Measured", "Bold & Provocative", "Warm & Educational"] },
    ],
  },
  kpi: {
    id: "kpi", name: "KPI STORYTELLER", icon: "◈",
    tagline: "Ingest → Interpret → Narrate → Send",
    desc: "Planned: Will turn your numbers into narrative. Drop a CSV or link a Google Sheet — the system will detect trends, flag anomalies, and write stakeholder-ready reports.",
    stages: ["Your Data", "Trend Detection", "Narrative Report", "Email Delivery"],
    fields: [
      { key: "metrics", label: "Key metrics you track", ph: "e.g. MQLs, conversion rate, CAC, monthly revenue, churn" },
      { key: "audience", label: "Who reads the report?", ph: "e.g. CMO, marketing team, client stakeholders" },
      { key: "voice", label: "Signal character", type: "select", opts: ["Executive Brief", "Detailed Analysis", "Team-Friendly Update", "Action-Oriented"] },
    ],
  },
  recycler: {
    id: "recycler", name: "CONTENT RECYCLER", icon: "◎",
    tagline: "Extract → Decompose → Multiply → Distribute",
    desc: "Planned: Will take one long piece and produce a full content series. Feed it a blog post, whitepaper, or transcript — it will extract core ideas and generate multi-format content.",
    stages: ["Source Content", "Core Extraction", "Multi-Format Series", "Email Delivery"],
    fields: [
      { key: "formats", label: "What formats do you need?", ph: "e.g. LinkedIn posts, newsletter teasers, tweet threads" },
      { key: "audience", label: "Who is your audience?", ph: "e.g. SaaS founders, marketing directors, agency owners" },
      { key: "voice", label: "Signal character", type: "select", opts: ["Sharp & Direct", "Analytical & Measured", "Bold & Provocative", "Warm & Educational"] },
    ],
  },
};

const STEPS = ["SELECT", "CONFIGURE", "FORGE", "PACKAGE"];

const VOICE_MAP = {
  "Sharp & Direct": "concise, opinionated, no fluff — every sentence earns its place",
  "Analytical & Measured": "data-driven, nuanced, balanced — builds credibility through evidence",
  "Bold & Provocative": "contrarian, challenges assumptions, strong takes — stops the scroll",
  "Warm & Educational": "approachable, teaches through examples, builds understanding step by step",
  "Executive Brief": "C-suite ready, headlines first, concise and decisive",
  "Detailed Analysis": "thorough, data-rich, explains methodology and context",
  "Team-Friendly Update": "conversational, highlights wins, clear on action items",
  "Action-Oriented": "leads with recommendations, minimal preamble, prioritized next steps",
};

const FORGE_API_BASE = typeof window !== "undefined" && (window.location.hostname === "shapeneural.com" || window.location.hostname === "www.shapeneural.com")
  ? "/api"
  : "https://www.shapeneural.com/api";

// ═══════════════════════════════════════════════════════════
// PYTHON SCRIPT GENERATORS
// ═══════════════════════════════════════════════════════════

function genScript(p, cfg, sources) {
  const v = VOICE_MAP[cfg.voice] || "professional and clear";
  const selfHosted = cfg.delivery === "self";
  const srcJson = sources?.length ? JSON.stringify(sources, null, 2) : '[]';

  // Delivery block changes based on wizard choice
  const deliveryConfig = selfHosted ? `
# ─── DELIVERY: SELF-HOSTED ───────────────────────────────
# You chose to handle delivery yourself. Fill in your credentials.
# See README.md for help finding your SMTP settings.
EMAIL_MODE = "smtp"             # Options: "smtp", "resend", "local"
SMTP_HOST = "smtp.gmail.com"    # Your email provider's SMTP server
SMTP_PORT = 587                 # Usually 587 (TLS) or 465 (SSL)
SMTP_USER = ""                  # ← Your email address
SMTP_PASS = ""                  # ← Your app password (not your login password)
SEND_TO = ""                    # ← Where results should go
# For Resend API instead of SMTP, set EMAIL_MODE = "resend":
RESEND_API_KEY = ""             # Get one at https://resend.com (free: 100/day)
RESEND_FROM = ""                # A verified sender address in Resend` : `
# ─── DELIVERY: AUTOFORGE HANDLES IT ─────────────────────
# We deliver results to your email. Just verify the address below.
EMAIL_MODE = "relay"
USER_EMAIL = "${cfg.email || ""}"                 # ← Your email address`;

  const llmConfig = selfHosted ? `
# ─── LLM: SELF-HOSTED ───────────────────────────────────
# You need your own LLM API key. We recommend MiniMax (~$0.002/run).
# Sign up: https://www.minimaxi.chat
# Also works with OpenAI or any OpenAI-compatible API.
LLM_MODE = "direct"
LLM_API_KEY = ""                # ← Your API key here
LLM_BASE_URL = "https://api.minimaxi.chat/v1"
LLM_MODEL = "MiniMax-Text-01"` : `
# ─── LLM: AUTOFORGE HANDLES IT ──────────────────────────
# Content generation runs through our relay. No API key needed.
LLM_MODE = "relay"
RELAY_URL = "https://shapeneural.com/api"`;

  const upgradeHint = !selfHosted ? `
# ═══════════════════════════════════════════════════════════
# WANT FULL INDEPENDENCE LATER?
# Change LLM_MODE to "direct" and add your own LLM_API_KEY.
# Change EMAIL_MODE to "smtp" or "resend" and add credentials.
# See README.md for details. No other code changes needed.
# ═══════════════════════════════════════════════════════════` : `
# ═══════════════════════════════════════════════════════════
# NEED THE EASY ROUTE?
# Change LLM_MODE to "relay" and EMAIL_MODE to "relay"
# to use ShapeNeural's infrastructure instead of your own.
# ═══════════════════════════════════════════════════════════`;

  // The infrastructure functions (shared across all presets)
  const infraFunctions = `

# ═══════════════════════════════════════════════════════════
# INFRASTRUCTURE (auto-switches based on config above)
# You don't need to edit anything below this line.
# ═══════════════════════════════════════════════════════════

def _call_llm(prompt):
    if LLM_MODE == "direct":
        if not LLM_API_KEY:
            print("  ! LLM_API_KEY is empty. Add it above."); return "[No API key]"
        headers = {"Authorization": f"Bearer {LLM_API_KEY}", "Content-Type": "application/json"}
        body = {"model": LLM_MODEL, "messages": [{"role": "user", "content": prompt}],
                "max_tokens": 2000, "temperature": 0.7}
        try:
            r = requests.post(f"{LLM_BASE_URL}/chat/completions", headers=headers, json=body, timeout=60)
            r.raise_for_status()
            return r.json()["choices"][0]["message"]["content"]
        except Exception as e:
            print(f"  ! LLM error: {e}"); return f"[Failed: {e}]"
    else:
        try:
            r = requests.post(f"{RELAY_URL}/forge-generate",
                json={"prompt": prompt, "email": USER_EMAIL}, timeout=60)
            r.raise_for_status()
            return r.json().get("content", "[No content]")
        except Exception as e:
            print(f"  ! Relay error: {e}"); return "[Failed — check connection]"


def distribute(content, subject="AUTOFORGE Report"):
    print("[DISTRIBUTE] Delivering results...")
    target = SEND_TO if EMAIL_MODE != "relay" else USER_EMAIL
    if not target and EMAIL_MODE != "local":
        print("  ! No email set. Edit the config at the top of this file.")
        _save_local(content); return
    if EMAIL_MODE == "smtp":     _email_smtp(content, subject, target)
    elif EMAIL_MODE == "resend": _email_resend(content, subject, target)
    elif EMAIL_MODE == "local":  _save_local(content)
    else:                        _email_relay(content, subject)

def _email_relay(content, subject):
    try:
        r = requests.post(f"{RELAY_URL}/forge-deliver",
            json={"content": content, "email": USER_EMAIL,
                   "subject": f"{subject} — {datetime.now().strftime('%B %d, %Y')}"}, timeout=15)
        r.raise_for_status(); print(f"  + Sent to {USER_EMAIL}")
    except Exception as e:
        print(f"  ! Relay delivery failed: {e}"); _save_local(content)

def _email_smtp(content, subject, to):
    import smtplib
    from email.mime.text import MIMEText
    from email.mime.multipart import MIMEMultipart
    if not SMTP_USER or not SMTP_PASS:
        print("  ! SMTP credentials missing. Edit config above."); _save_local(content); return
    msg = MIMEMultipart()
    msg["From"], msg["To"] = SMTP_USER, to
    msg["Subject"] = f"{subject} — {datetime.now().strftime('%B %d, %Y')}"
    msg.attach(MIMEText(content, "plain"))
    try:
        with smtplib.SMTP(SMTP_HOST, int(SMTP_PORT)) as s:
            s.starttls(); s.login(SMTP_USER, SMTP_PASS); s.send_message(msg)
        print(f"  + Sent to {to} via SMTP")
    except Exception as e:
        print(f"  ! SMTP error: {e}"); _save_local(content)

def _email_resend(content, subject, to):
    if not RESEND_API_KEY:
        print("  ! Resend key missing. Edit config above."); _save_local(content); return
    try:
        r = requests.post("https://api.resend.com/emails",
            headers={"Authorization": f"Bearer {RESEND_API_KEY}", "Content-Type": "application/json"},
            json={"from": RESEND_FROM, "to": [to],
                  "subject": f"{subject} — {datetime.now().strftime('%B %d, %Y')}",
                  "text": content}, timeout=15)
        r.raise_for_status(); print(f"  + Sent to {to} via Resend")
    except Exception as e:
        print(f"  ! Resend error: {e}"); _save_local(content)

def _save_local(content):
    path = f"output_{datetime.now().strftime('%Y%m%d_%H%M%S')}.md"
    with open(path, "w") as f: f.write(content)
    print(f"  -> Saved to {path}")
`;

  // Per-preset pipeline code
  if (p === "radar") return `#!/usr/bin/env python3
"""
AUTOFORGE — Industry Radar Pipeline
Generated by ShapeNeural Labs (shapeneural.com)

Monitors ${cfg.industry || "your industry"} → scores relevance → generates content → delivers.

QUICK START:
  1. pip install requests python-dotenv feedparser
  2. Open this file, fill in ${selfHosted ? "your API key + email" : "your email"} below
  3. python main.py
"""

import os, json, requests, feedparser
from datetime import datetime, timedelta

# ═══════════════════════════════════════════════════════════
# CONFIGURATION — edit this section, then run the script
# ═══════════════════════════════════════════════════════════

# ─── YOUR PIPELINE ───────────────────────────────────────
INDUSTRY = "${cfg.industry || "B2B SaaS"}"
FOCUS = "${cfg.focus || "AI, automation, marketing technology"}"
VOICE = "${v}"
FREQUENCY = "${cfg.frequency || "Weekly"}"        # Your chosen cadence (for reference + README)
SOURCES = ${srcJson}
${llmConfig}
${deliveryConfig}
${upgradeHint}

# --- Internal defaults (no need to edit) ---
SEND_TO = globals().get("SEND_TO", "")
USER_EMAIL = globals().get("USER_EMAIL", "")
LLM_API_KEY = globals().get("LLM_API_KEY", "")
LLM_BASE_URL = globals().get("LLM_BASE_URL", "")
LLM_MODEL = globals().get("LLM_MODEL", "")
RELAY_URL = globals().get("RELAY_URL", "")
SMTP_HOST = globals().get("SMTP_HOST", "")
SMTP_PORT = globals().get("SMTP_PORT", 587)
SMTP_USER = globals().get("SMTP_USER", "")
SMTP_PASS = globals().get("SMTP_PASS", "")
RESEND_API_KEY = globals().get("RESEND_API_KEY", "")
RESEND_FROM = globals().get("RESEND_FROM", "")
${infraFunctions}

# ═══════════════════════════════════════════════════════════
# STAGE 1: COLLECT — fetch articles from sources (local)
# ═══════════════════════════════════════════════════════════
def collect():
    print(f"[COLLECT] Scanning {len(SOURCES)} sources...")
    articles = []
    for src in SOURCES:
        url = src.get("feed_url") or src.get("url", "")
        if not url: continue
        try:
            feed = feedparser.parse(url)
            name = feed.feed.get("title", src.get("name", url))
            for entry in feed.entries[:10]:
                pub = entry.get("published_parsed")
                if pub and (datetime.now() - datetime(*pub[:6])).days > 7: continue
                articles.append({"title": entry.get("title", ""), "summary": entry.get("summary", "")[:400],
                    "link": entry.get("link", ""), "source": name})
            print(f"  + {name}")
        except Exception as e:
            print(f"  ! {url}: {e}")
    print(f"  = {len(articles)} articles"); return articles

# ═══════════════════════════════════════════════════════════
# STAGE 2: ANALYZE — score by keyword relevance (local)
# ═══════════════════════════════════════════════════════════
def analyze(articles):
    print("[ANALYZE] Scoring relevance...")
    kw = [k.strip().lower() for k in FOCUS.split(",")]
    scored = []
    for a in articles:
        txt = f"{a['title']} {a['summary']}".lower()
        sc = sum(2 if k in a["title"].lower() else 1 for k in kw if k in txt)
        if sc > 0: a["score"] = sc; scored.append(a)
    scored.sort(key=lambda x: x["score"], reverse=True)
    for i, a in enumerate(scored[:5]): print(f"  {i+1}. [{a['score']}] {a['title'][:65]}")
    return scored[:5]

# ═══════════════════════════════════════════════════════════
# STAGE 3: GENERATE — create briefing + posts via LLM
# ═══════════════════════════════════════════════════════════
def generate(top):
    print("[GENERATE] Creating content...")
    block = "\\n".join(f"{i+1}. {a['title']}\\n   {a['source']} — {a['summary'][:120]}\\n   {a['link']}" for i, a in enumerate(top))
    return _call_llm(f"""You are a content strategist covering {INDUSTRY}.
Voice: {VOICE}

Top articles this week:
{block}

Generate:
1. WEEKLY BRIEFING (200-300 words) — key themes, why they matter
2. Three LINKEDIN POST DRAFTS (100-150 words each) — hook, insight, CTA
Each post: different angle. Be specific, not generic.""")

# ═══════════════════════════════════════════════════════════
# RUN
# ═══════════════════════════════════════════════════════════
if __name__ == "__main__":
    print(f"\\n{'='*50}\\n  AUTOFORGE — Industry Radar\\n  {datetime.now().strftime('%B %d, %Y %H:%M')}\\n{'='*50}\\n")
    arts = collect()
    if arts:
        top = analyze(arts)
        if top:
            out = generate(top)
            print(f"\\n--- PREVIEW ---\\n{out[:400]}\\n---\\n")
            distribute(out, "Industry Radar")
    else: print("No articles found.")
    print("\\nDone.")
`;

  if (p === "kpi") return `#!/usr/bin/env python3
"""
AUTOFORGE — KPI Storyteller Pipeline
Generated by ShapeNeural Labs (shapeneural.com)

Your data → trend detection → narrative report → delivery.

QUICK START:
  1. pip install requests python-dotenv
  2. Place your data.csv next to this file (or set GSHEET_URL)
  3. Open this file, fill in ${selfHosted ? "your API key + email" : "your email"} below
  4. python main.py
"""

import os, csv, json, requests
from datetime import datetime

# ═══════════════════════════════════════════════════════════
# CONFIGURATION
# ═══════════════════════════════════════════════════════════

# ─── YOUR PIPELINE ───────────────────────────────────────
METRICS = ${JSON.stringify((cfg.metrics || "MQLs, conversion rate, revenue").split(",").map(s => s.trim()))}
AUDIENCE = "${cfg.audience || "Leadership team"}"
VOICE = "${v}"
FREQUENCY = "${cfg.frequency || "Weekly"}"        # Your chosen cadence (for reference + README)
CSV_PATH = "data.csv"           # Place your CSV next to this file
GSHEET_URL = ""                 # Or paste a Google Sheets link here
${llmConfig}
${deliveryConfig}
${upgradeHint}

SEND_TO = globals().get("SEND_TO", "")
USER_EMAIL = globals().get("USER_EMAIL", "")
LLM_API_KEY = globals().get("LLM_API_KEY", "")
LLM_BASE_URL = globals().get("LLM_BASE_URL", "")
LLM_MODEL = globals().get("LLM_MODEL", "")
RELAY_URL = globals().get("RELAY_URL", "")
SMTP_HOST = globals().get("SMTP_HOST", "")
SMTP_PORT = globals().get("SMTP_PORT", 587)
SMTP_USER = globals().get("SMTP_USER", "")
SMTP_PASS = globals().get("SMTP_PASS", "")
RESEND_API_KEY = globals().get("RESEND_API_KEY", "")
RESEND_FROM = globals().get("RESEND_FROM", "")
${infraFunctions}

# ═══════════════════════════════════════════════════════════
# STAGE 1: COLLECT
# ═══════════════════════════════════════════════════════════
def collect():
    print("[COLLECT] Loading data...")
    if GSHEET_URL:
        try:
            gid = GSHEET_URL.split("/d/")[1].split("/")[0] if "/d/" in GSHEET_URL else ""
            r = requests.get(f"https://docs.google.com/spreadsheets/d/{gid}/export?format=csv", timeout=15)
            r.raise_for_status()
            data = list(csv.DictReader(r.text.strip().split("\\n")))
            print(f"  + {len(data)} rows from Sheets"); return data
        except Exception as e: print(f"  ! Sheets error: {e}")
    try:
        with open(CSV_PATH, "r") as f: data = list(csv.DictReader(f))
        print(f"  + {len(data)} rows from {CSV_PATH}"); return data
    except Exception as e: print(f"  ! {e}"); return []

# ═══════════════════════════════════════════════════════════
# STAGE 2: ANALYZE
# ═══════════════════════════════════════════════════════════
def analyze(data):
    print("[ANALYZE] Processing metrics...")
    if len(data) < 2: print("  ! Need 2+ rows"); return []
    insights, cur, prev = [], data[-1], data[-2]
    for m in METRICS:
        key = next((k for k in cur if m.lower() in k.lower() or k.lower() in m.lower()), None)
        if not key: continue
        try:
            c = float(cur[key].replace(",","").replace("%",""))
            p = float(prev[key].replace(",","").replace("%",""))
            pct = ((c-p)/abs(p))*100 if p else 0
            flag = "ALERT" if abs(pct)>25 else "notable" if abs(pct)>10 else "stable"
            insights.append({"metric":m,"current":c,"previous":p,"change_pct":round(pct,1),"flag":flag})
            print(f"  {'UP' if pct>0 else 'DOWN' if pct<0 else '--'} {m}: {p}->{c} ({pct:+.1f}%) [{flag}]")
        except: print(f"  ? {m}: parse error")
    return insights

# ═══════════════════════════════════════════════════════════
# STAGE 3: GENERATE
# ═══════════════════════════════════════════════════════════
def generate(insights):
    print("[GENERATE] Writing report...")
    block = "\\n".join(f"- {i['metric']}: {i['previous']}->{i['current']} ({i['change_pct']:+.1f}%, {i['flag']})" for i in insights)
    return _call_llm(f"""You are a data analyst writing for {AUDIENCE}. Voice: {VOICE}

KPI changes:
{block}

Generate:
1. EXECUTIVE SUMMARY (3-4 sentences)
2. DETAILED BREAKDOWN per metric
3. RECOMMENDED ACTIONS (3-5 points)
Be specific with numbers. No filler.""")

if __name__ == "__main__":
    print(f"\\n{'='*50}\\n  AUTOFORGE — KPI Storyteller\\n  {datetime.now().strftime('%B %d, %Y %H:%M')}\\n{'='*50}\\n")
    data = collect()
    if data:
        ins = analyze(data)
        if ins:
            rpt = generate(ins)
            print(f"\\n--- PREVIEW ---\\n{rpt[:400]}\\n---\\n")
            distribute(rpt, "KPI Report")
    print("\\nDone.")
`;

  if (p === "recycler") return `#!/usr/bin/env python3
"""
AUTOFORGE — Content Recycler Pipeline
Generated by ShapeNeural Labs (shapeneural.com)

Long-form in → multi-format series out.

QUICK START:
  1. pip install requests python-dotenv beautifulsoup4
  2. Set INPUT_URL below (or put text in content.txt)
  3. Fill in ${selfHosted ? "your API key + email" : "your email"} below
  4. python main.py
"""

import os, re, json, requests
from datetime import datetime

# ═══════════════════════════════════════════════════════════
# CONFIGURATION
# ═══════════════════════════════════════════════════════════

# ─── YOUR PIPELINE ───────────────────────────────────────
FORMATS = ${JSON.stringify((cfg.formats || "LinkedIn post, newsletter teaser").split(",").map(s => s.trim()))}
AUDIENCE = "${cfg.audience || "Professionals"}"
VOICE = "${v}"
FREQUENCY = "${cfg.frequency || "Weekly"}"        # Your chosen cadence (for reference + README)
PIECES = 5
INPUT_URL = ""                  # Paste the URL of content to recycle
INPUT_FILE = "content.txt"      # Or put text in this file
${llmConfig}
${deliveryConfig}
${upgradeHint}

SEND_TO = globals().get("SEND_TO", "")
USER_EMAIL = globals().get("USER_EMAIL", "")
LLM_API_KEY = globals().get("LLM_API_KEY", "")
LLM_BASE_URL = globals().get("LLM_BASE_URL", "")
LLM_MODEL = globals().get("LLM_MODEL", "")
RELAY_URL = globals().get("RELAY_URL", "")
SMTP_HOST = globals().get("SMTP_HOST", "")
SMTP_PORT = globals().get("SMTP_PORT", 587)
SMTP_USER = globals().get("SMTP_USER", "")
SMTP_PASS = globals().get("SMTP_PASS", "")
RESEND_API_KEY = globals().get("RESEND_API_KEY", "")
RESEND_FROM = globals().get("RESEND_FROM", "")
${infraFunctions}

# ═══════════════════════════════════════════════════════════
# STAGE 1: COLLECT
# ═══════════════════════════════════════════════════════════
def collect():
    print("[COLLECT] Loading source content...")
    if INPUT_URL:
        try:
            from bs4 import BeautifulSoup
            r = requests.get(INPUT_URL, timeout=15, headers={"User-Agent": "AUTOFORGE/1.0"})
            r.raise_for_status()
            soup = BeautifulSoup(r.text, "html.parser")
            for t in soup(["script","style","nav","footer","header"]): t.decompose()
            text = soup.get_text(separator="\\n", strip=True)
            print(f"  + Scraped {len(text)} chars"); return text[:8000]
        except Exception as e: print(f"  ! {e}")
    try:
        with open(INPUT_FILE, "r") as f: text = f.read()
        print(f"  + {len(text)} chars from {INPUT_FILE}"); return text[:8000]
    except Exception as e: print(f"  ! {e}"); return ""

# ═══════════════════════════════════════════════════════════
# STAGE 2: ANALYZE
# ═══════════════════════════════════════════════════════════
def analyze(text):
    print("[ANALYZE] Extracting core ideas...")
    result = _call_llm(f"""Analyze this content:
1. 3-5 CORE ARGUMENTS
2. 3-5 QUOTABLE MOMENTS
3. PRIMARY ANGLE

Content: {text[:4000]}

Respond ONLY in JSON: {{"core_arguments": [...], "quotable_moments": [...], "primary_angle": "..."}}""")
    try:
        clean = re.sub(r'\`\`\`json?\\n?|\\n?\`\`\`', '', result).strip()
        p = json.loads(clean); print(f"  + {len(p.get('core_arguments',[]))} arguments"); return p
    except:
        return {"core_arguments": [result[:200]], "quotable_moments": [], "primary_angle": "General insight"}

# ═══════════════════════════════════════════════════════════
# STAGE 3: GENERATE
# ═══════════════════════════════════════════════════════════
def generate(analysis):
    print(f"[GENERATE] {PIECES} pieces x {len(FORMATS)} formats...")
    out = []
    for fmt in FORMATS:
        r = _call_llm(f"""You write for {AUDIENCE}. Voice: {VOICE}

Analysis:
- Arguments: {json.dumps(analysis.get('core_arguments',[]))}
- Quotes: {json.dumps(analysis.get('quotable_moments',[]))}
- Angle: {analysis.get('primary_angle','')}

Generate {PIECES} pieces as: {fmt}. Hook + insight + CTA. All different angles.""")
        out.append(f"\\n{'—'*40}\\n## {fmt.upper()}\\n{'—'*40}\\n{r}")
        print(f"  + {fmt}")
    return "\\n".join(out)

if __name__ == "__main__":
    print(f"\\n{'='*50}\\n  AUTOFORGE — Content Recycler\\n  {datetime.now().strftime('%B %d, %Y %H:%M')}\\n{'='*50}\\n")
    text = collect()
    if text:
        a = analyze(text)
        c = generate(a)
        print(f"\\n--- PREVIEW ---\\n{c[:400]}\\n---\\n")
        distribute(c, "Content Series")
    print("\\nDone.")
`;
  return "";
}


function genReadme(p, cfg) {
  const pr = PRESETS[p];
  const selfHosted = cfg.delivery === "self";
  const deps = p === "radar" ? "requests feedparser" : p === "recycler" ? "requests beautifulsoup4" : "requests";
  const voiceDesc = VOICE_MAP[cfg.voice] || "professional and clear";
  const freq = cfg.frequency || "Weekly";

  // Frequency-specific cron expressions and descriptions
  const cronMap = {
    "Daily": { cron: "0 8 * * *", desc: "every day at 8:00 AM", winDesc: "Daily, at 8:00 AM" },
    "Weekly": { cron: "0 8 * * 1", desc: "every Monday at 8:00 AM", winDesc: "Weekly, Monday at 8:00 AM" },
    "Biweekly": { cron: "0 8 * * 1", desc: "every Monday at 8:00 AM (run every second week manually, or keep weekly)", winDesc: "Weekly, Monday at 8:00 AM" },
    "Monthly": { cron: "0 8 1 * *", desc: "the 1st of every month at 8:00 AM", winDesc: "Monthly, 1st day at 8:00 AM" },
  };
  const sched = cronMap[freq] || cronMap["Weekly"];

  return `# AUTOFORGE — ${pr.name}

> Generated by [ShapeNeural Labs](https://shapeneural.com)
> Not content. The machine that makes it.

---

## Quick Start

**Step 1 — Install:**
\`\`\`
pip install ${deps}
\`\`\`

**Step 2 — Configure:**
Open \`main.py\` and ${selfHosted ? "fill in your API key and email credentials" : (cfg.email ? "verify your email address" : "add your email address")} in the
CONFIGURATION section at the top.${!selfHosted && cfg.email ? " Your email is already pre-filled." : ""}

**Step 3 — Run:**
\`\`\`
python main.py
\`\`\`

This runs the pipeline once. To make it fully automatic, see **Scheduling** below.

---

## What Happens When You Run It

| Stage | What | Where |
|-------|------|-------|
| 1. COLLECT | ${pr.stages[0]} | Your computer |
| 2. ANALYZE | ${pr.stages[1]} | Your computer |
| 3. GENERATE | ${pr.stages[2]} | ${selfHosted ? "Your LLM API" : "ShapeNeural relay"} |
| 4. DISTRIBUTE | ${pr.stages[3]} | ${selfHosted ? "Your email provider" : "ShapeNeural relay"} |

Your chosen cadence: **${freq}**

---

## Scheduling — Make It Fully Automatic

AUTOFORGE handles content generation and delivery for you. But the recurring
execution — actually running the script on a schedule — happens on your machine.
This is by design: you stay in full control of when and how often it runs.

Your configured frequency is **${freq}** (${sched.desc}).

### Mac / Linux — Cron

**Set up:**
\`\`\`bash
# Open the cron editor
crontab -e

# Add this line (runs ${sched.desc}):
${sched.cron}  cd /path/to/your/autoforge-folder && python main.py >> autoforge.log 2>&1
\`\`\`

Replace \`/path/to/your/autoforge-folder\` with the actual folder where main.py lives.
The \`>> autoforge.log\` part saves output to a log file so you can check if it ran.

**Verify it's set up:**
\`\`\`bash
crontab -l
\`\`\`

**Remove it later:**
\`\`\`bash
# Open the editor and delete the AUTOFORGE line:
crontab -e

# Or remove ALL cron jobs (careful — removes everything):
crontab -r
\`\`\`

### Windows — Task Scheduler

**Set up:**
1. Press Win+R, type \`taskschd.msc\`, press Enter
2. Click **Create Basic Task** in the right panel
3. Name: \`AUTOFORGE\`, click Next
4. Trigger: **${sched.winDesc}**, click Next
5. Action: **Start a Program**
6. Program: \`python\` (or full path like \`C:\\Python312\\python.exe\`)
7. Arguments: \`main.py\`
8. Start in: the folder where main.py lives (e.g. \`C:\\Users\\You\\autoforge\`)
9. Click Finish

**Verify:**
Open Task Scheduler → Task Scheduler Library → find "AUTOFORGE" → check Status.

**Remove it later:**
Open Task Scheduler → Task Scheduler Library → right-click "AUTOFORGE" → **Delete**.
Or just **Disable** it to pause without deleting.

---

## ${selfHosted ? "Your Infrastructure" : "Switching to Self-Hosted (Optional)"}

${selfHosted ? `You chose to run everything on your own infrastructure.

**LLM API:**
We recommend [MiniMax](https://www.minimaxi.chat) — about $0.002 per run.
Also works with [OpenAI](https://platform.openai.com) or any OpenAI-compatible API.

**Email Delivery:**
You need SMTP credentials from your email provider.

| Provider | SMTP Server | Port | Notes |
|----------|------------|------|-------|
| Gmail | smtp.gmail.com | 587 | Requires [App Password](https://myaccount.google.com/apppasswords) |
| Outlook | smtp.office365.com | 587 | Use your regular password |
| Yahoo | smtp.mail.yahoo.com | 587 | Requires App Password |

Or use [Resend](https://resend.com) (free: 100 emails/day) — set \`EMAIL_MODE = "resend"\` in main.py.`

: `Your script uses ShapeNeural's relay by default. No API keys needed.

To switch to your own infrastructure later, open main.py and change:
- \`LLM_MODE\` from \`"relay"\` to \`"direct"\`, then add your \`LLM_API_KEY\`
- \`EMAIL_MODE\` from \`"relay"\` to \`"smtp"\` or \`"resend"\`, then add credentials

**No other code changes needed.** The script switches automatically.

Recommended LLM: [MiniMax](https://www.minimaxi.chat) (~$0.002/run)
Recommended email: Gmail SMTP ([App Password](https://myaccount.google.com/apppasswords)) or [Resend](https://resend.com)`}

---

## Customization

Your signal character: **${cfg.voice || "Sharp & Direct"}**
"${voiceDesc}"

To change the voice, edit the \`VOICE\` variable at the top of main.py.
The prompt templates are in the STAGE 3: GENERATE section.

---

## Uninstall

To completely remove AUTOFORGE:
1. Remove the scheduled task (see Scheduling section above)
2. Delete the folder containing main.py
3. Optionally: \`pip uninstall ${deps.split(" ").join(" ")}\` to remove dependencies

That's it. No background processes, no services, no accounts to close.

---

Built with AUTOFORGE by ShapeNeural Labs
[shapeneural.com](https://shapeneural.com) — designed intelligence
`;
}


// ═══════════════════════════════════════════════════════════
// UI COMPONENTS
// ═══════════════════════════════════════════════════════════

const glow = (c) => `0 0 20px ${c}33, 0 0 40px ${c}15`;
const mono = "'IBM Plex Mono', 'Fira Code', monospace";

function StepBar({ step }) {
  return (
    <div style={{ display: "flex", gap: 2, marginBottom: 40 }}>
      {STEPS.map((s, i) => (
        <div key={s} style={{ flex: 1, textAlign: "center" }}>
          <div style={{ height: 3, borderRadius: 2, marginBottom: 8,
            background: i <= step ? C.green : C.border,
            boxShadow: i <= step ? glow(C.green) : "none", transition: "all 0.5s" }} />
          <span style={{ fontFamily: mono, fontSize: 12, letterSpacing: 3,
            color: i === step ? C.green : i < step ? C.dim : C.border }}>{s}</span>
        </div>
      ))}
    </div>
  );
}

function PresetCard({ id, selected, onClick, disabled = false }: { id: string; selected: any; onClick: any; disabled?: boolean }) {
  const p = PRESETS[id], on = selected === id;
  return (
    <button onClick={disabled ? undefined : onClick} style={{
      flex: "1 1 240px", background: on ? `${C.green}0a` : C.surface,
      border: `1px solid ${on ? C.green : disabled ? C.border : C.border}`, borderRadius: 2,
      padding: "24px 20px", textAlign: "left", cursor: disabled ? "not-allowed" : "pointer",
      transition: "all 0.3s", outline: "none", boxShadow: on ? glow(C.green) : "none",
      opacity: disabled ? 0.45 : 1, position: "relative" as const,
    }}>
      {disabled && (
        <div style={{
          position: "absolute", top: 12, right: 12,
          padding: "3px 10px", background: `${C.magenta}18`, border: `1px solid ${C.magenta}44`,
          borderRadius: 2, fontFamily: mono, fontSize: 10, letterSpacing: 2, color: C.magenta,
        }}>COMING SOON</div>
      )}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
        <span style={{ fontSize: 22, color: on ? C.green : C.dim }}>{p.icon}</span>
        <span style={{ fontFamily: mono, fontSize: 15, fontWeight: 600, color: on ? C.green : C.white, letterSpacing: 2 }}>{p.name}</span>
      </div>
      <div style={{ fontFamily: mono, fontSize: 12, color: C.cyan, marginBottom: 10, letterSpacing: 1 }}>{p.tagline}</div>
      <div style={{ fontFamily: mono, fontSize: 13, color: C.dim, lineHeight: 1.7 }}>{p.desc}</div>
    </button>
  );
}

function DeliveryChoice({ value, onChange }) {
  const opts = [
    { key: "relay", label: "AUTOFORGE delivers to your email", sub: "Recommended. We handle delivery — just enter your email address." },
    { key: "self", label: "I'll set up delivery myself", sub: "For advanced users. Full control, but requires your own email credentials." },
  ];
  return (
    <div style={{ marginTop: 4 }}>
      <label style={{ fontFamily: mono, fontSize: 14, color: C.text, display: "block", marginBottom: 10 }}>Delivery setup</label>
      {opts.map(o => (
        <button key={o.key} onClick={() => onChange(o.key)} style={{
          display: "block", width: "100%", textAlign: "left", padding: "14px 16px",
          background: value === o.key ? `${C.green}0a` : C.surface,
          border: `1px solid ${value === o.key ? C.green : C.border}`,
          borderRadius: 2, marginBottom: 6, cursor: "pointer", outline: "none",
          transition: "all 0.2s",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 14, height: 14, borderRadius: "50%",
              border: `2px solid ${value === o.key ? C.green : C.dim}`,
              background: value === o.key ? C.green : "transparent",
              transition: "all 0.2s",
            }} />
            <span style={{ fontFamily: mono, fontSize: 14, color: value === o.key ? C.green : C.white }}>{o.label}</span>
          </div>
          <div style={{ fontFamily: mono, fontSize: 12, color: C.dim, marginTop: 6, marginLeft: 24 }}>{o.sub}</div>
        </button>
      ))}
    </div>
  );
}

function ConfigForm({ preset, config, setConfig }) {
  const p = PRESETS[preset];
  const set = (k, v) => setConfig(prev => ({ ...prev, [k]: v }));
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ fontFamily: mono, fontSize: 13, color: C.cyan, letterSpacing: 2 }}>CONFIGURE: {p.name}</div>
      <div style={{ fontFamily: mono, fontSize: 14, color: C.dim, lineHeight: 1.8 }}>
        A few inputs. The system handles sources, infrastructure, and code generation.
      </div>
      {p.fields.map(f => (
        <div key={f.key}>
          <label style={{ fontFamily: mono, fontSize: 14, color: C.text, display: "block", marginBottom: 6 }}>{f.label}</label>
          {f.type === "select" ? (
            <select value={config[f.key] || f.opts[0]} onChange={e => set(f.key, e.target.value)} style={{
              width: "100%", padding: "12px 14px", background: C.surface, border: `1px solid ${C.border}`,
              color: C.white, fontFamily: mono, fontSize: 14, borderRadius: 2, outline: "none",
            }}>
              {f.opts.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          ) : (
            <input value={config[f.key] || ""} onChange={e => set(f.key, e.target.value)} placeholder={f.ph} style={{
              width: "100%", padding: "12px 14px", background: C.surface, border: `1px solid ${C.border}`,
              color: C.white, fontFamily: mono, fontSize: 14, borderRadius: 2, outline: "none",
            }} />
          )}
        </div>
      ))}
      <DeliveryChoice value={config.delivery || "relay"} onChange={v => set("delivery", v)} />
      {/* Email field — shown when relay is selected */}
      {(config.delivery || "relay") === "relay" && (
        <div>
          <label style={{ fontFamily: mono, fontSize: 14, color: C.text, display: "block", marginBottom: 6 }}>Your email address</label>
          <input value={config.email || ""} onChange={e => set("email", e.target.value)} placeholder="you@example.com"
            type="email" style={{
              width: "100%", padding: "12px 14px", background: C.surface, border: `1px solid ${C.border}`,
              color: C.white, fontFamily: mono, fontSize: 14, borderRadius: 2, outline: "none",
            }} />
          <div style={{ fontFamily: mono, fontSize: 12, color: C.dim, marginTop: 6 }}>
            We deliver results here. Pre-filled in your script.
          </div>
        </div>
      )}
      {/* Frequency selector */}
      <div>
        <label style={{ fontFamily: mono, fontSize: 14, color: C.text, display: "block", marginBottom: 8 }}>How often should this run?</label>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {["Daily", "Weekly", "Every 2 weeks", "Monthly"].map(f => {
            const val = f === "Every 2 weeks" ? "Biweekly" : f;
            return (
            <button key={f} onClick={() => set("frequency", val)} style={{
              padding: "10px 18px", background: (config.frequency || "Weekly") === val ? `${C.green}12` : C.surface,
              border: `1px solid ${(config.frequency || "Weekly") === val ? C.green : C.border}`,
              color: (config.frequency || "Weekly") === val ? C.green : C.dim,
              fontFamily: mono, fontSize: 13, borderRadius: 2, cursor: "pointer", outline: "none",
              transition: "all 0.2s",
            }}>{f}</button>
          )})}
        </div>
        <div style={{ fontFamily: mono, fontSize: 12, color: C.dim, marginTop: 8, lineHeight: 1.7 }}>
          Your script and README will be pre-configured for this cadence.
          The actual scheduling runs on your machine — we'll show you how.
          {(config.frequency === "Biweekly") && (
            <span style={{ color: C.cyan }}><br/>Note: "Every 2 weeks" is set up as weekly. Simply skip weeks you don't need, or just run weekly — more data never hurts.</span>
          )}
        </div>
      </div>
    </div>
  );
}

function PipelineViz({ preset, phase, label }) {
  const p = PRESETS[preset];
  const labels = ["COLLECT", "ANALYZE", "GENERATE", "DISTRIBUTE"];
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 16, flexWrap: "wrap" }}>
        {labels.map((l, i) => (
          <div key={l} style={{ display: "flex", alignItems: "center", flex: "1 1 auto", minWidth: 110 }}>
            <div style={{
              flex: 1, padding: "12px 8px",
              background: i < phase ? `${C.green}12` : i === phase ? `${C.magenta}18` : C.surface,
              border: `1px solid ${i < phase ? `${C.green}55` : i === phase ? C.magenta : C.border}`,
              borderRadius: 2, textAlign: "center", transition: "all 0.5s",
            }}>
              <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: 2, color: i <= phase ? C.green : C.dim, marginBottom: 3 }}>{l}</div>
              <div style={{ fontFamily: mono, fontSize: 12, color: i <= phase ? C.white : C.dim }}>{p.stages[i]}</div>
            </div>
            {i < 3 && <span style={{ color: i < phase ? C.green : C.border, margin: "0 2px", fontSize: 12 }}>→</span>}
          </div>
        ))}
      </div>
      {label && <div style={{ fontFamily: mono, fontSize: 13, color: C.magenta, textAlign: "center", animation: "pulse 1.5s infinite" }}>{label}</div>}
    </div>
  );
}

function SourceList({ sources }) {
  if (!sources?.length) return null;
  return (
    <div style={{ marginTop: 16 }}>
      <div style={{ fontFamily: mono, fontSize: 12, letterSpacing: 2, color: C.cyan, marginBottom: 8 }}>DISCOVERED SOURCES</div>
      {sources.map((s, i) => (
        <div key={i} style={{ padding: "8px 12px", background: C.surface, border: `1px solid ${C.border}`, borderRadius: 2, marginBottom: 4 }}>
          <span style={{ fontFamily: mono, fontSize: 13, color: C.white }}>{s.name}</span>
          <span style={{ fontFamily: mono, fontSize: 11, color: C.dim, marginLeft: 10 }}>{s.feed_url || s.url}</span>
        </div>
      ))}
    </div>
  );
}

function FileCard({ name, content, onDL }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ border: `1px solid ${C.border}`, borderRadius: 2, marginBottom: 6 }}>
      <div onClick={() => setOpen(!open)} style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "10px 14px", cursor: "pointer", background: C.surface,
      }}>
        <span style={{ fontFamily: mono, fontSize: 13, color: C.cyan }}>{name}</span>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <span style={{ fontFamily: mono, fontSize: 10, color: C.dim }}>{open ? "▼" : "▶"}</span>
          <button onClick={e => { e.stopPropagation(); onDL(); }} style={{
            padding: "3px 10px", background: "transparent", border: `1px solid ${C.green}66`,
            color: C.green, fontFamily: mono, fontSize: 10, cursor: "pointer", borderRadius: 2,
          }}>SAVE</button>
        </div>
      </div>
      {open && (
        <pre style={{
          margin: 0, padding: 14, background: "#08080f", color: C.dim,
          fontFamily: mono, fontSize: 11, lineHeight: 1.5,
          overflow: "auto", maxHeight: 300, whiteSpace: "pre-wrap", wordBreak: "break-word",
        }}>{content.length > 2500 ? content.slice(0, 2500) + "\n\n[... full file in download ...]" : content}</pre>
      )}
    </div>
  );
}

const Btn = ({ children, primary = false, disabled = false, onClick }: { children: any; primary?: boolean; disabled?: boolean; onClick: any }) => (
  <button disabled={disabled} onClick={onClick} style={{
    padding: "12px 28px", border: primary ? "none" : `1px solid ${C.border}`,
    background: primary ? (disabled ? C.border : C.green) : "transparent",
    color: primary ? (disabled ? C.dim : C.bg) : C.dim,
    fontFamily: mono, fontSize: 13, letterSpacing: 3, fontWeight: primary ? 600 : 400,
    cursor: disabled ? "default" : "pointer", borderRadius: 2,
    boxShadow: primary && !disabled ? glow(C.green) : "none", transition: "all 0.3s",
  }}>{children}</button>
);


// ═══════════════════════════════════════════════════════════
// ACTIVATION FLOW (replaces static setup box)
// ═══════════════════════════════════════════════════════════

function CopyBtn({ text }) {
  const [copied, setCopied] = useState(false);
  return (
    <button onClick={() => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000); }} style={{
      padding: "4px 12px", background: copied ? `${C.green}20` : "transparent",
      border: `1px solid ${copied ? C.green : C.border}`, borderRadius: 2,
      color: copied ? C.green : C.dim, fontFamily: mono, fontSize: 10,
      cursor: "pointer", transition: "all 0.2s", letterSpacing: 1,
    }}>{copied ? "COPIED" : "COPY"}</button>
  );
}

function InfoBtn({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <span style={{ position: "relative", display: "inline-block", verticalAlign: "middle", marginLeft: 6 }}>
      <button
        onClick={(e) => { e.stopPropagation(); setOpen(!open); }}
        style={{
          width: 18, height: 18, borderRadius: "50%", border: `1px solid ${C.cyan}66`,
          background: open ? `${C.cyan}15` : "transparent", color: C.cyan,
          fontFamily: mono, fontSize: 10, fontWeight: 700, cursor: "pointer",
          display: "inline-flex", alignItems: "center", justifyContent: "center",
          lineHeight: 1, padding: 0, transition: "all 0.2s",
        }}
        title="More info"
      >?</button>
      {open && (
        <div style={{
          position: "absolute", left: 24, top: -4, zIndex: 20,
          width: 280, padding: "12px 14px", borderRadius: 4,
          background: "#0a0a16", border: `1px solid ${C.cyan}33`,
          boxShadow: `0 4px 20px #00000080`,
        }}>
          <div style={{ fontFamily: mono, fontSize: 12, color: C.text, lineHeight: 1.7 }}>
            {children}
          </div>
          <button onClick={(e) => { e.stopPropagation(); setOpen(false); }} style={{
            marginTop: 8, background: "none", border: "none", color: C.dim,
            fontFamily: mono, fontSize: 10, cursor: "pointer", padding: 0,
          }}>close</button>
        </div>
      )}
    </span>
  );
}

function ActivationStep({ number, title, done, open, onToggle, children }) {
  return (
    <div style={{ border: `1px solid ${done ? `${C.green}44` : open ? C.border : C.border}`, borderRadius: 2, marginBottom: 8, transition: "all 0.3s" }}>
      <button onClick={onToggle} style={{
        width: "100%", display: "flex", alignItems: "center", gap: 12,
        padding: "14px 16px", background: done ? `${C.green}08` : open ? C.surface : C.surface,
        border: "none", cursor: "pointer", outline: "none", textAlign: "left",
      }}>
        <div style={{
          width: 26, height: 26, borderRadius: "50%", flexShrink: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
          background: done ? C.green : "transparent",
          border: `2px solid ${done ? C.green : C.dim}`,
          color: done ? C.bg : C.dim, fontFamily: mono, fontSize: 12, fontWeight: 600,
          transition: "all 0.3s",
        }}>{done ? "✓" : number}</div>
        <span style={{ fontFamily: mono, fontSize: 14, color: done ? C.green : C.white, flex: 1 }}>{title}</span>
        <span style={{ fontFamily: mono, fontSize: 10, color: C.dim }}>{open ? "▼" : "▶"}</span>
      </button>
      {open && (
        <div style={{ padding: "4px 16px 18px 54px", background: C.surface }}>
          {children}
        </div>
      )}
    </div>
  );
}

function ActivationFlow({ files, config, preset, onDownload, onReset }) {
  const [done, setDone] = useState({});
  const [openStep, setOpenStep] = useState(1);
  const [os, setOs] = useState(null);
  const [showRemove, setShowRemove] = useState(false);
  const [testRunning, setTestRunning] = useState(false);
  const [testResult, setTestResult] = useState<{ ok: boolean; phase: string; message: string } | null>(null);

  const mark = (n) => { setDone(p => ({ ...p, [n]: true })); setOpenStep(n + 1); };
  const toggle = (n) => setOpenStep(openStep === n ? null : n);
  const doneCount = Object.values(done).filter(Boolean).length;
  const pr = PRESETS[preset];
  const freq = config.frequency || "Weekly";
  const selfHosted = config.delivery === "self";
  const deps = preset === "radar" ? "requests feedparser" : preset === "recycler" ? "requests beautifulsoup4" : "requests";

  const cronMap = {
    "Daily": { expr: "0 8 * * *", human: "every day at 8:00 AM" },
    "Weekly": { expr: "0 8 * * 1", human: "every Monday at 8:00 AM" },
    "Biweekly": { expr: "0 8 * * 1", human: "every Monday at 8:00 AM (skip weeks you don't need)" },
    "Monthly": { expr: "0 8 1 * *", human: "the 1st of every month at 8:00 AM" },
  };
  const sched = cronMap[freq] || cronMap["Weekly"];
  const cronLine = `${sched.expr}  cd ~/Desktop && ~/Desktop/.venv/bin/python main.py >> autoforge.log 2>&1`;

  const sub = { fontFamily: mono, fontSize: 13, color: C.text, lineHeight: 1.8 };
  const hint = { fontFamily: mono, fontSize: 12, color: C.dim, lineHeight: 1.7, marginTop: 8 };
  const code = (t?: any): React.CSSProperties => ({ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10,
    padding: "10px 14px", background: "#08080f", border: `1px solid ${C.border}`, borderRadius: 2, marginTop: 8, marginBottom: 4 });

  const totalSteps = 7;

  return (
    <div>
      {/* Header + progress */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div>
          <div style={{ fontSize: 12, letterSpacing: 2, color: C.cyan, marginBottom: 4 }}>ACTIVATE YOUR AUTOMATION</div>
          <div style={{ fontFamily: mono, fontSize: 13, color: C.dim }}>{pr.name} — {freq.toLowerCase()} cadence</div>
        </div>
        <div style={{ fontFamily: mono, fontSize: 13, color: doneCount === totalSteps ? C.green : C.dim }}>
          {doneCount} of {totalSteps} complete
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ display: "flex", gap: 3, marginBottom: 24 }}>
        {Array.from({ length: totalSteps }, (_, i) => i + 1).map(n => (
          <div key={n} style={{ flex: 1, height: 3, borderRadius: 2, background: done[n] ? C.green : C.border, transition: "all 0.4s",
            boxShadow: done[n] ? glow(C.green) : "none" }} />
        ))}
      </div>

      {/* STEP 1: System check */}
      <ActivationStep number={1} title="Check your system" done={done[1]} open={openStep === 1} onToggle={() => toggle(1)}>
        <div style={sub}>
          <div style={{ marginBottom: 14 }}>
            First, let's make sure your computer is compatible. Select your operating system:
          </div>

          <div style={{ display: "flex", gap: 6, marginBottom: 16 }}>
            {[{ key: "mac", label: "Mac" }, { key: "win", label: "Windows" }].map(o => (
              <button key={o.key} onClick={() => setOs(o.key)} style={{
                padding: "10px 24px", background: os === o.key ? `${C.green}12` : C.bg,
                border: `1px solid ${os === o.key ? C.green : C.border}`,
                color: os === o.key ? C.green : C.dim,
                fontFamily: mono, fontSize: 13, cursor: "pointer", borderRadius: 2, transition: "all 0.2s",
              }}>{o.label}</button>
            ))}
          </div>

          {os && (
            <div style={{ padding: "14px 16px", background: `${C.green}08`, border: `1px solid ${C.green}22`, borderRadius: 2 }}>
              <div style={{ fontFamily: mono, fontSize: 12, color: C.green, letterSpacing: 1, marginBottom: 10 }}>
                ✓ {os === "mac" ? "macOS" : "WINDOWS"} — COMPATIBLE
              </div>
              <div style={{ fontFamily: mono, fontSize: 12, color: C.text, lineHeight: 1.8 }}>
                {os === "mac" && (<>
                  <div style={{ marginBottom: 4 }}>Minimum: <span style={{ color: C.white }}>macOS 10.15 (Catalina)</span> or newer</div>
                  <div style={{ marginBottom: 4 }}>Python 3.9+ required — we'll check this in a later step</div>
                  <div>Scheduling uses <span style={{ color: C.white }}>cron</span> (built into macOS)</div>
                </>)}
                {os === "win" && (<>
                  <div style={{ marginBottom: 4 }}>Minimum: <span style={{ color: C.white }}>Windows 10</span> or newer</div>
                  <div style={{ marginBottom: 4 }}>Python 3.9+ required — we'll check this in a later step</div>
                  <div>Scheduling uses <span style={{ color: C.white }}>Task Scheduler</span> (built into Windows)</div>
                </>)}
              </div>
            </div>
          )}
        </div>
        {os && (
          <button onClick={() => mark(1)} style={{
            marginTop: 14, padding: "8px 20px", background: "transparent", border: `1px solid ${C.green}66`,
            color: C.green, fontFamily: mono, fontSize: 12, cursor: "pointer", borderRadius: 2,
          }}>My system is ready →</button>
        )}
      </ActivationStep>

      {/* STEP 2: Download files */}
      <ActivationStep number={2} title="Download your files" done={done[2]} open={openStep === 2} onToggle={() => toggle(2)}>
        <div style={sub}>
          <div style={{ marginBottom: 12 }}>Download these two files. They contain your complete automation:</div>
          <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
            {Object.entries(files).map(([name, content]) => (
              <button key={name} onClick={() => onDownload(name, content)} style={{
                padding: "8px 16px", background: `${C.green}10`, border: `1px solid ${C.green}44`,
                color: C.green, fontFamily: mono, fontSize: 12, cursor: "pointer", borderRadius: 2,
              }}>⬇ {name}</button>
            ))}
          </div>
          <div style={{ padding: "10px 14px", background: `${C.cyan}08`, border: `1px solid ${C.cyan}22`, borderRadius: 2 }}>
            <div style={{ fontFamily: mono, fontSize: 12, color: C.cyan, marginBottom: 4 }}>📁 IMPORTANT: Move both files to your Desktop</div>
            <div style={{ fontFamily: mono, fontSize: 12, color: C.dim, lineHeight: 1.7 }}>
              After downloading, drag <span style={{ color: C.white }}>main.py</span> and <span style={{ color: C.white }}>README.md</span> to your <span style={{ color: C.white }}>Desktop</span>.
              This makes the next steps easier — all commands below assume the files are on your Desktop.
            </div>
          </div>
        </div>
        <button onClick={() => mark(2)} style={{
          marginTop: 14, padding: "8px 20px", background: "transparent", border: `1px solid ${C.green}66`,
          color: C.green, fontFamily: mono, fontSize: 12, cursor: "pointer", borderRadius: 2,
        }}>Files are on my Desktop →</button>
      </ActivationStep>

      {/* STEP 3: Open Terminal */}
      <ActivationStep number={3} title="Open your Terminal" done={done[3]} open={openStep === 3} onToggle={() => toggle(3)}>
        <div style={sub}>
          <div style={{ marginBottom: 12 }}>
            A terminal is a text-based way to talk to your computer. Instead of clicking icons, you type short commands. Don't worry — we'll give you every command to copy & paste.
          </div>

          {os === "mac" && (
            <div>
              <div style={{ fontFamily: mono, fontSize: 12, color: C.cyan, letterSpacing: 1, marginBottom: 10 }}>HOW TO OPEN TERMINAL ON MAC</div>
              <div style={{ marginBottom: 8 }}>
                <span style={{ color: C.white }}>Option 1:</span> Press <span style={{ color: C.green }}>⌘ Cmd + Space</span> to open Spotlight, type <span style={{ color: C.green }}>Terminal</span>, and press Enter.
              </div>
              <div style={{ marginBottom: 8 }}>
                <span style={{ color: C.white }}>Option 2:</span> Open Finder → Applications → Utilities → <span style={{ color: C.green }}>Terminal.app</span>
              </div>
              <div style={hint}>
                You'll see a window with a blinking cursor — that's your terminal. Keep it open for the next steps.
              </div>
            </div>
          )}

          {os === "win" && (
            <div>
              <div style={{ fontFamily: mono, fontSize: 12, color: C.cyan, letterSpacing: 1, marginBottom: 10 }}>HOW TO OPEN COMMAND PROMPT ON WINDOWS</div>
              <div style={{ marginBottom: 8 }}>
                <span style={{ color: C.white }}>Option 1:</span> Press <span style={{ color: C.green }}>Win + R</span>, type <span style={{ color: C.green }}>cmd</span>, and press Enter.
              </div>
              <div style={{ marginBottom: 8 }}>
                <span style={{ color: C.white }}>Option 2:</span> Click the Start menu, type <span style={{ color: C.green }}>Command Prompt</span>, and click on it.
              </div>
              <div style={hint}>
                You'll see a black window with a blinking cursor — that's your command prompt. Keep it open for the next steps.
              </div>
            </div>
          )}

          {!os && <div style={hint}>Go back to Step 1 and select your operating system first.</div>}
        </div>
        {os && (
          <button onClick={() => mark(3)} style={{
            marginTop: 14, padding: "8px 20px", background: "transparent", border: `1px solid ${C.green}66`,
            color: C.green, fontFamily: mono, fontSize: 12, cursor: "pointer", borderRadius: 2,
          }}>Terminal is open →</button>
        )}
      </ActivationStep>

      {/* STEP 4: Install Python + dependencies */}
      <ActivationStep number={4} title="Set up Python" done={done[4]} open={openStep === 4} onToggle={() => toggle(4)}>
        <div style={sub}>
          <div style={{ marginBottom: 12 }}>
            Your automation runs with Python — a free programming language.
            <InfoBtn>
              Python is needed because your automation script (main.py) is written in Python. It's like a document reader for code — without it, your computer can't execute the script. Don't worry, you don't need to write any code yourself. You just need Python installed so your computer can run the file.
            </InfoBtn>
          </div>

          <div style={{ fontFamily: mono, fontSize: 12, color: C.cyan, letterSpacing: 1, marginBottom: 10 }}>CHECK IF YOU ALREADY HAVE PYTHON</div>
          <div style={{ marginBottom: 6 }}>
            Type this command in your {os === "mac" ? "Terminal" : "Command Prompt"}:
          </div>

          {os === "mac" && (
            <>
              <div style={code()}>
                <span style={{ fontFamily: mono, fontSize: 13, color: C.green }}>python3 --version</span>
                <CopyBtn text="python3 --version" />
              </div>
              <div style={hint}>
                If you see something like <span style={{ color: C.white }}>Python 3.9</span> or higher, you're good.
                On macOS, Python 3 is always called <span style={{ color: C.green }}>python3</span>, not <span style={{ color: C.green }}>python</span>.
              </div>
            </>
          )}

          {os === "win" && (
            <>
              <div style={code()}>
                <span style={{ fontFamily: mono, fontSize: 13, color: C.green }}>python --version</span>
                <CopyBtn text="python --version" />
              </div>
              <div style={hint}>
                If you see something like <span style={{ color: C.white }}>Python 3.9</span> or higher, you're good.
              </div>
            </>
          )}

          <div style={{ marginTop: 16, padding: "12px 14px", background: `${C.magenta}08`, border: `1px solid ${C.magenta}22`, borderRadius: 2 }}>
            <div style={{ fontFamily: mono, fontSize: 12, color: C.magenta, marginBottom: 6 }}>
              Got "command not found" or "not recognized"?
            </div>
            <div style={{ fontFamily: mono, fontSize: 12, color: C.dim, lineHeight: 1.8 }}>
              That means Python isn't installed yet. Download it here:
            </div>
            <a
              href="https://www.python.org/downloads/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-block", marginTop: 8, padding: "8px 18px",
                background: `${C.cyan}10`, border: `1px solid ${C.cyan}44`, borderRadius: 2,
                color: C.cyan, fontFamily: mono, fontSize: 12, textDecoration: "none",
                cursor: "pointer",
              }}
            >
              ⬇ Download Python from python.org
            </a>
            <div style={{ fontFamily: mono, fontSize: 11, color: C.dim, marginTop: 8, lineHeight: 1.7 }}>
              Install it with default settings.
              {os === "win" && <> <span style={{ color: C.white }}>Check "Add Python to PATH"</span> during installation.</>}
              {" "}Then close and reopen your {os === "mac" ? "Terminal" : "Command Prompt"}, and try the command again.
            </div>
          </div>

          <div style={{ marginTop: 16, fontFamily: mono, fontSize: 12, color: C.cyan, letterSpacing: 1, marginBottom: 10 }}>INSTALL DEPENDENCIES</div>
          <div style={{ marginBottom: 8 }}>
            Navigate to your Desktop and set up a Python environment:
            <InfoBtn>
              A "virtual environment" (venv) is a private sandbox for your Python project. {os === "mac" ? "macOS blocks installing packages globally for safety. " : ""}A venv solves this — it keeps everything contained in one folder. You only need to create it once.
            </InfoBtn>
          </div>

          {os === "mac" && (
            <>
              <div style={{ fontFamily: mono, fontSize: 12, color: C.dim, marginBottom: 4 }}>Run these 3 commands one by one:</div>
              <div style={code()}>
                <span style={{ fontFamily: mono, fontSize: 13, color: C.green }}>cd ~/Desktop</span>
                <CopyBtn text="cd ~/Desktop" />
              </div>
              <div style={code()}>
                <span style={{ fontFamily: mono, fontSize: 13, color: C.green }}>python3 -m venv .venv && source .venv/bin/activate</span>
                <CopyBtn text="python3 -m venv .venv && source .venv/bin/activate" />
              </div>
              <div style={code()}>
                <span style={{ fontFamily: mono, fontSize: 13, color: C.green }}>pip install {deps}</span>
                <CopyBtn text={`pip install ${deps}`} />
              </div>
              <div style={hint}>
                After <span style={{ color: C.green }}>source .venv/bin/activate</span> you'll see <span style={{ color: C.white }}>(.venv)</span> at the start of your terminal line — that means it's working.
              </div>
            </>
          )}

          {os === "win" && (
            <>
              <div style={{ fontFamily: mono, fontSize: 12, color: C.dim, marginBottom: 4 }}>Run these 3 commands one by one:</div>
              <div style={code()}>
                <span style={{ fontFamily: mono, fontSize: 13, color: C.green }}>cd %USERPROFILE%\Desktop</span>
                <CopyBtn text="cd %USERPROFILE%\\Desktop" />
              </div>
              <div style={code()}>
                <span style={{ fontFamily: mono, fontSize: 13, color: C.green }}>python -m venv .venv && .venv\Scripts\activate</span>
                <CopyBtn text="python -m venv .venv && .venv\\Scripts\\activate" />
              </div>
              <div style={code()}>
                <span style={{ fontFamily: mono, fontSize: 13, color: C.green }}>pip install {deps}</span>
                <CopyBtn text={`pip install ${deps}`} />
              </div>
              <div style={hint}>
                These are small helper libraries your automation needs. This only needs to be done once.
              </div>
            </>
          )}

          {!os && <div style={hint}>Go back to Step 1 and select your operating system first.</div>}
        </div>
        {os && (
          <button onClick={() => mark(4)} style={{
            marginTop: 14, padding: "8px 20px", background: "transparent", border: `1px solid ${C.green}66`,
            color: C.green, fontFamily: mono, fontSize: 12, cursor: "pointer", borderRadius: 2,
          }}>Dependencies installed →</button>
        )}
      </ActivationStep>

      {/* STEP 5: Run it once */}
      <ActivationStep number={5} title="Run it once" done={done[5]} open={openStep === 5} onToggle={() => toggle(5)}>
        <div style={sub}>
          {selfHosted ? (
            <div style={{ marginBottom: 10 }}>
              Open <span style={{ color: C.cyan }}>main.py</span> in any text editor ({os === "mac" ? "right-click → Open With → TextEdit" : "right-click → Open with → Notepad"}).
              Find the <span style={{ color: C.white }}>CONFIGURATION</span> section at the top.
              Fill in your LLM API key and email credentials.
            </div>
          ) : config.email ? (
            <div style={{ marginBottom: 10 }}>
              Your email (<span style={{ color: C.green }}>{config.email}</span>) is already pre-filled in main.py.
              Open it to verify it's correct.
            </div>
          ) : (
            <div style={{ marginBottom: 10 }}>
              Open <span style={{ color: C.cyan }}>main.py</span> in any text editor.
              Find <span style={{ color: C.white }}>USER_EMAIL</span> near the top and enter your email address.
            </div>
          )}
          <div style={{ marginBottom: 10 }}>
            Make sure your virtual environment is active, then run the script:
            <InfoBtn>
              If you just completed the previous step and your {os === "mac" ? "Terminal" : "Command Prompt"} still shows <span style={{ color: C.white }}>(.venv)</span>, you're ready. If you opened a new window, you need to activate the environment again first.
            </InfoBtn>
          </div>

          {os === "mac" && (
            <>
              <div style={code()}>
                <span style={{ fontFamily: mono, fontSize: 13, color: C.green }}>cd ~/Desktop && source .venv/bin/activate</span>
                <CopyBtn text="cd ~/Desktop && source .venv/bin/activate" />
              </div>
              <div style={code()}>
                <span style={{ fontFamily: mono, fontSize: 13, color: C.green }}>python3 main.py</span>
                <CopyBtn text="python3 main.py" />
              </div>
            </>
          )}

          {os === "win" && (
            <>
              <div style={code()}>
                <span style={{ fontFamily: mono, fontSize: 13, color: C.green }}>cd %USERPROFILE%\Desktop && .venv\Scripts\activate</span>
                <CopyBtn text="cd %USERPROFILE%\\Desktop && .venv\\Scripts\\activate" />
              </div>
              <div style={code()}>
                <span style={{ fontFamily: mono, fontSize: 13, color: C.green }}>python main.py</span>
                <CopyBtn text="python main.py" />
              </div>
            </>
          )}

          <div style={hint}>
            This runs the full pipeline once. You should see output in the {os === "mac" ? "Terminal" : "Command Prompt"}
            {" "}and receive an email with the results.{selfHosted ? "" : " If the email doesn't arrive, check your spam folder."}
          </div>

          {!os && <div style={hint}>Go back to Step 1 and select your operating system first.</div>}
        </div>
        {os && (
          <button onClick={() => mark(5)} style={{
            marginTop: 14, padding: "8px 20px", background: "transparent", border: `1px solid ${C.green}66`,
            color: C.green, fontFamily: mono, fontSize: 12, cursor: "pointer", borderRadius: 2,
          }}>It worked →</button>
        )}
      </ActivationStep>

      {/* STEP 6: Schedule */}
      <ActivationStep number={6} title={`Turn on ${freq.toLowerCase()} runs`} done={done[6]} open={openStep === 6} onToggle={() => toggle(6)}>
        <div style={sub}>
          <div style={{ marginBottom: 12 }}>
            AUTOFORGE handles content and delivery. But the recurring execution happens
            on your computer — you decide when it runs, and you can turn it off anytime.
            <InfoBtn>
              Why does it run on your machine? This keeps you in full control. No cloud subscription needed, no vendor lock-in. Your computer runs the script on a schedule you set, and you can pause or stop it anytime.
            </InfoBtn>
          </div>

          {os === "mac" && (<div>
            <div style={{ fontFamily: mono, fontSize: 12, color: C.cyan, letterSpacing: 1, marginBottom: 10 }}>CRON SETUP — 1 COMMAND</div>

            <div style={{ ...sub, marginBottom: 8 }}>Copy this single command and paste it into your Terminal. It sets everything up automatically:</div>
            <div style={code()}>
              <span style={{ fontFamily: mono, fontSize: 12, color: C.green, wordBreak: "break-all" }}>{`(crontab -l 2>/dev/null; echo "${cronLine}") | crontab -`}</span>
              <CopyBtn text={`(crontab -l 2>/dev/null; echo "${cronLine}") | crontab -`} />
            </div>
            <div style={hint}>
              This adds the schedule to your crontab without opening an editor. Your existing cron jobs (if any) are preserved.
              <InfoBtn>
                <span style={{ color: C.white }}>What does this do?</span> It reads your current cron schedule, appends the AUTOFORGE line, and saves it — all in one step. No editor needed. If you ever want to remove it, just run <span style={{ color: C.green }}>crontab -e</span> and delete the AUTOFORGE line.
              </InfoBtn>
            </div>

            <div style={{ ...sub, marginTop: 14, marginBottom: 4 }}>Verify it's active:</div>
            <div style={code()}>
              <span style={{ fontFamily: mono, fontSize: 13, color: C.green }}>crontab -l</span>
              <CopyBtn text="crontab -l" />
            </div>
            <div style={hint}>You should see the AUTOFORGE line in the output.</div>
          </div>)}

          {os === "win" && (<div>
            <div style={{ fontFamily: mono, fontSize: 12, color: C.cyan, letterSpacing: 1, marginBottom: 10 }}>TASK SCHEDULER — 7 STEPS</div>
            {[
              "Press Win+R, type taskschd.msc, press Enter.",
              "In the right panel, click \"Create Basic Task\".",
              "Name it AUTOFORGE. Click Next.",
              `Trigger: choose ${freq === "Daily" ? "Daily" : freq === "Monthly" ? "Monthly" : "Weekly"}. Set time to 8:00 AM. Click Next.`,
              "Action: choose \"Start a Program\". Click Next.",
              "Program: type python (or the full path like C:\\Python312\\python.exe).",
              "Add arguments: main.py — Start in: C:\\Users\\YourName\\Desktop (where your main.py is).",
            ].map((txt, i) => (
              <div key={i} style={{ display: "flex", gap: 10, marginBottom: 8 }}>
                <span style={{ fontFamily: mono, fontSize: 12, color: C.green, flexShrink: 0, width: 18 }}>{i + 1}.</span>
                <span style={{ fontFamily: mono, fontSize: 13, color: C.text, lineHeight: 1.7 }}>{txt}</span>
              </div>
            ))}
            <div style={hint}>Click Finish. Your pipeline will now run {sched.human} automatically.</div>

            <div style={{ ...sub, marginTop: 14, marginBottom: 4 }}>Verify it's active:</div>
            <div style={{ fontFamily: mono, fontSize: 13, color: C.text, lineHeight: 1.7 }}>
              Open Task Scheduler → Task Scheduler Library → find "AUTOFORGE" → check Status.
            </div>
          </div>)}

          {!os && <div style={hint}>Go back to Step 1 and select your operating system first.</div>}
         </div>
         {os && (
           <button onClick={() => mark(6)} style={{
             marginTop: 14, padding: "8px 20px", background: "transparent", border: `1px solid ${C.green}66`,
             color: C.green, fontFamily: mono, fontSize: 12, cursor: "pointer", borderRadius: 2,
           }}>I've set it up →</button>
        )}
      </ActivationStep>

      {/* STEP 7: Automation Active */}
      <ActivationStep number={7} title="Automation active" done={done[7]} open={openStep === 7} onToggle={() => toggle(7)}>
        {/* Celebration */}
        <div style={{
          padding: "24px 20px", textAlign: "center", borderRadius: 4, marginBottom: 20,
          background: `linear-gradient(135deg, ${C.green}15, ${C.cyan}10)`,
          border: `2px solid ${C.green}44`,
          boxShadow: `0 0 40px ${C.green}15, 0 0 80px ${C.green}08`,
        }}>
          <div style={{ fontFamily: mono, fontSize: 18, color: C.green, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>
            AUTOMATION ACTIVE
          </div>
          <div style={{ fontFamily: mono, fontSize: 14, color: C.white, marginBottom: 6 }}>
            Your {pr.name.toLowerCase()} pipeline is set up and will run automatically.
          </div>
          <div style={{ fontFamily: mono, fontSize: 13, color: C.dim, lineHeight: 1.7 }}>
            <span style={{ color: C.green }}>▸</span> Runs <span style={{ color: C.white }}>{sched.human}</span> on your machine
            <br/>
            <span style={{ color: C.green }}>▸</span> Results delivered straight to your inbox
            <br/>
            <span style={{ color: C.green }}>▸</span> No cloud fees, no subscriptions — it's yours
          </div>
        </div>

        {/* Verify */}
        <div style={{ ...sub, marginBottom: 16 }}>
          <div style={{ fontFamily: mono, fontSize: 11, color: C.cyan, letterSpacing: 1, marginBottom: 10 }}>VERIFY</div>
          <div style={{ marginBottom: 10 }}>
            Wait for the next scheduled run (or wait a minute for daily). Then check:
          </div>
          <div style={{ marginBottom: 6 }}>
            ✓ Did you receive an email with your {pr.name.toLowerCase()} results?
          </div>
          <div style={{ marginBottom: 6 }}>
            ✓ Is there an <span style={{ color: C.cyan }}>autoforge.log</span> file on your Desktop?
          </div>
          <div style={hint}>
            If nothing happened, check that your computer was on at the scheduled time.
            {os === "mac" ? " Run crontab -l to verify the entry exists." : " Open Task Scheduler and check the task status."}
          </div>
        </div>

        {/* Deactivate */}
        <div style={{ ...sub }}>
          <div style={{ fontFamily: mono, fontSize: 11, color: C.cyan, letterSpacing: 1, marginBottom: 10 }}>DEACTIVATE</div>
          {os === "mac" && (
            <div style={{ fontFamily: mono, fontSize: 12, color: C.dim, lineHeight: 1.7, marginBottom: 8 }}>
              Run <span style={{ color: C.green }}>crontab -e</span> and delete the AUTOFORGE line. Save and close.
            </div>
          )}
          {os === "win" && (
            <div style={{ fontFamily: mono, fontSize: 12, color: C.dim, lineHeight: 1.7, marginBottom: 8 }}>
              Open Task Scheduler → Task Scheduler Library → right-click "AUTOFORGE" → Delete. Or just Disable to pause it.
            </div>
          )}
          <div style={{ fontFamily: mono, fontSize: 12, color: C.dim, lineHeight: 1.7 }}>
            Then delete the folder with main.py. No background services, no accounts, nothing else to clean up.
          </div>
        </div>

        <button onClick={() => mark(7)} style={{
          marginTop: 18, padding: "8px 20px", background: "transparent", border: `1px solid ${C.green}66`,
          color: C.green, fontFamily: mono, fontSize: 12, cursor: "pointer", borderRadius: 2,
        }}>COMPLETE SETUP →</button>
      </ActivationStep>

      {/* SUCCESS STATE */}
      {doneCount === totalSteps && (() => {
        const pr = PRESETS[preset];
        const selfHosted = config.delivery === "self";

        const buildTestPrompt = () => {
          if (preset === "radar") return `You are an industry analyst. Generate a brief industry radar briefing for the ${config.industry || "tech"} industry. Focus: ${config.focus || "emerging trends"}. Voice: ${config.voice || "Sharp & Direct"}. Include 3-4 key signals with brief analysis. Keep it concise and actionable. Format with clear headers.`;
          if (preset === "kpi") return `You are a data storyteller. Generate a sample KPI narrative report. Metrics tracked: ${config.metrics || "revenue, conversion rate"}. Audience: ${config.audience || "leadership team"}. Voice: ${config.voice || "Executive Brief"}. Include trend observations and 2-3 action items. Keep it concise.`;
          return `You are a content strategist. Generate sample recycled content from a hypothetical source piece. Target formats: ${config.formats || "LinkedIn posts, newsletter"}. Audience: ${config.audience || "marketing professionals"}. Voice: ${config.voice || "Sharp & Direct"}. Generate 2-3 short content pieces. Keep it actionable.`;
        };

        const presetLabel = preset === "radar" ? "industry-radar" : preset === "kpi" ? "kpi-storyteller" : "content-recycler";

        const runTestPipeline = async () => {
          setTestRunning(true);
          setTestResult(null);

          // Phase 1: Generate
          try {
            const genRes = await fetch(`${FORGE_API_BASE}/forge-generate`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ prompt: buildTestPrompt(), email: config.email }),
            });
            if (!genRes.ok) {
              const err = await genRes.json().catch(() => ({}));
              setTestResult({ ok: false, phase: "Generation failed", message: err.error || `Server returned ${genRes.status}` });
              setTestRunning(false);
              return;
            }
            const genData = await genRes.json();
            const content = genData.content;
            if (!content) {
              setTestResult({ ok: false, phase: "Generation failed", message: "No content returned from LLM." });
              setTestRunning(false);
              return;
            }

            // Phase 2: Deliver
            const delRes = await fetch(`${FORGE_API_BASE}/forge-deliver`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                content,
                to: config.email,
                subject: `AUTOFORGE Test Run — ${pr.name}`,
                email: config.email,
              }),
            });
            if (!delRes.ok) {
              const err = await delRes.json().catch(() => ({}));
              setTestResult({ ok: false, phase: "Delivery failed", message: err.error || `SMTP returned ${delRes.status}` });
              setTestRunning(false);
              return;
            }

            setTestResult({ ok: true, phase: "done", message: `Test sent to ${config.email}. Check your inbox.` });
          } catch (e) {
            setTestResult({ ok: false, phase: "Network error", message: e instanceof Error ? e.message : "Connection failed. Check your internet." });
          }
          setTestRunning(false);
        };

        return (
          <div style={{ marginTop: 20 }}>
            {/* Test Run — only in relay mode */}
            {!selfHosted && (
              <div style={{ padding: 20, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 2 }}>
                <div style={{ fontFamily: mono, fontSize: 11, color: C.cyan, letterSpacing: 1, marginBottom: 10 }}>
                  PROOF OF DELIVERY
                </div>
                <div style={{ fontFamily: mono, fontSize: 12, color: C.dim, lineHeight: 1.7, marginBottom: 14 }}>
                  Run the full pipeline now — generate content and deliver it to your inbox.
                  This verifies generation and delivery. Your recurring runs still happen on your machine.
                </div>

                <button
                  onClick={runTestPipeline}
                  disabled={testRunning}
                  style={{
                    padding: "10px 24px", fontFamily: mono, fontSize: 12, cursor: testRunning ? "wait" : "pointer",
                    background: testRunning ? `${C.green}10` : "transparent",
                    border: `2px solid ${testRunning ? C.dim : C.green}`,
                    color: testRunning ? C.dim : C.green,
                    borderRadius: 2, letterSpacing: 1, transition: "all 0.3s",
                    ...(testRunning ? { animation: "pulse 1.5s infinite" } : {}),
                  }}
                >
                  {testRunning ? "⟳ RUNNING PIPELINE..." : "▶ RUN TEST — DELIVER TO MY INBOX"}
                </button>

                {/* Result feedback */}
                {testResult && (
                  <div style={{
                    marginTop: 14, padding: "12px 16px", borderRadius: 2,
                    background: testResult.ok ? `${C.green}0a` : `${C.magenta}0a`,
                    border: `1px solid ${testResult.ok ? C.green : C.magenta}33`,
                  }}>
                    {testResult.ok ? (
                      <>
                        <div style={{ fontFamily: mono, fontSize: 12, color: C.green, marginBottom: 4 }}>
                          ✓ Test sent successfully. Check your inbox.
                        </div>
                        <div style={{ fontFamily: mono, fontSize: 11, color: C.dim }}>
                          This verifies generation and delivery. Your recurring runs still happen on your machine.
                        </div>
                      </>
                    ) : (
                      <>
                        <div style={{ fontFamily: mono, fontSize: 12, color: C.magenta, marginBottom: 4 }}>
                          ✗ We couldn't complete the test run.
                        </div>
                        <div style={{ fontFamily: mono, fontSize: 11, color: C.text, marginBottom: 8 }}>
                          Reason: <span style={{ color: C.magenta }}>{testResult.phase}</span>
                          {testResult.message ? ` — ${testResult.message}` : ""}
                        </div>
                        <div style={{ fontFamily: mono, fontSize: 11, color: C.dim, marginBottom: 10 }}>
                          Next step: Check README.md → Troubleshooting, or try again.
                        </div>
                        <button
                          onClick={runTestPipeline}
                          disabled={testRunning}
                          style={{
                            padding: "6px 16px", fontFamily: mono, fontSize: 11, cursor: "pointer",
                            background: "transparent", border: `1px solid ${C.dim}`,
                            color: C.dim, borderRadius: 2, letterSpacing: 1,
                          }}
                        >
                          ↻ RETRY
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Build another / footer */}
            <div style={{ marginTop: 30, display: "flex", gap: 10 }}>
              <Btn onClick={onReset}>BUILD ANOTHER</Btn>
            </div>

            <div style={{ marginTop: 40, paddingTop: 20, borderTop: `1px solid ${C.border}`, textAlign: "center" }}>
              <a href="https://shapeneural.com" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                <div style={{ fontSize: 11, letterSpacing: 4, color: C.dim }}>BUILT WITH <span style={{ color: C.green }}>AUTOFORGE</span> BY SHAPENEURAL LABS</div>
                <div style={{ fontSize: 11, color: C.dim, marginTop: 5 }}>shapeneural.com · designed intelligence</div>
              </a>
            </div>
          </div>
        );
      })()}
    </div>
  );
}


// ═══════════════════════════════════════════════════════════
// MAIN WIZARD
// ═══════════════════════════════════════════════════════════

export default function AutoforgeWizard() {
  const [step, setStep] = useState(0);
  const [preset, setPreset] = useState(null);
  const [config, setConfig] = useState<Record<string, string>>({ delivery: "relay", frequency: "Weekly" });
  const [phase, setPhase] = useState(-1);
  const [phaseLabel, setPhaseLabel] = useState("");
  const [sources, setSources] = useState(null);
  const [sample, setSample] = useState("");
  const [files, setFiles] = useState(null);
  const [loading, setLoading] = useState(false);

  const dl = (name, content) => {
    const b = new Blob([content], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(b); a.download = name; a.click();
    URL.revokeObjectURL(a.href);
  };

  const forge = async () => {
    setLoading(true); setSample(""); setSources(null);
    const pr = PRESETS[preset];
    const ctx = Object.entries(config).filter(([k,v]) => v && k !== "delivery").map(([k,v]) => `${k}: ${v}`).join(", ");

    // Phase 1: Research
    setPhase(0); setPhaseLabel("Discovering sources...");
    let disc = [];
    if (preset === "radar") {
      try {
        const r = await fetch(`${FORGE_API_BASE}/forge-research`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            industry: (config as any).industry || "B2B SaaS",
            keywords: (config as any).focus || "AI, automation"
          }),
        });
        const d = await r.json();
        disc = d.sources || [];
      } catch { disc = [{ name: "Add your feeds", feed_url: "https://example.com/feed", description: "Replace with real RSS URLs" }]; }
    }
    setSources(disc);

    // Phase 2
    setPhase(1); setPhaseLabel("Configuring analysis...");
    await new Promise(r => setTimeout(r, 800));

    // Phase 3: Sample
    setPhase(2); setPhaseLabel("Generating sample output...");
    try {
      const r = await fetch(`${FORGE_API_BASE}/forge-sample`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          preset: preset === "radar" ? "industry-radar" : preset === "kpi" ? "kpi-storyteller" : "content-recycler",
          config: Object.fromEntries(
            Object.entries(config).filter(([k, v]) => v && k !== "delivery")
          )
        }),
      });
      const d = await r.json();
      setSample(d.content || "Sample generated.");
    } catch { setSample("Sample unavailable. Scripts work independently."); }

    // Phase 4: Package
    setPhase(3); setPhaseLabel("Assembling package...");
    await new Promise(r => setTimeout(r, 500));
    setFiles({
      "main.py": genScript(preset, config, disc),
      "README.md": genReadme(preset, config),
    });
    setPhase(4); setPhaseLabel(""); setLoading(false);
  };

  return (
    <div style={{
      minHeight: "100vh", background: C.bg, color: C.text, padding: "40px 20px", fontFamily: mono,
      backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,65,0.012) 2px, rgba(0,255,65,0.012) 4px)`,
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; }
        ::selection { background: ${C.green}44; }
        input:focus, select:focus { border-color: ${C.green} !important; }
        @keyframes pulse { 0%,100%{opacity:.5} 50%{opacity:1} }
      `}</style>

      <div style={{ maxWidth: 840, margin: "0 auto" }}>
        {/* Logo + Home link */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 32 }}>
          <a href="https://shapeneural.com" target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", textDecoration: "none", opacity: 0.8, transition: "opacity 0.3s" }} onMouseEnter={e => (e.currentTarget.style.opacity = "1")} onMouseLeave={e => (e.currentTarget.style.opacity = "0.8")}>
            <BindruneLogo size={36} onDark />
          </a>
        </div>

        <div style={{ marginBottom: 48, textAlign: "center" }}>
          <div style={{ fontSize: 11, letterSpacing: 6, color: C.dim, marginBottom: 10 }}>SHAPENEURAL LABS · MOD_07</div>
          <h1 style={{ fontSize: 38, fontWeight: 300, color: C.green, margin: "0 0 8px", letterSpacing: 6, textShadow: `0 0 30px ${C.green}33` }}>AUTOFORGE</h1>
          <div style={{ fontSize: 13, color: C.dim, letterSpacing: 2 }}>CONTENT AUTOMATION PIPELINE GENERATOR</div>
          <div style={{ fontSize: 13, color: C.magenta, marginTop: 12, fontStyle: "italic", letterSpacing: 1 }}>Not content. The machine that makes it.</div>
        </div>

        <StepBar step={step} />

        {step === 0 && (<div>
          <p style={{ fontSize: 14, color: C.dim, marginBottom: 24, lineHeight: 1.8 }}>
            Pick a pipeline. AUTOFORGE finds your sources, builds the logic, and generates
            a ready-to-run automation. You download two files. That's it.
          </p>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            {Object.keys(PRESETS).map(k => <PresetCard key={k} id={k} selected={preset} onClick={() => setPreset(k)} disabled={k !== "radar"} />)}
          </div>
          <div style={{ marginTop: 30, display: "flex", justifyContent: "flex-end" }}>
            <Btn primary disabled={!preset} onClick={() => { setStep(1); setConfig({ delivery: "relay", frequency: "Weekly" }); }}>NEXT →</Btn>
          </div>
        </div>)}

        {step === 1 && preset && (<div>
          <ConfigForm preset={preset} config={config} setConfig={setConfig} />
          <div style={{ marginTop: 30, display: "flex", justifyContent: "space-between" }}>
            <Btn onClick={() => setStep(0)}>← BACK</Btn>
            <Btn primary onClick={() => { setStep(2); forge(); }}>FORGE →</Btn>
          </div>
        </div>)}

        {step === 2 && preset && (<div>
          <PipelineViz preset={preset} phase={phase} label={loading ? phaseLabel : ""} />
          {sources && <SourceList sources={sources} />}
          {sample && (<div style={{ marginTop: 20 }}>
            <div style={{ fontSize: 12, letterSpacing: 2, color: C.cyan, marginBottom: 10 }}>SAMPLE OUTPUT — PROOF OF VALUE</div>
            <div style={{
              background: C.surface, border: `1px solid ${C.border}`, borderRadius: 2,
              padding: 18, fontFamily: mono, fontSize: 12, lineHeight: 1.7,
              color: C.text, whiteSpace: "pre-wrap", maxHeight: 360, overflow: "auto",
            }}>{sample}</div>
          </div>)}
          {files && !loading && (
            <div style={{ marginTop: 24, display: "flex", justifyContent: "flex-end" }}>
              <Btn primary onClick={() => setStep(3)}>VIEW PACKAGE →</Btn>
            </div>
          )}
        </div>)}

        {step === 3 && files && (<ActivationFlow
          files={files} config={config} preset={preset}
          onDownload={dl} onReset={() => { setStep(0); setPreset(null); setConfig({ delivery: "relay", frequency: "Weekly" }); setFiles(null); setSample(""); setSources(null); setPhase(-1); }}
        />)}
      </div>
    </div>
  );
}


