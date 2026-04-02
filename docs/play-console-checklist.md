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

## Safe default publishing mode
Recommended first phase:
- build automatically
- submit to internal testing only
- require manual production promotion
