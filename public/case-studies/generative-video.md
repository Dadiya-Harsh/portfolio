# Autonomous AI Video Generation Pipelines

## Overview
I built an AI video production pipeline that takes a concept and produces a rendered MP4. Specialized Claude agents use Model Context Protocol (MCP) servers for their tools, and Remotion renders the video. It cuts out most of the manual handoffs, and a person reviews the work at set checkpoints before it moves on.

## The Problem
Producing high-quality video content typically requires disjointed manual handoffs between scriptwriters, voiceover artists, media researchers, and video editors. AI tools exist for each of these steps, but chaining them together tends to give unpredictable output. The goal was to produce videos faster, with reusable brand styling and target durations, *without* handing final creative control over to a black box.

## System Architecture

![AI Video Generation Automation Flow](/images/video_pipeline_flow.png)

The pipeline is driven by Claude Code and a central orchestration worker. The worker checks session state, submits prompt templates, updates queues, and handles pausing and resuming for reviews.

### 1. The Orchestrator
A Python worker acts as the orchestrator. It starts a separate Claude session for each stage-specific agent skill and passes structured context between sessions, so each agent only sees what it needs and stays focused on its own stage.

### 2. The Agent Pipeline
The system chains specialized agent skills sequentially:
- **`video-hook-script-creator`**: Plans the video structure, breaking the narrative into micro-clips (hook, body clips, and ending).
- **`audio-generation`**: Synthesizes human-like voiceovers for narration segments.
- **`media-asset-curator` / `generator`**: Analyzes the script and dynamically pulls stock media or generates custom visuals.
- **`video-generator`**: Outputs raw Remotion React source code, compiling the assets and audio into a programmable video timeline.

### 3. Tooling via MCP Servers
Agents reach external services through local Model Context Protocol (MCP) servers. I used custom MCPs so every agent accesses **ElevenLabs** (voiceover), **Pexels** (stock media), **Leonardo-AI** (generated imagery), and **Mapbox** (mapping data) in the same way.

---

## What Was Hard

### Challenge 1: AI Hallucination vs Deterministic Rendering
**The Hurdle:** Video needs exact frame timings, and language models aren't good at precise timecodes and layout.
**The Fix:** I had the `video-generator` agent output structured Remotion React code that uses local asset references (`staticFile()`). That moves the final composition out of the model's hands and into Remotion's deterministic render engine, which cuts down on bad cuts and audio that drifts out of sync.

### Challenge 2: The "Human-in-the-Loop" State Machine
**The Hurdle:** Generating a video end to end takes a lot of time and API credits. If the first script is flawed, everything downstream is wasted.
**The Fix:** I built a pause/resume async queue. The pipeline stops after the Scripting, Media Sourcing, and Code Generation phases. A reviewer can inspect the state, reject the step to route it back to the agent for fixing, or approve it to automatically resume the downstream pipeline.

### Challenge 3: Ephemeral Asset Management & Timeouts
**The Hurdle:** When agents pass raw CDN URLs straight into the video renderer, network timeouts can happen during rendering.
**The Fix:** I added local asset handling to the workflow. During orchestration, the pipeline downloads the generated audio and the stock media to local disk first, so Remotion builds don't depend on the network.

---

## Where It Ended Up

- **End-to-end automation:** One agent pipeline now covers the whole path from concept to MP4, instead of several tools with manual handoffs.
- **Reusable setup:** Channel configurations are parameterized, so brand styling and target duration are repeatable.
- **Code fixing:** A `video-review-fixer` agent checks the generated Remotion code and tries to fix syntax errors before the final render.

### Tech Stack
| Layer | Technology |
|-------|-----------|
| **AI Orchestration** | Claude Code, Agent Instruction Files |
| **Video Rendering** | Remotion (React Library), Node |
| **Infrastructure** | Python, Docker |
| **MCP Servers** | ElevenLabs, Pexels, Leonardo-AI, Mapbox |
