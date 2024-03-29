## Contributing

So you want to contribute to wordywordy? Cool beans!

To make this as easy as possible for you, here's some simple guidelines:

### Reporting issues

- All **issues** are **welcome**.
  - These include bug reports, questions, feature requests and enhancement
    proposals
  - [GitHub's issue tracker](https://github.com/sverweij/wordywordy/issues)
    is the easiest way to submit them.
- We prefer bug reports in **_steps taken_ - _expected_ - _found_** format.
  - that makes it more easy to reproduce it, and concoct a solution that fits
    your expectation.
  - If applicable, it is also nice when you provide
    - the **input** you used and
    - the **environment** (browser version/ os, or node.js version + os).
  - [template](./ISSUE_TEMPLATE.md)
- In turn, we try to **respond within a week**.  
  This might or might not include an actual code fix.

### Contributing code

- We prefer well documented
  **[pull requests](https://help.github.com/articles/creating-a-pull-request/)**
  based on the most recent version of the **develop** branch.
- Code quality
  - Additions pass eslint and depcruise (as configured for this repo)
  - Mocha tests prove your code does what it intends.
  - Your code does not introduce regressions - `make fullcheck` proves
    this.
  - Code style (you know, petty things like indentations, where brackets go,
    how variables & parameters are named) fits in with the current code base.
- Plan to do something drastic?  
  Leave an [issue](https://github.com/sverweij/wordywordy/issues/new)
  on GitHub, so we can talk about it
- dependency-cruiser is released with a [code of conduct](../CODE_OF_CONDUCT.md), adapted
  from the [contributor covenant](http://contributor-covenant.org/).

### Legal

- the code you add will be subject to
  [GPLv3](../LICENSE), just like the rest of wordywordy
- the code you add is your own original work
