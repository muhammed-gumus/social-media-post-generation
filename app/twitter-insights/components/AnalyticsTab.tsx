"use client";

import {
  TwitterUserProfile,
  TwitterUserTweets,
} from "@/lib/services/twitterService";
import { Card } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  COLORS,
  calculateContentTypes,
  prepareEngagementTimelineData,
  calculateAverageEngagements,
} from "./TwitterUtils";

interface AnalyticsTabProps {
  userProfile: TwitterUserProfile;
  userTweets: TwitterUserTweets;
}

export function AnalyticsTab({ userProfile, userTweets }: AnalyticsTabProps) {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* İçerik Türü Dağılımı */}
        <Card className="p-6 shadow-md">
          <h3 className="text-xl font-bold mb-6">İçerik Türü Dağılımı</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={calculateContentTypes(userTweets)}
                cx="50%"
                cy="50%"
                labelLine={true}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
              >
                {calculateContentTypes(userTweets).map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value} Tweet`, "Miktar"]} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        {/* Etkileşim Oranları */}
        <Card className="p-6 shadow-md">
          <h3 className="text-xl font-bold mb-6">Etkileşim Analizi</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={calculateAverageEngagements(userTweets, userProfile)}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" width={120} />
              <Tooltip
                formatter={(value) => {
                  // Type-safe formatter
                  if (typeof value === "number") {
                    return [value.toFixed(2), "Oran"];
                  }
                  return [String(value), "Oran"];
                }}
              />
              <Bar dataKey="value" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Zaman İçinde Etkileşim */}
      <Card className="p-6 shadow-md">
        <h3 className="text-xl font-bold mb-6">Zaman İçinde Etkileşim</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={prepareEngagementTimelineData(userTweets)}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="beğeni"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
            <Line type="monotone" dataKey="retweet" stroke="#82ca9d" />
            <Line type="monotone" dataKey="yanıt" stroke="#ffc658" />
            <Line
              type="monotone"
              dataKey="toplam"
              stroke="#ff7300"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}
