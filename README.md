# MPyC Web [![MPyC logo](https://raw.githubusercontent.com/lschoe/mpyc/master/images/MPyC_Logo.svg)](https://github.com/lschoe/mpyc)

MPyC Web is a port of the [MPyC](https://github.com/lschoe/mpyc) Python framework for Web Browsers.
It uses:
- [PyScript](github.com/pyscript/pyscript) for running Python code in the browser via [WebAssembly](https://webassembly.org/)
-   [PeerJS](https://github.com/peers/peerjs) for peer-to-peer connections via [WebRTC](https://webrtc.org/)


## Demo:

- Stable - https://e-nikolov.github.io/mpyc-web
- Test - https://e-nikolov.github.io/mpyc-test


## Development

1. Install nix
   1. MacOS or Linux with Systemd - https://github.com/DeterminateSystems/nix-installer/
   2. Linux without Systemd - https://nixos.org/download.html
2. Start a development shell with all necessary tools - `nix develop --impure`
3. Install the JavaScript dependencies - `yarn install`
4. Build the project as a static website - `yarn build`
5. Start a development server - `yarn dev`
