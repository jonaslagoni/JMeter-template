<h1 align="center">JMeter template</h1>
<p align="center">
  <em>Want to generate JMeter test plans based on your AsyncAPI file?</em>
</p>

This template is for generating a JMeter test plans for your application based on the AsyncAPI document to enable easier performance testing of your applications.

It generates a single `.jmx` file for your application, at the moment it only generates very basic test plan. If you encounter any features that are missing feel free to create a feature request or PR.

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