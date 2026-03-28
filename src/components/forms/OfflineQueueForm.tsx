"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";

const QUEUE_KEY = "wial-offline-form-queue";

type OfflineField = {
  name: string;
  label: string;
  placeholder: string;
  type?: string;
};

type QueuedSubmission = {
  endpoint: string;
  queueType: string;
  values: Record<string, string>;
};

type OfflineQueueFormProps = {
  title: string;
  description: string;
  endpoint: string;
  queueType: string;
  fields: OfflineField[];
};

function readQueue() {
  if (typeof window === "undefined") {
    return [] as QueuedSubmission[];
  }

  try {
    const rawQueue = window.localStorage.getItem(QUEUE_KEY);
    return rawQueue ? (JSON.parse(rawQueue) as QueuedSubmission[]) : [];
  } catch {
    return [];
  }
}

function writeQueue(queue: QueuedSubmission[]) {
  window.localStorage.setItem(QUEUE_KEY, JSON.stringify(queue));
}

async function submitEntry(entry: QueuedSubmission) {
  const response = await fetch(entry.endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      queueType: entry.queueType,
      ...entry.values,
    }),
  });

  if (!response.ok) {
    throw new Error("Unable to submit queued entry");
  }
}

export function OfflineQueueForm({
  title,
  description,
  endpoint,
  queueType,
  fields,
}: OfflineQueueFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [message, setMessage] = useState(
    "Submissions work online and queue automatically offline.",
  );
  const [queueCount, setQueueCount] = useState(() => readQueue().length);

  useEffect(() => {
    async function flushQueue() {
      if (!navigator.onLine) {
        return;
      }

      const existingQueue = readQueue();
      if (existingQueue.length === 0) {
        setQueueCount(0);
        return;
      }

      const remaining: QueuedSubmission[] = [];
      for (const entry of existingQueue) {
        try {
          await submitEntry(entry);
        } catch {
          remaining.push(entry);
        }
      }

      writeQueue(remaining);
      setQueueCount(remaining.length);
      if (remaining.length === 0) {
        setMessage("Queued submissions synced successfully.");
      }
    }

    window.addEventListener("online", flushQueue);
    flushQueue().catch(() => {
      setMessage("Queued submissions are waiting for connectivity.");
    });

    return () => {
      window.removeEventListener("online", flushQueue);
    };
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const values = Object.fromEntries(
      Array.from(formData.entries()).map(([key, value]) => [key, String(value)]),
    );

    const entry = { endpoint, queueType, values };

    if (!navigator.onLine) {
      const nextQueue = [...readQueue(), entry];
      writeQueue(nextQueue);
      setQueueCount(nextQueue.length);
      setMessage("Offline detected. Submission saved and queued for retry.");
      formRef.current?.reset();
      return;
    }

    try {
      await submitEntry(entry);
      setMessage("Submission sent successfully.");
      formRef.current?.reset();
    } catch {
      const nextQueue = [...readQueue(), entry];
      writeQueue(nextQueue);
      setQueueCount(nextQueue.length);
      setMessage("Submission failed. Saved locally and will retry online.");
    }
  }

  return (
    <section className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
      <div className="space-y-3">
        <h2 className="text-2xl font-semibold text-slate-950">{title}</h2>
        <p className="text-sm leading-7 text-slate-700">{description}</p>
        <p className="text-sm font-medium text-sky-900">
          {message} Queue length: {queueCount}
        </p>
      </div>

      <form ref={formRef} onSubmit={handleSubmit} className="mt-6 space-y-4">
        {fields.map((field) => (
          <label key={field.name} className="block space-y-2 text-sm">
            <span className="font-medium text-slate-800">{field.label}</span>
            <input
              name={field.name}
              type={field.type ?? "text"}
              placeholder={field.placeholder}
              required
              className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-sky-500"
            />
          </label>
        ))}

        <button
          type="submit"
          className="rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          Submit
        </button>
      </form>
    </section>
  );
}
