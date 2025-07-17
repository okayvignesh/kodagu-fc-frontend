"use client";

import { BsArrowRight } from "react-icons/bs";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  ResponsiveContainer,
  YAxis,
} from "recharts";

export function ChartBarLabel({ data }) {
  // Helper function to get the category string based on grids number
  const getCategory = (grids) => {
    if (grids < 10) return "<10";
    if (grids >= 10 && grids <= 25) return "10-25";
    if (grids > 25 && grids <= 50) return "25-50";
    if (grids > 50 && grids <= 100) return "50-100";
    return "100+";
  };

  // Initialize a counts object with all categories set to zero
  const categoryCounts = {
    "<10": 0,
    "10-25": 0,
    "25-50": 0,
    "50-100": 0,
    "100+": 0,
  };

  // Count contributors for each category
  data.forEach((user) => {
    const category = getCategory(user.grids);
    categoryCounts[category]++;
  });

  // Convert the counts object into the format recharts expects
  const chartData = Object.entries(categoryCounts).map(([gridsContributed, count]) => ({
    gridsContributed,
    NoOfContributers: count,
  }));

  return (
    <Card className="px-0 ">
      <div className="relative workSans">
        <div className="flex items-center gap-1 -rotate-90 absolute top-50 -md:left-0 -left-8">
          <p>Contributors</p> <BsArrowRight />
        </div>
      </div>
      <div>
        <CardHeader>
          <CardTitle className="flex justify-between font-[400] workSans">
            <p>Contributor Chart</p>{" "}
            <img src="/icons/baricon.svg" alt="img" />
          </CardTitle>
        </CardHeader>

        <CardContent className="px-0 md:pr-6">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData} margin={{ top: 20 }}>
              <defs>
                <linearGradient id="customGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#145133" stopOpacity={1} />
                  <stop offset="50%" stopColor="#0C4520" stopOpacity={1} />
                  <stop offset="100%" stopColor="#31733F" stopOpacity={1} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} horizontal={false} />
              <XAxis
                dataKey="gridsContributed"
                tickLine={false}
                tickMargin={10}
                axisLine={true}
              />
              <YAxis
                tick={false}
                tickLine={false}
                tickMargin={10}
                axisLine={true}
                domain={[-1, "dataMax + 20"]}
              />
              <Bar dataKey="NoOfContributers" fill="url(#customGradient)" radius={8}>
                <LabelList
                  dataKey="NoOfContributers"
                  position="top"
                  offset={10}
                  className="fill-foreground text-xs text-[#8A8A8A] font-medium"
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
        <CardFooter className="flex mt-2 items-center justify-center font-medium gap-2 text-sm">
          <p>Grids Contributed </p> <BsArrowRight />
        </CardFooter>
      </div>
    </Card>
  );
}
