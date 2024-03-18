import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";

import PageContainer from "./components/PageContainer";
import BuildForm from "./components/BuildForm";

function App() {
  return (
    <PageContainer>
      <Card>
        <CardHeader>
          <CardTitle>Build Out Questionnaire</CardTitle>
          <CardDescription>
            Please fill out the questionnaire below.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <BuildForm />
        </CardContent>
      </Card>
    </PageContainer>
  );
}

export default App;
