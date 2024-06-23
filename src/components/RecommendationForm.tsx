import { zodResolver } from "@hookform/resolvers/zod";
import {
  Accordion,
  Button,
  Divider,
  FormControlLabel,
  Grid,
  Paper,
  Stack,
  Switch,
  ToggleButton,
  Typography,
} from "@mui/material";
import { SpotifyApi } from "@spotify/web-api-ts-sdk";
import { useForm } from "react-hook-form";
import {
  DEFAULT_TARGET_DANCEABILITY,
  MAX_DANCEABILITY,
  MIN_DANCEABILITY,
  MIN_ENERGY,
  MAX_ENERGY,
  DEFAULT_TARGET_ENERGY,
  MIN_ACOUSTICNESS,
  MAX_ACOUSTICNESS,
  DEFAULT_TARGET_ACOUSTICNESS,
  MIN_INSTRUMENTALNESS,
  MAX_INSTRUMENTALNESS,
  DEFAULT_TARGET_INSTRUMENTALNESS,
  MIN_LIVENESS,
  MAX_LIVENESS,
  DEFAULT_TARGET_LIVENESS,
  MIN_VALENCE,
  MAX_VALENCE,
  DEFAULT_TARGET_VALENCE,
  MIN_SPEECHINESS,
  MAX_SPEECHINESS,
  DEFAULT_TARGET_SPEECHINESS,
  MIN_DURATION_MS,
  MAX_DURATION_MS,
  DEFAULT_TARGET_DURATION_MS,
  MIN_KEY,
  MAX_KEY,
  DEFAULT_TARGET_KEY,
  MIN_LOUDNESS,
  MAX_LOUDNESS,
  DEFAULT_TARGET_LOUDNESS,
  MIN_POPULARITY,
  MAX_POPULARITY,
  DEFAULT_TARGET_POPULARITY,
  MIN_TEMPO,
  MAX_TEMPO,
  DEFAULT_TARGET_TEMPO,
  MIN_TIME_SIGNATURE,
  MAX_TIME_SIGNATURE,
  DEFAULT_TARGET_TIME_SIGNATURE,
  RecommendationFormDto,
  SchemaRecommendationForm,
} from "../types/form";
import { MinMaxTargetSlider } from "./MinMaxTargetSlider";
import { TrackSearchBar } from "./TrackSearchBar";
import { DatePicker } from "@mui/x-date-pickers";
import {
  formatDuration,
  formatISODuration,
  subDays,
  subMonths,
  subYears,
} from "date-fns";
import { LoadingButton } from "@mui/lab";

const SliderItem = ({
  name,
  label,
  control,
  minValue,
  maxValue,
  defaultTarget,
  step = undefined,
  valueFormat = undefined,
}: {
  name: string;
  label: string;
  control: any;
  minValue: number;
  maxValue: number;
  defaultTarget: number;
  step?: number;
  valueFormat?: (value: number) => string;
}) => (
  <Grid item xs={12} sm={6} md={4} lg={3}>
    <Accordion>
      <MinMaxTargetSlider
        id={name}
        name={name}
        label={label}
        minValue={minValue}
        maxValue={maxValue}
        defaultTarget={defaultTarget}
        control={control}
        step={step}
        valueFormat={valueFormat}
      />
    </Accordion>
  </Grid>
);

