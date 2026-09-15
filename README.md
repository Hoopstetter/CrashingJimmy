# Crash'n Jimmy

A single-file browser game featuring three downhill runs: Big Bear snowboarding,
Orange County mountain biking, and SoCal longboarding.

## Play

Open <https://hoopstetter.github.io/CrashingJimmy/> on a phone or desktop browser.

### Controls

| Action | Touch | Keyboard |
| --- | --- | --- |
| Brake | BRAKE | A, S, Left Arrow, or Down Arrow |
| Jump / air trick | JUMP | W, Space, or Up Arrow |
| Send it | SEND IT | D or Right Arrow |

## Development

The deployed game is `index.html`. GitHub Pages serves the root of the `main`
branch. The welcome/share artwork is embedded in the HTML so the game remains a
portable single-file build.

Before committing, run:

```bash
npm test
```

Use descriptive commit messages that identify the gameplay, visual, or maintenance
change. Update `BUILD_VERSION` whenever a build is prepared for deployment.
