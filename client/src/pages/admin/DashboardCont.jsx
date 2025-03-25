import React from 'react'
import { DollarSign, ShoppingBag, Users, PieChart, MoreHorizontal } from "lucide-react";
import { Button } from '@/components/ui/button';

const DashboardCont = () => {
    const DashboardCard = ({ title, value, description, icon }) => (
        <div className="bg-white shadow-md rounded-lg p-4 flex flex-col space-y-2">
            <div className="flex items-center space-x-2">
                <div className="p-2 bg-gray-100 rounded-full">{icon}</div>
                <h2 className="text-lg font-semibold">{title}</h2>
            </div>
            <p className="text-2xl font-bold">{value}</p>
            <p className="text-sm text-gray-500">{description}</p>
        </div>
    );

    const orders = [
        { id: "3210", customer: "John Smith", items: "3 items", total: "42.25", status: "Completed" },
        { id: "3209", customer: "Sarah Johnson", items: "2 items", total: "28.50", status: "In Progress" },
        { id: "3208", customer: "Michael Brown", items: "5 items", total: "76.99", status: "Pending" },
        {
            id: "3207",
            customer: "Emily Davis",
            items: "1 item",
            total: "18.75",
            status: "Completed",
        },
        {
            id: "3206",
            customer: "Robert Wilson",
            items: "4 items",
            total: "53.40",
            status: "In Progress",
        },
    ];

    return (
        <div className="flex-1 space-y-6 p-6">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold">Dashboard</h1>
                <p className="text-muted-foreground">Welcome back to your restaurant dashboard</p>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <DashboardCard
                    title="Total Revenue"
                    value="$45,231.89"
                    description="+20.1% from last month"
                    icon={<DollarSign className="h-5 w-5 text-muted-foreground" />}
                />
                <DashboardCard
                    title="Orders"
                    value="356"
                    description="+12% from last month"
                    icon={<ShoppingBag className="h-5 w-5 text-muted-foreground" />}
                />
                <DashboardCard
                    title="Customers"
                    value="2,543"
                    description="+5.2% from last month"
                    icon={<Users className="h-5 w-5 text-muted-foreground" />}
                />
                <DashboardCard
                    title="Active Tables"
                    value="12/24"
                    description="50% occupancy rate"
                    icon={<PieChart className="h-5 w-5 text-muted-foreground" />}
                />
            </div>

            {/* Recent Orders */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">Recent Orders</h2>
                    <Button variant="outline" size="sm">
                        View All
                    </Button>
                </div>
                <div className="rounded-lg border bg-background">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b">
                                    <th className="px-4 py-3 text-left text-sm font-medium">Order ID</th>
                                    <th className="px-4 py-3 text-left text-sm font-medium">Customer</th>
                                    <th className="px-4 py-3 text-left text-sm font-medium">Items</th>
                                    <th className="px-4 py-3 text-left text-sm font-medium">Total</th>
                                    <th className="px-4 py-3 text-left text-sm font-medium">Status</th>
                                    <th className="px-4 py-3 text-right text-sm font-medium">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order) => (
                                    <tr key={order.id} className="border-b">
                                        <td className="px-4 py-3 text-sm">#{order.id}</td>
                                        <td className="px-4 py-3 text-sm">{order.customer}</td>
                                        <td className="px-4 py-3 text-sm">{order.items}</td>
                                        <td className="px-4 py-3 text-sm">${order.total}</td>
                                        <td className="px-4 py-3 text-sm">
                                            <span
                                                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${order.status === "Completed"
                                                    ? "bg-green-100 text-green-800"
                                                    : order.status === "In Progress"
                                                        ? "bg-blue-100 text-blue-800"
                                                        : "bg-yellow-100 text-yellow-800"
                                                    }`}
                                            >
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-right text-sm">
                                            <Button variant="ghost" size="icon">
                                                <MoreHorizontal className="h-4 w-4" />
                                                <span className="sr-only">Actions</span>
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        )
}

export default DashboardCont