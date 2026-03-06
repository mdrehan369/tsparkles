"use client"

import * as React from "react"
import {
  Hash,
  Volume2,
  Settings,
  UserPlus,
  Plus,
  ChevronDown,
  ChevronRight,
  Mic,
  Headphones,
  User,
  Crown,
  Shield,
} from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Sidebar,
  SidebarContent,
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
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

const serverData = {
  name: "My Awesome Server",
  avatar: "/placeholder.svg?height=48&width=48",
  channels: [
    {
      id: "text",
      name: "TEXT CHANNELS",
      type: "category",
      channels: [
        { id: "general", name: "general", type: "text", unread: 3 },
        { id: "random", name: "random", type: "text" },
        { id: "announcements", name: "announcements", type: "text", unread: 1 },
        { id: "rules", name: "rules", type: "text" },
      ],
    },
    {
      id: "voice",
      name: "VOICE CHANNELS",
      type: "category",
      channels: [
        { id: "general-voice", name: "General", type: "voice", users: 3 },
        { id: "gaming", name: "Gaming", type: "voice", users: 0 },
        { id: "music", name: "Music", type: "voice", users: 1 },
      ],
    },
  ],
  members: [
    { id: "1", name: "John Doe", avatar: "/placeholder.svg?height=32&width=32", status: "online", role: "owner" },
    { id: "2", name: "Jane Smith", avatar: "/placeholder.svg?height=32&width=32", status: "idle", role: "admin" },
    { id: "3", name: "Bob Wilson", avatar: "/placeholder.svg?height=32&width=32", status: "dnd", role: "member" },
    { id: "4", name: "Alice Brown", avatar: "/placeholder.svg?height=32&width=32", status: "offline", role: "member" },
  ],
}

const currentUser = {
  name: "You",
  avatar: "/placeholder.svg?height=32&width=32",
  status: "online",
}

