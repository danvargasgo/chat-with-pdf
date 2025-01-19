import {initializeApp, getApps, App, getApp, cert, ServiceAccount} from "firebase-admin/app";
import {getFirestore} from "firebase-admin/firestore";
import {getStorage} from "firebase-admin/storage";

import { SecretManagerServiceClient } from '@google-cloud/secret-manager';

let app: App;
let serviceKey;

const client = new SecretManagerServiceClient();

async function accessSecret() {
  const [version] = await client.accessSecretVersion({
    name: 'projects/514252692424/secrets/service_key/versions/latest',
  });

  serviceKey = JSON.parse(version.payload!.data!.toString());
}

accessSecret();

if (getApps().length === 0) {
  app = initializeApp({
    credential: cert(serviceKey! as ServiceAccount),
  });
} else {
    app = getApp();
}

const adminDb = getFirestore(app);
const adminStorage = getStorage(app);

export { app as adminApp, adminDb, adminStorage };
