import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/theme-toggle";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  Users,
  UserPlus,
  Database,
  Settings,
  Calendar,
  Search,
  Download,
} from "lucide-react";
import { useState } from "react";
import { UserManagementTable } from "@/components/admin/UserManagementTable";
import {
  Area,
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Navigation } from "@/components/shared/Navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const mockChartData = [
  { name: "Jan", users: 400, doctors: 240, requests: 140 },
  { name: "Feb", users: 300, doctors: 139, requests: 221 },
  { name: "Mar", users: 200, doctors: 980, requests: 229 },
  { name: "Apr", users: 278, doctors: 390, requests: 200 },
  { name: "May", users: 189, doctors: 480, requests: 218 },
  { name: "Jun", users: 239, doctors: 380, requests: 250 },
];

const mockDoctors = [
  { id: 1, name: "Dr. Sarah Smith", specialty: "Pediatrics", status: "active", patients: 45 },
  { id: 2, name: "Dr. John Doe", specialty: "Family Medicine", status: "active", patients: 32 },
];

const mockRequests = [
  { id: 1, title: "New Doctor Registration", from: "Dr. Jane Smith", priority: "high", status: "pending" },
  { id: 2, title: "Article Review", from: "Dr. Mike Johnson", priority: "medium", status: "approved" },
];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [timeRange, setTimeRange] = useState("7d");

  const handleLogout = () => {
    toast.success("Logged out successfully");
    navigate("/login");
  };

  const handleExportData = () => {
    toast.success("Data export started. You'll receive an email when it's ready.");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation role="admin" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="container py-8"
      >
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-4xl font-bold">Admin Dashboard</h1>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Button variant="outline" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,834</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Active Doctors</CardTitle>
              <UserPlus className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">48</div>
              <p className="text-xs text-muted-foreground">+2 this week</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Database Size</CardTitle>
              <Database className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1.2 GB</div>
              <p className="text-xs text-muted-foreground">Of 5 GB quota</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">System Status</CardTitle>
              <Settings className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Healthy</div>
              <p className="text-xs text-muted-foreground">All systems operational</p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">System Analytics</CardTitle>
                <Select value={timeRange} onValueChange={setTimeRange}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select time range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7d">Last 7 days</SelectItem>
                    <SelectItem value="30d">Last 30 days</SelectItem>
                    <SelectItem value="90d">Last 90 days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={mockChartData}>
                    <defs>
                      <linearGradient id="users" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#4FD1C5" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#4FD1C5" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="doctors" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#718096" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#718096" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="requests" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#F56565" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#F56565" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="name" className="text-xs" />
                    <YAxis className="text-xs" />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="users"
                      stroke="#4FD1C5"
                      fillOpacity={1}
                      fill="url(#users)"
                    />
                    <Area
                      type="monotone"
                      dataKey="doctors"
                      stroke="#718096"
                      fillOpacity={1}
                      fill="url(#doctors)"
                    />
                    <Area
                      type="monotone"
                      dataKey="requests"
                      stroke="#F56565"
                      fillOpacity={1}
                      fill="url(#requests)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8">
          <Tabs defaultValue="users" className="w-full">
            <TabsList>
              <TabsTrigger value="users" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                User Management
              </TabsTrigger>
              <TabsTrigger value="doctors" className="flex items-center gap-2">
                <UserPlus className="h-4 w-4" />
                Doctors Management
              </TabsTrigger>
              <TabsTrigger value="requests" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Pending Requests
              </TabsTrigger>
            </TabsList>

            <TabsContent value="users">
              <Card>
                <CardHeader>
                  <CardTitle>User Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <UserManagementTable />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="doctors">
              <Card>
                <CardHeader>
                  <CardTitle>Registered Doctors</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Specialty</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Patients</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockDoctors.map((doctor) => (
                        <TableRow key={doctor.id}>
                          <TableCell className="font-medium">{doctor.name}</TableCell>
                          <TableCell>{doctor.specialty}</TableCell>
                          <TableCell>
                            <Badge
                              variant={doctor.status === "active" ? "default" : "secondary"}
                            >
                              {doctor.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{doctor.patients}</TableCell>
                          <TableCell>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => toast.success(`Viewing ${doctor.name}'s profile`)}
                            >
                              View Profile
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="requests">
              <Card>
                <CardHeader>
                  <CardTitle>System Requests</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Request</TableHead>
                        <TableHead>From</TableHead>
                        <TableHead>Priority</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockRequests.map((request) => (
                        <TableRow key={request.id}>
                          <TableCell className="font-medium">{request.title}</TableCell>
                          <TableCell>{request.from}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                request.priority === "high"
                                  ? "destructive"
                                  : request.priority === "medium"
                                  ? "default"
                                  : "secondary"
                              }
                            >
                              {request.priority}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                request.status === "approved"
                                  ? "default"
                                  : request.status === "rejected"
                                  ? "destructive"
                                  : "secondary"
                              }
                            >
                              {request.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  toast.success(`Viewing details for ${request.title}`)
                                }
                              >
                                View
                              </Button>
                              {request.status === "pending" && (
                                <>
                                  <Button
                                    variant="default"
                                    size="sm"
                                    onClick={() =>
                                      toast.success(`Approved: ${request.title}`)
                                    }
                                  >
                                    Approve
                                  </Button>
                                  <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() =>
                                      toast.success(`Rejected: ${request.title}`)
                                    }
                                  >
                                    Reject
                                  </Button>
                                </>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;
