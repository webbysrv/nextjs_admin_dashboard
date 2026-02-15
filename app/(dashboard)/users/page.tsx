import { prisma } from "@/lib/db";
import { User, Status, Role } from "@prisma/client";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns"; // Optional: npm install date-fns

export default async function UsersPage(props: {
    searchParams: Promise<{ page?: string }>;
}) {
    // 1. Await params (Next.js 15 requirement)
    const params = await props.searchParams;
    const currentPage = Number(params.page) || 1;
    const pageSize = 10;

    // 2. Fetch Data & Count in Parallel (Fast!)
    const [users, totalUsers] = await Promise.all([
        prisma.user.findMany({
            skip: (currentPage - 1) * pageSize,
            take: pageSize,
            orderBy: { createdAt: "desc" },
        }),
        prisma.user.count(),
    ]);

    const totalPages = Math.ceil(totalUsers / pageSize);

    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Users</h1>
                <Badge variant="outline" className="text-base px-4 py-1">
                    Total: {totalUsers}
                </Badge>
            </div>

            <div className="border rounded-lg bg-card text-card-foreground shadow-sm">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[80px]">Avatar</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead className="text-right">Last Login</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>
                                    <Avatar>
                                        <AvatarFallback>
                                            {user.name.slice(0, 2).toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>
                                </TableCell>
                                <TableCell>
                                    <div className="flex flex-col">
                                        <span className="font-medium">{user.name}</span>
                                        <span className="text-xs text-muted-foreground">
                                            {user.email}
                                        </span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <StatusBadge status={user.status} />
                                </TableCell>
                                <TableCell>
                                    <RoleBadge role={user.role} />
                                </TableCell>
                                <TableCell className="text-right text-muted-foreground">
                                    {/* If you didn't install date-fns, just use user.lastLogin.toLocaleDateString() */}
                                    {user.lastLogin.toLocaleDateString()}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* Simple Pagination Controls */}
            <div className="flex items-center justify-end space-x-2">
                <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage <= 1}
                    asChild
                >
                    <Link href={`/users?page=${currentPage - 1}`}>Previous</Link>
                </Button>
                <div className="text-sm font-medium">
                    Page {currentPage} of {totalPages}
                </div>
                <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage >= totalPages}
                    asChild
                >
                    <Link href={`/users?page=${currentPage + 1}`}>Next</Link>
                </Button>
            </div>
        </div>
    );
}

// Helper Components for "Pro" Visuals
function StatusBadge({ status }: { status: Status }) {
    const styles: Record<Status, string> = {
        ACTIVE: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
        INACTIVE: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
        SUSPENDED: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
    };
    return (
        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${styles[status]}`}>
            {status}
        </span>
    );
}

function RoleBadge({ role }: { role: Role }) {
    const icons = {
        ADMIN: "🛡️ Admin",
        MANAGER: "👔 Manager",
        USER: "👤 User",
    };
    return <span className="text-sm">{icons[role]}</span>;
}