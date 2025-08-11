"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusCircle, Trash2 } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Chrome } from "@uiw/react-color";
import { OPERATORS } from "@/constants/threshold";
import { ThresholdRule } from "@/types/threshold-types";
import { useAtom } from "jotai";
import { thresholdAtom } from "@/atoms/global";

export default function ThresholdForm() {
  const [thresholdState, setThresholdState] = useAtom(thresholdAtom);

  const setField = (field: string) => {
    setThresholdState((prev) => ({ ...prev, field }));
  };

  const addRule = () => {
    setThresholdState((prev) => ({
      ...prev,
      rules: [...prev.rules, { operator: "=", value: 0, color: "#000000" }],
    }));
  };

  const updateRule = (
    index: number,
    key: keyof ThresholdRule,
    value: unknown
  ) => {
    setThresholdState((prev) => ({
      ...prev,
      rules: prev.rules.map((r, i) =>
        i === index ? { ...r, [key]: value } : r
      ),
    }));
  };

  const removeRule = (index: number) => {
    setThresholdState((prev) => ({
      ...prev,
      rules: prev.rules.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="w-full p-4 space-y-4 border-r">
      <h2 className="text-lg font-bold">Data Source & Thresholds</h2>

      <Card>
        <CardHeader>
          <CardTitle>Data Source: Open-Meteo</CardTitle>
          <CardDescription>Define your threshold rules here</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {/* Field Selector */}
          <div className="space-y-1">
            <Label>Field</Label>
            <Select value={thresholdState.field} onValueChange={setField}>
              <SelectTrigger>
                <SelectValue placeholder="Select field" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="temperature_2m">temperature_2m</SelectItem>
                <SelectItem value="relative_humidity_2m">
                  relative_humidity_2m
                </SelectItem>
                <SelectItem value="wind_speed_10m">wind_speed_10m</SelectItem>
                <SelectItem value="precipitation">precipitation</SelectItem>
                <SelectItem value="snowfall">snowfall</SelectItem>
                <SelectItem value="rain">rain</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Threshold Rules */}
          <div className="space-y-2">
            <Label>Threshold Rules</Label>
            {thresholdState.rules.map((rule, idx) => (
              <div key={idx} className="flex items-center gap-2">
                {/* Color Picker */}
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-10 h-10"
                      style={{ backgroundColor: rule.color }}
                    />
                  </PopoverTrigger>
                  <PopoverContent
                    side="bottom"
                    align="center"
                    className="w-fit h-fit p-0 ml-4"
                  >
                    <Chrome
                      color={rule.color}
                      onChange={(color) => updateRule(idx, "color", color.hex)}
                    />
                  </PopoverContent>
                </Popover>

                {/* Operator */}
                <Select
                  value={rule.operator}
                  onValueChange={(val) => updateRule(idx, "operator", val)}
                >
                  <SelectTrigger className="w-16">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {OPERATORS.map((op) => (
                      <SelectItem key={op} value={op}>
                        {op}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Value */}
                <Input
                  type="number"
                  className="w-20"
                  value={rule.value}
                  onChange={(e) =>
                    updateRule(idx, "value", Number(e.target.value))
                  }
                />

                {/* Remove */}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeRule(idx)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}

            <Button variant="outline" size="sm" onClick={addRule}>
              <PlusCircle className="w-4 h-4 mr-2" /> Add Rule
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
