import { RecommendationsRequest } from "@spotify/web-api-ts-sdk";
import { z } from "zod";

export const ZERO = 0;
export const ONE = 1;
export const HALF = 0.5;

const minMaxTriple = (min: number, max: number) =>
  z
    .tuple([
      z.number().min(min).max(max).optional(),
      z.number().min(min).max(max).optional(),
      z.number().min(min).max(max).optional(),
    ])
    .optional();

export const MIN_DANCEABILITY = 0;
export const MAX_DANCEABILITY = 1;
export const DEFAULT_TARGET_DANCEABILITY = 0.5;
export const MIN_ENERGY = 0;
export const MAX_ENERGY = 1;
export const DEFAULT_TARGET_ENERGY = 0.5;
export const MIN_ACOUSTICNESS = 0;
export const MAX_ACOUSTICNESS = 1;
export const DEFAULT_TARGET_ACOUSTICNESS = 0.5;
export const MIN_INSTRUMENTALNESS = 0;
export const MAX_INSTRUMENTALNESS = 1;
export const DEFAULT_TARGET_INSTRUMENTALNESS = 0.5;
export const MIN_LIVENESS = 0;
export const MAX_LIVENESS = 1;
export const DEFAULT_TARGET_LIVENESS = 0.5;
export const MIN_VALENCE = 0;
export const MAX_VALENCE = 1;
export const DEFAULT_TARGET_VALENCE = 0.5;
export const MIN_SPEECHINESS = 0;
export const MAX_SPEECHINESS = 1;
export const DEFAULT_TARGET_SPEECHINESS = 0.5;
export const MIN_DURATION_MS = 0;
export const MAX_DURATION_MS = 3600000;
export const DEFAULT_TARGET_DURATION_MS = 1800000;
export const MIN_KEY = 0;
export const MAX_KEY = 11;
export const DEFAULT_TARGET_KEY = 5;
export const MIN_LOUDNESS = -60;
export const MAX_LOUDNESS = 0;
export const DEFAULT_TARGET_LOUDNESS = -30;
export const MIN_POPULARITY = 0;
export const MAX_POPULARITY = 100;
export const DEFAULT_TARGET_POPULARITY = 50;
export const MIN_TEMPO = 0;
export const MAX_TEMPO = 200;
export const DEFAULT_TARGET_TEMPO = 120;
export const MIN_TIME_SIGNATURE = 3;
export const MAX_TIME_SIGNATURE = 7;
export const DEFAULT_TARGET_TIME_SIGNATURE = 4;

export const SchemaRecommendationForm = z.object({
  seedTrackId: z.string(),
  mode: z.enum(["major", "minor"]).optional(),
  danceability: minMaxTriple(MIN_DANCEABILITY, MAX_DANCEABILITY),
  energy: minMaxTriple(MIN_ENERGY, MAX_ENERGY),
  acousticness: minMaxTriple(MIN_ACOUSTICNESS, MAX_ACOUSTICNESS),
  instrumentalness: minMaxTriple(MIN_INSTRUMENTALNESS, MAX_INSTRUMENTALNESS),
  liveness: minMaxTriple(MIN_LIVENESS, MAX_LIVENESS),
  valence: minMaxTriple(MIN_VALENCE, MAX_VALENCE),
  speechiness: minMaxTriple(MIN_SPEECHINESS, MAX_SPEECHINESS),
  duration: minMaxTriple(MIN_DURATION_MS, MAX_DURATION_MS),
  key: minMaxTriple(MIN_KEY, MAX_KEY),
  loudness: minMaxTriple(MIN_LOUDNESS, MAX_LOUDNESS),
  popularity: minMaxTriple(MIN_POPULARITY, MAX_POPULARITY),
  tempo: minMaxTriple(MIN_TEMPO, MAX_TEMPO),
  timeSignature: minMaxTriple(MIN_TIME_SIGNATURE, MAX_TIME_SIGNATURE),
  // releasedSince: z.string().date().optional(),
});

export type RecommendationFormDto = z.infer<typeof SchemaRecommendationForm>;

const undefinedIfDefault = (value: number | undefined, defaultValue: number) =>
  value === defaultValue ? undefined : value;

