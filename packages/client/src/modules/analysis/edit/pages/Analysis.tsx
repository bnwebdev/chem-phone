import { AnalysisStatus } from "@app/method";
import { CircularProgress, Grid, Typography } from "@mui/material";
import { FC } from "react";
import { useParams } from "react-router";
import { useAnalysis } from "../../graphql/queries";
import CompletedAnalysis from "../components/CompletedAnalysis";
import DraftAnalysis from "../components/DraftAnalysis";
import AnalysisProvider from "../context/AnalysisProvider";

const Analysis: FC = () => {
  const params = useParams<{ id: string }>();
  const id = +params.id;

  const { analysisData, analysisError, analysisLoading, refetchAnalysis } =
    useAnalysis(id);

  if (Number.isNaN(id)) {
    throw new Error(`Id must be number`);
  }

  if (analysisLoading) {
    return (
      <Grid container justifyContent={"center"} margin={3}>
        <CircularProgress />;
      </Grid>
    );
  }

  if (!analysisData) {
    return <Typography variant="h3">Something went wrong</Typography>;
  }

  if (analysisError) {
    return <Typography variant="h3">{analysisError.message}</Typography>;
  }

  return (
    <AnalysisProvider analysis={analysisData} refetch={refetchAnalysis}>
      {analysisData.status === AnalysisStatus.DRAFT && <DraftAnalysis />}
      {analysisData.status === AnalysisStatus.COMPLETED && (
        <CompletedAnalysis />
      )}
    </AnalysisProvider>
  );
};

export default Analysis;
