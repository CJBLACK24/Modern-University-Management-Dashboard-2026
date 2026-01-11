"use client";

import { Button } from "@/components/ui/button";
import { useBack } from "@refinedev/core";
import { ArrowLeft } from "lucide-react";
import React from "react";

type BackButtonProps = {
  children?: React.ReactNode;
} & React.ComponentProps<typeof Button>;

export const BackButton = React.forwardRef<
  React.ComponentRef<typeof Button>,
  BackButtonProps
>(({ children, onClick, disabled, ...rest }, ref) => {
  const back = useBack();
  const [isLoading, setIsLoading] = React.useState(false);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsLoading(true);
    if (onClick) {
      onClick(e);
    } else {
      back();
    }
  };

  return (
    <Button
      variant="outline"
      {...rest}
      ref={ref}
      disabled={disabled || isLoading}
      onClick={handleClick}
    >
      <div className="flex items-center gap-2 font-semibold">
        {isLoading ? (
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : (
          children ?? (
            <div className="flex items-center gap-2 font-semibold">
              <ArrowLeft className="h-4 w-4" />
              <span>Go Back</span>
            </div>
          )
        )}
      </div>
    </Button>
  );
});

BackButton.displayName = "BackButton";
