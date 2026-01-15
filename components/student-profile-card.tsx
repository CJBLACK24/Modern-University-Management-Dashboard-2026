/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { QrCodeDisplay } from "@/components/qr-code-display";
import Image from "next/image";
import { Building2, User, RefreshCw, Shell, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

interface StudentProfileCardProps {
  user: {
    id: string;
    firstName?: string;
    lastName?: string;
    name: string;
    image?: string;
    universityId?: string;
    role: string;
    semester?: string;
    yearLevel?: string;
    department?: {
      name: string;
      code: string;
    };
    birthday?: string;
    age?: number | null;
    signatureUrl?: string;
    enrolledAt?: string;
  };
}

export function StudentProfileCard({ user }: StudentProfileCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const enrollmentDate = user.enrolledAt
    ? new Date(user.enrolledAt).toLocaleDateString()
    : "N/A";

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-sm mx-auto group">
      {/* Container with perspective for 3D flip */}
      <div
        className="relative w-full aspect-[2/3.2] [perspective:1500px] cursor-pointer"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <motion.div
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{
            duration: 0.8,
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
          className="w-full h-full [transform-style:preserve-3d] relative shadow-2xl rounded-[2.5rem]"
        >
          {/* FRONT SIDE */}
          <div className="absolute inset-0 [backface-visibility:hidden] rounded-[2.5rem] overflow-hidden bg-primary p-1 border-4 border-primary-foreground/10">
            <div className="w-full h-full rounded-[2.2rem] overflow-hidden bg-linear-to-b from-primary via-primary/95 to-primary/90 flex flex-col relative">
              {/* Pattern Overlay */}
              <div
                className="absolute inset-0 opacity-10 pointer-events-none"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
                  backgroundSize: "24px 24px",
                }}
              />

              {/* Header */}
              <div className="p-8 text-white text-center z-10">
                <div className="flex justify-center mb-3">
                  <div className="p-3 bg-white/20 backdrop-blur-md rounded-2xl ring-1 ring-white/30 shadow-inner">
                    <Building2 className="h-10 w-10 text-white" />
                  </div>
                </div>
                <h2 className="text-2xl font-black uppercase tracking-[0.2em] leading-tight">
                  University
                  <br />
                  <span className="text-white/70">Identity</span>
                </h2>
                <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                  <Shell className="h-3 w-3 animate-spin-slow" />
                  <span className="text-[10px] font-bold uppercase tracking-widest opacity-80">
                    AY 2026-2027
                  </span>
                </div>
              </div>

              {/* Profile Image Area */}
              <div className="flex-1 flex flex-col items-center px-8 pb-8 z-10 mt-2">
                <div className="relative mb-6">
                  <div className="w-44 h-44 rounded-3xl overflow-hidden border-8 border-white/20 shadow-2xl bg-white/10 backdrop-blur-md flex items-center justify-center relative">
                    {user.image ? (
                      <Image
                        src={user.image}
                        alt={user.name}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    ) : (
                      <User className="w-20 h-20 text-white" />
                    )}

                    {/* Role Overlay Badge */}
                    <div className="absolute bottom-0 inset-x-0 bg-linear-to-t from-black/60 to-transparent p-2 flex justify-center">
                      <Badge className="bg-white text-primary font-black uppercase text-[10px] px-3 py-0.5 shadow-lg">
                        {user.role}
                      </Badge>
                    </div>
                  </div>

                  {/* Decorative Elements */}
                  <div className="absolute -top-4 -right-4 w-12 h-12 bg-white/10 backdrop-blur-md rounded-full border border-white/20 flex items-center justify-center">
                    <ShieldCheck className="h-6 w-6 text-white" />
                  </div>
                </div>

                <div className="text-center space-y-2">
                  <h3 className="text-3xl font-black text-white leading-none tracking-tight">
                    {user.firstName}
                    <br />
                    {user.lastName}
                  </h3>
                  <div className="h-0.5 w-12 bg-white/30 mx-auto rounded-full" />
                  <p className="text-[10px] font-black text-white/60 uppercase tracking-[0.3em]">
                    {user.department?.code || "GENERAL ACADEMICS"}
                  </p>
                </div>

                {/* Footer Front */}
                <div className="mt-auto w-full pt-6 flex justify-between items-end border-t border-white/10">
                  <div className="space-y-1">
                    <p className="text-[8px] font-black text-white/40 uppercase tracking-widest">
                      ID Reference
                    </p>
                    <p className="text-xs font-mono font-bold text-white">
                      {user.universityId || "TEMP-000"}
                    </p>
                  </div>
                  <div className="p-2 bg-white/5 rounded-lg border border-white/10">
                    <RefreshCw className="h-4 w-4 text-white/60 group-hover:rotate-180 transition-transform duration-700" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* BACK SIDE */}
          <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-[2.5rem] overflow-hidden bg-primary p-1 border-4 border-primary-foreground/10 shadow-2xl">
            <div className="w-full h-full rounded-[2.2rem] overflow-hidden bg-linear-to-b from-primary via-primary/95 to-primary/90 flex flex-col relative p-8">
              {/* Pattern Overlay Inverse */}
              <div
                className="absolute inset-0 opacity-5 pointer-events-none"
                style={{
                  backgroundImage:
                    "linear-gradient(45deg, white 25%, transparent 25%, transparent 75%, white 75%, white), linear-gradient(45deg, white 25%, transparent 25%, transparent 75%, white 75%, white)",
                  backgroundSize: "40px 40px",
                  backgroundPosition: "0 0, 20px 20px",
                }}
              />

              <div className="z-10 bg-white/5 backdrop-blur-md rounded-3xl p-6 border border-white/10 h-full flex flex-col">
                <div className="text-center mb-6">
                  <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] mb-4">
                    Official Validation
                  </p>
                  <div className="bg-white p-4 rounded-2xl shadow-xl inline-block mx-auto transform scale-110">
                    <QrCodeDisplay
                      value={user.id}
                      name={user.name}
                      role={user.role}
                      variant="profile"
                    />
                  </div>
                </div>

                {/* Vertical Divider Line */}
                <div className="my-4 border-b border-dashed border-white/20" />

                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div className="space-y-1">
                    <p className="text-[9px] font-black text-white/40 uppercase tracking-widest leading-none">
                      Status
                    </p>
                    <p className="text-xs font-bold text-white uppercase tracking-tighter">
                      Active Student
                    </p>
                  </div>
                  <div className="space-y-1 text-right">
                    <p className="text-[9px] font-black text-white/40 uppercase tracking-widest leading-none">
                      Issued
                    </p>
                    <p className="text-xs font-bold text-white">
                      {enrollmentDate}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[9px] font-black text-white/40 uppercase tracking-widest leading-none">
                      Year/Sem
                    </p>
                    <p className="text-xs font-bold text-white">
                      {user.yearLevel} / {user.semester}
                    </p>
                  </div>
                  <div className="space-y-1 text-right">
                    <p className="text-[9px] font-black text-white/40 uppercase tracking-widest leading-none">
                      Valid Thru
                    </p>
                    <p className="text-xs font-bold text-white">2027-06-30</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <p className="text-[9px] font-black text-white/40 uppercase tracking-widest text-center">
                      Digital Signature
                    </p>
                    <div className="h-16 w-full relative bg-black/20 rounded-xl border border-white/10 flex items-center justify-center p-3 overflow-hidden">
                      {user.signatureUrl ? (
                        <Image
                          src={user.signatureUrl}
                          alt="Signature"
                          fill
                          className="object-contain filter invert opacity-80 p-2"
                          unoptimized
                        />
                      ) : (
                        <p className="text-sm text-white/30 font-serif italic font-medium select-none truncate px-4 text-center w-full">
                          {user.name}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-auto pt-6 text-center">
                  <p className="text-[8px] text-white/40 leading-relaxed font-medium uppercase tracking-tighter">
                    This document is officially issued through the Academic
                    Infrastructure Suite. Reproduction without authorization is
                    prohibited.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Helper Info */}
      <div className="text-center animate-bounce-slow">
        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
          Click ID Card to Flip
          <RefreshCw className="h-3 w-3" />
        </p>
      </div>
    </div>
  );
}
