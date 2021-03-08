<h1 align="center">JMeter template</h1>
<p align="center">
  <em>Want to generate JMeter test plans based on your AsyncAPI file?</em>
</p>

This template is for generating a JMeter test plans for your application based on the AsyncAPI document to enable easier performance testing of your applications.

It generates a single `.jmx` file for your application, at the moment it only generates very basic test plan.

### Requirements
* @asyncapi/generator < v2.0.0 > v1.4.0
  * Install the generator through [npm or run it from docker official installer](https://github.com/asyncapi/generator#install).
* JMeter >= 5.4.1
* Depending on the protocol there might be library dependencies. See [supported protocols](##supported-protocols) and their associated docs.

## How to use

```
ag --output ./out ./AsyncAPI.yml @lagoni/jmeter-template
```

See the [generator](https://github.com/asyncapi/generator) for more options for the CLI.

The output is a single JMeter test plan file `.jmx` which can be opened in JMeter or merged depending on your use-case.

## Supported protocols

- NATS - [See docs for further details and requirements](./docs/protocols/nats.md)
  - Supports publish and request

## Contribution guidelines
Any contributions are welcome more then welcome, got an idea how to do something differently, new feature, found a bug, etc. let us know!

The repository includes Visual studio code run scripts for you to debug the template on the fly. See `./.vscode/launch.json` and the example AsyncAPI documents to test with are located in `./.vscode/protocols/*.json`. If you add a new protocol please provide an example AsyncAPI document there.

### When you want to introduce changes
1. Pick or create an issue.
    * It's always a good idea to leave a message saying that you're going to work on it before you start any actual work.
1. Fork the repository and work there.
1. Before opening a Pull Request ensure:
    * That `npm run lint` does not fail
    * That `npm run test` does not fail
1. Open a Pull Request pointing to the master branch.
1. A maintainer will review your code as soon as possible.