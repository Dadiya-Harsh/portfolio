# Real-Time Voice Agent for Phone Calls

## Overview
I built a voice agent that takes real phone calls and talks back in real time. Instead of a menu where you press 1 for support, the caller just talks, can cut in whenever they want, and the agent can look up and update CRM data during the call. It's running in production with real callers.

## The Problem
Most phone systems still work in turns. You press a button or wait for a beep, then the system answers. Even newer voice bots tend to feel slow, and they don't know much about who is calling or what they need. The harder part was getting a voice agent to actually do things: hook into the live CRM and check or update records while the caller is still on the line.

## System Architecture

![Voice Agent Architecture](/images/voice_agent_architect.png)

I built it around one persistent WebSocket per call instead of the usual request and response over HTTP, so audio can flow both ways at the same time.

### 1. Getting the call in
Twilio is the entry point. When a call comes in, it sends a signed webhook to my FastAPI server. The server checks the signature, sets up the session for that caller, and opens a WebSocket. Twilio Media Streams then sends the caller's audio over that WebSocket as a continuous stream. The audio arrives as μ-law, so I convert it to PCM16 before passing it on.

### 2. Understanding the caller
The audio goes to the OpenAI Realtime API, so there's no separate speech-to-text step to wait on. Server-side voice activity detection (VAD) works out when the caller has stopped talking, and the Realtime API handles figuring out what they want and what to do about it.

### 3. Talking to the CRM
When the agent needs to do something, like checking an order status or validating an account, it calls a tool. The tool makes a direct async call to the CRM API, and the result goes straight back to the agent so it can carry on the conversation.

### 4. Sending the answer back
The agent's reply comes back as audio. I convert it from PCM16 back to μ-law and stream it out over the same WebSocket, so the caller hears it as it's generated.

---

## What Was Hard

### Choppy audio
**The problem:** With the default Python `asyncio` event loop, the audio came out choppy when the server was handling continuous streams of bytes.
**What I did:** I switched the server to run Uvicorn with `uvloop`, a faster drop-in event loop. That fixed the stutter.

### Letting callers interrupt
**The problem:** If the agent is in the middle of a long sentence and the caller says "stop, wait", the agent has to stop talking right away, without breaking the call.
**What I did:** When voice activity shows up while the agent is speaking, I stop playback and clear any audio that was still waiting to be played, so the caller isn't talking over a queue of old audio.

### Keeping session state in one place
**The problem:** Call state (variables, auth tokens, conversation history) can't just live in one server's memory once calls are spread across several servers. It leads to race conditions.
**What I did:** I moved the live state to **Redis**, so any server can pick up a call. It's also synced to **PostgreSQL**, which keeps the permanent record for logging.

---

## Where It Ended Up

- It's running in production with real callers.
- Callers can interrupt the agent mid-sentence without breaking the call.
- The agent checks and updates CRM data while the call is still going.
- Call state lives in Redis, so it holds up when calls are load balanced across servers.

### Tech Stack
| Layer | Technology |
|-------|-----------|
| **AI** | OpenAI Realtime API, server-side VAD |
| **API & Streaming** | FastAPI, WebSockets, Uvicorn (uvloop) |
| **Data** | Redis, PostgreSQL |
| **Integration** | Twilio Media Streams, CRM APIs |
