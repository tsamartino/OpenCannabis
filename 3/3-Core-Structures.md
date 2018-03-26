# Core Structures: Protocol Documentation
<a name="top"/>

_"Core structures"_ refer to messages and definitions that are included in the main _OpenCannabis Specification_, rather
than a _Specification Extension_, and are defined herein, as part of _Part 1.1_.

Definitions provided by _Extensions_ to the main specification are enumerated
separately in [Part 1.2, Extension Structures](4-Extension-Structures.md).

## Table of Contents

- `base`: Foundational structures used across the spec.
    - [base/Compression.proto](#base/Compression.proto)
        - [Compression](#opencannabis.base.Compression)
        - [Compression.Type](#opencannabis.base.Compression.Type)
    - [base/ProductKind.proto](#base/ProductKind.proto)
        - [ProductKind](#opencannabis.base.ProductKind)
    - [base/Language.proto](#base/Language.proto)
        - [Language](#opencannabis.base.Language)
    - [base/ProductKey.proto](#base/ProductKey.proto)
        - [ProductKey](#opencannabis.base.ProductKey)
        - [ProductReference](#opencannabis.base.ProductReference)
- `temporal`: Dates, times, and so on.
    - [temporal/Date.proto](#temporal/Date.proto)
        - [Date](#opencannabis.temporal.Date)
    - [temporal/Instant.proto](#temporal/Instant.proto)
        - [Instant](#opencannabis.temporal.Instant)
    - [temporal/Time.proto](#temporal/Time.proto)
        - [Time](#opencannabis.temporal.Time)
- `crypto`: Cryptographic primitives and containers.
    - [crypto/primitives/Integrity.proto](#crypto/primitives/Integrity.proto)
        - [Hash](#opencannabis.crypto.primitives.integrity.Hash)
        - [HashedData](#opencannabis.crypto.primitives.integrity.HashedData)
        - [HashAlgorithm](#opencannabis.crypto.primitives.integrity.HashAlgorithm)
- `geo`: Structures relating to geography.
- `device`: Managed and anonymous, operating systems, browsers.
- `content`: Narrative and marketing content.
- `person`: People, names, birth dates, and so on.
- `contact`: Email, phone, and postal addresses.
- `media`: Images, video, documents, etc.
- `products`: High-level product structures.
- `structs`: Utility structures used across the spec.

----

## `opencannabis.base`

Foundational structures used across the spec.

{% nomnoml %}

#fill: #d5e7ee; #8ebff2
[Language
  |ENGLISH: 0|SPANISH: 1|FRENCH: 2]

[Compression|enabled: bool|type: Compression.Type|
  [Type|NONE: 0|GZIP: 1|BROTLI: 2|SNAPPY: 3]]

[ProductKind
  |FLOWERS: 0|EDIBLES: 1|EXTRACTS: 2|PREROLLS: 3|APOTHECARY: 4|CARTRIDGES: 5|PLANTS: 6|MERCHANDISE: 7]
  
[ProductKey
  |id: string|type: ProductKind]->[ProductKind]

[ProductReference
  |name: string|key: ProductKey]->[ProductKey]

{% endnomnoml %}


<a name="base/Compression.proto"/>

### base/Compression.proto
Provides tools and structures related to compressing data, and indicating data compression. Also enumerates
registered compression algorithims.


<a name="opencannabis.base.Compression"/>

#### Compression
Specifies enabled/disabled state and compression type, and is usually attached to arbitrary data or metadata.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| enabled | [bool](./XB-Scalar-Value-Types.md#bool) |  | Enabled/disabled flag for compression. Defaults to not being set, so, falsy. |
| type | [Compression.Type](#opencannabis.base.Compression.Type) |  | Type of compression in use, if any. Enumerated herein via `Compression.Type`. |


<a name="opencannabis.base.Compression.Type"/>

#### Compression.Type
Enumerates available types of compression, or strategies or algorithms for compressing data.

| Name | Number | Description |
| ---- | ------ | ----------- |
| NO_COMPRESSION | 0 | No compression. |
| GZIP | 1 | Gzip-based compression. |
| BROTLI | 2 | Brotli-based compression. |
| SNAPPY | 3 | Snappy-based compression. |



<a name="base/ProductKind.proto"/>
<p align="right"><a href="#top">Top</a></p>

### base/ProductKind.proto
Enumerates types of addressable cannabis products.

<a name="opencannabis.base.ProductKind"/>

#### ProductKind
Enumerates types of products known to the spec.

| Name | Number | Description |
| ---- | ------ | ----------- |
| FLOWERS | 0 | Traditional buds or &#39;flower&#39;-based products, essentially sold in bags or jars. |
| EDIBLES | 1 | Manufactured products that are edible, like drinks, snacks, candy, and food. |
| EXTRACTS | 2 | Manufactured products that are concentrated from flowers in some manner, such as wax or oil. |
| PREROLLS | 3 | Pre-rolled items, generally made from flowers, like a cigarette - this would cover joints, etc. |
| APOTHECARY | 4 | Tinctures, topicals, capsules, and other forms of manufactured cannabis. |
| CARTRIDGES | 5 | Vaporizor cartridges, batteries, and kits. |
| PLANTS | 6 | Plants sold direct, in various forms such as pre-grown (clones) or raw seeds. |
| MERCHANDISE | 7 | Merchandise, usually branded in-house. Also covers glassware and miscellaneous items. |


<a name="base/Language.proto"/>
<p align="right"><a href="#top">Top</a></p>

### base/Language.proto
Specifies natural language-related messages and enumerations. Also enumerates registered languages.

<a name="opencannabis.base.Language"/>

#### Language
Specifies languages available for specification, usually used as an attachment to content or media.

| Name | Number | Description |
| ---- | ------ | ----------- |
| ENGLISH | 0 | English. |
| SPANISH | 1 | Spanish. |
| FRENCH | 2 | French. |



<a name="base/ProductKey.proto"/>
<p align="right"><a href="#top">Top</a></p>

### base/ProductKey.proto
Specifies structures that reference specific products at their unique key or name.

<a name="opencannabis.base.ProductKey"/>

#### ProductKey
Specifies a general key for a product, which is the combined specification of a product ID and type, which is
enumerated in `base.ProductType`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| id | [string](./XB-Scalar-Value-Types.md#string) |  | Product ID, an opaque string that is usually autogenerated. Within the scope of an implementing system, this may also be a stringified integer such as an auto-incrementing ID, for relational-type systems. The product ID is expected to be globally addressable and unique across all product categories. |
| type | [ProductKind](#opencannabis.base.ProductKind) |  | Type of product the ID is referring to. In most cases this entry can be omitted. |

<a name="opencannabis.base.ProductReference"/>

#### ProductReference
Specifies a reference to a product.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| name | [opencannabis.content.Name](#opencannabis.content.Name) |  | Specifies the name of a product. |
| key | [ProductKey](#opencannabis.base.ProductKey) |  | Specifies the key, if known, of a product. |


----

## `opencannabis.temporal`

Dates, times, and so on.

{% nomnoml %}

#fill: #d5e7ee; #8ebff2
[Date
  |iso8601: string]

[Instant
  |iso8601: string|timestamp: uint64]

[Time
  |iso8601: string]

{% endnomnoml %}


<a name="temporal/Date.proto"/>
<p align="right"><a href="#top">Top</a></p>

### temporal/Date.proto
Provides calendar and date related definitions and structures.


<a name="opencannabis.temporal.Date"/>

#### Date
Specifies a particular calendar date.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| iso8601 | [string](./XB-Scalar-Value-Types.md#string) |  | ISO8601-formatted calendar date value, like YYYY-MM-DD. |



<a name="temporal/Instant.proto"/>
<p align="right"><a href="#top">Top</a></p>

### temporal/Instant.proto
Provides timestamp-related definitions and structures.


<a name="opencannabis.temporal.Instant"/>

#### Instant
Specifies a particular moment in time.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| iso8601 | [string](./XB-Scalar-Value-Types.md#string) |  | ISO8601-formatted timestamp. |
| timestamp | [uint64](./XB-Scalar-Value-Types.md#uint64) |  | Unix epoch timestamp, at millisecond resolution. |



<a name="temporal/Time.proto"/>
<p align="right"><a href="#top">Top</a></p>

### temporal/Time.proto
Provides time-of-day-related definitions and structures.


<a name="opencannabis.temporal.Time"/>

#### Time
Specifies a particular time of day.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| iso8601 | [string](./XB-Scalar-Value-Types.md#string) |  | ISO8601 time format. |


----

## `opencannabis.crypto`

Cryptographic primitives, including hashing tools, encrypted data containers, and so on.

{% nomnoml %}

#fill: #d5e7ee; #8ebff2
[Hash
  |algorithm: HashAlgorithm
  |raw: bytes
  |hex: string
  |b64: string]

[HashedData
  |data: bytes
  |hash: Hash]

[HashAlgorithm
  |SHA1: 0
  |MD5: 1
  |SHA256: 2
  |SHA384: 3
  |SHA512: 4
  |MURMUR: 6]

{% endnomnoml %}


<a name="crypto/primitives/Integrity.proto"/>
<p align="right"><a href="#top">Top</a></p>

## crypto/primitives/Integrity.proto

<a name="opencannabis.crypto.primitives.integrity.Hash"/>

### Hash
Specifies the hash portion of hashed data, along with the algorithm used to calculate the digest enclosed. This
particular container does not specify or otherwise contain the original referenced data.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| algorithm | [HashAlgorithm](#opencannabis.crypto.primitives.integrity.HashAlgorithm) |  | Specifies the algorithm in use. |
| raw | [bytes](./XB-Scalar-Value-Types.md#bytes) |  | Raw binary output of the hash algorithm. |
| hex | [string](./XB-Scalar-Value-Types.md#string) |  | Hex-encoded digest value. |
| b64 | [string](./XB-Scalar-Value-Types.md#string) |  | Base64-encoded digest value. |

<a name="opencannabis.crypto.primitives.integrity.HashedData"/>

### HashedData
Specifies a set of raw data, of some kind, and an attached digest/hash value, along with the algorithm used to
calculate the digest.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| data | [bytes](./XB-Scalar-Value-Types.md#bytes) |  | Raw data that we are transmitting. |
| hash | [Hash](#opencannabis.crypto.primitives.integrity.Hash) |  | Hash for the raw data in this payload. |

<a name="opencannabis.crypto.primitives.integrity.HashAlgorithm"/>

### HashAlgorithm
Enumerates hash algorithms supported or known by the runtime for shared use.

| Name | Number | Description |
| ---- | ------ | ----------- |
| SHA1 | 0 | Secure Hash Algorithm v2. |
| MD5 | 1 | Message Digest v5. |
| SHA256 | 2 | Secure Hash Algorithm, with 256-bit width. |
| SHA384 | 3 | Secure Hash Algorithm, with 384-bit width. |
| SHA512 | 4 | Secure Hash Algorithm, with 512-bit width. |
| MURMUR | 6 | Specifies hashing with MurmurHash. |
