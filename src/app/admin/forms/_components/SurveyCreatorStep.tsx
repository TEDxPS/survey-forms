"use client";

// CSS imported in FormWizard.tsx (eager parent) to avoid lazy CSS chunk errors.
import { useEffect, useState } from "react";
import { SurveyCreator, SurveyCreatorComponent } from "survey-creator-react";

interface Props {
  pages: object[];
  onPagesChange: (pages: object[]) => void;
}

export default function SurveyCreatorStep({ pages, onPagesChange }: Props) {
  const [creator, setCreator] = useState<SurveyCreator | null>(null);

  useEffect(() => {
    const c = new SurveyCreator({
      showLogicTab: false,
      showTranslationTab: false,
      isAutoSave: false,
      showPreviewTab: true,
    });

    c.JSON = { pages: pages ?? [] };

    c.onModified.add(() => {
      onPagesChange(c.JSON.pages ?? []);
    });

    setCreator(c);

    return () => {
      c.onModified.clear();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!creator) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-400 text-sm">
        Loading form builder…
      </div>
    );
  }

  return (
    <div style={{ height: "620px" }}>
      <SurveyCreatorComponent creator={creator} />
    </div>
  );
}
