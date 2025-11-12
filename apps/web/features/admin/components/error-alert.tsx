import { Button } from "@repo/ui/components/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@repo/ui/components/empty";
import { TriangleAlert } from "lucide-react";

type ErrorAlertProps = {
  title?: string;
  description?: string;
  action?: () => void;
};

export const ErrorAlert: React.FC<ErrorAlertProps> = ({
  title = "Terjadi Masalah",
  description = "Gagal mendapatkan data",
  action,
}) => {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <TriangleAlert className="text-destructive" />
        </EmptyMedia>
        <EmptyTitle>{title}</EmptyTitle>
        <EmptyDescription>{description}</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button onClick={() => action?.()}>Ulangi</Button>
      </EmptyContent>
    </Empty>
  );
};
