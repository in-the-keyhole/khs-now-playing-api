# khs-now-playing-api

This repository contains a VSCode Remote Container Setup for developing an Apollo GraphQL in NodeJS/TypeScript. It contains configuration for running.

## Visual Studio Code - Remote Container Usage

> [Official Documentation](https://code.visualstudio.com/docs/remote/containers)

> _Note: Once you meet the prerequisites, you can run **ANY** Visual Studio Code Remote Container, which provides a Docker based development environment ensuring a consistent and reliable set of tooling needed to interact and execute a repository codebase_

### Prerequisites:

1. macOS, Windows, Linux -- [System Requirements](https://code.visualstudio.com/docs/remote/containers#_system-requirements)
2. Docker - [Documentation](https://code.visualstudio.com/docs/remote/containers#_installation)
3. Visual Studio Code - [Official Site](https://code.visualstudio.com/)
4. Remote - Containers _Visual Studio Code extension_ - [Marketplace](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)

#### Environment Variables

The remote container honors the following environment variables set in the .devcontainer/.env

> _Note: You can copy the .devcontainer/.env.template file to .devcontainer/.env and supply the following variables_

##### Rest API (TMDB=The Movie Database)

- TMDB_BASE_URL
- TMDB_API_KEY

> _Note: Changes to variables in .env after the container is running will require the Remote Container to be restarted_

#### Developer Configuration

To initialize the environment, once the repository is opened in the Remote Container, open a Terminal and type:

`yarn`

### Usage & Things you can do

#### package.json Scripts

#### Debugging - Local

All of the package.json scripts defined above can be run in a 'JavaScript Debug Terminal' which automatically attaches the debugger.
