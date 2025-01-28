import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Calendar, Clock, Users, Activity, Baby, Plus, Syringe } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Dashboard = () => {
  const navigate = useNavigate();

  const children = [
    {
      id: 1,
      name: "Emma",
      age: "4 years",
      nextVaccine: "MMR Booster",
      nextDate: "May 15, 2024",
      lastVaccine: "DTaP",
      lastDate: "January 10, 2024",
    },
    {
      id: 2,
      name: "Lucas",
      age: "2 years",
      nextVaccine: "Hepatitis A",
      nextDate: "June 1, 2024",
      lastVaccine: "Pneumococcal",
      lastDate: "March 5, 2024",
    },
  ];

  const stats = [
    {
      title: "Upcoming Vaccinations",
      value: "3",
      icon: <Calendar className="h-6 w-6 text-primary" />,
    },
    {
      title: "Children",
      value: children.length.toString(),
      icon: <Baby className="h-6 w-6 text-primary" />,
    },
    {
      title: "Reminders",
      value: "2",
      icon: <Clock className="h-6 w-6 text-primary" />,
    },
    {
      title: "Total Vaccinations",
      value: "12",
      icon: <Syringe className="h-6 w-6 text-primary" />,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <span className="text-2xl font-bold text-primary">VaxTrack</span>
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
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Family Dashboard</h1>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add Child
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">
                      {stat.title}
                    </CardTitle>
                    {stat.icon}
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <Tabs defaultValue="children" className="space-y-6">
            <TabsList>
              <TabsTrigger value="children">Children</TabsTrigger>
              <TabsTrigger value="calendar">Calendar</TabsTrigger>
              <TabsTrigger value="records">Records</TabsTrigger>
            </TabsList>

            <TabsContent value="children" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {children.map((child) => (
                  <motion.div
                    key={child.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-xl">{child.name}</CardTitle>
                          <span className="text-sm text-muted-foreground">
                            {child.age}
                          </span>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <h4 className="font-medium mb-2">Next Vaccination</h4>
                          <div className="flex justify-between text-sm">
                            <span>{child.nextVaccine}</span>
                            <span className="text-primary">{child.nextDate}</span>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2">Last Vaccination</h4>
                          <div className="flex justify-between text-sm">
                            <span>{child.lastVaccine}</span>
                            <span className="text-muted-foreground">
                              {child.lastDate}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="calendar">
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Appointments</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">No upcoming appointments</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="records">
              <Card>
                <CardHeader>
                  <CardTitle>Vaccination Records</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">No records to display</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </main>
    </div>
  );
};

export default Dashboard;