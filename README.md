# Pooja Panchang Proxy

This small Node.js service keeps the Navamsha API key on the server. The Android app / WebView calls this proxy; it must **never** contain the API key.

## Required environment variables

Set these in your hosting provider's dashboard as secrets/environment variables:

- `NAVAMSHA_API_KEY` — your Navamsha API key
- `NAVAMSHA_API_URL` — the exact Navamsha API request URL used in your successful Hoppscotch test

Do not put either value in GitHub files. Do not send the API key in chat or screenshots.

## Deploy

Deploy this repository as a Node.js web service using:

- Build command: `npm install`
- Start command: `npm start`

The host must support Node.js 18 or newer.

## Test

Open the deployed service root URL. It should return:

```json
{"ok":true,"service":"Pooja Panchang Proxy"}
```

The app sends a POST request to:

`https://YOUR-SERVICE-DOMAIN/api/panchangam`

with the same JSON request body used in the successful Hoppscotch test. The proxy forwards it to `NAVAMSHA_API_URL` and adds the `X-API-Key` header server-side.

## Security notes

- Never commit the API key or `.env` file to GitHub.
- Use a fresh API key if an earlier key was exposed in a screenshot.
- This proxy is for the panchang API only; it does not upload or sync local pooja booking data.