export const RecommendationForm = ({
  sdk,
  isLoading,
  onsubmit: onSubmit,
}: {
  sdk: SpotifyApi;
  isLoading: boolean;
  onsubmit: (data: RecommendationFormDto) => void;
}) => {
  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<RecommendationFormDto>({
    resolver: zodResolver(SchemaRecommendationForm),
  });

  if (errors) {
    console.log("errors", errors);
  }

  const seedTrackId = register("seedTrackId", { required: true });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2} alignItems={"center"}>
        <Grid item xs={12}>
          <TrackSearchBar
            sdk={sdk}
            name={seedTrackId.name}
            onFieldChange={seedTrackId.onChange}
            onFieldBlur={seedTrackId.onBlur}
          />
          {errors.seedTrackId && errors.seedTrackId.type === "required" && (
            <span>This is required</span>
          )}
        </Grid>
        <Grid item container spacing={2} alignItems={"center"}>
          <SliderItem
            name="danceability"
            label="Danceability"
            control={control}
            minValue={MIN_DANCEABILITY}
            maxValue={MAX_DANCEABILITY}
            defaultTarget={DEFAULT_TARGET_DANCEABILITY}
          />
          <SliderItem
            name="energy"
            label="Energy"
            control={control}
            minValue={MIN_ENERGY}
            maxValue={MAX_ENERGY}
            defaultTarget={DEFAULT_TARGET_ENERGY}
          />
          <SliderItem
            name="acousticness"
            label="Acousticness"
            control={control}
            minValue={MIN_ACOUSTICNESS}
            maxValue={MAX_ACOUSTICNESS}
            defaultTarget={DEFAULT_TARGET_ACOUSTICNESS}
          />
          <SliderItem
            name="instrumentalness"
            label="Instrumentalness"
            control={control}
            minValue={MIN_INSTRUMENTALNESS}
            maxValue={MAX_INSTRUMENTALNESS}
            defaultTarget={DEFAULT_TARGET_INSTRUMENTALNESS}
          />
          <SliderItem
            name="liveness"
            label="Liveness"
            control={control}
            minValue={MIN_LIVENESS}
            maxValue={MAX_LIVENESS}
            defaultTarget={DEFAULT_TARGET_LIVENESS}
          />
          <SliderItem
            name="valence"
            label="Valence"
            control={control}
            minValue={MIN_VALENCE}
            maxValue={MAX_VALENCE}
            defaultTarget={DEFAULT_TARGET_VALENCE}
          />
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography>Minor</Typography>
            <Switch
              defaultChecked
              inputProps={{ "aria-label": "ant design" }}
            />
            <Typography>Major</Typography>
          </Stack>
          <SliderItem
            name="speechiness"
            label="Speechiness"
            control={control}
            minValue={MIN_SPEECHINESS}
            maxValue={MAX_SPEECHINESS}
            defaultTarget={DEFAULT_TARGET_SPEECHINESS}
          />
          <SliderItem
            name="duration"
            label="Duration (minutes)"
            control={control}
            minValue={MIN_DURATION_MS}
            maxValue={MAX_DURATION_MS}
            defaultTarget={DEFAULT_TARGET_DURATION_MS}
            step={1000}
            valueFormat={millisToMinutesAndSeconds}
          />
          <SliderItem
            name="key"
            label="Key"
            control={control}
            minValue={MIN_KEY}
            maxValue={MAX_KEY}
            defaultTarget={DEFAULT_TARGET_KEY}
            step={1}
            valueFormat={pitchClassToKey}
          />
          <SliderItem
            name="loudness"
            label="Loudness"
            control={control}
            minValue={MIN_LOUDNESS}
            maxValue={MAX_LOUDNESS}
            defaultTarget={DEFAULT_TARGET_LOUDNESS}
            step={0.1}
            valueFormat={(value) => `${value} dB`}
          />
          <SliderItem
            name="popularity"
            label="Poupularity"
            control={control}
            minValue={MIN_POPULARITY}
            maxValue={MAX_POPULARITY}
            defaultTarget={DEFAULT_TARGET_POPULARITY}
            step={1}
            valueFormat={(value) => `${value} dB`}
          />
          <SliderItem
            name="tempo"
            label="Tempo"
            control={control}
            minValue={MIN_TEMPO}
            maxValue={MAX_TEMPO}
            defaultTarget={DEFAULT_TARGET_TEMPO}
            step={1}
            valueFormat={(value) => `${value} BPM`}
          />
          <SliderItem
            name="timeSignature"
            label="Time Signature"
            control={control}
            minValue={MIN_TIME_SIGNATURE}
            maxValue={MAX_TIME_SIGNATURE}
            defaultTarget={DEFAULT_TARGET_TIME_SIGNATURE}
            step={1}
            valueFormat={(value) => `${value}/4`}
          />
          {/* <DatePicker
            disableFuture
            label="Released Since"
            {...register('releasedSince')}
          /> */}
        </Grid>
        <Grid item xs={12}>
          <LoadingButton
            type="submit"
            variant="contained"
            color="primary"
            loading={isLoading}
          >
            Submit
          </LoadingButton>
        </Grid>
      </Grid>
    </form>
  );
};

function millisToMinutesAndSeconds(millis: number) {
  const minutes = Math.floor(millis / 60000);
  const seconds = ((millis % 60000) / 1000).toFixed(0).padStart(2, "0");
  return `${minutes}:${seconds}`;
}

function pitchClassToKey(pitchClass: number) {
  const pitchClasses = [
    "C",
    "C♯/D♭",
    "D",
    "D♯/E♭",
    "E",
    "F",
    "F♯/G♭",
    "G",
    "G♯/A♭",
    "A",
    "A♯/B♭",
    "B",
  ];
  return pitchClasses[pitchClass];
}
