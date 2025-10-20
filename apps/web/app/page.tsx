import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";
import { cn } from "@repo/ui/lib/utils";

export default function Home() {
  return (
    <div className="text-2xl text-blue-500">
      <Button className={cn("flex")}>Click Me!</Button>
      <Input />
    </div>
  );
}
