import { auth, defineMcp } from "@lovable.dev/mcp-js";
import listExerciseCategories from "./tools/list-exercise-categories";
import listExerciseItems from "./tools/list-exercise-items";
import logPracticeSession from "./tools/log-practice-session";
import listPracticeSessions from "./tools/list-practice-sessions";

const projectRef = import.meta.env.VITE_SUPABASE_PROJECT_ID ?? "project-ref-unset";

export default defineMcp({
  name: "vast-speech-therapy",
  title: "VAST Speech Therapy",
  version: "0.1.0",
  instructions:
    "Tools for VAST Speech, a bilingual Arabic/French speech rehabilitation app for Broca aphasia. Use list_exercise_categories and list_exercise_items to browse the therapy catalog, log_practice_session to record a completed practice for the signed-in patient, and list_practice_sessions to review their history.",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated",
  }),
  tools: [listExerciseCategories, listExerciseItems, logPracticeSession, listPracticeSessions],
});
