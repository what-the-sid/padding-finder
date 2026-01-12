# Padding Finder

A TypeScript utility to analyze consistency of zero-padding in arrays of numeric strings.

## Installation

```bash
npm install
```

## Usage

You can run the padding checker against a file containing line-separated JSON arrays:

```bash
# General usage
npm run check <path/to/file>

# Example
npm run check test.txt
```

### Input Format
The input file should contain valid JSON arrays of strings, one per line:
```json
["001", "002"]
["10", "11"]
```

## Logic

The core logic resides in `checkNumberPadding`. It returns an integer status code:

| Return Value | Meaning | Example |
| :--- | :--- | :--- |
| **> 0** | Consistent **Padding Length** | `["01", "02"]` -> `2` |
| **< 0** | Consistent **Unpadded** (Negative of shortest length) | `["1", "12"]` -> `-1` |
| **0** | Empty Input | `[]` -> `0` |
| **-1** | **Inconsistent** (Mixed widths or unpadded overflow) | `["01", "002"]` -> `-1` |
