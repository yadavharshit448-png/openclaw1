# Google Play / EAS connection checklist

Required before automatic publishing can actually happen:

## Accounts
- Google Play Console developer account
- Expo account with access to EAS Build / Submit
- Optional GitHub repository for CI/CD

## Google Play API
- Enable Android Publisher API in Google Cloud
- Create a service account
- Grant the service account Play Console access
- Download service account JSON
- Store it as a secret in CI/CD

## Signing
Choose one:
- Let Play App Signing manage keys after initial upload
- Manage your own upload keystore and keep encrypted backups

## Listing assets required per app
- App title
- Short description
- Full description
- Privacy policy URL
- Feature graphic
- Screenshots
- Category
- Content rating questionnaire
- Data safety form answers
- Support email

## Secrets expected by CI/CD
- EXPO_TOKEN
- GOOGLE_SERVICE_ACCOUNT_JSON
- ANDROID_PACKAGE_NAME_PREFIX (optional)
- APPLE credentials not needed unless later expanding to iOS

## GitHub Actions setup for this repo
- Workflow file: `.github/workflows/eas-build-submit.yml`
- This repo is a factory monorepo, so builds must run inside `apps/<slug>/`
- Manual workflow runs should pass `app_path`, for example `apps/api-price-watch`
- Push-triggered runs try to detect the changed app directory automatically

## How to add the secrets in GitHub
1. Open `https://github.com/yadavharshit448-png/openclaw1/settings/secrets/actions`
2. Create `EXPO_TOKEN`
3. Create `GOOGLE_SERVICE_ACCOUNT_JSON` if you want Play internal submission
4. Re-run the EAS workflow manually after the secrets are saved

## Safe default publishing mode
Recommended first phase:
- build automatically
- submit to internal testing only
- require manual production promotion
