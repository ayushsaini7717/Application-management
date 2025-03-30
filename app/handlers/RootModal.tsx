"use client";

import { useSearchParams } from "next/navigation";

export default function ModalHandler({ modal }: { modal: React.ReactNode }) {
  const searchParams = useSearchParams();
  const ismodal = searchParams.get("ismodal") || "Undefined";


  return ismodal === "true" ? modal : null;
}
