# SoundCat

SoundCat is a privacy-focused music client built around a configurable SoundCloud API key and local audio files. It aims to let you browse, organize, and play music without relying on a heavy server-side stack. The project is intentionally almost entirely client-side and is still in a very early beta stage.

## What it does

- Uses a configurable SoundCloud API key for streaming and metadata access.
- Lets you import local sound files from your machine.
- Helps you compartmentalize your music into distinct collections or categories.
- Keeps the app mostly in the browser, reducing server dependence and centralization.
- Focuses on privacy and user control rather than a big closed platform experience.

## Why it exists

SoundCat is designed for people who want a Spotify-like listening experience without depending on a large, centralized music service that requires active internet. Instead of locking everything into a proprietary platform, SoundCat keeps the core experience local and configurable.

## Privacy goals

- Minimal server-side logic.
- User-controlled SoundCloud API configuration.
- Local audio imports with easy organization.
- Client-side-first architecture.

This means the app can be used as a lightweight music client while keeping most of the logic in the browser.

## Current status

This project is very early beta. Expect rough edges, changing APIs, and incomplete features as the app evolves.

## Notes

SoundCat is not a finished product yet. It is best understood as a personal music client prototype that emphasizes:

- privacy
- local-file playback
- simple organization
- configurability
- a client-side-first approach

## Getting started

1. Clone the repo.
2. Install dependencies.
3. Configure your SoundCloud API key.
4. Import local sound files.
5. Organize them into compartments and start listening.

## Disclaimer

This is an early-stage project and should be treated as experimental software. It may change significantly over time.

## Future Goals 
- 2FA
- Centralized Storage (Currently does not save across same account, different devices)
- Dynamic Genre Sort on local file import
