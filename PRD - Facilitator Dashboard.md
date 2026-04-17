# PRD: Workshop Facilitator Dashboard

## Overview

A local web app that serves as Jay's personal "cockpit" during the 2-day Vibe Coding Workshop (18-19 April 2026). This is NOT shown to attendees — it runs on Jay's laptop/tablet as a private reference tool. He glances at it throughout the day to know: what's happening now, what to say, what to prepare, what to watch out for.

## Tech Stack

- **Next.js** (App Router)
- **Tailwind CSS** for styling
- **No database needed** — all data is hardcoded in the app
- **No authentication** — it's a local tool
- Runs on `localhost:3000`

## Core Features

### 1. Session Timeline (Main View)

The main screen shows the full day's schedule as a vertical timeline. Each session is a card.

**Each session card shows:**
- Session number and title (e.g., "SESSION 3: Build Session 1 — Your First App")
- Time range and duration (e.g., "10:20 – 12:30 (130 min)")
- A colored status indicator:
  - Gray = upcoming
  - Blue/pulsing = currently active (based on real clock time)
  - Green = completed
- Clicking/tapping a card expands it to show full details (or navigates to a detail view)

**Navigation:**
- Toggle between Day 1 and Day 2 with tabs at the top
- Current session auto-scrolls into view on page load
- A sticky header shows: current time, current session name, and time remaining in current session

### 2. Session Detail View

When a session card is expanded or tapped, show ALL of the following in organized, collapsible sections:

#### a) Schedule Table
The time-blocked activities within the session. Example:
| Time | Activity | Details |
|------|----------|---------|
| 10:20-10:35 | Project setup | Jay on screen, everyone follows... |

#### b) Slides Needed
Bulleted list of slides for this session. Checkbox-style so Jay can mentally tick them off.

#### c) Materials
What needs to be ready/shared for this session.

#### d) Facilitator Notes
The amber-colored facilitator tips. These should be prominent — they're what Jay reads most.

#### e) Friction Prevention (⚡)
The PREPARE / SAY / DO items. Color-code them:
- **PREPARE** items = blue (things to have ready before the session)
- **SAY** items = green (exact words/scripts to say out loud)  
- **DO** items = orange (actions to take at specific moments during the session)

This is the MOST IMPORTANT section. Make it visually distinct and easy to scan at a glance.

### 3. Live Timer

A persistent timer widget (sticky, bottom-right or top bar) showing:
- Current session name
- Time elapsed in current session
- Time remaining in current session
- A progress bar
- Subtle color change when <5 minutes remaining (yellow) and <1 minute (red)

The timer auto-advances based on the system clock. It uses the hardcoded schedule times to determine which session is active.

### 4. Quick Notes / Checklist

A simple checklist overlay or sidebar for Day-of tasks:
- Pre-workshop checklist items (arrive 7:30, test projector, etc.)
- Per-session micro-tasks Jay can check off (e.g., "Posted screenshot in WhatsApp", "Identified 5-6 showcase students")

These don't need to persist between page reloads (in-memory state is fine).

### 5. "What's Next" Preview

Below the current session, always show a preview of the NEXT session — just the title, time, and the first 2-3 friction prevention items. This way Jay can mentally prepare for what's coming without scrolling.

## Data Source

All workshop data should be structured in a single data file (e.g., `data/workshop.ts`). This file contains:

```typescript
type Session = {
  id: number;
  day: 1 | 2;
  title: string;
  subtitle?: string; // e.g., "Build Session 1"
  startTime: string; // "10:20"
  endTime: string; // "12:30"
  duration: string; // "130 min"
  type: 'session' | 'break' | 'lunch';
  schedule: {
    time: string;
    activity: string;
    details: string;
  }[];
  slides: string[];
  materials: string[];
  facilitatorNotes: string[];
  frictionPrevention: {
    type: 'prepare' | 'say' | 'do';
    text: string;
    timing?: string; // e.g., "before first prompt", "5 min mark"
  }[];
};
```

I will provide the complete data to populate this file — it comes directly from the Workshop Run Sheet markdown document located at:
`/sessions/practical-kind-cray/mnt/Vibe Coding Webinar/Workshop Deliverables/Workshop Run Sheet - 18-19 April 2026.md`

**IMPORTANT:** When building this app, read the Workshop Run Sheet markdown file and extract ALL session data from it to populate the data file. Every session (1-13), every break, every lunch, every facilitator note, every friction prevention item must be included. Do not fabricate or summarize — use the exact content from the run sheet.

## Design Requirements

### Visual Style
- Dark theme (Jay will be in a bright room — dark screen is easier to glance at without drawing attention)
- Clean, minimal — no decorative elements
- High contrast text for readability at arm's length
- Large font for the "What to SAY" items (Jay might be reading these while standing)

### Color Coding (consistent throughout)
- **Blue** = slides / preparation items
- **Amber/Yellow** = facilitator notes / warnings
- **Orange** = friction prevention
- **Green** = completed / SAY scripts
- **Red** = time warnings (<5 min remaining)

### Responsive
- Should work well on both a laptop screen and an iPad (Jay might prop up a tablet)
- No mobile phone optimization needed

### Navigation
- Keyboard shortcuts:
  - `←` / `→` to navigate between sessions
  - `Space` to expand/collapse current session
  - `T` to toggle timer visibility
  - `D` to switch between Day 1 and Day 2

## Pages / Routes

```
/                → Redirect to /day/1
/day/1           → Day 1 timeline view
/day/2           → Day 2 timeline view
/session/[id]    → Full detail view for a specific session
```

## What This App is NOT

- NOT a presentation tool (attendees never see this)
- NOT connected to any external service
- NOT something that needs to be deployed (runs on localhost only)
- NOT a timer app — the timer is a secondary feature; the primary value is the organized, glanceable session content

## Priority Order

1. **Session data + detail view** (the core value — organized content)
2. **Day timeline with active session highlighting** (know where you are)
3. **Friction prevention section with color-coded PREPARE/SAY/DO** (the key differentiator from a PDF)
4. **Live timer** (nice to have, high utility)
5. **Keyboard shortcuts** (nice to have)
6. **Checklist** (nice to have)

## Workshop Date Reference

The workshop is on **Saturday 18 April 2026** (Day 1) and **Sunday 19 April 2026** (Day 2).
Both days run **9:00 AM – 6:00 PM**.

When calculating the timer and active session, use these dates + the session start/end times.
For development/testing purposes, also support a "demo mode" where the current time can be overridden (e.g., a URL param like `?time=10:30` or a debug slider) so Jay can test all sessions without waiting for the actual times.
