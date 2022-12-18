import { FC } from "react";
import { useParams } from "react-router";
import {
  Alert,
  Grid,
  Skeleton,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";

import { useTranslation } from "@app/i18n";
import { MethodStatus } from "@app/method";

import { useMethod } from "../../graphql/queries";
import { MethodProvider } from "../context";
import DraftAndEditableMethod from "./DraftAndEditableMethod";
import CompletedMethod from "./CompletedMethod";

const STATUSES = [
  MethodStatus.DRAFT,
  MethodStatus.EDITABLE,
  MethodStatus.COMPLETED,
];

const MethodEdit: FC = () => {
  const { id } = useParams<{ id: string }>();
  const { methodData, methodError, methodLoading, refetchMethod } = useMethod(
    Number(id)
  );
  const i18n = useTranslation("methods");

  if (methodLoading) {
    return (
      <Box marginTop={2}>
        <Skeleton variant="rectangular" width={210} height={118} />
      </Box>
    );
  }

  if (methodError) {
    return (
      <Box marginTop={2}>
        <Alert variant="outlined" color="error">
          {methodError.message}
        </Alert>
      </Box>
    );
  }

  if (!methodData) {
    return null;
  }

  return (
    <MethodProvider
      method={methodData}
      refetch={async () => {
        await refetchMethod();
      }}
    >
      <Grid container direction={"column"} gap={3} marginTop={3}>
        <Typography variant="h2">
          {methodData.name} #{methodData.id}
        </Typography>
        <Stepper activeStep={1} alternativeLabel>
          {STATUSES.map((status) => (
            <Step key={status} active={status < methodData.status + 1}>
              <StepLabel>{i18n.t(`status.${status}`) as string}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {[MethodStatus.DRAFT, MethodStatus.EDITABLE].includes(
          methodData.status
        ) && <DraftAndEditableMethod />}
        {methodData.status === MethodStatus.COMPLETED && <CompletedMethod />}
      </Grid>
    </MethodProvider>
  );
};

export default MethodEdit;
