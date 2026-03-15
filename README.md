# AUTOFORGE — Content Automation Pipeline Generator

> Built by [ShapeNeural Labs](https://shapeneural.com) · designed intelligence

AUTOFORGE generates custom Python automation scripts that monitor your industry, create content, and deliver results to your inbox — fully automated, running on your machine.

---

## Table of Contents

- [Overview](#overview)
- [How It Works](#how-it-works)
- [Using the Wizard (Recommended)](#using-the-wizard-recommended)
- [Manual Setup (Without Wizard)](#manual-setup-without-wizard)
- [Configuration Reference](#configuration-reference)
- [Delivery Options](#delivery-options)
- [LLM Provider Options](#llm-provider-options)
- [Scheduling](#scheduling)
- [Deactivating a Schedule](#deactivating-a-schedule)
- [Customization](#customization)
- [Architecture](#architecture)
- [Troubleshooting](#troubleshooting)
- [Uninstall](#uninstall)

---

## Overview

AUTOFORGE is a pipeline generator — it doesn't create content directly, it creates the **machine** that creates content. The output is a standalone Python script (`main.py`) that:

1. **Collects** data (RSS feeds, CSVs, URLs)
2. **Analyzes** relevance and trends
3. **Generates** polished content via LLM
4. **Delivers** results to your inbox

The script runs on your machine. You own it. No vendor lock-in, no subscriptions, no accounts to manage.

### Available Pipelines

| Pipeline | Status | What It Does |
|----------|--------|-------------|
| **INDUSTRY RADAR** | ✅ Active | Monitors RSS feeds → scores relevance → generates briefings + post drafts |
| **KPI STORYTELLER** | 🔜 Coming Soon | Ingests CSV/Sheets data → detects trends → writes narrative reports |
| **CONTENT RECYCLER** | 🔜 Coming Soon | Takes long-form content → extracts ideas → generates multi-format series |

---

## How It Works

### Two Modes

**Relay Mode (Default):** Your script calls ShapeNeural's API for content generation and email delivery. No API keys needed — just your email address.

**Self-Hosted Mode:** You provide your own LLM API key and email credentials. Full independence, no external dependencies.

Both modes produce identical output. You can switch between them at any time by editing `main.py`.

---

## Using the Wizard (Recommended)

1. Go to [shapeneural.com/forge](https://shapeneural.com/forge)
2. Select a pipeline (currently: Industry Radar)
3. Configure your industry, focus, and voice
4. Choose delivery mode (relay or self-hosted)
5. Enter your email address
6. Click FORGE — the wizard researches sources, generates a sample, and builds your package
7. Download `main.py` and `README.md`
8. Follow the activation steps in the wizard or the downloaded README

---

## Manual Setup (Without Wizard)

If you want to set up AUTOFORGE without using the wizard:

### Step 1 — Get the Script

Clone or download the script template. The wizard generates customized versions, but you can also create `main.py` manually with the correct structure.

### Step 2 — Install Dependencies

```bash
# Create a virtual environment (recommended)
python3 -m venv .venv
source .venv/bin/activate        # Mac/Linux
# .venv\Scripts\activate          # Windows

# Install dependencies
pip install requests feedparser   # For Industry Radar
# pip install requests            # For KPI Storyteller
# pip install requests beautifulsoup4  # For Content Recycler
```

### Step 3 — Configure main.py

Open `main.py` and edit the CONFIGURATION section at the top:

```python
# ─── YOUR PIPELINE ───────────────────────────────────────
INDUSTRY = "B2B SaaS"                    # Your industry
FOCUS = "AI, automation, marketing"      # Key topics to track
VOICE = "concise, opinionated, no fluff" # Content style
FREQUENCY = "Weekly"                     # For reference

# ─── RSS SOURCES ─────────────────────────────────────────
SOURCES = [
    {"name": "TechCrunch", "feed_url": "https://techcrunch.com/feed/", "description": "Tech news"},
    # Add more RSS feeds relevant to your industry
]
```

### Step 4 — Choose Delivery Mode

See [Delivery Options](#delivery-options) below.

### Step 5 — Choose LLM Provider

See [LLM Provider Options](#llm-provider-options) below.

### Step 6 — Run

```bash
python main.py
```

### Step 7 — Schedule

See [Scheduling](#scheduling) below.

---

## Configuration Reference

All configuration lives at the top of `main.py`. No `.env` files, no external config.

| Variable | Description | Example |
|----------|-------------|---------|
| `INDUSTRY` | Your industry/niche | `"B2B SaaS"` |
| `FOCUS` | Key topics to monitor | `"AI, automation, privacy"` |
| `VOICE` | Writing style instruction | `"concise, opinionated, no fluff"` |
| `FREQUENCY` | Cadence (for reference) | `"Weekly"` |
| `SOURCES` | JSON array of RSS feeds | See above |
| `EMAIL_MODE` | `"relay"`, `"smtp"`, `"resend"`, or `"local"` | `"relay"` |
| `LLM_MODE` | `"relay"` or `"direct"` | `"relay"` |

---

## Delivery Options

### Option 1: Relay (Default)

ShapeNeural handles email delivery. No credentials needed.

```python
EMAIL_MODE = "relay"
USER_EMAIL = "you@example.com"    # Where results go
```

### Option 2: SMTP (Self-Hosted)

Use your own email provider's SMTP server.

```python
EMAIL_MODE = "smtp"
SMTP_HOST = "smtp.gmail.com"      # Your provider's SMTP server
SMTP_PORT = 587                   # Usually 587 (TLS) or 465 (SSL)
SMTP_USER = "you@gmail.com"      # Your email address
SMTP_PASS = "xxxx xxxx xxxx xxxx" # App password (NOT your login password)
SEND_TO = "you@gmail.com"        # Destination address
```

#### Common SMTP Providers

| Provider | SMTP Server | Port | Notes |
|----------|------------|------|-------|
| **Gmail** | `smtp.gmail.com` | 587 | Requires [App Password](https://myaccount.google.com/apppasswords) — enable 2FA first |
| **Outlook/Office 365** | `smtp.office365.com` | 587 | Use regular password or App Password |
| **Yahoo** | `smtp.mail.yahoo.com` | 587 | Requires [App Password](https://login.yahoo.com/account/security) |
| **Fastmail** | `smtp.fastmail.com` | 587 | Requires App Password |
| **ProtonMail** | Requires ProtonMail Bridge | 1025 | Local bridge must be running |
| **Namecheap Private Email** | `mail.privateemail.com` | 587 | Use your mailbox credentials |

> **Gmail Users:** You must create an App Password, not use your regular login password. Go to [Google Account → Security → App Passwords](https://myaccount.google.com/apppasswords). This requires 2-Factor Authentication to be enabled.

### Option 3: Resend API

A modern email API. Free tier: 100 emails/day.

```python
EMAIL_MODE = "resend"
RESEND_API_KEY = "re_xxxxx"       # Get one at https://resend.com
RESEND_FROM = "you@yourdomain.com" # Must be verified in Resend
SEND_TO = "you@gmail.com"         # Destination
```

### Option 4: Local File Only

Save output to a file instead of sending email.

```python
EMAIL_MODE = "local"
# Output saved as output_YYYYMMDD_HHMMSS.md
```

---

## LLM Provider Options

### Option 1: Relay (Default)

Content generation runs through ShapeNeural's API. No key needed.

```python
LLM_MODE = "relay"
RELAY_URL = "https://shapeneural.com/api"
```

### Option 2: Direct API (Self-Hosted)

Use your own LLM API key. The script uses `MiniMax-M2.5` by default.

```python
LLM_MODE = "direct"
LLM_API_KEY = "your-api-key-here"
LLM_BASE_URL = "https://api.minimax.io/v1"
LLM_MODEL = "MiniMax-M2.5"
```

#### Supported LLM Providers

| Provider | Base URL | Model | Cost per Run |
|----------|----------|-------|-------------|
| **MiniMax** (recommended) | `https://api.minimax.io/v1` | `MiniMax-M2.5` | ~$0.003 |
| **OpenAI** | `https://api.openai.com/v1` | `gpt-4o-mini` | ~$0.01 |
| **OpenRouter** | `https://openrouter.ai/api/v1` | Various | Varies |

Any OpenAI-compatible API works. Just change `LLM_BASE_URL` and `LLM_MODEL`.

> **Note:** The relay currently uses `MiniMax-M2.5` as the underlying model.

---

## Scheduling

The script runs once when executed. To make it fully automatic, set up a recurring schedule on your machine.

### Mac / Linux — Cron

**Set up (one-liner):**
```bash
# Weekly (Monday 8 AM) — adjust the path
(crontab -l 2>/dev/null; echo "0 8 * * 1 cd ~/Desktop/autoforge && .venv/bin/python main.py >> autoforge.log 2>&1") | crontab -
```

**Common schedules:**
```
0 8 * * *    # Daily at 8:00 AM
0 8 * * 1    # Weekly, Monday at 8:00 AM
0 8 1 * *    # Monthly, 1st day at 8:00 AM
```

**Verify:**
```bash
crontab -l
```

### Windows — Task Scheduler

1. Press `Win+R`, type `taskschd.msc`, press Enter
2. Click **Create Basic Task** in the right panel
3. Name: `AUTOFORGE`, click Next
4. Trigger: Choose your frequency (Daily/Weekly/Monthly), set time, click Next
5. Action: **Start a Program**
6. Program: `C:\Users\YourName\Desktop\autoforge\.venv\Scripts\python.exe`
7. Arguments: `main.py`
8. Start in: `C:\Users\YourName\Desktop\autoforge`
9. Click Finish

---

## Deactivating a Schedule

### Mac / Linux — Remove from Cron

```bash
# Edit crontab and delete the AUTOFORGE line:
crontab -e

# Or list first, then remove:
crontab -l                  # See all jobs
crontab -l | grep -v "autoforge" | crontab -   # Remove only AUTOFORGE

# Nuclear option — removes ALL cron jobs:
crontab -r
```

### Windows — Remove from Task Scheduler

1. Press `Win+R`, type `taskschd.msc`, press Enter
2. In **Task Scheduler Library**, find `AUTOFORGE`
3. Right-click → **Delete** (permanent) or **Disable** (pause without deleting)

### Verify It's Stopped

**Mac/Linux:**
```bash
crontab -l | grep autoforge
# If no output, it's removed
```

**Windows:**
Check Task Scheduler Library — the task should be gone or show "Disabled" status.

---

## Customization

### Changing Voice/Style

Edit the `VOICE` variable in `main.py`:

```python
VOICE = "concise, opinionated, no fluff — every sentence earns its place"
```

Available presets from the wizard:
- `"concise, opinionated, no fluff — every sentence earns its place"` (Sharp & Direct)
- `"data-driven, nuanced, balanced — builds credibility through evidence"` (Analytical & Measured)
- `"contrarian, challenges assumptions, strong takes — stops the scroll"` (Bold & Provocative)
- `"approachable, teaches through examples, builds understanding step by step"` (Warm & Educational)

### Editing Prompts

The LLM prompts are in the `STAGE 3: GENERATE` section of `main.py`. Edit them freely to change the output format, add sections, or adjust tone.

### Adding/Removing RSS Sources

Edit the `SOURCES` array in `main.py`:

```python
SOURCES = [
    {"name": "Source Name", "feed_url": "https://example.com/feed/", "description": "What it covers"},
    # Add more...
]
```

---

## Architecture

```
┌──────────────────────────────────────┐
│         YOUR MACHINE                 │
│                                      │
│  main.py                             │
│  ├─ COLLECT  (RSS/CSV/URL)           │
│  ├─ ANALYZE  (scoring/trends)        │
│  ├─ GENERATE (LLM call)  ──────┐    │
│  └─ DELIVER  (email)     ──┐   │    │
│                             │   │    │
└─────────────────────────────┼───┼────┘
                              │   │
          ┌───────────────────┼───┼────────────────┐
          │  RELAY MODE       │   │                 │
          │                   ▼   ▼                 │
          │  shapeneural.com/api                    │
          │  ├─ forge-generate (MiniMax-M2.5)       │
          │  └─ forge-deliver  (SMTP relay)         │
          └─────────────────────────────────────────┘

          ┌─────────────────────────────────────────┐
          │  SELF-HOSTED MODE                       │
          │                   │   │                 │
          │  Your LLM API  ◄─┘   └─► Your SMTP     │
          │  (MiniMax/OpenAI)      (Gmail/Resend)   │
          └─────────────────────────────────────────┘
```

### Server-Side Endpoints (Relay Mode)

| Endpoint | Purpose | Rate Limit |
|----------|---------|-----------|
| `/api/forge-research` | Discovers RSS feeds for your industry (OpenAI GPT-4.1) | 5/min |
| `/api/forge-sample` | Generates proof-of-value preview (MiniMax) | 10/min |
| `/api/forge-generate` | LLM proxy for scripts (MiniMax-Text-01) | 5/min |
| `/api/forge-deliver` | SMTP relay for script email delivery | 3/min |

### Privacy

- Your email address is embedded in `main.py` only — never stored on our servers
- API calls are rate-limited but not logged beyond basic diagnostics
- In self-hosted mode, no data touches our infrastructure

---

## Troubleshooting

| Problem | Solution |
|---------|---------|
| `pip install` fails with "externally managed" | Use a virtual environment: `python3 -m venv .venv && source .venv/bin/activate` |
| `ModuleNotFoundError: feedparser` | Run `pip install feedparser` inside your venv |
| SMTP authentication failed | Use an App Password, not your login password (see [Delivery Options](#delivery-options)) |
| Relay error / 429 | Rate limited — wait 60 seconds and try again |
| Relay error / 402 | Service budget exceeded — switch to self-hosted mode |
| Cron not running | Check path — use absolute paths in crontab, and reference `.venv/bin/python` |
| Task Scheduler not running | Verify "Start in" directory is correct and Python path is absolute |
| Empty output / `[No API key]` | In direct mode: add your `LLM_API_KEY`. In relay mode: check your internet connection |
| Script runs but no email | Check `EMAIL_MODE` and credentials. Set `EMAIL_MODE = "local"` to test output without email |

---

## Uninstall

1. **Remove the schedule** (see [Deactivating a Schedule](#deactivating-a-schedule))
2. **Delete the folder** containing `main.py` and `.venv`
3. **Optionally remove packages:** `pip uninstall requests feedparser`

No background processes, no services, no accounts to close.

---

## Tech Stack

- **Frontend:** React + Vite + TypeScript + Tailwind CSS
- **Backend:** Vercel Serverless Functions
- **LLM (Relay):** MiniMax-Text-01
- **LLM (Research):** OpenAI GPT-4.1 with web search
- **Email (Relay):** Namecheap Private Email SMTP

---

Built with AUTOFORGE by [ShapeNeural Labs](https://shapeneural.com) — designed intelligence
