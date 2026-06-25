"use client";

import type { FormEvent } from "react";
import {
  MessageCircleMore,
  Sparkles,
  UsersRound,
  PanelLeftOpen,
  PanelLeftClose
} from "lucide-react";

import { useSidebar } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import { MessageComposer } from "./message-composer";
import { MessageList } from "./message-list";

type Message = {
  _id: string;
  message: string;
  author: string;
  createdAt: string;
};

type ChatShellProps = {
  messages: Message[];
  isLoading: boolean;
  draft: string;
  error: string | null;
  isSending: boolean;
  currentUser: string;
  onDraftChange: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

const channels = [
  { label: "General", icon: MessageCircleMore, active: true },
  { label: "Design", icon: Sparkles },
  { label: "Product", icon: UsersRound },
];

export function ChatShell({
  messages,
  isLoading,
  draft,
  error,
  isSending,
  currentUser,
  onDraftChange,
  onSubmit,
}: ChatShellProps) {
  const { open } = useSidebar();
  return (
    
    <SidebarProvider defaultOpen>
      <div className="flex min-h-screen w-full bg-accent/40">
        {/* SIDEBAR */}
        <Sidebar
          collapsible="icon"
          className="border-r border-border bg-white/90 backdrop-blur"
        >
          <SidebarHeader className="border-b border-slate-200 px-3 py-3.5 group-data-[collapsible=icon]:py-5">
            <div className="flex items-center gap-3">
              <Avatar className="size-9 group-data-[collapsible=icon]:size-6">
                <AvatarImage src="/Logo.png" alt="Doodle logo" />
                <AvatarFallback>DO</AvatarFallback>
              </Avatar>

              <div className="group-data-[collapsible=icon]:hidden">
                <p className="text-lg font-semibold text-black">Doodle</p>
              </div>
            </div>
          </SidebarHeader>

          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Inbox</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {channels.map((channel) => {
                    const Icon = channel.icon;

                    return (
                      <SidebarMenuItem key={channel.label}>
                        <SidebarMenuButton
                          isActive={channel.active}
                          tooltip={channel.label}
                          className="rounded-xl"
                        >
                          <Icon className="size-4" />
                          <span>{channel.label}</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="border-t border-border p-3.5 group-data-[collapsible=icon]:p-1.5">
            <div className="flex items-center gap-3 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-2">
              <Avatar className="size-9 bg-secondary">
                <AvatarFallback>
                  {currentUser?.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <div className="min-w-0 group-data-[collapsible=icon]:hidden">
                <p className="truncate text-sm font-semibold text-black">
                  {currentUser}
                </p>
              </div>
            </div>
          </SidebarFooter>

          <SidebarRail />
        </Sidebar>

        {/* MAIN AREA */}
        <SidebarInset className="w-full max-h-screen overflow-hidden">
            <header className="flex h-16 items-center justify-between border-b border-border bg-white/90 px-4 backdrop-blur sm:px-6">
                <div className="flex items-center gap-3">
                <SidebarTrigger className="shrink-0">
                    {open ? (
                        <PanelLeftClose className="size-4" />
                    ) : (
                        <PanelLeftOpen className="size-4" />
                    )}
                </SidebarTrigger>

                <div>
                    <p className="text-sm font-semibold text-black">
                    General
                    </p>
                </div>
                </div>
            </header>

            {/* CHAT BODY */}
            <main 
            className="w-full h-full flex-1 overflow-hidden" 
            style={{
            backgroundImage: "url('/assets/Body BG.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            }}>
                <MessageList
                    messages={messages}
                    isLoading={isLoading}
                    currentUser={currentUser}
                />
            </main>
          
            <MessageComposer
                draft={draft}
                error={error}
                isSending={isSending}
                onDraftChange={onDraftChange}
                onSubmit={onSubmit}
            />
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}