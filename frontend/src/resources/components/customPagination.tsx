import { Box, Card, Typography } from "@mui/material";
import { useListContext, InfinitePagination } from "react-admin";

export const CustomPagination = () => {
  const { total } = useListContext();
  return (
    <>
      <InfinitePagination />
      {total > 0 && (
        <Box position="sticky" bottom={0} textAlign="center">
          <Card
            elevation={2}
            sx={{ px: 2, py: 1, mb: 1, display: "inline-block" }}
          >
            <Typography variant="body2">{total} results</Typography>
          </Card>
        </Box>
      )}
    </>
  );
};
