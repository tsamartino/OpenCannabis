---
domain: rfc.opencannabis.info
shortname: 6/OCS-C
name: OpenCannabis Commerce Extension
status: raw
editor: Randal Stevens <randy@bloombox.io>
contributors:
- Sam Gammon <sam@bloombox.io>
---

# OpenCannabis: Commerce Extension
- Version `1.0`
- Status: `RAW`

### Status of this Memo

This specification's current status is considered `RAW`, i.e. pre-`DRAFT`. Distribution of this memo is unlimited.

### Abstract
This document describes an extension to the _OpenCannabis Specification, version 1_, that introduces commerce-
related structures, protocols, statuses, types, and so on.

_"Commerce"_ in this context, refers to:
- Structures for discounts 
- Items
- Orders
- Currencies 
- Product Variants
- Scheduling

### Table of Contents
- [Protocol Definition](#Protocol-Definition): `commerce`: Commercial ordering and fulfillment structures.
    - [Discount](#opencannabis.commerce.Discount)
    - [DiscountSpec](#opencannabis.commerce.DiscountSpec)
    - [DiscountBasis](#opencannabis.commerce.DiscountBasis)
    - [DiscountType](#opencannabis.commerce.DiscountType)
    - [DeliveryDestination](#opencannabis.commerce.DeliveryDestination)
    - [Customer](#opencannabis.commerce.Customer)
    - [Item](#opencannabis.commerce.Item)
    - [VariantSpec](#opencannabis.commerce.VariantSpec)  
    - [ProductVariant](#opencannabis.commerce.ProductVariant)
    - [Order](#opencannabis.commerce.Order)
    - [OrderKey](#opencannabis.commerce.OrderKey)
    - [OrderScheduling](#opencannabis.commerce.OrderScheduling)
    - [StatusCheckin](#opencannabis.commerce.StatusCheckin)
    - [OrderStatus](#opencannabis.commerce.OrderStatus)
    - [OrderType](#opencannabis.commerce.OrderType)
    - [SchedulingType](#opencannabis.commerce.SchedulingType)
    - [CurrencyValue](#opencannabis.commerce.CurrencyValue)
    - [CurrencyType](#opencannabis.commerce.CurrencyType)
    - [FiatCurrency](#opencannabis.commerce.FiatCurrency)

----

## Protocol Definition
### `opencannabis.commerce`
Specifies a commercial discount structure, order structure, product variance, currency type, etc.

{% nomnoml %}

#fill: #d5e7ee; #8ebff2

[Discount
  | id:string
  | spec:DiscountSpec
  | name:string
  | label:string
  | description:string
  | modified_at:opencannabis.temporal.Instant
  | created_at:opencannabis.temporal.Instant]

[DiscountSpec
  | type:DiscountType
  | basis:DiscountBasis
  | percentage:double
  | static_value:double]

[DiscountBasics
  | ITEM:0
  | ORDER_SUBTOTAL:1
  | ORDER_TOTAL:2]

[DiscountType
  | CUSTOM:0
  | STATUTORY:1
  | COMMERCIAL:2]

{% endnomnoml %}

{% nomnoml %}

#fill: #d5e7ee; #8ebff2

[DeliveryDestination
  | address:opencannabis.geo.Address
  | instructions:string]

[Customer
  | person:opencannabis.person.Person
  | foreign_id:string
  | user_key:string]

[Item
  | key:opencannabis.base.ProductKey
  | variant:VariantSpec
  | count:uint32]

[VariantSpec
  | variant:ProductVariant
  | weight:opencannabis.structs.pricing.PricingWeightTier
  | size:string
  | color:string]

[Product Variant
  | WEIGHT:0
  | COLOR:1
  | SIZE:2]

{% endnomnoml %}

{% nomnoml %}

#fill: #d5e7ee; #8ebff2

[Order
  | id:string
  | type:OrderType
  | status:OrderStatus
  | customer:Customer
  | scheduling:OrderScheduling
  | destination:DeliveryDestination
  | notes:string
  | item:Item
  | action_log:StatusCheckin
  | created_at:opencannabis.temporal.Instant
  | subtotal:double
  | updated_at:opencannabis.temporal.Instant
  | sid:string]

[OrderKey
  | id:string]

[OrderScheduling
  | scheduling:SchedulingType
  | desired_time:opencannabis.temporal.Instant]

{% endnomnoml %}


{% nomnoml %}

#fill: #d5e7ee; #8ebff2
[StatusCheckin
  | status:OrderStatus
  | instant:opencannabis.temporal.Instant
  | message:string]

[OrderStatus
  | PENDING:0
  | APPROVED:1
  | REJECTED:2
  | ASSIGNED:3
  | EN_ROUTE:4
  | FULFILLED:5]

[OrderType
  | PICKUP:0
  | DELIVERY:1]

[SchedulingType
  | ASAP:0
  | TIMED:1]

{% endnomnoml %}


{% nomnoml %}

#fill: #d5e7ee; #8ebff2

[CurrencyValue
  | value:float
  | type:CurrencyType
  | fiat:FiatCurrency
  | custom:string]

[CurrencyType
  | FIAT:0
  | REAL:1
  | CRYPTO:2]

[FiatCurrency
  | USD:0]

{% endnomnoml %}


<p align="right"><a href="#top">Top</a></p>
<a name="commerce/Discounts.proto"/>

### Discount
Specifies a discount to be applied during a purchase or order.

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| id | [string](#string) |  | ID code for this discount entry. |
| spec | [DiscountSpec](#opencannabis.commerce.DiscountSpec) |  | Specification for how this discount behaves. |
| name | [string](#string) |  | Back-office name for this tax. |
| label | [string](#string) |  | User-visible name for this tax. |
| description | [string](#string) |  | Narrative description for this discount, to be displayed to back-office and end-users in some special circumstances. |
| modified_at | [opencannabis.temporal.Instant](#opencannabis.temporal.Instant) |  | Last time this discount was modified. |
| created_at | [opencannabis.temporal.Instant](#opencannabis.temporal.Instant) |  | When this discount was created. |


<a name="opencannabis.commerce.DiscountSpec"/>

### DiscountSpec
Specifies the concept of a discount, and how it is set to behave.

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| type | [DiscountType](#opencannabis.commerce.DiscountType) |  | Type of discount to apply. |
| basis | [DiscountBasis](#opencannabis.commerce.DiscountBasis) |  | Basis to form when calculating the discount. |
| percentage | [double](#double) |  | Percentage rate for the discount. |
| static_value | [double](#double) |  | Flat rate for the discount. |


<a name="opencannabis.commerce.DiscountBasis"/>

### DiscountBasis
Enumerates operational calculation modes for discounts.

| Name | Number | Description |
| ---- | ------ | ----------- |
| ITEM | 0 | The discount is calculated per-item. |
| ORDER_SUBTOTAL | 1 | The discount is calculated from the order subtotal, before tax. |
| ORDER_TOTAL | 2 | The discount is calculated from the order total, after tax. |


<a name="opencannabis.commerce.DiscountType"/>

### DiscountType
Enumerates types of discounts that may be applied.

| Name | Number | Description |
| ---- | ------ | ----------- |
| CUSTOM | 0 | Some custom discount applied at the time of purchase. |
| STATUTORY | 1 | Statutorily-mandated discount, for instance, for medical-only patients. |
| COMMERCIAL | 2 | Commercial discount, for instance, for vendors, brand ambassadors, and staff. |


<p align="right"><a href="#top">Top</a></p>
<a name="commerce/Delivery.proto"/>

### DeliveryDestination
Specifies the location to deliver the order.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| address | [opencannabis.geo.Address](#opencannabis.geo.Address) |  | Location/address to send a delivery order. |
| instructions | [string](#string) |  | Special delivery instructions |


<p align="right"><a href="#top">Top</a></p>
<a name="commerce/Customer.proto"/>

### Customer
Customer identity.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| person | [opencannabis.person.Person](#opencannabis.person.Person) |  | Person attached to this customer. |
| foreign_id | [string](#string) |  | Partner-scoped foreign system ID. |
| user_key | [string](#string) |  | Resolved subject user key. |


<p align="right"><a href="#top">Top</a></p>
<a name="commerce/Item.proto"/>

### Item
Specifies the Item via the product key as well as weight, and count of product ordered

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| key | [opencannabis.base.ProductKey](#opencannabis.base.ProductKey) |  | Key for the item, which is the type and ID, combined. |
| variant | [VariantSpec](#opencannabis.commerce.VariantSpec) | repeated | Variance specifications for this item. |
| count | [uint32](#uint32) |  | Count of this item requested. |


<a name="opencannabis.commerce.VariantSpec"/>

### VariantSpec
Specifies if it is a weighted product or a unit priced product and attaches that to item.

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| variant | [ProductVariant](#opencannabis.commerce.ProductVariant) |  | Specifies the variance type for this spec. |
| weight | [opencannabis.structs.pricing.PricingWeightTier](#opencannabis.structs.pricing.PricingWeightTier) |  | Specifies a product weight, when varying by weight. |
| size | [string](#string) |  | Specifies a size option for the product. |
| color | [string](#string) |  | Specifies a color option for the product. |


<a name="opencannabis.commerce.ProductVariant"/>

### ProductVariant
Specifies weight and price of  ordered product

| Name | Number | Description |
| ---- | ------ | ----------- |
| WEIGHT | 0 | Variance by product weight. |
| COLOR | 1 | Variance by product color. |
| SIZE | 2 | Variance by product size. |


<p align="right"><a href="#top">Top</a></p>
<a name="commerce/Order.proto"/>

### Order
Represents a full order submitted to the server for fulfillment, from an end-user, for delivery or express pickup.

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| id | [string](#string) |  | ID assigned to the order by the server, and potentially nominated by the client. |
| type | [OrderType](#opencannabis.commerce.OrderType) |  | Type of order requested - either PICKUP or DELIVERY. |
| status | [OrderStatus](#opencannabis.commerce.OrderStatus) |  | Current status of this order. |
| customer | [Customer](#opencannabis.commerce.Customer) |  | Customer that submitted this order. |
| scheduling | [OrderScheduling](#opencannabis.commerce.OrderScheduling) |  | Scheduling spec for this order. |
| destination | [DeliveryDestination](#opencannabis.commerce.DeliveryDestination) |  | Location for delivery, if applicable. |
| notes | [string](#string) |  | User-provided notes or questions, if any. |
| item | [Item](#opencannabis.commerce.Item) | repeated | Items being ordered. |
| action_log | [StatusCheckin](#opencannabis.commerce.StatusCheckin) | repeated | Actions taken on this order. |
| created_at | [opencannabis.temporal.Instant](#opencannabis.temporal.Instant) |  | When this order was created. |
| subtotal | [double](#double) |  | Order subtotal. |
| updated_at | [opencannabis.temporal.Instant](#opencannabis.temporal.Instant) |  | When this order was created. |
| sid | [string](#string) |  | Session ID that was active when this order was submitted. |


<a name="opencannabis.commerce.OrderKey"/>

### OrderKey
Specifies a unique key for a commercial order.

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| id | [string](#string) |  | Order ID, assigned by the server upon creation. |


<a name="opencannabis.commerce.OrderScheduling"/>

### OrderScheduling
Specifies the desired timing of the delivery order.

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| scheduling | [SchedulingType](#opencannabis.commerce.SchedulingType) |  | Scheduling type, either &#39;ASAP&#39; or a target time. |
| desired_time | [opencannabis.temporal.Instant](#opencannabis.temporal.Instant) |  | Desired delivery time, if specified. |


<a name="opencannabis.commerce.StatusCheckin"/>

### StatusCheckin
Specifies a moment at which an order changed status, when it happened, and, optionally, why.

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| status | [OrderStatus](#opencannabis.commerce.OrderStatus) |  | Status the order moved to. |
| instant | [opencannabis.temporal.Instant](#opencannabis.temporal.Instant) |  | Instant the order was moved to this status. |
| message | [string](#string) |  | Message or reason given for this status change, if any. |


<a name="opencannabis.commerce.OrderStatus"/>

### OrderStatus
Enumeration for current status of order

| Name | Number | Description |
| ---- | ------ | ----------- |
| PENDING | 0 | Order has been submitted and is not yet approved. |
| APPROVED | 1 | Order has been approved for fulfillment. |
| REJECTED | 2 | Order could not be fulfilled for some reason. |
| ASSIGNED | 3 | Order has been assigned. |
| EN_ROUTE | 4 | Order is en-route to the user (for delivery). |
| FULFILLED | 5 | Order has been fulfilled and is considered complete. |


<a name="opencannabis.commerce.OrderType"/>

### OrderType
Specifies the type of order requested.

| Name | Number | Description |
| ---- | ------ | ----------- |
| PICKUP | 0 | Express pickup order. |
| DELIVERY | 1 | Delivery order. |


<a name="opencannabis.commerce.SchedulingType"/>

### SchedulingType
Specifies the types of delivery timing.

| Name | Number | Description |
| ---- | ------ | ----------- |
| ASAP | 0 | As soon as possible. |
| TIMED | 1 | Desired time. |


<p align="right"><a href="#top">Top</a></p>
<a name="commerce/Currency.proto"/>

### CurrencyValue
Specifies a value, with a particular currency specification as the unit.

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| value | [float](#float) |  | Numeric amount value to specify. |
| type | [CurrencyType](#opencannabis.commerce.CurrencyType) |  | Categorical or general type for the specified currency. |
| fiat | [FiatCurrency](#opencannabis.commerce.FiatCurrency) |  | Fiat currency selection for a given currency value. |
| custom | [string](#string) |  | Custom currency, by name or symbol, for a given currency value. |


<a name="opencannabis.commerce.CurrencyType"/>

### CurrencyType
Specifies known or explicitly supported currency types.

| Name | Number | Description |
| ---- | ------ | ----------- |
| FIAT | 0 | Fiat-based currency, such as the US Dollar. |
| REAL | 1 | Real currency, such as gold or other raw materials. |
| CRYPTO | 2 | Crypto-currency, based on unique cryptographic signatures or proof-of-work. |


<a name="opencannabis.commerce.FiatCurrency"/>

### FiatCurrency
Specifies known or explicitly supported fiat currencies.

| Name | Number | Description |
| ---- | ------ | ----------- |
| USD | 0 | Specifies &#39;US Dollar&#39; as a currency. |
