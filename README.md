<h1 align="center">JMeter template</h1>
<p align="center">
  <em>Want to generate JMeter test plans based on your AsyncAPI file?</em>
</p>

This template is for generating a JMeter test plans for your application based on the AsyncAPI document to enable easier performance testing.

### Requirements
* @asyncapi/generator < v2.0.0 > v1.4.0
* JMeter >= 5.4.1

Install the generator through [npm or run it from docker official installer](https://github.com/asyncapi/generator#install).

## How to use

`ag --output ./out ./AsyncAPI.yml @lagoni/jmeter-template`
See the [generator](https://github.com/asyncapi/generator) for more options.
## Supported protocols

- NATS
  - Both pubsub and request/reply is supported