import { palette } from "@/styles/mixins";
import { Box } from "@mui/material";

export function WidgetContainer({ children }: { children: React.ReactNode }) {
  return (
    <Box
      component='section'
      sx={{
        py: 10,
        backgroundColor: palette.primary[800],
        width: '100%',
      }}
    >
      {children}
    </Box>
  );
}