import { prisma } from "@/lib/db";
import { Overview } from "@/components/overview";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Activity, Users, CreditCard, DollarSign } from "lucide-react";

export default async function DashboardPage() {
    // 1. Fetch Summary Data in Parallel
    const [totalUsers, activeUsers, recentSignups] = await Promise.all([
        prisma.user.count(),
        prisma.user.count({ where: { status: "ACTIVE" } }),
        prisma.user.findMany({
            take: 5,
            orderBy: { createdAt: "desc" },
        }),
    ]);

    // 2. Calculate "Graph Data" (Users per Month)
    // We fetch all users' creation dates to build the chart
    const allUsers = await prisma.user.findMany({
        select: { createdAt: true },
    });

    const graphData = [
        { name: "Jan", total: 0 },
        { name: "Feb", total: 0 },
        { name: "Mar", total: 0 },
        { name: "Apr", total: 0 },
        { name: "May", total: 0 },
        { name: "Jun", total: 0 },
        { name: "Jul", total: 0 },
        { name: "Aug", total: 0 },
        { name: "Sep", total: 0 },
        { name: "Oct", total: 0 },
        { name: "Nov", total: 0 },
        { name: "Dec", total: 0 },
    ];

    allUsers.forEach((user) => {
        const month = user.createdAt.getMonth(); // 0 = Jan, 1 = Feb...
        graphData[month].total += 1;
    });

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            </div>

            {/* KPI Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalUsers}</div>
                        <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                        <Activity className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{activeUsers}</div>
                        <p className="text-xs text-muted-foreground">
                            {Math.round((activeUsers / totalUsers) * 100)}% engagement rate
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Revenue</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">$45,231.89</div>
                        <p className="text-xs text-muted-foreground">+19% from last month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Sales</CardTitle>
                        <CreditCard className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">+12,234</div>
                        <p className="text-xs text-muted-foreground">+19% from last month</p>
                    </CardContent>
                </Card>
            </div>

            {/* Charts & Recent Activity */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                        {/* The Client Component Chart */}
                        <Overview data={graphData} />
                    </CardContent>
                </Card>

                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Recent Signups</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-8">
                            {recentSignups.map((user) => (
                                <div className="flex items-center" key={user.id}>
                                    <Avatar className="h-9 w-9">
                                        <AvatarFallback>{user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                                    </Avatar>
                                    <div className="ml-4 space-y-1">
                                        <p className="text-sm font-medium leading-none">{user.name}</p>
                                        <p className="text-sm text-muted-foreground">{user.email}</p>
                                    </div>
                                    <div className="ml-auto font-medium text-sm text-muted-foreground">
                                        {/* Display Role or Status */}
                                        {user.role === 'ADMIN' ? '🛡️ Admin' : 'User'}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}