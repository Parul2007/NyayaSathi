To fix the "CORS" error when uploading files, you need to apply the configuration I created in `cors.json` to your Firebase Storage bucket.

**Run this command in your terminal (if you have gsutil installed) or Google Cloud Shell:**

```bash
gsutil cors set cors.json gs://gen-lang-client-0471923134.firebasestorage.app
```

OR if you have the `gcloud` CLI:

```bash
gcloud storage buckets update gs://gen-lang-client-0471923134.firebasestorage.app --cors-file=cors.json
```

If you don't have these tools, you can go to the [Google Cloud Console](https://console.cloud.google.com/storage/browser/gen-lang-client-0471923134.firebasestorage.app), verify the bucket permission settings, or use the cloud shell icon in the top right to run the command.
