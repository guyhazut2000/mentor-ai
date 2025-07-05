export {};

declare global {
  interface CustomJwtSessionClaims {
    publicMetadata: {
      onboardingComplete?: boolean;
    };
    privateMetadata: {
      role?: "mentor" | "mentee" | "admin";
      level?: "beginner" | "intermediate" | "advanced";
      credits?: number;
    };
  }
}
