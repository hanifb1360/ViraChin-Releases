# ViraChin downloads

![ViraChin release artwork](artwork/virachin-release-hero-v1.png)

This repository contains the official public downloads and installation guidance for ViraChin. The application source is maintained separately in a private repository and is not published here.

Visit the [ViraChin website](https://hanifb1360.github.io/ViraChin-Releases/) for the product overview, screenshots, and download guidance.

ViraChin is an offline macOS utility that prepares editable Persian compatibility text for applications with deficient right-to-left layout, with Affinity Designer as its first validation target. It can also create transparent Persian title artwork using local fonts.

## Screenshots

### Editable compatibility text

![ViraChin editable compatibility mode](screenshots/virachin-editable-mode.png)

### Transparent-image title designer

![ViraChin transparent-image title designer](screenshots/virachin-transparent-image-mode.png)

## Download the macOS beta

The currently published [0.1.0 Beta](https://github.com/hanifb1360/ViraChin-Releases/releases/tag/v0.1.0-beta) is a historical build released under the previous **FarsiFix** name. Future releases will use the ViraChin name.

This free beta is ad-hoc signed but **not notarized by Apple**. macOS will identify its developer as unverified and block the first normal launch.

## Verify the historical beta download

Put the DMG and checksum in the same folder, open Terminal in that folder, and run:

```sh
shasum -a 256 -c FarsiFix_0.1.0_universal.dmg.sha256
```

The result must say `FarsiFix_0.1.0_universal.dmg: OK`.

## Install and open it

1. Open the DMG and drag the app into Applications.
2. In Applications, try to open it once. macOS will block this first attempt.
3. Open **System Settings → Privacy & Security**.
4. Scroll to the security section and select **Open Anyway** for the app.
5. Confirm **Open**. Later launches will work normally.

Apple documents this process in [Open a Mac app from an unidentified developer](https://support.apple.com/en-gb/102445). Managed work or school Macs may prevent this exception.

Do not disable Gatekeeper globally and do not use Terminal commands that remove quarantine protection.

## Privacy

ViraChin has no backend, account, analytics, or network-dependent conversion. Input text remains local and is not persisted. Clipboard access occurs only after the user presses a copy button.

## Important Affinity limitation

Each prepared visual-order line must fit inside the Affinity text frame without wrapping again. If Affinity moves a fragment to the bottom of the text, return to ViraChin, choose a shorter line length, and copy again.

## Artwork

Public product artwork is available in the [`artwork`](artwork) directory:

- Application icon in SVG and PNG formats
- Release hero artwork
- Repository social-preview artwork
- macOS DMG background and its high-resolution source

The core mark is the cream Persian `و` on an emerald rounded square. Do not redraw, rotate, stretch, or place other marks inside the icon.
