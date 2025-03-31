import React, { useEffect } from 'react'
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
import axios from 'axios'



const AllUsers = () => {
   
    const [selectedUser, setSelectedUser] = useState(null)
    const [searchQuery, setSearchQuery] = useState("")
    const [allUsers, setAllUsers] = useState([])
    const getAllUsers = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BASEURL}/user/all-patner`)
            // console.log(res.data.users)
            setAllUsers(res.data.users)
        } catch (error) {
            console.error(error);

        }
    }
    useEffect(() => { getAllUsers() }, [])
    console.log(allUsers)
    // Filter users based on search query
    const filteredUsers = allUsers?.filter(user => 
        user &&
        user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.role?.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];
    

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
                                        <TableCell className="font-medium">{user._id}</TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <Avatar className="h-8 w-8">
                                                    <AvatarImage src={user.profilePicture} alt={user.name} />
                                                    <AvatarFallback>{user.name}</AvatarFallback>
                                                </Avatar>
                                                <div className="flex flex-col">
                                                    <span className="font-medium">{user.name}</span>
                                                    <span className="text-xs text-muted-foreground">{user.email}</span>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge
                                             
                                            >
                                                {user.role}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <Badge

                                            >
                                                {user.isVerified ? "Verified" : "Not Verified"}
                                            </Badge>
                                        </TableCell>
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
                                                            <AlertDialogDescription>                                         This action cannot be undone. This will permanently delete the user account and remove
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
                        Showing <strong>{allUsers.length}</strong> of <strong>{allUsers.length}</strong> users
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