export default function DiscordSidebar() {
  const [selectedChannel, setSelectedChannel] = React.useState("general")
  const [expandedCategories, setExpandedCategories] = React.useState<string[]>(["text", "voice"])
  const [isMuted, setIsMuted] = React.useState(false)
  const [isDeafened, setIsDeafened] = React.useState(false)

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId],
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-500"
      case "idle":
        return "bg-yellow-500"
      case "dnd":
        return "bg-red-500"
      case "offline":
        return "bg-gray-500"
      default:
        return "bg-gray-500"
    }
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "owner":
        return <Crown className="h-3 w-3 text-yellow-500" />
      case "admin":
        return <Shield className="h-3 w-3 text-red-500" />
      default:
        return null
    }
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen bg-gray-800">
        {/* Server List */}
        <div className="w-[72px] bg-gray-900 flex flex-col items-center py-3 space-y-2">
          <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white font-semibold hover:rounded-xl transition-all duration-200 cursor-pointer">
            MA
          </div>
          <div className="w-8 h-0.5 bg-gray-600 rounded"></div>
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="w-12 h-12 bg-gray-700 rounded-full hover:rounded-xl hover:bg-indigo-600 transition-all duration-200 cursor-pointer"
            ></div>
          ))}
          <div className="w-12 h-12 bg-gray-700 rounded-full hover:rounded-xl hover:bg-green-600 transition-all duration-200 cursor-pointer flex items-center justify-center">
            <Plus className="h-6 w-6 text-green-400" />
          </div>
        </div>

        <Sidebar className="w-60 bg-gray-700 border-r-0">
          <SidebarHeader className="p-4 border-b border-gray-600">
            <div className="flex items-center justify-between">
              <h2 className="text-white font-semibold text-sm">{serverData.name}</h2>
              <ChevronDown className="h-4 w-4 text-gray-400" />
            </div>
          </SidebarHeader>

          <SidebarContent className="px-2">
            {serverData.channels.map((category) => (
              <SidebarGroup key={category.id} className="py-2">
                <SidebarGroupLabel
                  className="flex items-center justify-between text-xs font-semibold text-gray-400 uppercase tracking-wide px-2 py-1 hover:text-gray-300 cursor-pointer"
                  onClick={() => toggleCategory(category.id)}
                >
                  <div className="flex items-center">
                    {expandedCategories.includes(category.id) ? (
                      <ChevronDown className="h-3 w-3 mr-1" />
                    ) : (
                      <ChevronRight className="h-3 w-3 mr-1" />
                    )}
                    {category.name}
                  </div>
                  <Plus className="h-4 w-4 opacity-0 group-hover:opacity-100 hover:text-white" />
                </SidebarGroupLabel>

                {expandedCategories.includes(category.id) && (
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {category.channels.map((channel) => (
                        <SidebarMenuItem key={channel.id}>
                          <SidebarMenuButton
                            onClick={() => setSelectedChannel(channel.id)}
                            className={cn(
                              "w-full justify-start px-2 py-1 text-gray-400 hover:text-gray-200 hover:bg-gray-600/50 rounded",
                              selectedChannel === channel.id && "bg-gray-600 text-white",
                            )}
                          >
                            <div className="flex items-center justify-between w-full">
                              <div className="flex items-center">
                                {channel.type === "text" ? (
                                  <Hash className="h-4 w-4 mr-2" />
                                ) : (
                                  <Volume2 className="h-4 w-4 mr-2" />
                                )}
                                <span className="text-sm">{channel.name}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                {channel.unread && (
                                  <Badge variant="destructive" className="h-4 px-1 text-xs">
                                    {channel.unread}
                                  </Badge>
                                )}
                                {channel.users && channel.users > 0 && (
                                  <span className="text-xs text-gray-400">{channel.users}</span>
                                )}
                                <UserPlus className="h-3 w-3 opacity-0 group-hover:opacity-100" />
                                <Settings className="h-3 w-3 opacity-0 group-hover:opacity-100" />
                              </div>
                            </div>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                )}
              </SidebarGroup>
            ))}

            {/* Members Section */}
            <SidebarGroup className="py-2">
              <SidebarGroupLabel className="text-xs font-semibold text-gray-400 uppercase tracking-wide px-2 py-1">
                Members — {serverData.members.length}
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {serverData.members.map((member) => (
                    <SidebarMenuItem key={member.id}>
                      <SidebarMenuButton className="w-full justify-start px-2 py-1 text-gray-400 hover:text-gray-200 hover:bg-gray-600/50 rounded">
                        <div className="flex items-center w-full">
                          <div className="relative">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={member.avatar || "/placeholder.svg"} />
                              <AvatarFallback>{member.name[0]}</AvatarFallback>
                            </Avatar>
                            <div
                              className={cn(
                                "absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-gray-700",
                                getStatusColor(member.status),
                              )}
                            ></div>
                          </div>
                          <div className="ml-3 flex items-center justify-between w-full">
                            <span className="text-sm">{member.name}</span>
                            {getRoleIcon(member.role)}
                          </div>
                        </div>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          {/* User Panel */}
          <div className="mt-auto p-2 bg-gray-800 border-t border-gray-600">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="relative">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={currentUser.avatar || "/placeholder.svg"} />
                    <AvatarFallback>
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div
                    className={cn(
                      "absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-gray-800",
                      getStatusColor(currentUser.status),
                    )}
                  ></div>
                </div>
                <div className="ml-2">
                  <div className="text-white text-sm font-medium">{currentUser.name}</div>
                  <div className="text-gray-400 text-xs">
                    #
                    {Math.floor(Math.random() * 10000)
                      .toString()
                      .padStart(4, "0")}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "h-8 w-8 p-0 text-gray-400 hover:text-white hover:bg-gray-600",
                    isMuted && "text-red-400",
                  )}
                  onClick={() => setIsMuted(!isMuted)}
                >
                  <Mic className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "h-8 w-8 p-0 text-gray-400 hover:text-white hover:bg-gray-600",
                    isDeafened && "text-red-400",
                  )}
                  onClick={() => setIsDeafened(!isDeafened)}
                >
                  <Headphones className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 text-gray-400 hover:text-white hover:bg-gray-600"
                >
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          <SidebarRail />
        </Sidebar>

        <SidebarInset className="flex-1 bg-gray-600">
          <div className="h-full flex items-center justify-center">
            <div className="text-center text-gray-400">
              <Hash className="h-16 w-16 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-white mb-2">Welcome to #{selectedChannel}</h2>
              <p>This is the beginning of the #{selectedChannel} channel.</p>
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
