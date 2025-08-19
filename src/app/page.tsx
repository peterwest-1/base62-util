"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { generateBase62 } from "@/lib/utils";
import { Copy, RefreshCw } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const Base62Generator = () => {
  const [length, setLength] = useState(8);
  const [prefix, setPrefix] = useState("");
  const [count, setCount] = useState(1);
  const [generatedValues, setGeneratedValues] = useState<string[]>([]);

  const handleGenerate = () => {
    const values = [];
    for (let i = 0; i < count; i++) {
      const base62Value = generateBase62(length);
      values.push(prefix + base62Value);
    }
    setGeneratedValues(values);
  };

  const copyToClipboard = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      toast.success("Value copied to clipboard");
    } catch (err) {
      toast.error("Could not copy to clipboard");
    }
  };

  const copyAllToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedValues.join("\n"));
      toast.success("All values copied to clipboard");
    } catch (err) {
      toast.error("Could not copy to clipboard");
    }
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Base62 Generator</h1>
          <p className="text-muted-foreground">
            Generate random base62 values with customizable length, prefix, and
            quantity
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Configuration</CardTitle>
            <CardDescription>
              Customize your base62 generation settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="length">Length</Label>
                <Input
                  id="length"
                  type="number"
                  min="1"
                  max="100"
                  value={length}
                  onChange={(e) =>
                    setLength(Math.max(1, Number.parseInt(e.target.value) || 1))
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="prefix">Prefix (optional)</Label>
                <Input
                  id="prefix"
                  type="text"
                  placeholder="e.g., user_"
                  value={prefix}
                  onChange={(e) => setPrefix(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="count">Count</Label>
                <Input
                  id="count"
                  type="number"
                  min="1"
                  max="1000"
                  value={count}
                  onChange={(e) =>
                    setCount(Math.max(1, Number.parseInt(e.target.value) || 1))
                  }
                />
              </div>
            </div>

            <Button onClick={handleGenerate} className="w-full">
              <RefreshCw className="w-4 h-4 mr-2" />
              Generate Base62 Values
            </Button>
          </CardContent>
        </Card>

        {generatedValues.length > 0 && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div>
                <CardTitle>Generated Values</CardTitle>
                <CardDescription>
                  {generatedValues.length} value
                  {generatedValues.length !== 1 ? "s" : ""} generated
                </CardDescription>
              </div>
              <Button variant="outline" size="sm" onClick={copyAllToClipboard}>
                <Copy className="w-4 h-4 mr-2" />
                Copy All
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {generatedValues.map((value, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-muted rounded-lg font-mono text-sm"
                  >
                    <span className="break-all">{value}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(value)}
                      className="ml-2 flex-shrink-0"
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
      <div className="text-center p-3">
        <p className="text-muted-foreground">Don't actually use this</p>
      </div>
    </div>
  );
};

export default Base62Generator;