export const formDtoToRecommendationsRequest = (
  form: RecommendationFormDto
): RecommendationsRequest => {
  return {
    seed_tracks: [form.seedTrackId],
    min_mode: form.mode === "minor" ? ZERO : ONE,
    max_mode: form.mode === "minor" ? ZERO : ONE,
    min_danceability: undefinedIfDefault(
      form.danceability?.[0],
      MIN_DANCEABILITY
    ),
    target_danceability: undefinedIfDefault(
      form.danceability?.[1],
      DEFAULT_TARGET_DANCEABILITY
    ),
    max_danceability: undefinedIfDefault(
      form.danceability?.[2],
      MAX_DANCEABILITY
    ),
    min_energy: undefinedIfDefault(form.energy?.[0], MIN_ENERGY),
    target_energy: undefinedIfDefault(form.energy?.[1], DEFAULT_TARGET_ENERGY),
    max_energy: undefinedIfDefault(form.energy?.[2], MAX_ENERGY),
    min_acousticness: undefinedIfDefault(
      form.acousticness?.[0],
      MIN_ACOUSTICNESS
    ),
    target_acousticness: undefinedIfDefault(
      form.acousticness?.[1],
      DEFAULT_TARGET_ACOUSTICNESS
    ),
    max_acousticness: undefinedIfDefault(
      form.acousticness?.[2],
      MAX_ACOUSTICNESS
    ),
    min_instrumentalness: undefinedIfDefault(
      form.instrumentalness?.[0],
      MIN_INSTRUMENTALNESS
    ),
    target_instrumentalness: undefinedIfDefault(
      form.instrumentalness?.[1],
      DEFAULT_TARGET_INSTRUMENTALNESS
    ),
    max_instrumentalness: undefinedIfDefault(
      form.instrumentalness?.[2],
      MAX_INSTRUMENTALNESS
    ),
    min_liveness: undefinedIfDefault(form.liveness?.[0], MIN_LIVENESS),
    target_liveness: undefinedIfDefault(
      form.liveness?.[1],
      DEFAULT_TARGET_LIVENESS
    ),
    max_liveness: undefinedIfDefault(form.liveness?.[2], MAX_LIVENESS),
    min_valence: undefinedIfDefault(form.valence?.[0], MIN_VALENCE),
    target_valence: undefinedIfDefault(
      form.valence?.[1],
      DEFAULT_TARGET_VALENCE
    ),
    max_valence: undefinedIfDefault(form.valence?.[2], MAX_VALENCE),
    min_speechiness: undefinedIfDefault(form.speechiness?.[0], MIN_SPEECHINESS),
    target_speechiness: undefinedIfDefault(
      form.speechiness?.[1],
      DEFAULT_TARGET_SPEECHINESS
    ),
    max_speechiness: undefinedIfDefault(form.speechiness?.[2], MAX_SPEECHINESS),
    min_duration_ms: undefinedIfDefault(form.duration?.[0], MIN_DURATION_MS),
    target_duration_ms: undefinedIfDefault(
      form.duration?.[1],
      DEFAULT_TARGET_DURATION_MS
    ),
    max_duration_ms: undefinedIfDefault(form.duration?.[2], MAX_DURATION_MS),
    min_key: undefinedIfDefault(form.key?.[0], MIN_KEY),
    target_key: undefinedIfDefault(form.key?.[1], DEFAULT_TARGET_KEY),
    max_key: undefinedIfDefault(form.key?.[2], MAX_KEY),
    min_loudness: undefinedIfDefault(form.loudness?.[0], MIN_LOUDNESS),
    target_loudness: undefinedIfDefault(
      form.loudness?.[1],
      DEFAULT_TARGET_LOUDNESS
    ),
    max_loudness: undefinedIfDefault(form.loudness?.[2], MAX_LOUDNESS),
    min_popularity: undefinedIfDefault(form.popularity?.[0], MIN_POPULARITY),
    target_popularity: undefinedIfDefault(
      form.popularity?.[1],
      DEFAULT_TARGET_POPULARITY
    ),
    max_popularity: undefinedIfDefault(form.popularity?.[2], MAX_POPULARITY),
    min_tempo: undefinedIfDefault(form.tempo?.[0], MIN_TEMPO),
    target_tempo: undefinedIfDefault(form.tempo?.[1], DEFAULT_TARGET_TEMPO),
    max_tempo: undefinedIfDefault(form.tempo?.[2], MAX_TEMPO),
    min_time_signature: undefinedIfDefault(
      form.timeSignature?.[0],
      MIN_TIME_SIGNATURE
    ),
    target_time_signature: undefinedIfDefault(
      form.timeSignature?.[1],
      DEFAULT_TARGET_TIME_SIGNATURE
    ),
    max_time_signature: undefinedIfDefault(
      form.timeSignature?.[2],
      MAX_TIME_SIGNATURE
    ),
  };
};
