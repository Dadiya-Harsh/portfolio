# Autonomous AI Video Generation Pipelines

## Executive Summary
Engineered a fully autonomous AI video production pipeline that generates complete, rendered MP4s from raw concepts. By orchestrating specialized Claude AI agents via Model Context Protocol (MCP) servers and Remotion, the system eliminates manual handoffs while maintaining strict quality control through structured human-in-the-loop review checkpoints.

## The Problem
Producing high-quality video content typically requires disjointed manual handoffs between scriptwriters, voiceover artists, media researchers, and video editors. While AI tools exist for each of these isolated steps, chaining them together usually results in non-deterministic, hallucinatory outputs. The business needed a way to rapidly scale video production with reusable brand styling and target durations, *without* surrendering final creative control to a black-box AI logic.

## System Architecture

![AI Video Generation Automation Flow](/images/video_pipeline_flow.png)

The pipeline is driven by Claude Code and a central orchestration worker that evaluates session state, submits prompt templates, updates queues, and explicitly manages review pause/resume behavior.

### 1. The Orchestrator
A Python worker operates as the brain, initializing discrete Claude sessions for stage-specific agent skills. It passes structured context between sessions to maintain persistent memory while preventing individual agents from hallucinating outside their mandated scope.

### 2. The Agent Pipeline
The system chains specialized agent skills sequentially:
- **`video-hook-script-creator`**: Plans the video structure, breaking the narrative into micro-clips (hook, body clips, and ending).
- **`audio-generation`**: Synthesizes human-like voiceovers for narration segments.
- **`media-asset-curator` / `generator`**: Analyzes the script and dynamically pulls stock media or generates custom visuals.
- **`video-generator`**: Outputs raw Remotion React source code, compiling the assets and audio into a programmable video timeline.

### 3. Tooling via MCP Servers
Agents interact securely with external services through localized Model Context Protocol (MCP) servers. The pipeline utilizes custom MCPs to standardize agent access to **ElevenLabs** (voiceover), **Pexels** (stock media), **Leonardo-AI** (generated imagery), and **Mapbox** (mapping data).

---

## Technical Hurdles & Trade-offs

### Challenge 1: AI Hallucination vs Deterministic Rendering
**The Hurdle:** Video compilation requires exact mathematically-bound frame timings, but large language models struggle with absolute spatial logic and timecodes.
**The Fix:** We forced the `video-generator` agent to output strictly structured Remotion React code using local asset references (`staticFile()`). By moving the final video composition off the AI and onto a fully deterministic React render engine, we eliminated hallucinated cuts and desynced audio.

### Challenge 2: The "Human-in-the-Loop" State Machine
**The Hurdle:** End-to-end AI generation takes significant time and API credits. If the initial script is flawed, the entire downstream render is wasted.
**The Fix:** I engineered a pause/resume asynchronous queuing architecture. The pipeline explicitly halts after Scripting, Media Sourcing, and Code Generation phases. A reviewer can inspect the state, reject the step to route it back to the agent for fixing, or approve it to automatically resume the downstream pipeline.

### Challenge 3: Ephemeral Asset Management & Timeouts
**The Hurdle:** AI agents passing raw CDN URLs directly into a video renderer frequently causes network timeouts during the rendering phase.
**The Fix:** Built custom local asset handlers into the workflow. The pipeline explicitly downloads AI-generated audio and external stock media to the local disk during the orchestration phase, ensuring perfectly reliable Remotion builds without network panic errors.

---

## Results & Impact

- **End-to-End Automation:** Replaced multi-tool manual workflows with an autonomous agent graph spanning concept to MP4.
- **Reusable Architecture:** Supported parameterized channel configurations for repeatable brand styling and target duration enforcement.
- **Self-Healing Code:** The inclusion of a `video-review-fixer` agent enabled the system to inspect and repair broken Remotion code syntax automatically before hitting the final render block.

### Tech Stack
| Layer | Technology |
|-------|-----------|
| **AI Orchestration** | Claude Code, Agent Instruction Files |
| **Video Rendering** | Remotion (React Library), Node |
| **Infrastructure** | Python, Docker |
| **MCP Servers** | ElevenLabs, Pexels, Leonardo-AI, Mapbox |
