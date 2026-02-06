export const snippets = {
  mermaid: "```mermaid\ngraph TD;\n    A[Node 1] --> B{Decision};\n    B -- Yes --> C[Result 1];\n    B -- No --> D[Result 2];\n```",
  math: "$$\nE = mc^2\n$$",
  flexbox: "<div style=\"display: flex; gap: 15px; justify-content: center; align-items: center; border: 1px dashed #ccc; padding: 10px;\">\n    <div>Box 1</div>\n    <div>Box 2</div>\n    <div>Box 3</div>\n</div>",
  grid: "<div style=\"display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; border: 1px dashed #ccc; padding: 10px;\">\n    <div>Cell 1</div>\n    <div>Cell 2</div>\n    <div>Cell 3</div>\n</div>",
  details: "<details style=\"border: 1px solid #aaa; border-radius: 4px; padding: .5em .5em 0;\">\n    <summary style=\"font-weight: bold; margin: -.5em -.5em 0; padding: .5em; cursor: pointer;\">Details</summary>\n    <div style=\"padding: .5em;\">...</div>\n</details>",
  admonition: ":::tip\n{content}\n:::",
  toc: "[[toc]]",
  deflist: "Term\n: Definition",
  kbd: "<kbd>Ctrl</kbd> + <kbd>C</kbd>",
  progress: "<progress value=\"70\" max=\"100\">70%</progress>"
};