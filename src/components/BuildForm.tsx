import React from "react";
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/components/ui/use-toast";
import { Separator } from "./ui/separator";

const FormSeparator = () => (
  <div className="col-span-2 my-1">
    <Separator />
  </div>
);

const BUILD_TYPE_OPTIONS = [
  {
    label: "Standard Office",
    value: "standard-office",
  },
  {
    label: "Expansion",
    value: "expansion",
  },
  {
    label: "Small Office",
    value: "small-office",
  },
  {
    label: "Facnet",
    value: "facnet",
  },
];

const REGION_OPTIONS = [
  {
    label: "EMEA",
    value: "emea",
  },
  {
    label: "APAC",
    value: "apac",
  },
  {
    label: "NAMER",
    value: "namer",
  },
];

// This schema validates the form data being sent
const buildFormSchema = z.object({
  // Build Options
  buildType: z.enum(["standard-office", "expansion", "small-office", "facnet"]),
  // Region Options
  region: z.enum(["emea", "apac", "namer"]),
  // Site Code
  siteCode: z.string(),
  // Number of Mods
  // Note – All HTML form fields return a string. We need to use `z.coerce.number()` to convert the string to a number
  // Ex: https://www.reddit.com/r/reactjs/comments/15hup78/how_to_use_shadcn_reacthookform_zod_for_input/
  numberOfMods: z.coerce.number(),
  // Number of PODs
  // Note – All HTML form fields return a string. We need to use `z.coerce.number()` to convert the string to a number
  // Ex: https://www.reddit.com/r/reactjs/comments/15hup78/how_to_use_shadcn_reacthookform_zod_for_input/
  numberOfPods: z.coerce.number(),
  // Subnet
  subnet: z.string(),
  // Starting BGP ASN
  startingBgpAsn: z.string(),
  // Device Role/Count Fields
  // MPLS Router
  mplsRouter: z.string(),
  // Internet Router
  internetRouter: z.string(),
  collapsedSpine: z.string(),
  internetFirewall: z.string(),
  aggregation: z.string(),
  managementLeaf: z.string(),
  consoleServer: z.string(),
  managementSwitch: z.string(),
  accessSwitch: z.string(),
});

type BuildFormValues = z.infer<typeof buildFormSchema>;

const DEFAULT_FORM_VALUES = {
  buildType: undefined,
  region: undefined,
  siteCode: undefined,
  numberOfMods: undefined,
  numberOfPods: undefined,
  subnet: undefined,
  startingBgpAsn: undefined,
  mplsRouter: "0",
  internetRouter: "0",
  collapsedSpine: "0",
  internetFirewall: "0",
  aggregation: "0",
  managementLeaf: "0",
  consoleServer: "0",
  managementSwitch: "0",
  accessSwitch: "0",
};

