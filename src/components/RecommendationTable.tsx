import OpenInNew from '@mui/icons-material/OpenInNew';
import {
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography,
} from '@mui/material';
import { RecommendationsResponse } from '@spotify/web-api-ts-sdk';

export const RecommendationTable = ({
  tracks,
}: {
  tracks: RecommendationsResponse['tracks'];
}) => {
  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <List sx={{ width: '100%', maxWidth: '600px' }}>
        {tracks.map((track) => (
          <Paper key={track.id} sx={{ my: 1, mx: 'auto' }}>
            <ListItem key={track.id} alignItems="center">
              <ListItemAvatar>
                <Avatar
                  alt={track.album.name}
                  src={track.album.images[0].url}
                />
              </ListItemAvatar>
              <ListItemText
                primary={track.name}
                secondary={
                  <>
                    <Typography
                      // sx={{ display: 'inline' }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {track.artists.map((artist) => artist.name).join(', ')}
                    </Typography>
                    {` — ${track.album.name}`}
                  </>
                }
              />
              <IconButton target="_blank" href={track.external_urls.spotify}>
                <OpenInNew />
              </IconButton>
            </ListItem>
          </Paper>
        ))}
      </List>
    </div>
  );
};
