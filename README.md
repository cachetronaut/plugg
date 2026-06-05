# Plugg

Neutral authentication port for agent-fabric primitives: resolves opaque credentials into fabric principals without vendor identity leakage.

Plugg is a primitive with TypeScript and Python implementations maintained in one public repository. The shared repo keeps the public contract, fixtures, issues, and release history aligned across languages.

## Packages

- npm: `@cachetronaut/plugg`
- PyPI: `plugg`

## Repository Layout

- `ts/` - TypeScript implementation and npm package.
- `py/` - Python implementation and PyPI package.
- `fixtures/` - Shared conformance and parity fixtures when the primitive needs them.

## Package Documentation

- TypeScript package notes: [ts/README.md](ts/README.md)
- Python package notes: [py/README.md](py/README.md)

## License

MIT
