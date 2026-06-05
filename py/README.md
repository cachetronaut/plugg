# plugg

Python implementation of Plugg.

For product-level context, shared contracts, and cross-language repository information, see the public repository: https://github.com/cachetronaut/plugg.

## Install

```sh
pip install plugg
```

## Import

```python
import plugg
```

## Development

Run from `py/`:

```sh
uv sync --dev
uv run --with ruff ruff check .
uv run --with ruff ruff format --check .
uv run --with ty ty check
uv run --with pytest --with pytest-asyncio python -m pytest
```

## License

MIT
