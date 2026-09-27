"use client";

import { Arrange } from "./arrange";
import { Estimate } from "./estimate";
import { Predict } from "./predict";
import { PromptLab } from "./prompt-lab";
import { Spot } from "./spot";
import type { Activity, Verdict } from "./types";

type Props = { activity: Activity; label: string; onAttempt: (verdict: Verdict) => void };

export function ActivityBlock({ activity, label, onAttempt }: Props) {
  switch (activity.kind) {
    case "predict":
      return <Predict activity={activity} label={label} onAttempt={onAttempt} />;
    case "spot":
      return <Spot activity={activity} label={label} onAttempt={onAttempt} />;
    case "arrange":
      return <Arrange activity={activity} label={label} onAttempt={onAttempt} />;
    case "estimate":
      return <Estimate activity={activity} label={label} onAttempt={onAttempt} />;
    case "promptLab":
      return <PromptLab activity={activity} label={label} onAttempt={onAttempt} />;
  }
}
