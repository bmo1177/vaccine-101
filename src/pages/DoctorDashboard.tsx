import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Users, MessageSquare, Syringe, UserPlus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const DoctorDashboard = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const upcomingVaccinations = [
    {
      childName: "Emma Smith",
      parentName: "John Smith",
      vaccine: "MMR Booster",
      dueDate: "2024-05-15",
      status: "Pending",
    },
    {
      childName: "Lucas Johnson",
      parentName: "Sarah Johnson",
      vaccine: "DTaP",
      dueDate: "2024-05-20",
      status: "Scheduled",
    },
  ];

  const requests = [
    {
      id: 1,
      from: "Dr. Sarah Wilson",
      subject: "Vaccine Schedule Update Request",
      date: "2024-04-10",
      priority: "High",
    },
    {
      id: 2,
      from: "Dr. Michael Chen",
      subject: "New Vaccine Protocol Review",
      date: "2024-04-09",
      priority: "Medium",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <span className="text-2xl font-bold text-primary">VaxTrack - Doctor Portal</span>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Button variant="outline" onClick={() => navigate("/login")}>
              Logout
            </Button>
          </div>
        </div>
      </nav>

      <main className="container py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <h1 className="text-3xl font-bold">Doctor Dashboard</h1>
            <div className="flex gap-4">
              <Button onClick={() => navigate("/doctor/add-child")}>
                <UserPlus className="mr-2 h-4 w-4" /> Add Child to Parent
              </Button>
              <Button onClick={() => navigate("/doctor/requests/new")}>
                <MessageSquare className="mr-2 h-4 w-4" /> New Request
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    Upcoming Vaccinations
                  </CardTitle>
                  <Syringe className="h-6 w-6 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{upcomingVaccinations.length}</div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    Active Patients
                  </CardTitle>
                  <Users className="h-6 w-6 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">24</div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    Pending Requests
                  </CardTitle>
                  <MessageSquare className="h-6 w-6 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{requests.length}</div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <Tabs defaultValue="vaccinations" className="space-y-6">
            <TabsList>
              <TabsTrigger value="vaccinations">Upcoming Vaccinations</TabsTrigger>
              <TabsTrigger value="requests">Requests</TabsTrigger>
            </TabsList>

            <TabsContent value="vaccinations">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Upcoming Vaccinations</CardTitle>
                    <Input
                      placeholder="Search patients..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="max-w-xs"
                    />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingVaccinations.map((vaccination, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center justify-between p-4 rounded-lg border"
                      >
                        <div className="space-y-1">
                          <p className="font-medium">{vaccination.childName}</p>
                          <p className="text-sm text-muted-foreground">
                            Parent: {vaccination.parentName}
                          </p>
                        </div>
                        <div className="text-right space-y-1">
                          <p className="font-medium">{vaccination.vaccine}</p>
                          <p className="text-sm text-muted-foreground">
                            Due: {vaccination.dueDate}
                          </p>
                        </div>
                        <Button variant="outline" size="sm">
                          Update Status
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="requests">
              <Card>
                <CardHeader>
                  <CardTitle>Administrative Requests</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {requests.map((request, index) => (
                      <motion.div
                        key={request.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center justify-between p-4 rounded-lg border"
                      >
                        <div className="space-y-1">
                          <p className="font-medium">{request.subject}</p>
                          <p className="text-sm text-muted-foreground">
                            From: {request.from}
                          </p>
                        </div>
                        <div className="text-right space-y-1">
                          <p className="font-medium">Priority: {request.priority}</p>
                          <p className="text-sm text-muted-foreground">
                            Date: {request.date}
                          </p>
                        </div>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </main>
    </div>
  );
};

export default DoctorDashboard;