function BuildForm() {
  const { toast } = useToast();

  const formInstance = useForm<BuildFormValues>({
    resolver: zodResolver(buildFormSchema),
    defaultValues: DEFAULT_FORM_VALUES,
  });

  const watchBuildTypeChange = formInstance.watch("buildType");

  React.useEffect(() => {
    if (watchBuildTypeChange === "standard-office") {
      /**
       *
       * Using the `reset` method allows us to set multiple values of the form fields, but is giving us
       * re-rendering issues with our form state/values.
       * Using `setValue` method only allows us to set a single form field, but is more reliable.
       *
       * References
       * - `reset` method: https://react-hook-form.com/docs/useform/reset
       * - `setValue` method: https://react-hook-form.com/docs/useform/setvalue
       * - How to set multiple values at once using react-hook-form: https://stackoverflow.com/questions/70267924/how-to-set-multiple-values-at-once-in-react-hook-form-using-typescript
       */
      formInstance.setValue("mplsRouter", "2");
      formInstance.setValue("internetRouter", "2");
      formInstance.setValue("collapsedSpine", "2");
      formInstance.setValue("internetFirewall", "2");
      formInstance.setValue("aggregation", "2");
      formInstance.setValue("managementLeaf", "2");
      formInstance.setValue("consoleServer", "2");
      formInstance.setValue("managementSwitch", "2");
      formInstance.setValue("accessSwitch", "2");
    } else {
      formInstance.setValue("mplsRouter", "0");
      formInstance.setValue("internetRouter", "0");
      formInstance.setValue("collapsedSpine", "0");
      formInstance.setValue("internetFirewall", "0");
      formInstance.setValue("aggregation", "0");
      formInstance.setValue("managementLeaf", "0");
      formInstance.setValue("consoleServer", "0");
      formInstance.setValue("managementSwitch", "0");
      formInstance.setValue("accessSwitch", "0");
    }
  }, [watchBuildTypeChange, formInstance]);

  const handleSubmitForm = (data: BuildFormValues) => {
    console.log("Submitting Form Data...");
    console.log(data);
    setShowModal(true); // Show the modal when "Generate" is clicked
  };

  const [showModal, setShowModal] = React.useState(false);

  const handleCloseModal = () => {
    setShowModal(false); // Close the modal when "No" is clicked
  };

  const handleConfirmSubmitForm = () => {
    // Perform action on "Yes" confirmation
    console.log("Data posted in the backend");
    setShowModal(false); // Close the modal after action
    handleResetForm(); // Reset the form fields after action

    toast({
      title: "Success, Build Generated!",
      description: (
        <a href="/builds" className="text-blue-500">
          View Builds
        </a>
      ),
    });
  };

  const handleResetForm = () => {
    console.log("reseting form......");
    formInstance.reset({ ...DEFAULT_FORM_VALUES });

    /**
     *
     * We need to manually change the value of the Select fields to `undefined`
     * as the `reset` method does not work with Select fields.
     * This is because our <Select/> component isn't being re-rendered when the form is reset.
     * The form values are changed but the <Select/> component doesn't re-render showing the change.
     *
     * Reference:
     * - Unable to reset Select component with react-hook-form: https://github.com/shadcn-ui/ui/issues/549
     */
    // TODO: Keep an eye on this issue
    // formInstance.setValue("buildType", undefined);
    // formInstance.setValue("region", undefined);
  };

  return (
    <>
      <Form {...formInstance}>
        <form
          className="space-y-4"
          onSubmit={formInstance.handleSubmit(handleSubmitForm)}
        >
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-2 flex flex-col">
              {/* Example taken from: https://github.com/shadcn-ui/ui/blob/5ec881d17695ee0fb10c428ee11428679957ccdf/apps/www/app/examples/forms/profile-form.tsx */}
              <FormField
                control={formInstance.control}
                name="buildType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Build Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      // defaultValue={field.value}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full mt-2">
                          <SelectValue placeholder="Select Build Type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {BUILD_TYPE_OPTIONS.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="col-span-2 flex flex-col">
              <FormField
                control={formInstance.control}
                name="region"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Region</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      // defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full mt-2">
                          <SelectValue placeholder="Select Region" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {REGION_OPTIONS.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="col-span-2 flex flex-col">
              <FormField
                control={formInstance.control}
                name="siteCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Site Code</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Mods" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-1 flex flex-col">
              <FormField
                control={formInstance.control}
                name="numberOfMods"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of Mods</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: 4" {...field} type="number" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-1 flex flex-col">
              <FormField
                control={formInstance.control}
                name="numberOfPods"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of Pods</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: 32" {...field} type="number" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-1 flex flex-col">
              <FormField
                control={formInstance.control}
                name="subnet"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subnet</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: 10.128.140.0/24" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-1 flex flex-col">
              <FormField
                control={formInstance.control}
                name="startingBgpAsn"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Enter Starting BGP ASN</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: AS2027" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <section className="mt-4">
            <h1 className="mb-4 font-bold">Device Role/Count</h1>
            <div className="grid grid-cols-2 gap-x-6 gap-y-2">
              <div className="col-span-1 flex flex-col">
                <FormField
                  control={formInstance.control}
                  name="mplsRouter"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex justify-between w-full items-baseline">
                        <FormLabel>MPLS Router</FormLabel>
                        <FormControl className="max-w-60">
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
              </div>
              <div className="col-span-1 flex flex-col">
                <FormField
                  control={formInstance.control}
                  name="internetRouter"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex justify-between w-full items-baseline">
                        <FormLabel>Internet Router</FormLabel>
                        <FormControl className="max-w-60">
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
              </div>

              <FormSeparator />
              <div className="col-span-1 flex flex-col">
                <FormField
                  control={formInstance.control}
                  name="collapsedSpine"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex justify-between w-full items-baseline">
                        <FormLabel>Collapsed Spine</FormLabel>
                        <FormControl className="max-w-60">
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
              </div>
              <div className="col-span-1 flex flex-col">
                <FormField
                  control={formInstance.control}
                  name="internetFirewall"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex justify-between w-full items-baseline">
                        <FormLabel>Internet Firewall</FormLabel>
                        <FormControl className="max-w-60">
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
              </div>
              <FormSeparator />
              <div className="col-span-1 flex flex-col">
                <FormField
                  control={formInstance.control}
                  name="aggregation"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex justify-between w-full items-baseline">
                        <FormLabel>Aggregation</FormLabel>
                        <FormControl className="max-w-60">
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
              </div>
              <div className="col-span-1 flex flex-col">
                <FormField
                  control={formInstance.control}
                  name="managementLeaf"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex justify-between w-full items-baseline">
                        <FormLabel>Management Leaf</FormLabel>
                        <FormControl className="max-w-60">
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
              </div>
              <FormSeparator />
              <div className="col-span-1 flex flex-col">
                <FormField
                  control={formInstance.control}
                  name="consoleServer"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex justify-between w-full items-baseline">
                        <FormLabel>Console Server</FormLabel>
                        <FormControl className="max-w-60">
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
              </div>
              <div className="col-span-1 flex flex-col">
                <FormField
                  control={formInstance.control}
                  name="managementSwitch"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex justify-between w-full items-baseline">
                        <FormLabel>Management Switch</FormLabel>
                        <FormControl className="max-w-60">
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
              </div>
              <FormSeparator />
              <div className="col-span-1 flex flex-col">
                <FormField
                  control={formInstance.control}
                  name="accessSwitch"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex justify-between w-full items-baseline">
                        <FormLabel>Access Switch</FormLabel>
                        <FormControl className="max-w-60">
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </section>
          <div className="flex justify-end gap-4">
            <Button type="reset" variant="outline" onClick={handleResetForm}>
              Reset
            </Button>
            <Button type="submit">Generate</Button>
          </div>
        </form>
      </Form>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg">
            <p className="text-lg font-bold mb-4">
              Generate the following Build?
            </p>
            <pre className="mt-1 w-[340px] rounded-md bg-slate-700 p-4 mb-4">
              <code className="text-white">
                {JSON.stringify(formInstance.getValues(), null, 2)}
              </code>
            </pre>
            <div className="flex justify-end gap-4">
              <Button variant="outline" onClick={handleCloseModal}>
                No
              </Button>
              <Button onClick={handleConfirmSubmitForm}>Yes</Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default BuildForm;
