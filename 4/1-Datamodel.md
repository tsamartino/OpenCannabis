# Media Extension: Protocol Documentation
<a name="top"/>

## Table of Contents

- `media`: Images, video, documents, etc.
  - [MediaOrientation](#opencannabis.media.MediaOrientation)
  - [MediaKey](#opencannabis.media.MediaKey)
  - [DocumentType](#opencannabis.media.DocumentType)
  - [ImageType](#opencannabis.media.ImageType)
  - [MediaType](#opencannabis.media.MediaType)
  - [VideoType](#opencannabis.media.VideoType)
  - [DocumentType.DocumentKind](#opencannabis.media.DocumentType.DocumentKind)
  - [ImageType.ImageKind](#opencannabis.media.ImageType.ImageKind)
  - [MediaType.Kind](#opencannabis.media.MediaType.Kind)
  - [VideoType.VideoKind](#opencannabis.media.VideoType.VideoKind)
  - [MediaItem](#opencannabis.media.MediaItem)

----

## `opencannabis.media`

Specifies a type of media, device orientation, file-type and so on

{% nomnoml %}

#fill: #d5e7ee; #8ebff2
[MediaOrientation
 |  UP:0
 | DOWN:1
 | LEFT:2
 | RIGHT:3
 | UP_MIRRORED:4
 | DOWN_MIRRORED:5
 | LEFT_MIRRORED:6
 | RIGHT_MIRRORED:7]

[MediaKey
 | id: string]

[DocumentType
 | kind: DocumentType.DocumentKind
 | compressed: bool]

[ImageType
 | kind: ImageType.ImageKind]

[MediaType
 | kind: MediaType.Kind
 | image_type: ImageType
 | document_type: DocumentType
 | video_type: VideoType]

[VideoType
 | kind: VideoType.VideoKind]

{% endnomnoml %}


{% nomnoml %}

#fill: #d5e7ee; #8ebff2
[DocumentType:
 | TXT: 0
 | HTML: 1
 | PDF: 2
 | MARKDOWN: 3]

[ImageKind
 | PNG: 0
 | JPG: 1
 | GIF: 2
 | SVG: 3
 | WEBP: 4]

[MediaType
 | LINK: 0
 | IMAGE: 1
 | DOCUMENT: 2
 | VIDEO: 3]

[VideoType
 | MP4: 0
 | FLV: 1
 | HLS: 2]

[MediaItem
 | key: MediaKey
 | type: MediaType
 | name: string
 | uri: string]
{% endnomnoml %}

<p align="right"><a href="#top">Top</a></p>
<a name="media/MediaOrientation.proto"/>

### `MediaOrientation.Number`
Orientation status of a piece of media. Provided by camera operations on mobile devices,
in some cases, and also stored along with media sometimes.

| Name | Number | Description |
| ---- | ------ | ----------- |
| UP | 0 | Media is oriented &#39;up&#39;. |
| DOWN | 1 | Media is oriented &#39;down&#39;. |
| LEFT | 2 | Media is oriented &#39;left&#39;. |
| RIGHT | 3 | Media is oriented &#39;right&#39;. |
| UP_MIRRORED | 4 | Media is oriented &#39;up,&#39; and mirrored. |
| DOWN_MIRRORED | 5 | Media is oriented &#39;down,&#39; and mirrored. |
| LEFT_MIRRORED | 6 | Media is oriented &#39;left,&#39; and mirrored. |
| RIGHT_MIRRORED | 7 | Media is oriented &#39;right,&#39; and mirrored. |


<p align="right"><a href="#top">Top</a></p>
<a name="media/MediaKey.proto"/>

### `MediaKey.Type`
Key uniquely describing an item of media known to the system. An &#34;item of media&#34; can be anything from an image
or a video, to a PDF document, or larger data.

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| id | [string](#string) |  | Unique ID for this media item. |


<p align="right"><a href="#top">Top</a></p>
<a name="media/MediaType.proto"/>

## `MediaType`


<a name="opencannabis.media.DocumentType"/>

### `DocumentType.Type`
Specifies document type information.

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| kind | [DocumentType.DocumentKind](#opencannabis.media.DocumentType.DocumentKind) |  | Specifies the kind of document being attached or described. |
| compressed | [bool](#bool) |  | Specifies whether the attached document is compressed or not. |


<a name="opencannabis.media.ImageType"/>

### `ImageType.Type`
Specifies image type information.

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| kind | [ImageType.ImageKind](#opencannabis.media.ImageType.ImageKind) |  | Specifies the format of the attached or described image. |


<a name="opencannabis.media.MediaType"/>

### `MediaType.Type`
Specifies the type of media being attached or described.

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| kind | [MediaType.Kind](#opencannabis.media.MediaType.Kind) |  | Specifies the generic kind of media being described or attached. |
| image_type | [ImageType](#opencannabis.media.ImageType) |  | Specifies content for an image-based media item. |
| document_type | [DocumentType](#opencannabis.media.DocumentType) |  | Specifies content for a document-based media item. |
| video_type | [VideoType](#opencannabis.media.VideoType) |  | Specifies content for a video-based media item. |


<a name="opencannabis.media.VideoType"/>

### `VideoType.Type`
Specifies video type information.

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| kind | [VideoType.VideoKind](#opencannabis.media.VideoType.VideoKind) |  | Specifies the kind of video being attached or described. |


<a name="opencannabis.media.DocumentType.DocumentKind"/>

### `DocumentType.DocumentKind.Number`
Specifies kinds of documents that may be attached or described.

| Name | Number | Description |
| ---- | ------ | ----------- |
| TXT | 0 | Plaintext format. |
| HTML | 1 | HTML format. |
| PDF | 2 | PDF format. |
| MARKDOWN | 3 | Markdown format. |


<a name="opencannabis.media.ImageType.ImageKind"/>

### `ImageType.ImageKind.Number`
Specifies kinds of images that may be attached or described.

| Name | Number | Description |
| ---- | ------ | ----------- |
| PNG | 0 | PNG image. |
| JPG | 1 | JPG image. |
| GIF | 2 | GIF image. |
| SVG | 3 | SVG image. |
| WEBP | 4 | WEBP image. |


<a name="opencannabis.media.MediaType.Kind"/>

### `MediaType.Kind.Number`
Enumerates, in generic terms, the kinds of media that can be attached or described.

| Name | Number | Description |
| ---- | ------ | ----------- |
| LINK | 0 | Web link, or URI. |
| IMAGE | 1 | Image or photograph. |
| DOCUMENT | 2 | Document or text data. |
| VIDEO | 3 | Video data. |


<a name="opencannabis.media.VideoType.VideoKind"/>

### `VideoType.VideoKind.Number`
Specifies kinds of videos that may be attached or described.

| Name | Number | Description |
| ---- | ------ | ----------- |
| MP4 | 0 | MP4 video. |
| FLV | 1 | Flash video. |
| HLS | 2 | HTTP Live Streaming video. |


<p align="right"><a href="#top">Top</a></p>
<a name="media/MediaItem.proto"/>

### `MediaItem.Type`
Describes an individual media item, which can be an image, video, etc.

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| key | [MediaKey](#opencannabis.media.MediaKey) |  | Key uniquely identifying this media item. |
| type | [MediaType](#opencannabis.media.MediaType) |  | Type of media this is describing. |
| name | [string](#string) |  | Friendly name for this media. |
| uri | [string](#string) |  | Absolute URI to this media. |
