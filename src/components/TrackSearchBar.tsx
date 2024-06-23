import { debounce } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { SearchResults, SpotifyApi, Track } from '@spotify/web-api-ts-sdk';
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from '@uidotdev/usehooks';
import { ForwardedRef, forwardRef, useEffect, useMemo, useState } from 'react';
import { ChangeHandler } from 'react-hook-form';
import { uniqWith } from 'lodash';

export const TrackSearchBar = forwardRef(
  (
    {
      sdk,
      name,
      onFieldChange,
      onFieldBlur,
    }: {
      sdk: SpotifyApi;
      name: string;
      onFieldChange: ChangeHandler;
      onFieldBlur: ChangeHandler;
    },
    ref: ForwardedRef<typeof Autocomplete>
  ) => {
    const [inputValue, setInputValue] = useState('');
    const debouncedInput = useDebounce(inputValue, 400);
    const [value, setValue] = useState<Track | null>(null);

    const { isFetching, data, error } = useQuery({
      queryKey: ['search', debouncedInput],
      queryFn: () => {
        console.log('searching ' + debouncedInput);
        return sdk.search(debouncedInput, ['track']);
      },
      enabled: !!debouncedInput && !value,
      refetchOnWindowFocus: false,
    });

    const options = useMemo(() => (data ? data.tracks.items : []), [data]);

    useEffect(() => {
      if (error)
        console.error('Error searching for tracks', debouncedInput, error);
    }, [error, debouncedInput]);

    // XXXXX MULTI SELECT?
    return (
      <Autocomplete
        sx={{ width: 300 }}
        getOptionLabel={(option) => option.name}
        getOptionKey={(option) => option.id}
        options={options}
        autoComplete
        loading={isFetching}
        loadingText="Loading..."
        noOptionsText="No tracks found"
        disablePortal
        filterSelectedOptions
        value={value}
        inputValue={inputValue}
        onInputChange={(_, newInputValue) => {
          setInputValue(newInputValue);
        }}
        onChange={(_, newValue) => {
          setValue(newValue);
          const syntheticEvent = {
            target: { name, value: newValue?.id || '' },
          };
          onFieldChange(syntheticEvent);
        }}
        onBlur={onFieldBlur}
        isOptionEqualToValue={(option, value) => option.id === value?.id}
        renderOption={(props, option) => (
          <Box component="li" sx={{ '& > img': { marginRight: 2 } }} {...props}>
            <img
              src={option.album.images[0].url}
              alt={option.album.name}
              style={{ height: 24, width: 24 }}
            />
            <Grid container alignItems="center">
              <Grid item xs>
                <Typography variant="body2" color="textPrimary">
                  {option.name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {option.artists.map((artist) => artist.name).join(', ')}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        )}
        renderInput={(params) => (
          <TextField {...params} label="Search for a track" fullWidth />
        )}
        ref={ref}
      />
    );
  }
);
