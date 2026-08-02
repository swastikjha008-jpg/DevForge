"use client";
import React, { useState } from "react";
import { Check, Loader2, Download, RotateCcw, AlertTriangle } from "lucide-react";
import { AnimatedAIChat } from "@/components/ui/animated-ai-chat";
import { CoreSpinLoader } from "@/components/ui/core-spin-loader";
import OutputCard from "@/components/landing/OutputCard";
import { generateProject, resolveDownloadUrl, GenerateRequestError } from "@/lib/api";

const STEPS = [
  { key: "describe", label: "Reading your description" },
  { key: "generate", label: "Generating project files" },
  { key: "download", label: "Packaging for download" },
];

type Status = "idle" | "generating" | "done" | "error";

const GenerateFlow: React.FC = () => {
  const [status, setStatus] = useState<Status>("idle");
  const [activeStep, setActiveStep] = useState(-1);
  const [lastPrompt, setLastPrompt] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("");
  const [projectName, setProjectName] = useState("");
  const [generatedFiles, setGeneratedFiles] = useState<string[]>([]);
  const [generatedFolders, setGeneratedFolders] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState("");

  const handleGenerate = async (prompt: string) => {
    setLastPrompt(prompt);
    setStatus("generating");
    setActiveStep(0);

    try {
      setActiveStep(1);
      const result = await generateProject(prompt);
      setActiveStep(2);
      setDownloadUrl(result.downloadUrl);
      setProjectName(result.projectName);
      setGeneratedFiles(result.files);
      setGeneratedFolders(result.folders);
      setActiveStep(3);
      setStatus("done");
    } catch (err) {
      const message = err instanceof GenerateRequestError ? err.message : "Unable to generate your project. Please try again.";
      setErrorMessage(message);
      setStatus("error");
    }
  };

  const handleReset = () => {
    setStatus("idle");
    setActiveStep(-1);
    setDownloadUrl("");
    setProjectName("");
    setGeneratedFiles([]);
    setGeneratedFolders([]);
    setErrorMessage("");
  };

  const handleDownload = () => {
    if (!downloadUrl) return;
    window.location.href = resolveDownloadUrl(downloadUrl);
  };

  return (
    <div>
      <AnimatedAIChat onGenerate={handleGenerate} />

      {(status === "generating" || status === "done") && (
        <div className="mx-auto max-w-2xl px-6 sm:px-8 -mt-10 pb-8">
          <div className="rounded-lg border border-line bg-char-raised p-5 sm:p-6">
            {status === "generating" && (
              <div className="pb-6 mb-6 border-b border-line">
                <CoreSpinLoader />
              </div>
            )}
            <div className="space-y-3">
              {STEPS.map((step, i) => {
                const done = activeStep > i;
                const active = activeStep === i;
                return (
                  <div key={step.key} className="flex items-center gap-3 font-mono text-[13px]">
                    <span
                      className={`flex items-center justify-center w-5 h-5 rounded-full border shrink-0 ${
                        done
                          ? "border-accent bg-accent/15 text-accent"
                          : active
                          ? "border-accent text-accent"
                          : "border-line text-steel-dim"
                      }`}
                    >
                      {done ? (
                        <Check size={12} strokeWidth={3} />
                      ) : active ? (
                        <Loader2 size={11} className="animate-spin" />
                      ) : (
                        <span className="w-1.5 h-1.5 rounded-full bg-current" />
                      )}
                    </span>
                    <span className={done || active ? "text-paper" : "text-steel-dim"}>{step.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {status === "error" && (
        <div className="mx-auto max-w-2xl px-6 sm:px-8 -mt-10 pb-28">
          <div className="rounded-lg border border-line bg-char-raised p-5 sm:p-6 flex flex-col items-center text-center gap-4">
            <span className="flex items-center justify-center w-9 h-9 rounded-full border border-line text-steel-dim">
              <AlertTriangle size={16} />
            </span>
            <p className="font-mono text-[13.5px] text-steel">{errorMessage}</p>
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-2 rounded-md border border-line px-6 py-3 font-mono text-[14px] text-paper hover:border-steel transition-colors"
            >
              <RotateCcw size={14} />
              Try again
            </button>
          </div>
        </div>
      )}

      {status === "done" && (
        <div className="mx-auto max-w-2xl px-6 sm:px-8 pb-28 flex flex-col items-center">
          <OutputCard projectName={projectName} files={generatedFiles} folders={generatedFolders} />
          <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
            <button
              type="button"
              onClick={handleDownload}
              className="inline-flex items-center gap-2 rounded-md bg-accent px-6 py-3.5 font-mono font-semibold text-[14.5px] text-char hover:bg-accent-glow transition-colors"
            >
              <Download size={16} strokeWidth={2.5} />
              Download ZIP
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-2 rounded-md border border-line px-6 py-3.5 font-mono text-[14.5px] text-paper hover:border-steel transition-colors"
            >
              <RotateCcw size={15} />
              Start over
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GenerateFlow;

