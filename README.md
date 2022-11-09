# Style Extractor - WIP

Extract all inline CSS from your HTML generating a css file using two strategies:

- scoped
  - For each inline style attribute found it will generate a unique class with the whole value.
- atomic
  - For each css declaration found it will create a unique class and reuse the class on all elements that also have the same css declaration value.


@TODOS

- [ ] Write a better documentation with practical examples etc...
- [ ] deploy a stable version