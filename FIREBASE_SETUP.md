# Firebase Setup Guide

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or select an existing project
3. Follow the setup wizard:
   - Enter a project name (e.g., "invito-compleanno")
   - Choose whether to enable Google Analytics (optional)
   - Click "Create project"

## Step 2: Set up Firestore Database

1. In the Firebase Console, click on "Firestore Database" in the left sidebar
2. Click "Create database"
3. Choose a starting mode:
   - **Test mode** (for development): Allows all reads and writes
   - **Production mode** (for production): Requires authentication
4. Select a Cloud Firestore location (choose one closest to your users)
5. Click "Enable"

## Step 3: Get Firebase Configuration

1. In the Firebase Console, click on the gear icon ⚙️ next to "Project Overview"
2. Select "Project settings"
3. Scroll down to "Your apps" section
4. Click on the web icon `</>` to add a web app
5. Register your app with a nickname (e.g., "Birthday Invitation")
6. You'll see the Firebase configuration object with these values:
   - API Key
   - Auth Domain
   - Project ID
   - Storage Bucket
   - Messaging Sender ID
   - App ID

## Step 4: Configure Environment Variables

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Open `.env.local` and replace the placeholder values with your actual Firebase configuration:
   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=your_actual_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   ```

## Step 5: Set Up Security Rules (Important!)

### For Development (Test Mode)
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /rsvps/{document} {
      allow read, write: if true;
    }
  }
}
```

### For Production (Recommended)
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /rsvps/{document} {
      // Allow anyone to create RSVP submissions
      allow create: if request.resource.data.keys().hasAll(['name', 'email', 'attendance']) &&
                       request.resource.data.name is string &&
                       request.resource.data.email is string &&
                       request.resource.data.attendance is string;
      
      // Only authenticated users can read, update, or delete
      allow read, update, delete: if request.auth != null;
    }
  }
}
```

To update security rules:
1. Go to Firestore Database in Firebase Console
2. Click on the "Rules" tab
3. Replace the existing rules with the appropriate rules above
4. Click "Publish"

## Step 6: View Submitted RSVPs

1. In the Firebase Console, go to "Firestore Database"
2. Click on the "Data" tab
3. You'll see a collection called "rsvps"
4. Click on it to view all submitted responses
5. Each document contains:
   - name
   - email
   - attendance
   - guests (if attending)
   - dietaryRestrictions (if attending)
   - message
   - submittedAt (timestamp)

## Step 7: Export RSVP Data (Optional)

To export your RSVP data:

1. In Firestore, you can manually export data or use the Firebase CLI
2. Install Firebase CLI: `npm install -g firebase-tools`
3. Login: `firebase login`
4. Export: `firebase firestore:export ./rsvp-backup`

Or you can view and manage data directly in the Firebase Console.

## Troubleshooting

### Issue: "Permission denied" error when submitting form
- **Solution**: Check that your Firestore security rules allow write access for the `rsvps` collection

### Issue: Firebase configuration not loading
- **Solution**: Make sure `.env.local` exists and all variables start with `NEXT_PUBLIC_`

### Issue: "Firebase: Firebase App named '[DEFAULT]' already exists"
- **Solution**: This is normal and handled by the code. The app checks if it's already initialized.

## Additional Features

### Email Notifications (Optional)
To receive email notifications when someone RSVPs, you can set up Firebase Cloud Functions or use a third-party service like:
- Firebase Extensions (Email on Firestore Write)
- Zapier integration
- Make.com (formerly Integromat)

### Authentication (Optional)
If you want to add an admin panel to view RSVPs:
1. Enable Firebase Authentication in the console
2. Add a login page
3. Protect admin routes with authentication
4. Create an admin dashboard to view/manage RSVPs
