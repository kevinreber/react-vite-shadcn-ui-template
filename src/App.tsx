import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import PageContainer from "./components/PageContainer";

function App() {
  return (
    <PageContainer>
      <Card>
        <CardHeader>
          <CardTitle>Questionnaire</CardTitle>
          <CardDescription>
            Please fill out the questionnaire below.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="buildType">Choose the build type</Label>
                <Select>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="option1">Standard Office</SelectItem>
                    <SelectItem value="option2">Expansion</SelectItem>
                    <SelectItem value="option3">Small Office</SelectItem>
                    <SelectItem value="option4">Facnet</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="region">Choose the region</Label>
                <Select>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="emea">EMEA</SelectItem>
                    <SelectItem value="apac">APAC</SelectItem>
                    <SelectItem value="namer">NAMER</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="siteCode">Enter the site code</Label>
                <Input
                  className="w-[150px]"
                  id="siteCode"
                  placeholder="Site Code"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="question1">Number of Mods</Label>
                <Input
                  className="w-[100px]"
                  id="question1"
                  placeholder="Short response"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="question2">Number of PODs</Label>
                <Input
                  className="w-[100px]"
                  id="question2"
                  placeholder="Short response"
                />
              </div>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Device Role/Count</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>MPLS Router</TableCell>
                  <TableCell>
                    <Input className="w-[50px]" type="number" />
                  </TableCell>
                  <TableCell>Internet Router</TableCell>
                  <TableCell>
                    <Input className="w-[50px]" type="number" />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Collapsed Spine</TableCell>
                  <TableCell>
                    <Input className="w-[50px]" type="number" />
                  </TableCell>
                  <TableCell>Internet Firewall</TableCell>
                  <TableCell>
                    <Input className="w-[50px]" type="number" />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Aggregation</TableCell>
                  <TableCell>
                    <Input className="w-[50px]" type="number" />
                  </TableCell>
                  <TableCell>Management Leaf</TableCell>
                  <TableCell>
                    <Input className="w-[50px]" type="number" />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Console Server</TableCell>
                  <TableCell>
                    <Input className="w-[50px]" type="number" />
                  </TableCell>
                  <TableCell>Management Switch</TableCell>
                  <TableCell>
                    <Input className="w-[50px]" type="number" />
                  </TableCell>
                </TableRow>
                <TableRow />
                <TableRow>
                  <TableCell>Access Switch</TableCell>
                  <TableCell>
                    <Input className="w-[50px]" type="number" />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          <div className="flex items-center gap-4">
            <Button onClick={undefined}>Generate</Button>
          </div>
        </CardContent>
      </Card>
    </PageContainer>
  );
}

export default App;
