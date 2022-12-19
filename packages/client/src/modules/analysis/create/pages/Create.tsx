import { MethodStatus } from "@app/method";
import {
  Button,
  CircularProgress,
  Container,
  FormControl,
  Grid,
  Input,
  InputLabel,
  MenuItem,
  Select,
  Skeleton,
  Typography,
} from "@mui/material";
import { FC, useEffect, useMemo, useState } from "react";
import { useAllMethods } from "../../../method/graphql/queries";

const Create: FC = () => {
  const createHandler = () => {};

  const { allMethodsData, allMethodsError, allMethodsLoading } = useAllMethods({
    filters: { status: MethodStatus.COMPLETED },
  });

  const selectItems = useMemo(
    () =>
      allMethodsData?.map(({ id, name }) => ({
        id,
        name,
      })),
    [allMethodsData]
  );

  const [selectedId, setSelectedId] = useState<number | string>("");

  if (allMethodsLoading) {
    return (
      <Grid container justifyContent={"center"} gap={3} marginTop={3}>
        <CircularProgress />;
      </Grid>
    );
  }

  if (allMethodsError) {
    return (
      <Typography variant="h2" color={"red"}>
        {allMethodsError.message}
      </Typography>
    );
  }

  if (!selectItems || selectItems.length === 0) {
    return <h1>No data</h1>;
  }

  return (
    <Grid container direction={"column"} gap={3}>
      <h1>Create Analysis</h1>
      <FormControl fullWidth>
        <InputLabel>Select method</InputLabel>
        <Select
          value={selectedId}
          onChange={(e) => setSelectedId(e.target.value as number)}
          required
        >
          {selectItems.map(({ id, name }) => (
            <MenuItem key={id} value={id}>
              {name}#{id}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel>Analysis name</InputLabel>
        <Input />
      </FormControl>
      <Button type="submit" variant="contained">
        Create analysis
      </Button>
    </Grid>
  );
};

export default Create;
