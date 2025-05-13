import type { FirebaseConfig } from "../types/firebase/config";

import { type FirebaseApp, deleteApp, initializeApp } from "firebase/app";
import { FirebaseError } from "firebase/app";

let app: FirebaseApp | null = null;

/**
 * Initializes the Firebase app with the given configuration.
 *
 * @param config - The Firebase configuration.
 *
 * @returns The initialized Firebase app.
 */
function init(config: FirebaseConfig) {
  if (app) return app;

  try {
    app = initializeApp(config);
  } catch (error) {
    if (error instanceof FirebaseError) {
      throw new Error(`x Firebase initialization error: ${error.message}`);
    }

    throw new Error(`x Firebase initialization unexpected error: ${error}`);
  }

  return app;
}

/**
 * Destroys the Firebase app.
 *
 * @returns A promise that resolves when the app is destroyed.
 */
async function destroy() {
  if (!app) return;

  try {
    await deleteApp(app);
  } catch (error) {
    if (error instanceof FirebaseError) {
      throw new Error(`x Firebase destruction error: ${error.message}`);
    }

    throw new Error(`x Firebase destruction unexpected error: ${error}`);
  }
}

export { init, destroy };
