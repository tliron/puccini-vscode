*This is an early release. Some features are not yet fully implemented.*

Puccini TOSCA Visual Studio Code Extension
==========================================

Adds [TOSCA](https://www.oasis-open.org/committees/tosca/) language support to [Visual Studio Code](https://code.visualstudio.com/).

Supported features:

* Auto-detects TOSCA content and switches to TOSCA editing mode
* Validates TOSCA as you type and reports problems at the exact row and column
* Fills in the outline view with TOSCA symbols (types and templates)
* Colorizes YAML syntax

TODO:

* Completes code based on TOSCA types
* Goes to a type's declaration, or its references, or its implementations in templates
* Shows TOSCA function signatures

Based on the [Puccini TOSCA Language Server](https://github.com/tliron/puccini-language-server).
