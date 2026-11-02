import { createFileRoute } from "@tanstack/react-router";
import { SlotMachine } from "@/components/slot/SlotMachine";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return <SlotMachine />;
}
