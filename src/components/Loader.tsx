import { CircularProgress, Container, Stack } from '@mui/material';

export const Loader = ({
  color,
}: {
  readonly color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning';
}) => {
  return (
    <Container>
      <Stack
        width={'100'}
        alignItems={'center'}
        spacing={1}
        height={'95vh'}
        justifyContent={'center'}
      >
        <CircularProgress
          variant={'indeterminate'}
          color={color ?? 'primary'}
        />
      </Stack>
    </Container>
  );
};
