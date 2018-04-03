---
domain: rfc.opencannabis.info
shortname: 8/OCS-P
name: OpenCannabis Pricing Extension
status: raw
editor: Randal Stevens <randy@bloombox.io>
contributors:
- Sam Gammon <sam@bloombox.io>
---

<a name="top"/>

# OpenCannabis: Pricing Extension
- Version `1.0`
- Status: `RAW`

### Status of this Memo

This specification's current status is considered `RAW`, i.e. pre-`DRAFT`. Distribution of this memo is unlimited.

### Abstract

This document describes an extension to the _OpenCannabis Specification, version 1_, that introduces pricing-related
definitions structures, and services that compose, create and reference pricing.

_"Pricing"_ in this context, refers to:
- Definitions of weights
- Structure for describing sales


### Table of Contents
- [Protocol Definition](#Protocol-Definition): `pricing`: Pricing schemes and structures.
    - [PricingDescriptor](#opencannabis.structs.pricing.PricingDescriptor)
    - [PricingTierAvailability](#opencannabis.structs.pricing.PricingTierAvailability)
    - [ProductPricing](#opencannabis.structs.pricing.ProductPricing)
    - [UnitPricingDescriptor](#opencannabis.structs.pricing.UnitPricingDescriptor)
    - [WeightedPricingDescriptor](#opencannabis.structs.pricing.WeightedPricingDescriptor)
    - [PricingType](#opencannabis.structs.pricing.PricingType)
    - [PricingWeightTier](#opencannabis.structs.pricing.PricingWeightTier)
    - [BOGODiscount](#opencannabis.structs.pricing.BOGODiscount)
    - [LoyaltyDiscount](#opencannabis.structs.pricing.LoyaltyDiscount)
    - [PercentageDiscount](#opencannabis.structs.pricing.PercentageDiscount)
    - [SaleDescriptor](#opencannabis.structs.pricing.SaleDescriptor)
    - [SaleType](#opencannabis.structs.pricing.SaleType)

----
## Protocol Definition
### `opencannabis.pricing`

{% nomnoml %}

#fill: #d5e7ee; #8ebff2
[PricingDescriptor
  | type:PricingType
  | unit:UnitPricingDescriptor
  | weighted:WeightedPricingDescriptor]

[PricingTierAvailability
  | offered:bool
  | available:bool]

[ProductPricing
  | discounts:SaleDescriptor
  | manifest:PricingDescriptor]

[UnitPricingDescriptor
  | price:opencannabis.commerce.CurrencyValue
  | status:PricingTierAvailability
  | discounts:SaleDescriptor]

[WeightedPricingDescriptor
  | weight:PricingWeightTier
  | tier:UnitPricingDescriptor
  | weight_in_grams:float]

{% endnomnoml %}

{% nomnoml %}

#fill: #d5e7ee; #8ebff2
[PricingType
  | UNIT:0
  | WEIGHTED:1]

[PricingWeightTier
  | OTHER:0
  | GRAM:1
  | HALFGRAM:2
  | QUARTERGRAM:3
  | DUB:4
  | EIGHTH:5
  | QUARTER:6
  | HALF:7
  | OUNCE:8
  | POUND:9
  | KILO:10
  | TON:11]

{% endnomnoml %}

{% nomnoml %}

#fill: #d5e7ee; #8ebff2
[BOGODiscount
  | trigger:uint32
  | reward:uint32]

[LoyaltyDiscount
  | trigger:uint32
  | reward:uint32]

[PercentDiscount
  | discount:uint32]

[SaleDescriptor
   type:SaleType
  | effective:opencannabis.temporal.Instant
  | expiration:opencannabis.temporal.Instant
  | percentage_off:PercentageDiscount
  | bogo:BOGODiscount
  | loyalty:LoyaltyDiscount]

[SaleType
  | PERCENTAGE_REDUCTION:0
  | VALUE_REDUCTION:1
  | BOGO:2
  | LOYALTY:3]
{% endnomnoml %}

### PricingDescriptor
Specifies a descriptor for product pricing, which specifies the price configuration for one independent price tier
in a given set of pricing tiers for a product.

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| type | [PricingType](#opencannabis.structs.pricing.PricingType) |  | Type of pricing tier this descriptor is specifying. |
| unit | [UnitPricingDescriptor](#opencannabis.structs.pricing.UnitPricingDescriptor) |  | Unit-based pricing information, with no variance in price change. |
| weighted | [WeightedPricingDescriptor](#opencannabis.structs.pricing.WeightedPricingDescriptor) |  | Weight-based pricing information, with prices assgined to specific or known weights. |


<a name="opencannabis.structs.pricing.PricingTierAvailability"/>

### PricingTierAvailability
Specifies availability and stock status flags for a particular pricing tier.

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| offered | [bool](#bool) |  | Specifies whether a particular pricing tier is offered at all. This would be interpreted to indicate whether a particular pricing tier is &#39;ever available&#39; or &#39;ever offered.&#39; |
| available | [bool](#bool) |  | Specifies whether a particular pricing tier is currently available. This would be interpreted to indicate whether a particular pricing tier is &#39;currently available,&#39; &#39;currently in stock,&#39; or &#39;currently offered.&#39; |


<a name="opencannabis.structs.pricing.ProductPricing"/>

### ProductPricing
Pricing manifest for a product, with the combined tiers and top-level discounts that are currently configured for a
given sellable material or unit of merchandise.

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| discounts | [SaleDescriptor](#opencannabis.structs.pricing.SaleDescriptor) | repeated | Discounts that should apply across all pricing tiers for the subject product. |
| manifest | [PricingDescriptor](#opencannabis.structs.pricing.PricingDescriptor) | repeated | Pricing tiers attached to this product pricing manifest. |


<a name="opencannabis.structs.pricing.UnitPricingDescriptor"/>

### UnitPricingDescriptor
Specifies pricing information for a unit-priced product, including the price value, tier status, and any discounts
that currently apply.

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| price | [opencannabis.commerce.CurrencyValue](#opencannabis.commerce.CurrencyValue) |  | Unit price value. |
| status | [PricingTierAvailability](#opencannabis.structs.pricing.PricingTierAvailability) |  | Availability flags for this unit-priced tier. |
| discounts | [SaleDescriptor](#opencannabis.structs.pricing.SaleDescriptor) | repeated | Discounts that should apply to this tier. |


<a name="opencannabis.structs.pricing.WeightedPricingDescriptor"/>

### WeightedPricingDescriptor
Specifies pricing information for a weight-priced product, at a particular weight tier, including the price value,
tier status, and, optionally, a custom weight.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| weight | [PricingWeightTier](#opencannabis.structs.pricing.PricingWeightTier) |  | Weight tier selection. |
| tier | [UnitPricingDescriptor](#opencannabis.structs.pricing.UnitPricingDescriptor) |  | Pricing descriptor for this tier, including the price value, status, and any discounts that should apply. |
| weight_in_grams | [float](#float) |  | Custom weight in grams, if any. |


<a name="opencannabis.structs.pricing.PricingType"/>

### PricingType
Enumerates supported pricing schemes. Defaults to &#39;UNIT&#39;-based pricing.

| Name | Number | Description |
| ---- | ------ | ----------- |
| UNIT | 0 | Cost-per-item based pricing scheme, where each product is priced individually, regardless of other attributes. For example, edibles or standard merchandise are purchased, at their price, &#34;each.&#34; |
| WEIGHTED | 1 | Cost-by-weight pricing scheme, where each product has multiple weight tiers, each priced individually. For example, standard retail flower pricing is weighted at 1g (one gram), 3.5g, 7g, 14g and 28g (one ounce). |


<a name="opencannabis.structs.pricing.PricingWeightTier"/>

### PricingWeightTier
Enumerates supported pricing tiers, when the &#39;WEIGHTED&#39; pricing scheme is in effect. Each known tier is enumerated,
with an additional defaulted option for &#39;OTHER,&#39; which would allow a custom weight to be assigned via some other
property or metric.

| Name | Number | Description |
| ---- | ------ | ----------- |
| OTHER | 0 | &#39;Other,&#39; or custom weighted pricing. |
| GRAM | 1 | Pricing for &#39;ONE GRAM&#39; of the subject material or merchandise. |
| HALFGRAM | 2 | Pricing for one &#39;HALF GRAM&#39; of the subject material or merchandise. Usually used only for extracts. |
| QUARTERGRAM | 3 | Pricing for one &#39;QUARTER GRAM&#39; of the subject material or merchandise. Usually used only for extracts. |
| DUB | 4 | Pricing for TWO GRAMS of the subject material or merchandise. Rarely used. |
| EIGHTH | 5 | Pricing for an &#39;EIGHTH&#39; of the subject material or merchandise, usually defined as 3-and-one-half grams. In some cases, providers may choose to define their &#39;EIGHTH&#39; weight value at 4 grams. This functionality is supported via partner or location-level settings. &#39;EIGHTH&#39; usually refers to an eighth-of-an-ounce. |
| QUARTER | 6 | Pricing for a &#39;QUARTER&#39; of the subject material or merchandise, usually defined as 7 grams. |
| HALF | 7 | Pricing for a &#39;HALF OUNCE&#39; of the subject material or merchandise. Usually defined as 14 grams. |
| OUNCE | 8 | Pricing for &#39;ONCE OUNCE&#39; of subject material or merchandise. Usually defined as 28 grams. |
| POUND | 9 | Pricing for &#39;ONE POUND&#39; of subject material or merchandise. |
| KILO | 10 | Pricing for &#39;ONE KILO&#39; of subject material or merchandise. |
| TON | 11 | Pricing for &#39;ONE TON&#39; of subject material or merchandise. |


<a name="structs/pricing/SaleDescriptor.proto"/>
<p align="right"><a href="#top">Top</a></p>

## structs/pricing/SaleDescriptor.proto


<a name="opencannabis.structs.pricing.BOGODiscount"/>

### BOGODiscount

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| trigger | [uint32](#uint32) |  |  |
| reward | [uint32](#uint32) |  |  |


<a name="opencannabis.structs.pricing.LoyaltyDiscount"/>

### LoyaltyDiscount

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| trigger | [uint32](#uint32) |  |  |
| reward | [uint32](#uint32) |  |  |


<a name="opencannabis.structs.pricing.PercentageDiscount"/>

### PercentageDiscount

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| discount | [uint32](#uint32) |  |  |


<a name="opencannabis.structs.pricing.SaleDescriptor"/>

### SaleDescriptor

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| type | [SaleType](#opencannabis.structs.pricing.SaleType) |  | sale metadata |
| effective | [opencannabis.temporal.Instant](#opencannabis.temporal.Instant) |  |  |
| expiration | [opencannabis.temporal.Instant](#opencannabis.temporal.Instant) |  |  |
| percentage_off | [PercentageDiscount](#opencannabis.structs.pricing.PercentageDiscount) |  |  |
| bogo | [BOGODiscount](#opencannabis.structs.pricing.BOGODiscount) |  |  |
| loyalty | [LoyaltyDiscount](#opencannabis.structs.pricing.LoyaltyDiscount) |  |  |


<a name="opencannabis.structs.pricing.SaleType"/>

### SaleType

| Name | Number | Description |
| ---- | ------ | ----------- |
| PERCENTAGE_REDUCTION | 0 |  |
| VALUE_REDUCTION | 1 |  |
| BOGO | 2 |  |
| LOYALTY | 3 |  |
