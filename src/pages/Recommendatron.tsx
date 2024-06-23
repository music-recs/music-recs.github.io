import { Scopes } from "@spotify/web-api-ts-sdk";
import { useQuery } from "@tanstack/react-query";
import { isAfter } from "date-fns";
import { useMemo, useState } from "react";
import { Loader } from "../components/Loader";
import { RecommendationForm } from "../components/RecommendationForm";
import { RecommendationTable } from "../components/RecommendationTable";
import { useSpotify } from "../hooks/useSpotify";
import {
  RecommendationFormDto,
  formDtoToRecommendationsRequest,
} from "../types/form";

export const Recommendatron = () => {
  const sdk = useSpotify(
    import.meta.env.VITE_SPOTIFY_CLIENT_ID,
    import.meta.env.VITE_SPOTIFY_REDIRECT_URI,
    Scopes.userDetails
  );

  const [input, setInput] = useState<RecommendationFormDto | undefined>(
    undefined
  );

  const request = useMemo(
    () =>
      input !== undefined ? formDtoToRecommendationsRequest(input) : undefined,
    [input]
  );

  // TODO
  // const maxReleseDate = useMemo(
  //   () => (input?.releasedSince ? new Date(input.releasedSince) : undefined),
  //   [input]
  // );

  const maxReleseDate = undefined;

  const {
    isFetching,
    data: tracks,
    error,
  } = useQuery({
    queryKey: ["recommendations", request],
    queryFn: () =>
      sdk!.recommendations
        .get(request!)
        .then((res) =>
          res.tracks.filter(
            (t) =>
              maxReleseDate === undefined ||
              isAfter(
                parseRelaseDate(
                  t.album.release_date,
                  t.album.release_date_precision
                ),
                maxReleseDate
              )
          )
        ),
    enabled: !!request && !!sdk,
    refetchOnWindowFocus: false,
  });

  if (!sdk) return <Loader />;

  return (
    <>
      <RecommendationForm
        sdk={sdk}
        onsubmit={setInput}
        isLoading={isFetching}
      />
      {error && <div>Error: {JSON.stringify(error)}</div>}
      {tracks && <RecommendationTable tracks={tracks} />}
    </>
  );
};

function parseRelaseDate(date: string, precision: string): Date {
  switch (precision) {
    case "year":
      return new Date(`${date}-01-01`);
    case "month":
      return new Date(`${date}-01`);
    case "day":
      return new Date(date);
    default:
      throw new Error(`Unknown release date precision: ${precision}`);
  }
}
