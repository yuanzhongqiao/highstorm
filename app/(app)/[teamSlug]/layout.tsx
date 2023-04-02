import { Inter as FontSans } from "@next/font/google"

import "@/styles/globals.css"
import { cn } from "@/lib/utils"
import { Analytics } from "@/components/analytics"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import { ThemeProvider } from "@/components/theme-provider"
import { db } from "@/prisma/db"
import { BarChart, CreditCard, Filter, FormInput, Hash, Keyboard, LayoutList, List, LogOut, Mail, MessageSquare, PlusCircle, Settings, User, UserPlus, Users } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuCheckboxItem, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ClerkProvider, SignIn } from "@clerk/nextjs"
import { auth } from "@clerk/nextjs/app-beta"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

interface RootLayoutProps {
  children: React.ReactNode
  params: { teamSlug: string }
}

export default async function RootLayout({ children, params }: RootLayoutProps) {

  const { userId } = auth()
  if (!userId) {
    return <div className="w-screen h-screen flex items-center justify-center">
      <SignIn />
    </div>
  }
  const teams = await db.team.findMany()
  const channels = await db.channel.findMany()
  return (


    <div className="flex min-h-screen flex-col">
      <div className="container flex-1">
        <div className="bg-white  transition-all dark:bg-neutral-900">
          <div className="grid grid-cols-4 xl:grid-cols-5">
            <aside className="pb-12">
              <div className="px-8 py-6">
                <p className="flex items-center text-2xl font-semibold tracking-tight">
                  Bivrost
                </p>
              </div>
              <div className="space-y-4">
                {/* <div className="px-6 py-2">
                            <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
                                Discover
                            </h2>
                            <div className="space-y-1">
                                <Button
                                    variant="subtle"
                                    size="sm"
                                    className="w-full justify-start"
                                >
                                    <PlayCircle className="mr-2 h-4 w-4" />
                                    Listen Now
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="w-full justify-start"
                                >
                                    <LayoutGrid className="mr-2 h-4 w-4" />
                                    Browse
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="w-full justify-start"
                                >
                                    <Radio className="mr-2 h-4 w-4" />
                                    Radio
                                </Button>
                            </div>
                        </div> */}
                <div className="px-6 py-2">
                  <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
                    Events
                  </h2>
                  <div className="space-y-1">

                    <Button
                      variant="ghost"
                      disabled
                      size="sm"
                      className="w-full justify-start"
                    >
                      <FormInput className="mr-2 h-4 w-4" />
                      Stream
                    </Button>
                    <Button
                      variant="ghost"
                      disabled
                      size="sm"
                      className="w-full justify-start"
                    >
                      <Filter className="mr-2 h-4 w-4" />
                      Filter
                    </Button>
                    <Button
                      variant="ghost"
                      disabled
                      size="sm"
                      className="w-full justify-start"
                    >
                      <BarChart className="mr-2 h-4 w-4" />
                      Analytics
                    </Button>
                  </div>
                </div>
                <div className="py-2">
                  <h2 className="relative px-8 text-lg font-semibold tracking-tight">
                    Channels
                  </h2>
                  <ScrollArea className="h-[230px] px-4">
                    <div className="space-y-1 p-2">
                      {channels.map((channel) => (
                        <Link href={`/${params.teamSlug}/}${channel.name}`}>
                          <Button

                            variant="ghost"
                            size="sm"
                            className="w-full justify-start font-normal"
                          >
                            <Hash className="mr-2 h-4 w-4" />
                            {channel.name}
                          </Button>
                        </Link>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
                <div className="py-2">
                  <h2 className="relative px-8 text-lg font-semibold tracking-tight">
                    Teams
                  </h2>
                  <ScrollArea className="h-[230px] px-4">
                    <div className="space-y-1 p-2">
                      {teams.map((team) => (
                        <Button
                          variant={team.name === "Personal" ? "subtle" : "ghost"}
                          size="sm"
                          className="w-full justify-start font-normal"
                        >
                          {/* <Hash className="mr-2 h-4 w-4" /> */}
                          {team.name}
                        </Button>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              </div>
            </aside>
            <div className="col-span-3 border-l border-l-neutral-200 dark:border-l-neutral-700 xl:col-span-4">
              <div className="h-full px-8 py-6">
                <div className="space-between flex items-center">

                  <div className="ml-auto mr-4">
                    <h3 className="text-sm font-semibold">chronark</h3>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className="relative h-10 w-10 rounded-full"
                      >
                        <Avatar>
                          <AvatarImage
                            src="https://github.com/chronark.png"
                            alt="@chronark"
                          />
                          <AvatarFallback>SC</AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className="w-56"
                      align="end"
                      forceMount
                    >
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        <DropdownMenuItem>
                          <User className="mr-2 h-4 w-4" />
                          <span>Profile</span>
                          <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <CreditCard className="mr-2 h-4 w-4" />
                          <span>Billing</span>
                          <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Settings className="mr-2 h-4 w-4" />
                          <span>Settings</span>
                          <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Keyboard className="mr-2 h-4 w-4" />
                          <span>Keyboard shortcuts</span>
                          <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        <DropdownMenuItem>
                          <Users className="mr-2 h-4 w-4" />
                          <span>Team</span>
                        </DropdownMenuItem>
                        <DropdownMenuSub>
                          <DropdownMenuSubTrigger>
                            <UserPlus className="mr-2 h-4 w-4" />
                            <span>Invite users</span>
                          </DropdownMenuSubTrigger>
                          <DropdownMenuPortal>
                            <DropdownMenuSubContent forceMount>
                              <DropdownMenuItem>
                                <Mail className="mr-2 h-4 w-4" />
                                <span>Email</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <MessageSquare className="mr-2 h-4 w-4" />
                                <span>Message</span>
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                <PlusCircle className="mr-2 h-4 w-4" />
                                <span>More...</span>
                              </DropdownMenuItem>
                            </DropdownMenuSubContent>
                          </DropdownMenuPortal>
                        </DropdownMenuSub>
                      </DropdownMenuGroup>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                        <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                {children}
              </div>
            </div>
          </div>
        </div>


      </div>
    </div>

  )
}