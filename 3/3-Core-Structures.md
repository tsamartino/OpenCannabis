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
  - [geo/Country.proto](#geo/Country.proto)
      - [Country](#opencannabis.geo.Country)
  - [geo/Point.proto](#geo/Point.proto)
      - [Point](#opencannabis.geo.Point)
  - [geo/Province.proto](#geo/Province.proto)
      - [Province](#opencannabis.geo.Province)
    - [geo/Location.proto](#geo/Location.proto)
      - [Distance](#opencannabis.geo.Distance)
      - [DistanceValue](#opencannabis.geo.DistanceValue)
      - [Location](#opencannabis.geo.Location)
      - [LocationAccuracy](#opencannabis.geo.LocationAccuracy)
      - [DistanceUnit](#opencannabis.geo.DistanceUnit)
  - [geo/Address.proto](#geo/Address.proto)
      - [Address](#opencannabis.geo.Address)
  - [geo/USState.proto](#geo/USState.proto)
      - [USState](#opencannabis.geo.usa.USState)
- `device`: Managed and anonymous, operating systems, browsers.
  - [device/Device.proto](#device/Device.proto)
      - [Device](#opencannabis.device.Device)
      - [DeviceCredentials](#opencannabis.device.DeviceCredentials)
      - [DeviceFlags](#opencannabis.device.DeviceFlags)
      - [DeviceType](#opencannabis.device.DeviceType)
- `content`: Narrative and marketing content.
  - [content/Name.proto](#content/Name.proto)
      - [Name](#opencannabis.content.Name)
  - [content/Content.proto](#content/Content.proto)
      - [Content](#opencannabis.content.Content)
      - [Content.Encoding](#opencannabis.content.Content.Encoding)
      - [Content.Type](#opencannabis.content.Content.Type)
    - [content/MaterialsData.proto](#content/MaterialsData.proto)
      - [MaterialsData](#opencannabis.content.MaterialsData)
    - [content/Brand.proto](#content/Brand.proto)
      - [Brand](#opencannabis.content.Brand)
    - [content/ProductContent.proto](#content/ProductContent.proto)
      - [ProductContent](#opencannabis.content.ProductContent)
      - [ProductTimestamps](#opencannabis.content.ProductTimestamps)
- `person`: People, names, birth dates, and so on.
  - [person/PersonName.proto](#person/PersonName.proto)
      - [Name](#opencannabis.person.Name)
  - [person/Person.proto](#person/Person.proto)
      - [Person](#opencannabis.person.Person)
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
  |iso8601: string
  |timestamp: uint64]

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


## `opencannabis.geo`

Location data, distance, addresses, and so on.

{% nomnoml %}

#fill: #d5e7ee; #8ebff2
[Country
  |code: string]
  
[Point
  |latitude: double
  |longitude: double
  |elevation: double
  |accuracy: double]
  
[Point
  |state: usa.USState
  |province: string]
  
[Distance
  |estimate: bool
  |accuracy: LocationAccuracy
  |unit: DistanceUnit
  |start: Location
  |end: Location]
  
[DistanceValue
  |unit: DistanceUnit
  |value: double]
  
[Location
  |name: opencannabis.content.Name
  |address: Address
  |point: Point
  |accuracy: LocationAccuracy]
  
[LocationAccuracy
  |estimate: bool
  |value: DistanceValue]
  
[METERS	0
  |INCHES: 1
  |FEET: 2
  |MILLIMETERS:3
  |CENTIMETERS: 4
  |KILOMETERS: 5
  |MILES: 6]
  
[Address
  |first_line: string
  |second_line: string
  |city: string
  |state: string
  |zipcode: string
  |country: string]
  
[USState
  |UNSPECIFIED: 0
  |AL / Alabama: 1
  |AK / Alaska: 2
  |AZ / Arizona: 3
  |AR / Arkansas: 4
  |CA / California: 5
  |...
  |WY / Wyoming: 51]
{% endnomnoml %}

<a name="geo/Country.proto"/>
<p align="right"><a href="#top">Top</a></p>

## geo/Country.proto


<a name="opencannabis.geo.Country"/>

### Country
Specifies an independent nation state.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| code | [string](#string) |  | ISO country code. |


<a name="geo/Point.proto"/>
<p align="right"><a href="#top">Top</a></p>

## geo/Point.proto


<a name="opencannabis.geo.Point"/>

### Point
Specifies a specific point on the earth, via a standard set of latitude/longitude coordinates, an elevation, and
optionally an accuracy rating. Accuracy and elevation are interpreted in &#39;feet&#39; by default.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| latitude | [double](#double) |  | Latitude value of this point. |
| longitude | [double](#double) |  | Longitude value of this point. |
| elevation | [double](#double) |  | Elevation of this point, if any. |
| accuracy | [double](#double) |  | Accuracy rating attached to this point, if any. |


<a name="geo/Province.proto"/>
<p align="right"><a href="#top">Top</a></p>

## geo/Province.proto


<a name="opencannabis.geo.Province"/>

### Province
Specifies a US or non-US province.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| state | [usa.USState](#opencannabis.geo.usa.USState) |  | US state, specified by enumerated ID. |
| province | [string](#string) |  | Generic province reference, by name. |


<a name="geo/Location.proto"/>
<p align="right"><a href="#top">Top</a></p>

## geo/Location.proto


<a name="opencannabis.geo.Distance"/>

### Distance
Specifies a distance between two locations.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| estimate | [bool](#bool) |  | Specifies whether this distance is an estimate. |
| accuracy | [LocationAccuracy](#opencannabis.geo.LocationAccuracy) |  | Specifies the accuracy estimate for the distance values, if known. |
| unit | [DistanceUnit](#opencannabis.geo.DistanceUnit) |  | Specifies the unit of measurement for a location accuracy estimate. |
| start | [Location](#opencannabis.geo.Location) |  | Specifies the starting location for a distance span. |
| end | [Location](#opencannabis.geo.Location) |  | Specifies the terminating location for a distance span. |


<a name="opencannabis.geo.DistanceValue"/>

### DistanceValue
Specifies a single distance value.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| unit | [DistanceUnit](#opencannabis.geo.DistanceUnit) |  | Specifies the unit of measurement employed for this distance. |
| value | [double](#double) |  | Actual value. |


<a name="opencannabis.geo.Location"/>

### Location
Represents a physically addressable location in the real world.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| name | [opencannabis.content.Name](#opencannabis.content.Name) |  | Name for this location, if applicable. |
| address | [Address](#opencannabis.geo.Address) |  | Address for this location, if applicable. |
| point | [Point](#opencannabis.geo.Point) |  | Geopoint (latitude/longitude) for this location. |
| accuracy | [LocationAccuracy](#opencannabis.geo.LocationAccuracy) |  | Specifies the accuracy estimate, if known. |


<a name="opencannabis.geo.LocationAccuracy"/>

### LocationAccuracy
Represents an estimate of location accuracy.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| estimate | [bool](#bool) |  | Specifies whether this accuracy rating is an estimate. |
| value | [DistanceValue](#opencannabis.geo.DistanceValue) |  | Distance value for the accuracy specified. |


<a name="opencannabis.geo.DistanceUnit"/>

### DistanceUnit
Enumeration of recognized units of distance.

| Name | Number | Description |
| ---- | ------ | ----------- |
| METERS | 0 | Distance in meters. |
| INCHES | 1 | Distance in inches. |
| FEET | 2 | Distance in feet. |
| MILLIMETERS | 3 | Distance in millimeters. |
| CENTIMETERS | 4 | Distance in centimeters. |
| KILOMETERS | 5 | Distance in kilometers. |
| MILES | 6 | Distance in miles. |


<a name="geo/Address.proto"/>
<p align="right"><a href="#top">Top</a></p>

## geo/Address.proto


<a name="opencannabis.geo.Address"/>

### Address
Specifies a standard postal address, with two address lines, and space for a municipality (&#39;city&#39;), provincial
authority (&#39;state&#39;), and national authority (&#39;country&#39;).


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| first_line | [string](#string) |  | First line of the address. |
| second_line | [string](#string) |  | Second line of the address, if applicable. |
| city | [string](#string) |  | City or municipality name for the address. |
| state | [string](#string) |  | State that contains the city or municipality for this address. |
| zipcode | [string](#string) |  | USPS zipcode associated with this address. |
| country | [string](#string) |  | Country code associated with this address (&#39;US&#39; or &#39;USA&#39; for United States, for instance). |


<a name="geo/USState.proto"/>
<p align="right"><a href="#top">Top</a></p>

## geo/USState.proto


<a name="opencannabis.geo.usa.USState"/>

### USState
Enumerates United States member states and territories by their full name and abbreviation.

| Name | Number | Description |
| ---- | ------ | ----------- |
| UNSPECIFIED | 0 | Default: Unspecified. |
| AL | 1 | State of Alabama. |
| ALABAMA | 1 |  |
| AK | 2 | State of Alaska. |
| ALASKA | 2 |  |
| AZ | 3 | State of Arizona. |
| ARIZONA | 3 |  |
| AR | 4 | State of Arkansas. |
| ARKANSAS | 4 |  |
| CA | 5 | State of California. |
| CALIFORNIA | 5 |  |
| CO | 6 | State of Colorado. |
| COLORADO | 6 |  |
| CT | 7 | State of Connecticut. |
| CONNECTICUT | 7 |  |
| DE | 8 | State of Delaware. |
| Delaware | 8 |  |
| DC | 9 | Washington, District of Columbia (DC). |
| DISTRICT_OF_COLUMBIA | 9 |  |
| FL | 10 | State of Florida. |
| FLORIDA | 10 |  |
| GA | 11 | State of Georgia. |
| GEORGIA | 11 |  |
| HI | 12 | State of Hawaii. |
| HAWAII | 12 |  |
| ID | 13 | State of Idaho. |
| IDAHO | 13 |  |
| IL | 14 | State of Illinois. |
| ILLINOIS | 14 |  |
| IN | 15 | State of Indiana. |
| INDIANA | 15 |  |
| IA | 16 | State of Iowa. |
| IOWA | 16 |  |
| KS | 17 | State of Kansas. |
| KANSAS | 17 |  |
| KY | 18 | State of Kentucky. |
| KENTUCKY | 18 |  |
| LA | 19 | State of Loisiana. |
| LOISIANA | 19 |  |
| ME | 20 | State of Maine. |
| MAINE | 20 |  |
| MD | 21 | State of Maryland. |
| MARYLAND | 21 |  |
| MA | 22 | State of Massachusetts. |
| MASSACHUSETTS | 22 |  |
| MI | 23 | State of Michigan. |
| MICHIGAN | 23 |  |
| MN | 24 | State of Minnesota. |
| MINNESOTA | 24 |  |
| MS | 25 | State of Mississippi. |
| MISSISSIPPI | 25 |  |
| MO | 26 | State of Missouri. |
| MISSOURI | 26 |  |
| MT | 27 | State of Montana. |
| MONTANA | 27 |  |
| NE | 28 | State of Nebraska. |
| NEBRASKA | 28 |  |
| NV | 29 | State of Nevada. |
| NEVADA | 29 |  |
| NH | 30 | State of New Hampshire. |
| NEW_HAMPSHIRE | 30 |  |
| NJ | 31 | State of New Jersey. |
| NEW_JERSEY | 31 |  |
| NM | 32 | State of New Mexico. |
| NEW_MEXICO | 32 |  |
| NY | 33 | State of New York. |
| NEW_YORK | 33 |  |
| NC | 34 | State of North Carolina. |
| NORTH_CAROLINA | 34 |  |
| ND | 35 | State of North Dakota. |
| NORTH_DAKOTA | 35 |  |
| OH | 36 | State of Ohio. |
| OHIO | 36 |  |
| OK | 37 | State of Oklahoma. |
| OKLAHOMA | 37 |  |
| OR | 38 | State of Oregon. |
| OREGON | 38 |  |
| PA | 39 | State of Pennsylvania. |
| PENNSYLVANIA | 39 |  |
| RI | 40 | State of Rhode Island. |
| RHODE_ISLAND | 40 |  |
| SC | 41 | State of South Carolina. |
| SOUTH_CAROLINA | 41 |  |
| SD | 42 | State of South Dakota. |
| SOUTH_DAKOTA | 42 |  |
| TN | 43 | State of Tennessee. |
| TENNESSEE | 43 |  |
| TX | 44 | State of Texas. |
| TEXAS | 44 |  |
| UT | 45 | State of Utah. |
| UTAH | 45 |  |
| VT | 46 | State of Vermont. |
| VERMONT | 46 |  |
| VA | 47 | State of Virginia. |
| VIRGINIA | 47 |  |
| WA | 48 | State of Washington. |
| WASHINGTON | 48 |  |
| WV | 49 | State of West Virginia. |
| WEST_VIRGINIA | 49 |  |
| WI | 50 | State of Wisconsin. |
| WISCONSIN | 50 |  |
| WYOMING | 51 | State of Wyoming. |
| WY | 51 |  |

## `opencannabis.device`

Specifies a variety of devices, device flags, device types, and so on.

{% nomnoml %}

#fill: #d5e7ee; #8ebff2
[Device
 | uuid: string
 | type: DeviceType
 | flags: DeviceFlags
 | key: DeviceCredentials]

[DeviceCredentials
 | public_key: bytes
 | private_key: bytes
 | sha256: string
 | identity: string
 | authorities: bytes: repeated]

[DeviceFlags
 | ephemeral: bool
 | managed: bool]
 
[DeviceType
 | UNKNOWN_DEVICE_TYPE:0
 | DESKTOP:1
 | PHONE:2
 | TABLET:3
 | TV:4]

{% endnomnoml %}


<a name="device/Device.proto"/>
<p align="right"><a href="#top">Top</a></p>

## device/Device.proto


<a name="opencannabis.device.Device"/>

### Device
Specifies a structure that describes a known device.

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| uuid | [string](#string) |  | Universally unique identifier for this device. |
| type | [DeviceType](#opencannabis.device.DeviceType) |  | Type of this device. |
| flags | [DeviceFlags](#opencannabis.device.DeviceFlags) |  | Flags for this device. |
| key | [DeviceCredentials](#opencannabis.device.DeviceCredentials) |  | Credentials for this device. |


<a name="opencannabis.device.DeviceCredentials"/>

### DeviceCredentials
Credentials that assert a device&#39;s identity or authorization.

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| public_key | [bytes](#bytes) |  | Raw bytes for a device&#39;s public key. |
| private_key | [bytes](#bytes) |  | Raw bytes for the device&#39;s private key. |
| sha256 | [string](#string) |  | SHA256 hash of this device&#39;s public key. |
| identity | [string](#string) |  | A device&#39;s raw identity payload. |
| authorities | [bytes](#bytes) | repeated | Repeated PEM authority payloads, asserted as trusted by the server. |


<a name="opencannabis.device.DeviceFlags"/>

### DeviceFlags
Stateful flags that may be set on a device.

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| ephemeral | [bool](#bool) |  | Flag to mark a device as ephemeral, i.e. attached to a disposable identity. |
| managed | [bool](#bool) |  | Flag to mark a device as managed by EMM systems. |


<a name="opencannabis.device.DeviceType"/>

### DeviceType
Enumerates major types of devices that might be encountered, including desktops, phones, tablets, TVs, and browsers.

| Name | Number | Description |
| ---- | ------ | ----------- |
| UNKNOWN_DEVICE_TYPE | 0 | The end-device type is not known. |
| DESKTOP | 1 | The end-device is a desktop of some kind. |
| PHONE | 2 | The end-device is a phone. |
| TABLET | 3 | The end-device is a tablet. |
| TV | 4 | The end-device is a TV of some kind. |

## `opencannabis.content`

Specifies Timestamps, Products, Brands, formats, encoding, and so on

{% nomnoml %}

#fill: #d5e7ee; #8ebff2
[Name
  | primary: string
  | display: string]

[Content
 | type: Content.Type
 | encoding: Content.Encoding
 | content: string
 | language: opencannabis.base.Language
 | compression: opencannabis.base.Compression]

[Encoding
 | UTF8: 0
 | B64: 1
 | B64_ASCII: 2]

[Type
 | TEXT: 0
 | MARKDOWN: 1
 | HTML: 2]

[MaterialsData
 | species: opencannabis.structs.Species
 | genetics: opencannabis.structs.Genetics
 | grow: opencannabis.structs.Grow
 | shelf: opencannabis.structs.Shelf
 | tests: opencannabis.structs.labtesting.TestResults
 | channel: opencannabis.products.distribution.DistributionPolicy: repeated]

[Brand
 | name: Name
 | parent: Brand
 | summary: Content
 | media: opencannabis.media.MediaItem: repeated]

[ProductContent
 | name: Name
 | brand: Brand
 | summary: Content
 | usage: Content
 | dosage: Content
 | media: opencannabis.media.MediaItem: repeated
 | pricing: opencannabis.structs.pricing.ProductPricing
 | flags: opencannabis.structs.ProductFlag
 | ts: ProductTimestamps]

[ProductTimestamps
 | created: opencannabis.temporal.Instant
 | modified: opencannabis.temporal.Instant
 | published: opencannabis.temporal.Instant]


{% endnomnoml %}

<a name="content/Name.proto"/>
<p align="right"><a href="#top">Top</a></p>

## content/Name.proto


<a name="opencannabis.content.Name"/>

### Name
Displayable content name.

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| primary | [string](#string) |  | Primary name. |
| display | [string](#string) |  | Display name, if different from the &#39;primary name&#39;. |


<a name="content/Content.proto"/>
<p align="right"><a href="#top">Top</a></p>

## content/Content.proto


<a name="opencannabis.content.Content"/>

### Content
Specifies a freeform content payload of some kind.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| type | [Content.Type](#opencannabis.content.Content.Type) |  | Format/underlying type of content data. |
| encoding | [Content.Encoding](#opencannabis.content.Content.Encoding) |  | Encoding of underlying content data. |
| content | [string](#string) |  | Raw bytes of underlying content data. |
| language | [opencannabis.base.Language](#opencannabis.base.Language) |  | Language information for underlying content. |
| compression | [opencannabis.base.Compression](#opencannabis.base.Compression) |  | Compression settings for underlying content. |


<a name="opencannabis.content.Content.Encoding"/>

### Content.Encoding
Enumerates supported encodings for content data.

| Name | Number | Description |
| ---- | ------ | ----------- |
| UTF8 | 0 | UTF-8 standard encoding. |
| B64 | 1 | Base-64 encoded UTF-8. |
| B64_ASCII | 2 | Base-64 encoded ASCII. |


<a name="opencannabis.content.Content.Type"/>

### Content.Type
Enumerates supported types/formats for content data.

| Name | Number | Description |
| ---- | ------ | ----------- |
| TEXT | 0 | Plaintext format. |
| MARKDOWN | 1 | Markdown format. |
| HTML | 2 | HTML format. |


<a name="content/MaterialsData.proto"/>
<p align="right"><a href="#top">Top</a></p>

## content/MaterialsData.proto
Quantitative or empirical content regarding the substance or material of a given product.


<a name="opencannabis.content.MaterialsData"/>

### MaterialsData
Specifies materials-related data about a product that contains cannabis.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| species | [opencannabis.structs.Species](#opencannabis.structs.Species) |  | Species of an item, if known. |
| genetics | [opencannabis.structs.Genetics](#opencannabis.structs.Genetics) |  | Specifies the genetics of an item, if known. |
| grow | [opencannabis.structs.Grow](#opencannabis.structs.Grow) |  | Specifies how this item was grown. |
| shelf | [opencannabis.structs.Shelf](#opencannabis.structs.Shelf) |  | Shelf status of this product. |
| tests | [opencannabis.structs.labtesting.TestResults](#opencannabis.structs.labtesting.TestResults) |  | Laboratory testing results for this particular subject material. |
| channel | [opencannabis.products.distribution.DistributionPolicy](#opencannabis.products.distribution.DistributionPolicy) | repeated | Specifies distribution policy for this particular subject material. |


<a name="content/Brand.proto"/>
<p align="right"><a href="#top">Top</a></p>

## content/Brand.proto


<a name="opencannabis.content.Brand"/>

### Brand
Information about a particular brand or producer of products or materials.

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| name | [Name](#opencannabis.content.Name) |  | Naming information for this brand. |
| parent | [Brand](#opencannabis.content.Brand) |  | Parent/owning brand, if applicable. |
| summary | [Content](#opencannabis.content.Content) |  | Summary information or content about this brand. |
| media | [opencannabis.media.MediaItem](#opencannabis.media.MediaItem) | repeated | Media items attached to this brand. |


<a name="content/ProductContent.proto"/>
<p align="right"><a href="#top">Top</a></p>

## content/ProductContent.proto


<a name="opencannabis.content.ProductContent"/>

### ProductContent
Specifies a common model for product content, mostly user-visible, and shared by all concrete models. Most of the
information you see when a product is displayed or listed comes from this model.

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| name | [Name](#opencannabis.content.Name) |  | Main product name. |
| brand | [Brand](#opencannabis.content.Brand) |  | Brand information for this product. |
| summary | [Content](#opencannabis.content.Content) |  | Description or narrative-style content about this product. |
| usage | [Content](#opencannabis.content.Content) |  | Content about how this product is best used, or recommended to be used, either from the manufacturer or retailer. |
| dosage | [Content](#opencannabis.content.Content) |  | Dosage advice about this product, either from the manufacturer or retailer. |
| media | [opencannabis.media.MediaItem](#opencannabis.media.MediaItem) | repeated | Product media, including images, videos, and so on. |
| pricing | [opencannabis.structs.pricing.ProductPricing](#opencannabis.structs.pricing.ProductPricing) |  | Pricing specification for this product, regardless of pricing type (i.e. weighted or unit-style pricing). |
| flags | [opencannabis.structs.ProductFlag](#opencannabis.structs.ProductFlag) | repeated | Product flags attached to this content. |
| ts | [ProductTimestamps](#opencannabis.content.ProductTimestamps) |  | Timestamps for this product. |


<a name="opencannabis.content.ProductTimestamps"/>

### ProductTimestamps
Specifies timestamps applied to a product, so that it may be tracked or sorted according to publish date, creation
date, or last modification date.

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| created | [opencannabis.temporal.Instant](#opencannabis.temporal.Instant) |  | When the subject product was created. |
| modified | [opencannabis.temporal.Instant](#opencannabis.temporal.Instant) |  | When the subject product was last modified. |
| published | [opencannabis.temporal.Instant](#opencannabis.temporal.Instant) |  | When the subject product was last or first published. |

## `opencannabis.person`

Specifies a person, their name, any middle or alternate name, date of birth, prefix, postfix, and their contact
information

{% nomnoml %}

#fill: #d5e7ee; #8ebff2
[PersonName
 | full_name: string
 | first_name: string
 | last_name: string
 | middle_name: string
 | prefix: string
 | postfix: string]

[Person
 | name: Name
 | legal_name: Name
 | alternate_name: Name
 | contact: opencannabis.contact.ContactInfo
 | date_of_birth: opencannabis.temporal.Date]

{% endnomnoml %}

<a name="person/PersonName.proto"/>
<p align="right"><a href="#top">Top</a></p>

## person/PersonName.proto


<a name="opencannabis.person.Name"/>

### Name
Represents a human being&#39;s name, in the style of &#34;given&#34; name (first) and &#34;family&#34; name (last) being concatenated to
form a full person&#39;s name. Additional names, like middle names, etc, are also specified here.

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| full_name | [string](#string) |  | Person&#39;s full name, if a fulltext value should override. |
| first_name | [string](#string) |  | Person&#39;s given, or first, name. |
| last_name | [string](#string) |  | Person&#39;s family, or last, name. |
| middle_name | [string](#string) |  | Person&#39;s middle name. |
| prefix | [string](#string) |  | Prefix for a person&#39;s name. |
| postfix | [string](#string) |  | Postfix for a person&#39;s name. |


<a name="person/Person.proto"/>
<p align="right"><a href="#top">Top</a></p>

## person/Person.proto


<a name="opencannabis.person.Person"/>

### Person
A person/patient and their name, legal name, nickname, etc.

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| name | [Name](#opencannabis.person.Name) |  | Person&#39;s primary name information. |
| legal_name | [Name](#opencannabis.person.Name) |  | Person&#39;s legal name, if it differs from their primary name. |
| alternate_name | [Name](#opencannabis.person.Name) |  | Person&#39;s optional alternate name. |
| contact | [opencannabis.contact.ContactInfo](#opencannabis.contact.ContactInfo) |  | Person&#39;s contact information. |
| date_of_birth | [opencannabis.temporal.Date](#opencannabis.temporal.Date) |  | Date of birth. |
