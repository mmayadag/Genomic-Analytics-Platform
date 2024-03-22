import React, { FC } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { GeneDataTableType } from "@/types/gene";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface GeneDataItemProps {
  title: string;
  value: string | number;
}

const GeneDataItem: FC<GeneDataItemProps> = ({ title, value }) => {
  return (
    <div>
      <div className="font-semibold leading-none tracking-tight">{title}</div>
      <div className="text-sm text-muted-foreground">{value}</div>
    </div>
  );
};

type MobileDataCardProps = {
  geneAnalyticsTableData: GeneDataTableType;
  analyzeHandler: (item: any) => void;
};

const MobileDataCard: FC<MobileDataCardProps> = ({
  geneAnalyticsTableData,
  analyzeHandler,
}) => {
  return (
    <Accordion
      className="md:hidden px-4 w-full"
      type="single"
      defaultChecked
      collapsible
    >
      <AccordionItem value="item-1">
        <AccordionTrigger>Gen Cards</AccordionTrigger>
        <AccordionContent>
          <div className="md:hidden flex justify-center">
            <div className="w-[458px] mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              {(geneAnalyticsTableData as GeneDataTableType)?.map((item) => (
                <Card
                  key={item._id}
                  className="p-4 rounded-xl border bg-card text-card-foreground shadow flex items-center flex-col justify-center"
                >
                  <CardHeader>
                    <div className="text-sm text-muted-foreground text-center">
                      Gene
                    </div>
                    <strong>{item.gene}</strong>
                  </CardHeader>
                  <CardDescription className="text-sm text-muted-foreground">
                    Dataset: {item.dataSet}
                  </CardDescription>
                  <CardContent>
                    <div className="-mx-2 grid grid-cols-3 gap-4 p-4 rounded-md transition-all hover:bg-accent hover:text-accent-foreground">
                      <GeneDataItem
                        title="Control Rep1:"
                        value={item.control_rep1}
                      />
                      <GeneDataItem
                        title="Control Rep2:"
                        value={item.control_rep2}
                      />
                      <GeneDataItem
                        title="Control Rep3:"
                        value={item.control_rep3}
                      />
                    </div>
                    <div className="-mx-2 grid grid-cols-3 gap-4 p-4 rounded-md transition-all hover:bg-accent hover:text-accent-foreground">
                      <GeneDataItem
                        title="Exper Rep1:"
                        value={item.exper_rep1}
                      />
                      <GeneDataItem
                        title="Exper Rep2:"
                        value={item.exper_rep2}
                      />
                      <GeneDataItem
                        title="Exper Rep3:"
                        value={item.exper_rep3}
                      />
                    </div>
                    <div className="-mx-2 flex flex-wrap gap-4 p-4 rounded-md transition-all hover:bg-accent hover:text-accent-foreground">
                      <div>Transcript:</div>
                      <div className="flex flex-wrap gap-2 flex-1">
                        {" "}
                        {item.transcript.split(",").map((transcript) => (
                          <span key={transcript}>{transcript}</span>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex w-full">
                    <Button
                      size="lg"
                      className="w-full"
                      onClick={() => analyzeHandler({ original: item })}
                    >
                      Analyze
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default MobileDataCard;
