---
id: blob-size-limit-error
title: Troubleshoot blob size limit error
sidebar_label: Blob size limit error
description: BlobSizeLimitError occur as a result of sending a large payload to Temporal.
tags:
- troubleshooting
- error
---

The `BlobSizeLimitError` is an error that occurs when the size of a blob (payloads including Workflow context and each Workflow and Activity argument and return value) exceeds the set limit in Temporal.

- The max payload for a single request is 2 MB.
- The max size limit for any given [Event History](/concepts/what-is-an-event-history) transaction is 4 MB.

## Why does this error occur?

This error occurs when the size of the blob exceeds the maximum size allowed by Temporal.

This limit helps ensure that the Temporal Service prevents excessive resource usage and potential performance issues when handling large payloads.

## How do I resolve this error?

To resolve this error, reduce the size of the blob so that it is within the 4 MB limit.

There are multiple strategies you can use to avoid this error:

1. Use compression with a [custom payload codec](/concepts/what-is-a-custom-data-converter#payload-codec) for large payloads.
   - This addresses the immediate issue of the blob size limit; however, if blob sizes continue to grow this problem can arise again.

2. Break larger batches of commands into smaller batch sizes:
   - Workflow-level batching:
     1. Modify the Workflow to process Activities in smaller batches.
     2. Iterate through each batch, waiting for completion before moving to the next.
   - Workflow Task-level batching:
     1. Execute Activities in smaller batches within a single Workflow Task.
     2. Introduce brief pauses or sleeps (for example, 1ms) between batches.

3. Consider offloading large payloads to an object store (for example, Amazon S3) to reduce the risk of reaching blob size limits:
   1. Pass references to the stored payloads within the Workflow instead of the actual data.
   2. Retrieve the payloads from the object store when needed during execution.