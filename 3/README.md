---
domain: rfc.opencannabis.info
shortname: 3/OCS
name: OpenCannabis Specficiation
status: draft
editor: Sam Gammon <sam@bloombox.io>
contributors:
  - Tyler Porras <tyler@bloombox.io>
  - Tim Samartino <tim@bloombox.io>
  - Matt McLean <matt@gocaliva.com>
  - Scott Robinson <srobinson@abatinsacramento.com>
---

# OpenCannabis Specification

This document describes an interoperable technical data specification tailored for the **worldwide legal cannabis market**. As legal markets to buy, sell, cultivate and manufacture cannabis products come online, a need is emerging for a universal way of connecting data systems and components that work with cannabis or cannabis-related data.

Extensions for each market stakeholder (from seed to smoke, as it were). The hope is that this work can begin a conversation amongst cannabis software providers about a universal spec and integration suite.

This specification is based on the [2/COSS](../2/README.md) (*Consensus-Oriented Specification System*) process, and before it, the original [Digistan 1/COSS](http://www.digistan.org/spec:1/COSS), which are designed to be a lightweight editorial process that seeks to engage the widest possible range of interested parties and move rapidly to consensus through working code.

## License

Copyright (c) 2018, the OpenCannabis Editor and Contributors.

This Specification is free software; you can redistribute it and/or modify it under the terms of the [GNU General Public License](LICENSE.md) as published by the Free Software Foundation; either version 3 of the License, or (at your option) any later version.

This Specification is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with this program; if not, see http://www.gnu.org/licenses.

## Change Process

This document is governed by the [2/COSS](../2/README.md) (*Consensus-Oriented Specification System*).

## Language

The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED",  "MAY", and "OPTIONAL" in this document are to be interpreted as described in [RFC 2119](http://tools.ietf.org/html/rfc2119).

## Goals

The OpenCannabis Data Specification's main goal is to facilitate the implementation, and agreement on, an open information structure for legal cannabis operations. The hope is that a point of agreement such as this one amongst industry practitioners can bring about easier development of integrations between major systems.

Currently, the state of the art in cannabis technology is one of two options: Massive, sweeping ecosystems of proprietary code (that frequently break), and isolated, SaaS-style startups that provide great tools but without the ecosystem around them.

Some providers opt for the big players, and feel the pain when they go down. Others spread that pain out over many smaller providers but both are still unhappy. What's the answer to fixing these problems?

An open specification, for cannabis data. For your menu, your transactions, your customers, and so on - so that when one provider isn't enough, or it's time to switch, or you want to write your own code - your data and your business aren't locked away.

From [2/COSS](../2/README.md):
*A "technical specification" defines a protocol, a process, an API, a use of language, a methodology, or any other aspect of a technical environment that can usefully be documented for the purposes of technical or social interoperability.*

OpenCannabis intends to apply these same principles to our very own industry:
* We aim for rough consensus and running code.
* Specifications are small pieces, made by small teams.
* Specifications should have a clearly responsible editor.
* The process should be visible, objective, and accessible to anyone.
* The process should clearly separate experiments from solutions.
* The process should allow deprecation of old specifications.

Specifications should take minutes to explain, hours to design, days to write, weeks to prove, months to become mature, and years to replace.

Specifications have no special status except that accorded by the community.

## Architecture

OpenCannabis is designed around modern tools such as Git, Markdown, and Slack. Primary, a wiki model is employed for authoring, editing, and publishing specification texts. Notes, mostly, again, borrowed from [2/COSS](../2/README.md):
* The *domain* is the conservancy for a set of specifications in a certain area.
* Each domain is implemented as an Internet domain, hosting a wiki and optionally other communications tools.
* Each specification is a set of wiki pages, together with comments, attached files, and other resources.
* Important specifications may also exist as subdomains, i.e. child wikis.

Individuals can become members of the domain by completing the necessary legal clearance.  The copyright, patent, and trademark policies of the domain must be clarified in an Intellectual Property policy that applies to the domain.

Specifications exist as multiple pages, one page per version of the specification (see "Branching and Merging", below), which may be assigned URIs that include an incremental number.  Thus, we refer to a specification by specifying its domain, number, and short name.  New versions of the same specification will have new numbers.  The syntax for a specification reference is:


    <domain>/spec:<number>/<shortname>


For example, this specification is **rfc.opencannabis.info/spec:3/OCS**.  The short form **3/OCS** may be used when referring to the specification from other specifications in the same domain.

Every specification (including branches) carries a different number.  Lower numbers indicate more mature specifications, higher numbers indicate more experimental specifications.

## Conventions

Where possible editors and contributors are encouraged to:

* Refer to and build on existing work when possible, especially IETF specifications.
* Contribute to existing specifications rather than reinvent their own.
* Use collaborative branching and merging as a tool for experimentation.
