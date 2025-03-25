import React, { useState } from "react";
import { MoreHorizontal, Eye, Pencil, Trash2, Filter, Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Orders = () => {
    const orders = [
        {
            id: "ORD-001",
            customer: {
                name: "Olivia Martin",
                email: "olivia.martin@email.com",
                avatarUrl: "/placeholder.svg?height=32&width=32",
            },
            restaurantId: "REST-001",
            restaurantName: "Pizza Palace",
            status: "Delivered",
            items: [
                { name: "Margherita Pizza", quantity: 2, price: 12.99 },
                { name: "Garlic Bread", quantity: 1, price: 4.99 },
            ],
            total: 30.97,
            date: "2023-05-15T14:30:00",
            paymentMethod: "Credit Card",
            deliveryAddress: "123 Main St, Apt 4B, New York, NY 10001",
        },
        {
            id: "ORD-002",
            customer: {
                name: "Jackson Lee",
                email: "jackson.lee@email.com",
                avatarUrl: "/placeholder.svg?height=32&width=32",
            },
            restaurantId: "REST-002",
            restaurantName: "Spice Garden",
            status: "Processing",
            items: [
                { name: "Chicken Biryani", quantity: 1, price: 14.99 },
                { name: "Naan", quantity: 2, price: 2.99 },
            ],
            total: 20.97,
            date: "2023-05-16T12:15:00",
            paymentMethod: "PayPal",
            deliveryAddress: "456 Oak Ave, Brooklyn, NY 11201",
        },
        {
            id: "ORD-003",
            customer: {
                name: "Isabella Nguyen",
                email: "isabella.nguyen@email.com",
                avatarUrl: "/placeholder.svg?height=32&width=32",
            },
            restaurantId: "REST-003",
            restaurantName: "Sushi Express",
            status: "Cancelled",
            items: [
                { name: "California Roll", quantity: 2, price: 8.99 },
                { name: "Miso Soup", quantity: 1, price: 3.99 },
            ],
            total: 21.97,
            date: "2023-05-14T18:45:00",
            paymentMethod: "Credit Card",
            deliveryAddress: "789 Pine St, Queens, NY 11354",
        },
        {
            id: "ORD-004",
            customer: {
                name: "William Kim",
                email: "william.kim@email.com",
                avatarUrl: "/placeholder.svg?height=32&width=32",
            },
            restaurantId: "REST-001",
            restaurantName: "Pizza Palace",
            status: "Delivered",
            items: [
                { name: "Pepperoni Pizza", quantity: 1, price: 14.99 },
                { name: "Caesar Salad", quantity: 1, price: 7.99 },
            ],
            total: 22.98,
            date: "2023-05-13T19:30:00",
            paymentMethod: "Apple Pay",
            deliveryAddress: "101 Maple Dr, Manhattan, NY 10002",
        },
        {
            id: "ORD-005",
            customer: {
                name: "Sofia Davis",
                email: "sofia.davis@email.com",
                avatarUrl: "/placeholder.svg?height=32&width=32",
            },
            restaurantId: "REST-004",
            restaurantName: "Burger Joint",
            status: "Out for Delivery",
            items: [
                { name: "Cheeseburger", quantity: 2, price: 9.99 },
                { name: "French Fries", quantity: 1, price: 3.99 },
                { name: "Chocolate Shake", quantity: 2, price: 4.99 },
            ],
            total: 33.95,
            date: "2023-05-16T11:20:00",
            paymentMethod: "Credit Card",
            deliveryAddress: "222 Elm St, Bronx, NY 10451",
        },
        {
            id: "ORD-006",
            customer: {
                name: "Ethan Johnson",
                email: "ethan.johnson@email.com",
                avatarUrl: "/placeholder.svg?height=32&width=32",
            },
            restaurantId: "REST-002",
            restaurantName: "Spice Garden",
            status: "Preparing",
            items: [
                { name: "Butter Chicken", quantity: 1, price: 15.99 },
                { name: "Vegetable Samosa", quantity: 2, price: 5.99 },
            ],
            total: 27.97,
            date: "2023-05-16T13:45:00",
            paymentMethod: "Google Pay",
            deliveryAddress: "333 Cedar Blvd, Staten Island, NY 10301",
        },
        {
            id: "ORD-007",
            customer: {
                name: "Ava Williams",
                email: "ava.williams@email.com",
                avatarUrl: "/placeholder.svg?height=32&width=32",
            },
            restaurantId: "REST-005",
            restaurantName: "Thai Delight",
            status: "Delivered",
            items: [
                { name: "Pad Thai", quantity: 1, price: 11.99 },
                { name: "Spring Rolls", quantity: 1, price: 6.99 },
            ],
            total: 18.98,
            date: "2023-05-12T20:15:00",
            paymentMethod: "Credit Card",
            deliveryAddress: "444 Birch St, Manhattan, NY 10003",
        },
        {
            id: "ORD-008",
            customer: {
                name: "Noah Brown",
                email: "noah.brown@email.com",
                avatarUrl: "/placeholder.svg?height=32&width=32",
            },
            restaurantId: "REST-003",
            restaurantName: "Sushi Express",
            status: "Delivered",
            items: [
                { name: "Dragon Roll", quantity: 1, price: 12.99 },
                { name: "Edamame", quantity: 1, price: 4.99 },
            ],
            total: 17.98,
            date: "2023-05-11T19:00:00",
            paymentMethod: "PayPal",
            deliveryAddress: "555 Walnut Ave, Brooklyn, NY 11202",
        },
    ]


    const [selectedOrder, setSelectedOrder] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; // Number of items per page

    // Filter orders based on search query and status filter
    const filteredOrders = orders.filter((order) => {
        const matchesSearch =
            order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.restaurantName.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesStatus = statusFilter ? order.status === statusFilter : true;

        return matchesSearch && matchesStatus;
    });

    // Pagination logic
    const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
    const paginatedOrders = filteredOrders.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        }).format(date);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "Delivered":
                return "success";
            case "Processing":
            case "Preparing":
                return "default";
            case "Out for Delivery":
                return "warning";
            case "Cancelled":
                return "destructive";
            default:
                return "secondary";
        }
    };

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>Orders</CardTitle>
                    <CardDescription>View and manage customer orders across all restaurants.</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                    <div className="relative">
                        <Input
                            placeholder="Search orders..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-[200px] lg:w-[300px]"
                        />
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline">
                                <Filter className="mr-2 h-4 w-4" />
                                Filter
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => setStatusFilter(null)}>
                                All
                                {statusFilter === null && <Check className="ml-auto h-4 w-4" />}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setStatusFilter("Processing")}>
                                Processing
                                {statusFilter === "Processing" && <Check className="ml-auto h-4 w-4" />}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setStatusFilter("Preparing")}>
                                Preparing
                                {statusFilter === "Preparing" && <Check className="ml-auto h-4 w-4" />}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setStatusFilter("Out for Delivery")}>
                                Out for Delivery
                                {statusFilter === "Out for Delivery" && <Check className="ml-auto h-4 w-4" />}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setStatusFilter("Delivered")}>
                                Delivered
                                {statusFilter === "Delivered" && <Check className="ml-auto h-4 w-4" />}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setStatusFilter("Cancelled")}>
                                Cancelled
                                {statusFilter === "Cancelled" && <Check className="ml-auto h-4 w-4" />}
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </CardHeader>
            <CardContent>
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">Order ID</TableHead>
                                <TableHead>Customer</TableHead>
                                <TableHead>Restaurant</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Total</TableHead>
                                <TableHead>Date</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {paginatedOrders.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="h-24 text-center">
                                        No orders found.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                paginatedOrders.map((order) => (
                                    <TableRow key={order.id}>
                                        <TableCell className="font-medium">{order.id}</TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <Avatar className="h-8 w-8">
                                                    <AvatarImage src={order.customer.avatarUrl} alt={order.customer.name} />
                                                    <AvatarFallback>
                                                        {order.customer.name.substring(0, 2).toUpperCase()}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div className="flex flex-col">
                                                    <span className="font-medium">{order.customer.name}</span>
                                                    <span className="text-xs text-muted-foreground">{order.customer.email}</span>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex flex-col">
                                                <span className="font-medium">{order.restaurantName}</span>
                                                <span className="text-xs text-muted-foreground">ID: {order.restaurantId}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant={getStatusColor(order.status)}>{order.status}</Badge>
                                        </TableCell>
                                        <TableCell className="text-right font-medium">${order.total.toFixed(2)}</TableCell>
                                        <TableCell>{formatDate(order.date)}</TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
                <div className="flex items-center justify-between space-x-2 py-4">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </Button>
                    <div className="text-sm text-muted-foreground">
                        Page {currentPage} of {totalPages}
                    </div>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default Orders;