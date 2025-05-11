import { palette } from '@/styles/mixins';
import { Box, SxProps } from '@mui/material';

export function WidgetContainer({
  children,
  bgColor,
  sx,
}: {
  children: React.ReactNode;
  bgColor?: string;
  sx?: SxProps;
}) {
  return (
    <Box
      component='section'
      sx={{
        py: 10,
        backgroundColor: bgColor || palette.primary[800],
        width: '100%',
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}
