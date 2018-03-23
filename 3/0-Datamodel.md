
## Section 1: Datamodel
##### OpenCannabis Specification 

Central to the OpenCannabis project's goals is a *unified datamodel* for use across functional boundaries. When
cultivators talk about *flowers* with labs, and labs talk about *test results* with retailers, and so on, they are all
talking about the same thing - but in today's legal cannabis industry, they aren't speaking the same language.

### A. Protocol Buffers

The model put forth by OpenCannabis is specified in a programming language called
[Protocol Buffers](https://developers.google.com/protocol-buffers/) that originated inside Google. *Protobuf*, as it is
referred to colloquially, has numerous strengths that this project leverages to deliver better compatibility and
support to spec adopters:

* Protobuf is an [easy language to learn](https://developers.google.com/protocol-buffers/docs/proto3), potentially even
  for non-technical contributors
* Models written in Protobuf can be compiled into a _ton_ of languages: all popular ones and quite a few others, too.
  This means: **complete language agnosticism** if you are adopting OpenCannabis! 🚀
    * Language support includes, but is not limited to: C/C++, Java, C#, Python Go, Objective-C, Swift, PHP, and R
* Custom Protobuf plugins can be written to generate custom code, docs, or other materials
* Compatibility with other Protobuf-authored models, such as [OpenRTB](https://openrtb.github.io/OpenRTB/) and
  [Google APIs](https://github.com/googleapis/googleapis/tree/master/google)

#### Nomenclature

Models implemented in Protobuf are referred to as *Messages*. *Services*, which specify *Methods*, make use of
*Messages* as input and output structures. 

### B. Guidelines

These guidelines govern how OpenCannabis specifications make use of Protobuf.

1. Models accompanying a specification **MUST** provide an implementation written in Protobuf.
1. Source files **MUST** use the syntax mode `proto3`.
1. Source files **MUST** use the package prefix with `opencannabis`.
1. Source files **MUST** adhere to the policies in *Section 1B(ii-v)*.

#### ii) Source file guidelines

These guidelines govern how OpenCannabis protobuf source files must be formatted and specified.

1. Source files **MUST** specify a `java_package`.
1. Source files **MUST** specify a `objc_class_prefix`.
1. Source files **MUST** specify a Java package starting with `io.opencannabis`.
1. Source files **MUST** place exactly one newline at the beginning of the file.
1. Source files **MUST** place exactly one newline after the `syntax = proto3` declaration.
1. Source files **MUST** list file-level options immediately after the `syntax` declaration.
1. Source files **MUST** list imports immediately after file-level options, separated by exactly one newline.
1. Source files **MUST** place exactly two newlines after the imports.
1. Source files **SHOULD** specify an `optimize_for` value of `SPEED`.
1. Source files **SHOULD** specify a `java_outer_classname`.
1. Source files **SHOULD** make use of the `objc_class_prefix` value of `OCS`.
1. Source files **SHOULD** place `enum` specifications at the beginning of the file.
1. Source files **SHOULD** place `service` specifications at the end of the file.
1. Source files **MAY** break up many imports into groups, each separated by exactly one newline.

#### iii) Messages

These guidelines govern how OpenCannabis protobuf messages are structured and specified.

1. Messages **MUST** begin with a capital letter.
1. Messages **MUST** adhere to *CamelCase* when including multiple words in their name.
1. Messages **MUST** include a comment describing their use and purpose, in compliance with *Section 1B(v)*.
1. Messages **MUST** include exactly one newline between each other.
1. Messages **MUST** immediately begin properties without an initial newline.
1. Messages **MUST NOT** include a terminal newline before the closing curly bracket.
1. Messages **SHOULD** specify required or notable properties first.

#### iv) Properties

These guidelines govern individual message properties.

1. Properties **MUST** be specified in all-lowercase, underscored form *(i.e., `example_property_name`)*.
1. Properties **MUST** include exactly one newline after their definition, unless they are the last property specified.
1. Properties **MUST** include a comment describing their use and purpose, in compliance with *Section 1B(v)*.

#### iv) Commenting

These guidelines govern inline source comments on *Messages*, *Properties*, *Services* and *Methods*.

1. Comments **MUST** begin with a single space.
1. Comments **MUST** end with a period.
1. Comments **MUST** occur directly above the entry they are commenting on, with no newline below.
1. Comments **MUST** wrap lines at 80 characters; no less, no more.
1. Comments **SHOULD** describe their subject in simple, easy-to-understand terms.
1. Comments **SHOULD** be complete sentences, in present-imperative form *(i.e., 'Specifies xyz, in abc
  circumstances.')*.
