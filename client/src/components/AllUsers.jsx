import React from 'react'
"use client"

import { useState } from "react"
import { MoreHorizontal, PlusCircle, Pencil, Trash2, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"



const AllUsers = () => {
    const users = [
        {
            id: "1",
            name: "Olivia Martin",
            email: "olivia.martin@email.com",
            role: "Admin",
            status: "Active",
            lastActive: "2 hours ago",
            avatarUrl: "/placeholder.svg?height=32&width=32",
        },
        {
            id: "2",
            name: "Jackson Lee",
            email: "jackson.lee@email.com",
            role: "User",
            status: "Active",
            lastActive: "3 hours ago",
            avatarUrl: "/placeholder.svg?height=32&width=32",
        },
        {
            id: "3",
            name: "Isabella Nguyen",
            email: "isabella.nguyen@email.com",
            role: "User",
            status: "Inactive",
            lastActive: "1 day ago",
            avatarUrl: "/placeholder.svg?height=32&width=32",
        },
        {
            id: "4",
            name: "William Kim",
            email: "william.kim@email.com",
            role: "User",
            status: "Active",
            lastActive: "2 days ago",
            avatarUrl: "/placeholder.svg?height=32&width=32",
        },
        {
            id: "5",
            name: "Sofia Davis",
            email: "sofia.davis@email.com",
            role: "Moderator",
            status: "Active",
            lastActive: "5 days ago",
            avatarUrl: "/placeholder.svg?height=32&width=32",
        },
        {
            id: "6",
            name: "Ethan Johnson",
            email: "ethan.johnson@email.com",
            role: "User",
            status: "Suspended",
            lastActive: "1 week ago",
            avatarUrl: "/placeholder.svg?height=32&width=32",
        },
        {
            id: "7",
            name: "Ava Williams",
            email: "ava.williams@email.com",
            role: "User",
            status: "Active",
            lastActive: "2 weeks ago",
            avatarUrl: "/placeholder.svg?height=32&width=32",
        },
        {
            id: "8",
            name: "Noah Brown",
            email: "noah.brown@email.com",
            role: "User",
            status: "Active",
            lastActive: "3 weeks ago",
            avatarUrl: "/placeholder.svg?height=32&width=32",
        },
        {
            id: "9",
            name: "Emma Jones",
            email: "emma.jones@email.com",
            role: "User",
            status: "Inactive",
            lastActive: "1 month ago",
            avatarUrl: "/placeholder.svg?height=32&width=32",
        },
        {
            id: "10",
            name: "Liam Garcia",
            email: "liam.garcia@email.com",
            role: "User",
            status: "Active",
            lastActive: "2 months ago",
            avatarUrl: "/placeholder.svg?height=32&width=32",
        },
        {
            id: "11",
            name: "Liam Garcia",
            email: "liam.garcia@email.com",
            role: "User",
            status: "Active",
            lastActive: "2 months ago",
            avatarUrl: "/placeholder.svg?height=32&width=32",
        },
    ]
    const [selectedUser, setSelectedUser] = useState(null)
    const [searchQuery, setSearchQuery] = useState("")

    // Filter users based on search query
    const filteredUsers = users.filter(
        (user) =>
            user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.role.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>Users</CardTitle>
                    <CardDescription>Manage your user accounts and permissions.</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                    <div className="relative">
                        <Input
                            placeholder="Search users..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-[200px] lg:w-[300px]"
                        />
                    </div>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="bg-orange text-white hover:bg-amber-100 hover:text-orange">
                                <Plus /> Add Menu

                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Add New User</DialogTitle>
                                <DialogDescription>Create a new user account. Click save when you're done.</DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="name" className="text-right">
                                        Name
                                    </Label>
                                    <Input id="name" className="col-span-3" />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="email" className="text-right">
                                        Email
                                    </Label>
                                    <Input id="email" type="email" className="col-span-3" />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="role" className="text-right">
                                        Role
                                    </Label>
                                    <Select>
                                        <SelectTrigger id="role" className="col-span-3">
                                            <SelectValue placeholder="Select role" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="admin">Admin</SelectItem>
                                            <SelectItem value="moderator">Moderator</SelectItem>
                                            <SelectItem value="user">User</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="status" className="text-right">
                                        Status
                                    </Label>
                                    <Select>
                                        <SelectTrigger id="status" className="col-span-3">
                                            <SelectValue placeholder="Select status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="active">Active</SelectItem>
                                            <SelectItem value="inactive">Inactive</SelectItem>
                                            <SelectItem value="suspended">Suspended</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="submit" className='bg-orange hover:bg-amber-100 hover:text-orange'>Save User</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </CardHeader>
            <CardContent>
                <div className="rounded-md border">
                    <Table>
                        <TableHeader className="bg-orange text-white ">
                            <TableRow>
                                <TableHead className="w-[80px]">ID</TableHead>
                                <TableHead>User</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Last Active</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredUsers.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="h-24 text-center">
                                        No users found.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredUsers.map((user) => (
                                    <TableRow key={user.id}>
                                        <TableCell className="font-medium">{user.id}</TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <Avatar className="h-8 w-8">
                                                    <AvatarImage src={user.avatarUrl} alt={user.name} />
                                                    <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                                                </Avatar>
                                                <div className="flex flex-col">
                                                    <span className="font-medium">{user.name}</span>
                                                    <span className="text-xs text-muted-foreground">{user.email}</span>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge
                                                variant={
                                                    user.role === "Admin" ? "default" : user.role === "Moderator" ? "outline" : "secondary"
                                                }
                                            >
                                                {user.role}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <Badge
                                                variant={
                                                    user.status === "Active"
                                                        ? "success"
                                                        : user.status === "Inactive"
                                                            ? "secondary"
                                                            : "destructive"
                                                }
                                            >
                                                {user.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>{user.lastActive}</TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <Dialog>
                                                    <DialogTrigger asChild>
                                                        <Button variant="outline" size="icon" onClick={() => setSelectedUser(user)}>
                                                            <Pencil className="h-4 w-4" />
                                                            <span className="sr-only">Edit</span>
                                                        </Button>
                                                    </DialogTrigger>
                                                    <DialogContent className="sm:max-w-[425px]">
                                                        <DialogHeader>
                                                            <DialogTitle>Edit User</DialogTitle>
                                                            <DialogDescription>
                                                                Make changes to the user account. Click save when you're done.
                                                            </DialogDescription>
                                                        </DialogHeader>
                                                        <div className="grid gap-4 py-4">
                                                            <div className="grid grid-cols-4 items-center gap-4">
                                                                <Label htmlFor="edit-name" className="text-right">
                                                                    Name
                                                                </Label>
                                                                <Input id="edit-name" className="col-span-3" defaultValue={selectedUser?.name} />
                                                            </div>
                                                            <div className="grid grid-cols-4 items-center gap-4">
                                                                <Label htmlFor="edit-email" className="text-right">
                                                                    Email
                                                                </Label>
                                                                <Input
                                                                    id="edit-email"
                                                                    type="email"
                                                                    className="col-span-3"
                                                                    defaultValue={selectedUser?.email}
                                                                />
                                                            </div>
                                                            <div className="grid grid-cols-4 items-center gap-4">
                                                                <Label htmlFor="edit-role" className="text-right">
                                                                    Role
                                                                </Label>
                                                                <Select defaultValue={selectedUser?.role.toLowerCase()}>
                                                                    <SelectTrigger id="edit-role" className="col-span-3">
                                                                        <SelectValue placeholder="Select role" />
                                                                    </SelectTrigger>
                                                                    <SelectContent>
                                                                        <SelectItem value="admin">Admin</SelectItem>
                                                                        <SelectItem value="moderator">Moderator</SelectItem>
                                                                        <SelectItem value="user">User</SelectItem>
                                                                    </SelectContent>
                                                                </Select>
                                                            </div>
                                                            <div className="grid grid-cols-4 items-center gap-4">
                                                                <Label htmlFor="edit-status" className="text-right">
                                                                    Status
                                                                </Label>
                                                                <Select defaultValue={selectedUser?.status.toLowerCase()}>
                                                                    <SelectTrigger id="edit-status" className="col-span-3">
                                                                        <SelectValue placeholder="Select status" />
                                                                    </SelectTrigger>
                                                                    <SelectContent>
                                                                        <SelectItem value="active">Active</SelectItem>
                                                                        <SelectItem value="inactive">Inactive</SelectItem>
                                                                        <SelectItem value="suspended">Suspended</SelectItem>
                                                                    </SelectContent>
                                                                </Select>
                                                            </div>
                                                        </div>
                                                        <DialogFooter>
                                                            <Button type="submit">Save Changes</Button>
                                                        </DialogFooter>
                                                    </DialogContent>
                                                </Dialog>

                                                <AlertDialog>
                                                    <AlertDialogTrigger asChild>
                                                        <Button variant="outline" size="icon" className="text-destructive  ">
                                                            <Trash2 className="h-4 w-4" />
                                                            <span className="sr-only" >Delete</span>
                                                        </Button>
                                                    </AlertDialogTrigger>
                                                    <AlertDialogContent>
                                                        <AlertDialogHeader>
                                                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                                            <AlertDialogDescription>
                                                                This action cannot be undone. This will permanently delete the user account and remove
                                                                their data from our servers.
                                                            </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                            <AlertDialogAction className="bg-destructive text-destructive-foreground">
                                                                Delete
                                                            </AlertDialogAction>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialog>

                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="icon">
                                                            <MoreHorizontal className="h-4 w-4" />
                                                            <span className="sr-only">More options</span>
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                        <DropdownMenuItem>View profile</DropdownMenuItem>
                                                        <DropdownMenuItem>Reset password</DropdownMenuItem>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
                <div className="flex items-center justify-end space-x-2 py-4">
                    <div className="flex-1 text-sm text-muted-foreground">
                        Showing <strong>{filteredUsers.length}</strong> of <strong>{users.length}</strong> users
                    </div>
                    <div className="space-x-2">
                        <Button variant="outline" size="sm" disabled>
                            Previous
                        </Button>
                        <Button variant="outline" size="sm">
                            Next
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>)
}

export default AllUsers