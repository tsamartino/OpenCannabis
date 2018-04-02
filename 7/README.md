---
domain: rfc.opencannabis.info
shortname: 7/OCS-L
name: OpenCannabis Lab Testing Extension
status: raw
editor: Randal Stevens <randy@bloombox.io>
contributors:
- Sam Gammon <sam@bloombox.io>
---

<a name="top"/>

# OpenCannabis: Menu Extension
- Version `1.0`
- Status: `RAW`

### Status of this Memo

This specification's current status is considered `RAW`, i.e. pre-`DRAFT`. Distribution of this memo is unlimited.

### Abstract

This document describes an extension to the _OpenCannabis Specification, version 1_, that introduces lab-testing-related
definitions structures, and services that compose, create and reference lab testing.

_"Lab Testing"_ in this context, refers to:
- The chemical components that make up a cannabis product.
- The chemical components and their respective names.
- The media through which the "Lab Testing" is displayed to customers

### Table of Contents
- [Protocol Definition](#Protocol-Definition): `labtesting`: Laboratory testing and QA.
    - [TestMedia](#opencannabis.structs.labtesting.TestMedia)
    - [TestValue](#opencannabis.structs.labtesting.TestValue)
    - [TestMediaType](#opencannabis.structs.labtesting.TestMediaType)
    - [TestValueType](#opencannabis.structs.labtesting.TestValueType)
    - [Cannabinoids](#opencannabis.structs.labtesting.Cannabinoids)
    - [Cannabinoids.Result](#opencannabis.structs.labtesting.Cannabinoids.Result)
    - [Moisture](#opencannabis.structs.labtesting.Moisture)
    - [Pesticides](#opencannabis.structs.labtesting.Pesticides)
    - [Pesticides.MeasurementsEntry](#opencannabis.structs.labtesting.Pesticides.MeasurementsEntry)
    - [Subjective](#opencannabis.structs.labtesting.Subjective)
    - [Terpenes](#opencannabis.structs.labtesting.Terpenes)
    - [Terpenes.Result](#opencannabis.structs.labtesting.Terpenes.Result)
    - [TestCoordinates](#opencannabis.structs.labtesting.TestCoordinates)
    - [TestResults](#opencannabis.structs.labtesting.TestResults)  
    - [Cannabinoid](#opencannabis.structs.labtesting.Cannabinoid)
    - [CannabinoidRatio](#opencannabis.structs.labtesting.CannabinoidRatio)
    - [Feeling](#opencannabis.structs.labtesting.Feeling)
    - [PotencyEstimate](#opencannabis.structs.labtesting.PotencyEstimate)
    - [TasteNote](#opencannabis.structs.labtesting.TasteNote)
    - [Terpene](#opencannabis.structs.labtesting.Terpene)


----
## Protocol Definition
### `opencannabis.labtesting`
Specifies testing media, tested attributes, structure of results and so on. 

{% nomnoml %}

#fill: #d5e7ee; #8ebff2
[TestMedia
  | type:TestMediaType
  | media_item:opencannabis.media.MediaItem]

[TestValue
  | type:TestValueType
  | measurement:double
  | present:bool]

[TestMediaType
  | CERTIFICATE:0
  | RESULTS:1
  | PRODUCT_IMAGE:2]

[TestValueType
  | MILLIGRAMS:0
  | PERCENTAGE:1
  | PRESENCE:3]

{% endnomnoml %}

{% nomnoml %}

#fill: #d5e7ee; #8ebff2
[Cannabanoids
  | thc:TestValue
  | cbd:TestValue
  | results:Repeated:Cannabinoids.Result]

[Cannabanoids.result
  | cannabinoid:Cannabinoid
  | ratio:CannabinoidRatio
  | measurement:TestValue]

[Moisture
  | measurement:TestValue]

[Pesticides
  | pesticide_free:bool
  | measurements:repeated:Pesticides.MeasurementsEntry]

[Pesticides.MeasurementsEntry
  | key:string
  | value:TestValue]

{% endnomnoml %}

{% nomnoml %}

#fill: #d5e7ee; #8ebff2
[Subjective
  | description:opencannabis.content.Content
  | taste:opencannabis.content.Content
  | potency:PotencyEstimate
  | feeling_tags:repeated:Feeling
  | tasting_notes:repeated:TasteNote]

[Terpenes
  | available:bool
  | terpenes:repeated:Terpenes.Result]

[Terpenes.Result
  | terpene:Terpene
  | measurement:TestValue]

[TestCoordinates
  | zone:string
  | group:string]

[TestResults
  | available:bool
  | media:repeated:TestMedia
  | last_updated:opencannabis.temporal.Instant
  | sealed:opencannabis.temporal.Instant
  | coordinates:TestCoordinates
  | cannabinoids:Cannabinoids
  | terpenes:Terpenes
  | pesticides:Pesticides
  | moisture:Moisture
  | subjective:Subjective
  | aroma:repeated:TasteNote
  | data:repeated:TestResults]

{% endnomnoml %}

{% nomnoml %}

#fill: #d5e7ee; #8ebff2
[Cannabanoid
  | THC:0
  | THC_A:1
  | THC_V:2
  | CBD:10
  | ...
  | CBV_A:51]

[CannabanoidRatio
  | NO_CANNABINOID_PREFERENCE:0
  | THC_ONLY:1
  | THC_OVER_CBD:2
  | EQUAL:3
  | CBD_OVER_THC:4
  | CBD_ONLY:5]

[Feeling
  | NO_FEELING_PREFERENCE:0
  | GROUNDING:1
  | SLEEP:2
  | CALMING:3
  | STIMULATING:4
  | FUNNY:5
  | FOCUS:6
  | PASSION:7]

[PotencyEstimate
  | LIGHT:0
  | MEDIUM:1
  | HEAVY:2
  | SUPER:3]

[TasteNote
  | NO_TASTE_PREFERENCE:0
  | SWEET:1
  | SOUR:2
  | SPICE:3
  | ...
  | EARTH:11]

[Terpene
  | CAMPHENE:0
  | CARENE:1
  | BETA_CARYOPHYLLENE:2
  | CARYOPHYLLENE_OXIDE:3
  | ...
  | TERPINOLENE:18]

{% endnomnoml %}


<a name="opencannabis.structs.labtesting.TestMedia"/>

### TestMedia

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| type | [TestMediaType](#opencannabis.structs.labtesting.TestMediaType) |  |  |
| media_item | [opencannabis.media.MediaItem](#opencannabis.media.MediaItem) |  |  |


<a name="opencannabis.structs.labtesting.TestValue"/>

### TestValue

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| type | [TestValueType](#opencannabis.structs.labtesting.TestValueType) |  |  |
| measurement | [double](#double) |  |  |
| present | [bool](#bool) |  |  |


<a name="opencannabis.structs.labtesting.TestMediaType"/>

### TestMediaType

| Name | Number | Description |
| ---- | ------ | ----------- |
| CERTIFICATE | 0 |  |
| RESULTS | 1 |  |
| PRODUCT_IMAGE | 2 |  |


<a name="opencannabis.structs.labtesting.TestValueType"/>

### TestValueType
-- Testing: Base (Shared) Protocol

| Name | Number | Description |
| ---- | ------ | ----------- |
| MILLIGRAMS | 0 |  |
| PERCENTAGE | 1 |  |
| PRESENCE | 3 |  |


<a name="structs/labtesting/TestResults.proto"/>
<p align="right"><a href="#top">Top</a></p>

## structs/labtesting/TestResults.proto
Empirical laboratory product testing structures and definitions. Provides support for cannabinoid testing, terpene
testing, pesticide testing, moisture ratings, and subjective testing.

<a name="opencannabis.structs.labtesting.Cannabinoids"/>

### Cannabinoids

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| thc | [TestValue](#opencannabis.structs.labtesting.TestValue) |  |  |
| cbd | [TestValue](#opencannabis.structs.labtesting.TestValue) |  |  |
| results | [Cannabinoids.Result](#opencannabis.structs.labtesting.Cannabinoids.Result) | repeated |  |


<a name="opencannabis.structs.labtesting.Cannabinoids.Result"/>

### Cannabinoids.Result

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| cannabinoid | [Cannabinoid](#opencannabis.structs.labtesting.Cannabinoid) |  |  |
| ratio | [CannabinoidRatio](#opencannabis.structs.labtesting.CannabinoidRatio) |  |  |
| measurement | [TestValue](#opencannabis.structs.labtesting.TestValue) |  |  |


<a name="opencannabis.structs.labtesting.Moisture"/>

### Moisture
-- Testing: Moisture

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| measurement | [TestValue](#opencannabis.structs.labtesting.TestValue) |  |  |


<a name="opencannabis.structs.labtesting.Pesticides"/>

### Pesticides
-- Testing: Pesticides

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| pesticide_free | [bool](#bool) |  |  |
| measurements | [Pesticides.MeasurementsEntry](#opencannabis.structs.labtesting.Pesticides.MeasurementsEntry) | repeated |  |


<a name="opencannabis.structs.labtesting.Pesticides.MeasurementsEntry"/>

### Pesticides.MeasurementsEntry

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| key | [string](#string) |  |  |
| value | [TestValue](#opencannabis.structs.labtesting.TestValue) |  |  |


<a name="opencannabis.structs.labtesting.Subjective"/>

### Subjective

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| description | [opencannabis.content.Content](#opencannabis.content.Content) |  |  |
| taste | [opencannabis.content.Content](#opencannabis.content.Content) |  |  |
| potency | [PotencyEstimate](#opencannabis.structs.labtesting.PotencyEstimate) |  |  |
| feeling_tags | [Feeling](#opencannabis.structs.labtesting.Feeling) | repeated |  |
| tasting_notes | [TasteNote](#opencannabis.structs.labtesting.TasteNote) | repeated |  |


<a name="opencannabis.structs.labtesting.Terpenes"/>

### Terpenes

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| available | [bool](#bool) |  |  |
| terpenes | [Terpenes.Result](#opencannabis.structs.labtesting.Terpenes.Result) | repeated |  |


<a name="opencannabis.structs.labtesting.Terpenes.Result"/>

### Terpenes.Result

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| terpene | [Terpene](#opencannabis.structs.labtesting.Terpene) |  |  |
| measurement | [TestValue](#opencannabis.structs.labtesting.TestValue) |  |  |


<a name="opencannabis.structs.labtesting.TestCoordinates"/>

### TestCoordinates
Specifies coordinate values for a given lab testing result. This generally consists of a &#39;lot&#39; and &#39;batch&#39; value,
which essentially correlate to a &#39;zone&#39; and &#39;group&#39;, which are expressed here.

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| zone | [string](#string) |  | Specifies the &#39;zone,&#39; or &#39;lot,&#39; value for a set of test results. |
| group | [string](#string) |  | Specifies the &#39;group,&#39; or &#39;batch,&#39; value for a set of test results. |


<a name="opencannabis.structs.labtesting.TestResults"/>

### TestResults
Lab testing results for a given product. Includes cannabinoid, terpene, pesticide, moisture, and subjective testing
properties. Only cannabinoid testing is considered required.

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| available | [bool](#bool) |  | Boolean flag indicating whether results are available for lab testing at all. |
| media | [TestMedia](#opencannabis.structs.labtesting.TestMedia) | repeated | Media attached to a set of lab results. This might include images taken during testing, documents (such as PDFs) specifying test results, and so on. |
| last_updated | [opencannabis.temporal.Instant](#opencannabis.temporal.Instant) |  | Last-updated value for these lab test results. Updated each time the record is updated. |
| sealed | [opencannabis.temporal.Instant](#opencannabis.temporal.Instant) |  | Precise moment that these results were considered &#39;sealed&#39; and returned. Once this timestamp is set, a given set of test results (unique by their coordinates) is considered immutable. |
| coordinates | [TestCoordinates](#opencannabis.structs.labtesting.TestCoordinates) |  | Coordinate, or ID values, for this set of test results. When specified at the top-level of a set of lab tests, indicates the coordinates for the active set of test results. |
| cannabinoids | [Cannabinoids](#opencannabis.structs.labtesting.Cannabinoids) |  | Standard cannabinoid testing, with reading results at least for THC and CBD, and optionally additional cannabinoid compounds. |
| terpenes | [Terpenes](#opencannabis.structs.labtesting.Terpenes) |  | Testing for terpene volatiles, which might indicate aroma or flavor notes. |
| pesticides | [Pesticides](#opencannabis.structs.labtesting.Pesticides) |  | Pesticide-specific test results. Indicates a pesticide reading, by chemical compound name, and a reading value. |
| moisture | [Moisture](#opencannabis.structs.labtesting.Moisture) |  | Moisture rating and test results. |
| subjective | [Subjective](#opencannabis.structs.labtesting.Subjective) |  | Results from subjective testing - i.e, opinionated human evaluation. |
| aroma | [TasteNote](#opencannabis.structs.labtesting.TasteNote) | repeated | Computed taste notes for this product, based on the combination of terpene testing and subjective testing, if available. |
| data | [TestResults](#opencannabis.structs.labtesting.TestResults) | repeated | Raw test result data, stored under a master set of test results. Only one level of nesting is allowed. |


<a name="opencannabis.structs.labtesting.Cannabinoid"/>

### Cannabinoid
-- Testing: Cannabinoids

| Name | Number | Description |
| ---- | ------ | ----------- |
| THC | 0 |  |
| THC_A | 1 |  |
| THC_V | 2 |  |
| CBD | 10 |  |
| CBD_A | 11 |  |
| CBD_V | 12 |  |
| CBD_VA | 13 |  |
| CBC | 20 |  |
| CBG | 30 |  |
| CBG_A | 31 |  |
| CBN | 40 |  |
| CBV | 50 |  |
| CBV_A | 51 |  |

<a name="opencannabis.structs.labtesting.CannabinoidRatio"/>

### CannabinoidRatio

| Name | Number | Description |
| ---- | ------ | ----------- |
| NO_CANNABINOID_PREFERENCE | 0 |  |
| THC_ONLY | 1 |  |
| THC_OVER_CBD | 2 |  |
| EQUAL | 3 |  |
| CBD_OVER_THC | 4 |  |
| CBD_ONLY | 5 |  |


<a name="opencannabis.structs.labtesting.Feeling"/>

### Feeling
-- Testing: Subjective

| Name | Number | Description |
| ---- | ------ | ----------- |
| NO_FEELING_PREFERENCE | 0 |  |
| GROUNDING | 1 |  |
| SLEEP | 2 |  |
| CALMING | 3 |  |
| STIMULATING | 4 |  |
| FUNNY | 5 |  |
| FOCUS | 6 |  |
| PASSION | 7 |  |


<a name="opencannabis.structs.labtesting.PotencyEstimate"/>

### PotencyEstimate

| Name | Number | Description |
| ---- | ------ | ----------- |
| LIGHT | 0 |  |
| MEDIUM | 1 |  |
| HEAVY | 2 |  |
| SUPER | 3 |  |


<a name="opencannabis.structs.labtesting.TasteNote"/>

### TasteNote

| Name | Number | Description |
| ---- | ------ | ----------- |
| NO_TASTE_PREFERENCE | 0 |  |
| SWEET | 1 |  |
| SOUR | 2 |  |
| SPICE | 3 |  |
| SMOOTH | 4 |  |
| CITRUS | 5 |  |
| PINE | 6 |  |
| FRUIT | 7 |  |
| TROPICS | 8 |  |
| FLORAL | 9 |  |
| HERB | 10 |  |
| EARTH | 11 |  |


<a name="opencannabis.structs.labtesting.Terpene"/>

### Terpene
-- Testing: Terpenes

| Name | Number | Description |
| ---- | ------ | ----------- |
| CAMPHENE | 0 |  |
| CARENE | 1 |  |
| BETA_CARYOPHYLLENE | 2 |  |
| CARYOPHYLLENE_OXIDE | 3 |  |
| EUCALYPTOL | 4 |  |
| FENCHOL | 5 |  |
| ALPHA_HUMULENE | 6 |  |
| LIMONENE | 7 |  |
| LINALOOL | 8 |  |
| MYRCENE | 9 |  |
| ALPHA_OCIMENE | 10 |  |
| BETA_OCIMENE | 11 |  |
| ALPHA_PHELLANDRENE | 12 |  |
| ALPHA_PINENE | 13 |  |
| BETA_PINENE | 14 |  |
| ALPHA_TERPINEOL | 15 |  |
| ALPHA_TERPININE | 16 |  |
| GAMMA_TERPININE | 17 |  |
| TERPINOLENE | 18 |  |
