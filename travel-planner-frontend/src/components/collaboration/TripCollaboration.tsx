import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";
import {
  Users,
  UserPlus,
  Mail,
  Share,
  Copy,
  Link2,
  MessageSquare,
  Check,
  Clock,
  MoreVertical,
  ChevronRight,
  UserMinus,
  Eye,
  Facebook,
  Twitter,
  Instagram,
  Send,
  PlusCircle,
  CheckSquare,
} from "lucide-react";

// Mock data for collaborators
const MOCK_COLLABORATORS = [
  {
    id: "1",
    name: "Alex Johnson",
    email: "alex@example.com",
    role: "owner",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    status: "active",
    lastActive: new Date(),
  },
  {
    id: "2",
    name: "Sarah Williams",
    email: "sarah@example.com",
    role: "editor",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    status: "active",
    lastActive: new Date(Date.now() - 2 * 60 * 60 * 1000),
  },
  {
    id: "3",
    name: "Miguel Rodriguez",
    email: "miguel@example.com",
    role: "viewer",
    avatar: "https://randomuser.me/api/portraits/men/67.jpg",
    status: "pending",
    lastActive: null,
  },
];

// Mock comments data
const MOCK_COMMENTS = [
  {
    id: "c1",
    user: {
      id: "1",
      name: "Alex Johnson",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    text: "Should we add another restaurant option for dinner on Day 2?",
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
    eventId: "e7",
  },
  {
    id: "c2",
    user: {
      id: "2",
      name: "Sarah Williams",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    text: "Great idea! I found this amazing sushi place nearby.",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    eventId: "e7",
  },
];

export default function TripCollaboration({ tripId, tripName, onUpdate }) {
  const { toast } = useToast();
  const [collaborators, setCollaborators] = useState(MOCK_COLLABORATORS);
  const [comments, setComments] = useState(MOCK_COMMENTS);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("editor");
  const [shareUrl, setShareUrl] = useState(
    `https://travel-planner.com/trips/${tripId}`
  );
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [commentText, setCommentText] = useState("");

  // This would be connected to a WebSocket in a real app
  const setupRealTimeConnection = () => {
    console.log("Setting up real-time connection for trip:", tripId);
    // In a real app: socket.io connection, listeners, etc.
  };

  useEffect(() => {
    setupRealTimeConnection();
    return () => {
      // Cleanup WebSocket connection
    };
  }, [tripId]);

  const handleInvite = () => {
    if (!inviteEmail) return;

    // In a real app, this would send an API request
    const newCollaborator = {
      id: `temp-${Date.now()}`,
      name: inviteEmail.split("@")[0],
      email: inviteEmail,
      role: inviteRole,
      status: "pending",
      lastActive: null,
    };

    setCollaborators([...collaborators, newCollaborator]);
    setInviteEmail("");

    toast({
      title: "Invitation Sent",
      description: `Invited ${inviteEmail} as a ${inviteRole}`,
    });
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    toast({
      title: "Link Copied",
      description: "Share link copied to clipboard",
    });
  };

  const handleRemoveCollaborator = (id) => {
    setCollaborators(collaborators.filter((c) => c.id !== id));
    toast({
      title: "Collaborator Removed",
      description: "The user has been removed from this trip",
    });
  };

  const handleRoleChange = (id, newRole) => {
    setCollaborators(
      collaborators.map((c) => (c.id === id ? { ...c, role: newRole } : c))
    );
    toast({
      title: "Role Updated",
      description: `User's permission has been changed to ${newRole}`,
    });
  };

  const handleAddComment = (eventId) => {
    if (!commentText.trim()) return;

    const newComment = {
      id: `new-${Date.now()}`,
      user: {
        id: "1", // Current user
        name: "Alex Johnson",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      },
      text: commentText,
      timestamp: new Date(),
      eventId,
    };

    setComments([...comments, newComment]);
    setCommentText("");

    toast({
      title: "Comment Added",
      description: "Your comment has been added to the event",
    });
  };

  const getTimeAgo = (date) => {
    if (!date) return "Never";

    const seconds = Math.floor((new Date() - date) / 1000);

    if (seconds < 60) return "Just now";
    if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
    return `${Math.floor(seconds / 86400)} days ago`;
  };

  // Render helpers
  const renderRoleBadge = (role) => {
    const styles = {
      owner: "bg-blue-500 hover:bg-blue-600",
      editor: "bg-green-500 hover:bg-green-600",
      viewer: "bg-gray-500 hover:bg-gray-600",
    };

    return (
      <Badge className={styles[role]}>
        {role.charAt(0).toUpperCase() + role.slice(1)}
      </Badge>
    );
  };

  return (
    <div className="w-full space-y-4">
      {/* Collaboration Tabs */}
      <Tabs defaultValue="collaborators" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="collaborators">
            <Users className="h-4 w-4 mr-2" />
            Collaborators ({collaborators.length})
          </TabsTrigger>
          <TabsTrigger value="sharing">
            <Share className="h-4 w-4 mr-2" />
            Sharing
          </TabsTrigger>
        </TabsList>

        {/* Collaborators Tab */}
        <TabsContent value="collaborators" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-medium">Trip Collaborators</h3>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Invite
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Invite Collaborators</DialogTitle>
                  <DialogDescription>
                    Invite others to collaborate on "{tripName}"
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="flex items-center space-x-2">
                    <div className="grid flex-1 gap-2">
                      <Input
                        placeholder="Email address"
                        value={inviteEmail}
                        onChange={(e) => setInviteEmail(e.target.value)}
                      />
                    </div>
                    <Select value={inviteRole} onValueChange={setInviteRole}>
                      <SelectTrigger className="w-28">
                        <SelectValue placeholder="Role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="editor">Editor</SelectItem>
                        <SelectItem value="viewer">Viewer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Permission Levels</h4>
                    <div className="text-sm space-y-2">
                      <div className="flex justify-between">
                        <div className="font-medium">Editor</div>
                        <div className="text-gray-500">
                          Can edit the itinerary
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <div className="font-medium">Viewer</div>
                        <div className="text-gray-500">
                          Can only view the trip
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <DialogFooter className="sm:justify-start">
                  <Button
                    type="button"
                    variant="default"
                    onClick={handleInvite}
                    disabled={!inviteEmail}
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Send Invitation
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardContent className="p-0">
              <ul className="divide-y">
                {collaborators.map((user) => (
                  <li
                    key={user.id}
                    className="flex items-center justify-between p-4"
                  >
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback>
                          {user.name.substring(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium flex items-center">
                          {user.name}
                          {user.status === "pending" && (
                            <Badge variant="outline" className="ml-2 text-xs">
                              Pending
                            </Badge>
                          )}
                        </div>
                        <div className="text-sm text-gray-500">
                          {user.email}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <div className="text-xs text-gray-500 flex items-center mr-2">
                        <Clock className="h-3 w-3 mr-1" />
                        {user.lastActive
                          ? getTimeAgo(user.lastActive)
                          : "Never active"}
                      </div>

                      {user.role === "owner" ? (
                        renderRoleBadge("owner")
                      ) : (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                            >
                              <span className="sr-only">Open menu</span>
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />

                            <DropdownMenuItem
                              onClick={() =>
                                handleRoleChange(user.id, "editor")
                              }
                            >
                              <CheckSquare className="h-4 w-4 mr-2" />
                              <span>Make Editor</span>
                              {user.role === "editor" && (
                                <Check className="h-4 w-4 ml-auto" />
                              )}
                            </DropdownMenuItem>

                            <DropdownMenuItem
                              onClick={() =>
                                handleRoleChange(user.id, "viewer")
                              }
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              <span>Make Viewer</span>
                              {user.role === "viewer" && (
                                <Check className="h-4 w-4 ml-auto" />
                              )}
                            </DropdownMenuItem>

                            <DropdownMenuSeparator />

                            <DropdownMenuItem
                              className="text-red-600"
                              onClick={() => handleRemoveCollaborator(user.id)}
                            >
                              <UserMinus className="h-4 w-4 mr-2" />
                              <span>Remove</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Sharing Tab */}
        <TabsContent value="sharing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Share Trip</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="text-sm font-medium">Share Link</div>
                <div className="flex space-x-2">
                  <Input readOnly value={shareUrl} />
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={handleCopyLink}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="text-sm font-medium">Share on Social Media</div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Facebook className="h-4 w-4 mr-2" />
                    Facebook
                  </Button>
                  <Button variant="outline" size="sm">
                    <Twitter className="h-4 w-4 mr-2" />
                    Twitter
                  </Button>
                  <Button variant="outline" size="sm">
                    <Instagram className="h-4 w-4 mr-2" />
                    Instagram
                  </Button>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="text-sm font-medium">Privacy Settings</div>
                <div className="space-y-2">
                  <Select defaultValue="collaborators">
                    <SelectTrigger>
                      <SelectValue placeholder="Who can see this trip" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="private">Only me</SelectItem>
                      <SelectItem value="collaborators">
                        Collaborators only
                      </SelectItem>
                      <SelectItem value="anyone">
                        Anyone with the link
                      </SelectItem>
                      <SelectItem value="public">
                        Public (listed in community)
                      </SelectItem>
                    </SelectContent>
                  </Select>

                  <Select defaultValue="editors">
                    <SelectTrigger>
                      <SelectValue placeholder="Who can edit this trip" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="only_me">Only me</SelectItem>
                      <SelectItem value="editors">Editors only</SelectItem>
                      <SelectItem value="all_collaborators">
                        All collaborators
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => toast({ title: "Settings Saved" })}>
                Save Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Comments Sheet - would be triggered when clicking on an event */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" className="w-full">
            <MessageSquare className="h-4 w-4 mr-2" />
            View All Comments
          </Button>
        </SheetTrigger>
        <SheetContent className="sm:max-w-md">
          <SheetHeader>
            <SheetTitle>Comments & Discussion</SheetTitle>
            <SheetDescription>
              Collaborate and discuss about specific events
            </SheetDescription>
          </SheetHeader>

          <div className="flex flex-col h-full py-4">
            <ScrollArea className="flex-1 pr-4">
              <div className="space-y-6">
                <div className="space-y-1">
                  <h4 className="text-sm font-medium text-muted-foreground">
                    Day 2
                  </h4>
                  <Card className="bg-muted/50">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">
                        Visit Botanical Gardens
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pb-3">
                      <div className="text-sm text-muted-foreground">
                        10:00 AM
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-4">
                  {comments
                    .filter((c) => c.eventId === "e7")
                    .map((comment) => (
                      <div key={comment.id} className="flex space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={comment.user.avatar} />
                          <AvatarFallback>
                            {comment.user.name.substring(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center">
                            <div className="font-medium text-sm">
                              {comment.user.name}
                            </div>
                            <div className="ml-auto text-xs text-muted-foreground">
                              {getTimeAgo(comment.timestamp)}
                            </div>
                          </div>
                          <div className="mt-1 text-sm">{comment.text}</div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </ScrollArea>

            <div className="border-t pt-4 mt-4">
              <div className="flex space-x-2">
                <Input
                  placeholder="Add a comment..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                />
                <Button onClick={() => handleAddComment("e7")}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
