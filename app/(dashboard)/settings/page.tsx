import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

export default function SettingsPage() {
    return (
        <div className="space-y-6 p-10 pb-16">
            <div className="space-y-0.5">
                <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
                <p className="text-muted-foreground">
                    Manage your account settings and email preferences.
                </p>
            </div>
            <Separator />

            {/* Mock Profile Form */}
            <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
                <div className="flex-1 lg:max-w-2xl">
                    <div className="space-y-6">

                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                placeholder="admin@example.com"
                                disabled
                                className="bg-muted"
                            />
                            <p className="text-[0.8rem] text-muted-foreground">
                                This is the email you use to login. Contact support to change it.
                            </p>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="name">Display Name</Label>
                            <Input id="name" placeholder="Admin User" />
                        </div>

                        <Button>Update profile</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}