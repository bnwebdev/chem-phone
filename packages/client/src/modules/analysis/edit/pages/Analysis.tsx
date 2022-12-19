import { useTranslation } from "@app/i18n";
import { AnalysisStatus } from "@app/method";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  CircularProgress,
  Grid,
  LinearProgress,
  Typography,
} from "@mui/material";
import { FC } from "react";
import { useParams } from "react-router";
import CompletedMethod from "../../../method/edit/components/CompletedMethod";
import { MethodProvider } from "../../../method/edit/context";
import { useMethod } from "../../../method/graphql/queries";
import { useAnalysis } from "../../graphql/queries";
import CompletedAnalysis from "../components/CompletedAnalysis";
import DraftAnalysis from "../components/DraftAnalysis";
import AnalysisProvider from "../context/AnalysisProvider";

const Analysis: FC = () => {
  const params = useParams<{ id: string }>();
  const id = +params.id;

  const { analysisData, analysisError, analysisLoading, refetchAnalysis } =
    useAnalysis(id);

  const { methodData, methodLoading } = useMethod(
    analysisData?.methodId as number,
    !analysisData
  );

  const i18n = useTranslation("analyses");

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

  const { name, status, details } = analysisData;

  return (
    <AnalysisProvider analysis={analysisData} refetch={refetchAnalysis}>
      <Grid container direction="column" gap={3} marginTop={3}>
        <Grid
          item
          container
          alignItems={"center"}
          justifyContent="space-around"
        >
          <Grid item>
            <Typography variant="h2">
              Analysis {name}#{id}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h2" color="turquoise" fontWeight={400}>
              {i18n.t(`status.${status}`) as string}
            </Typography>
          </Grid>
        </Grid>
        <Grid item>
          <Accordion>
            <AccordionSummary>
              Method {methodData?.name}
              {methodData ? "#" : ""}
              {methodData?.id}
            </AccordionSummary>
            <AccordionDetails>
              {methodLoading && <LinearProgress />}
              {methodData && !methodLoading && (
                <MethodProvider method={methodData} refetch={async () => {}}>
                  <CompletedMethod readable />
                </MethodProvider>
              )}
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary>Analysis details</AccordionSummary>
            <AccordionDetails>
              {(details || "-").split(`\n`).map((row, idx) => (
                <Typography variant="body1" key={idx}>
                  {row}
                </Typography>
              ))}
            </AccordionDetails>
          </Accordion>
        </Grid>
        {analysisData.status === AnalysisStatus.DRAFT && <DraftAnalysis />}
        {analysisData.status === AnalysisStatus.COMPLETED && methodData && (
          <MethodProvider method={methodData} refetch={async () => {}}>
            <CompletedAnalysis />
          </MethodProvider>
        )}
      </Grid>
    </AnalysisProvider>
  );
};

export default Analysis;
