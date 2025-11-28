import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type UserRole = "teacher" | "student" | "parent" | null;

const mockSchedule = [
  { id: 1, subject: "Математика", class: "9А", startTime: "08:30", endTime: "09:15", room: "201" },
  { id: 2, subject: "Физика", class: "10Б", startTime: "09:25", endTime: "10:10", room: "305" },
  { id: 3, subject: "Математика", class: "9Б", startTime: "10:20", endTime: "11:05", room: "201" },
  { id: 4, subject: "Алгебра", class: "11А", startTime: "11:25", endTime: "12:10", room: "201" },
  { id: 5, subject: "Физика", class: "10А", startTime: "12:20", endTime: "13:05", room: "305" },
];

const mockGrades = [
  { id: 1, name: "Иванов Петр", mon: 5, tue: 4, wed: 5, thu: null, fri: null },
  { id: 2, name: "Смирнова Анна", mon: 5, tue: 5, wed: 4, thu: null, fri: null },
  { id: 3, name: "Козлов Дмитрий", mon: 4, tue: 3, wed: 4, thu: null, fri: null },
  { id: 4, name: "Петрова Мария", mon: 5, tue: 5, wed: 5, thu: null, fri: null },
  { id: 5, name: "Сидоров Алексей", mon: 3, tue: 4, wed: 4, thu: null, fri: null },
];

const mockStudentSchedule = [
  { id: 1, subject: "Математика", time: "08:30-09:15", room: "201", homework: "§12, №45-50" },
  { id: 2, subject: "Русский язык", time: "09:25-10:10", room: "103", homework: "Упр. 234, правила" },
  { id: 3, subject: "Физика", time: "10:20-11:05", room: "305", homework: "§8, задачи 1-3" },
  { id: 4, subject: "История", time: "11:25-12:10", room: "204", homework: "Параграф 15, вопросы" },
  { id: 5, subject: "Английский", time: "12:20-13:05", room: "108", homework: "Unit 4, упр 1-5" },
];

const mockStudentGrades = {
  "Математика": [5, 4, 5, 5, 4, 5, 5, 4],
  "Физика": [4, 4, 5, 4, 5, 4, 4, 5],
  "Русский язык": [5, 5, 4, 5, 5, 5, 4, 5],
  "История": [4, 5, 4, 4, 5, 4, 5, 5],
  "Английский": [5, 5, 5, 4, 5, 5, 5, 4],
};

const Index = () => {
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [selectedSubject, setSelectedSubject] = useState("Математика");
  const [homework, setHomework] = useState("§12, №45-50");
  const [selectedLoginRole, setSelectedLoginRole] = useState<UserRole>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username && password) {
      setUserRole(selectedLoginRole);
    }
  };

  if (!userRole && !selectedLoginRole) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/30 to-background p-4">
        <Card className="w-full max-w-md p-8 shadow-xl animate-fade-in">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-4">
              <Icon name="GraduationCap" size={32} className="text-primary" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Образование</h1>
            <p className="text-muted-foreground">Выберите свою роль для входа</p>
          </div>

          <div className="space-y-3">
            <Button
              onClick={() => setSelectedLoginRole("teacher")}
              className="w-full h-16 text-lg hover:scale-[1.02] transition-transform"
              variant="outline"
            >
              <Icon name="Users" className="mr-3" size={24} />
              Учитель
            </Button>
            <Button
              onClick={() => setSelectedLoginRole("student")}
              className="w-full h-16 text-lg hover:scale-[1.02] transition-transform"
              variant="outline"
            >
              <Icon name="BookOpen" className="mr-3" size={24} />
              Ученик
            </Button>
            <Button
              onClick={() => setSelectedLoginRole("parent")}
              className="w-full h-16 text-lg hover:scale-[1.02] transition-transform"
              variant="outline"
            >
              <Icon name="UserCircle" className="mr-3" size={24} />
              Родитель
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  if (!userRole && selectedLoginRole) {
    const roleLabels = {
      teacher: "учителя",
      student: "ученика",
      parent: "родителя"
    };

    const roleIcons = {
      teacher: "Users",
      student: "BookOpen",
      parent: "UserCircle"
    };

    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/30 to-background p-4">
        <Card className="w-full max-w-md p-8 shadow-xl animate-fade-in">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setSelectedLoginRole(null);
              setUsername("");
              setPassword("");
            }}
            className="mb-4"
          >
            <Icon name="ArrowLeft" size={18} className="mr-2" />
            Назад
          </Button>

          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-4">
              <Icon name={roleIcons[selectedLoginRole] as any} size={32} className="text-primary" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Вход для {roleLabels[selectedLoginRole]}</h1>
            <p className="text-muted-foreground">Введите логин и пароль</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Логин</label>
              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Введите логин"
                required
                className="h-12"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Пароль</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Введите пароль"
                required
                className="h-12"
              />
            </div>

            <Button type="submit" className="w-full h-12 text-lg">
              <Icon name="LogIn" className="mr-2" size={20} />
              Войти
            </Button>
          </form>
        </Card>
      </div>
    );
  }

  if (userRole === "teacher") {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b bg-card shadow-sm sticky top-0 z-10">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <Icon name="GraduationCap" size={24} className="text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Кабинет учителя</h1>
                <p className="text-sm text-muted-foreground">Иванова Елена Петровна</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setUserRole(null)}>
              <Icon name="LogOut" size={20} />
            </Button>
          </div>
        </header>

        <main className="container mx-auto px-4 py-6">
          <Tabs defaultValue="schedule" className="space-y-6">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
              <TabsTrigger value="schedule">
                <Icon name="Calendar" size={18} className="mr-2" />
                Расписание
              </TabsTrigger>
              <TabsTrigger value="journal">
                <Icon name="BookOpen" size={18} className="mr-2" />
                Журнал
              </TabsTrigger>
            </TabsList>

            <TabsContent value="schedule" className="space-y-4 animate-fade-in">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">Расписание на сегодня</h2>
                <Badge variant="outline" className="text-sm">
                  Понедельник, 28 ноября
                </Badge>
              </div>

              <div className="grid gap-4">
                {mockSchedule.map((lesson, index) => (
                  <Card key={lesson.id} className="p-4 hover:shadow-md transition-shadow animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-20 text-center">
                        <div className="text-2xl font-bold text-primary">{lesson.startTime}</div>
                        <div className="text-sm text-muted-foreground">{lesson.endTime}</div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-lg font-semibold mb-1">{lesson.subject}</h3>
                            <div className="flex items-center gap-3 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Icon name="Users" size={16} />
                                Класс {lesson.class}
                              </span>
                              <span className="flex items-center gap-1">
                                <Icon name="DoorOpen" size={16} />
                                Кабинет {lesson.room}
                              </span>
                            </div>
                          </div>
                          <Badge className="bg-primary/10 text-primary hover:bg-primary/20">
                            {45} мин
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="journal" className="space-y-4 animate-fade-in">
              <div className="flex items-center gap-4 mb-6">
                <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Математика">Математика</SelectItem>
                    <SelectItem value="Физика">Физика</SelectItem>
                    <SelectItem value="Алгебра">Алгебра</SelectItem>
                  </SelectContent>
                </Select>
                <Badge variant="outline">9А класс</Badge>
              </div>

              <Card className="p-6">
                <div className="mb-4">
                  <label className="text-sm font-medium mb-2 block">Домашнее задание</label>
                  <Input
                    value={homework}
                    onChange={(e) => setHomework(e.target.value)}
                    placeholder="Введите домашнее задание"
                  />
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-2 font-semibold">Ученик</th>
                        <th className="text-center py-3 px-2 font-semibold w-16">Пн</th>
                        <th className="text-center py-3 px-2 font-semibold w-16">Вт</th>
                        <th className="text-center py-3 px-2 font-semibold w-16">Ср</th>
                        <th className="text-center py-3 px-2 font-semibold w-16">Чт</th>
                        <th className="text-center py-3 px-2 font-semibold w-16">Пт</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockGrades.map((student) => (
                        <tr key={student.id} className="border-b hover:bg-muted/50">
                          <td className="py-3 px-2">{student.name}</td>
                          <td className="text-center py-3 px-2">
                            {student.mon && (
                              <Badge variant={student.mon >= 4 ? "default" : "destructive"}>
                                {student.mon}
                              </Badge>
                            )}
                          </td>
                          <td className="text-center py-3 px-2">
                            {student.tue && (
                              <Badge variant={student.tue >= 4 ? "default" : "destructive"}>
                                {student.tue}
                              </Badge>
                            )}
                          </td>
                          <td className="text-center py-3 px-2">
                            {student.wed && (
                              <Badge variant={student.wed >= 4 ? "default" : "destructive"}>
                                {student.wed}
                              </Badge>
                            )}
                          </td>
                          <td className="text-center py-3 px-2">
                            <Input
                              type="number"
                              min="2"
                              max="5"
                              className="w-16 h-8 text-center"
                              placeholder="-"
                            />
                          </td>
                          <td className="text-center py-3 px-2">
                            <Input
                              type="number"
                              min="2"
                              max="5"
                              className="w-16 h-8 text-center"
                              placeholder="-"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    );
  }

  if (userRole === "student") {
    const calculateAverage = (grades: number[]) => {
      const sum = grades.reduce((a, b) => a + b, 0);
      return (sum / grades.length).toFixed(1);
    };

    return (
      <div className="min-h-screen bg-background">
        <header className="border-b bg-card shadow-sm sticky top-0 z-10">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-secondary rounded-xl flex items-center justify-center">
                <Icon name="BookOpen" size={24} className="text-secondary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Личный кабинет</h1>
                <p className="text-sm text-muted-foreground">Иванов Петр, 9А класс</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setUserRole(null)}>
              <Icon name="LogOut" size={20} />
            </Button>
          </div>
        </header>

        <main className="container mx-auto px-4 py-6 max-w-6xl">
          <div className="grid lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2 p-6 animate-fade-in">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Успеваемость</h2>
                <Badge variant="outline">Текущий триместр</Badge>
              </div>

              <div className="space-y-4">
                {Object.entries(mockStudentGrades).map(([subject, grades], index) => {
                  const avg = parseFloat(calculateAverage(grades));
                  const maxGrade = 5;
                  const percentage = (avg / maxGrade) * 100;

                  return (
                    <div key={subject} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{subject}</span>
                        <div className="flex items-center gap-2">
                          <div className="flex gap-1">
                            {grades.slice(-5).map((grade, i) => (
                              <Badge
                                key={i}
                                variant={grade >= 4 ? "default" : "destructive"}
                                className="w-7 h-7 flex items-center justify-center p-0"
                              >
                                {grade}
                              </Badge>
                            ))}
                          </div>
                          <Badge variant="outline" className="font-bold">
                            {avg}
                          </Badge>
                        </div>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-1000 ${
                            avg >= 4.5 ? "bg-green-500" : avg >= 3.5 ? "bg-primary" : "bg-destructive"
                          }`}
                          style={{ width: `${percentage}%`, animationDelay: `${index * 100}ms` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>

            <Card className="p-6 animate-fade-in" style={{ animationDelay: "200ms" }}>
              <div className="flex items-center gap-2 mb-6">
                <Icon name="Calendar" size={24} className="text-primary" />
                <h2 className="text-xl font-bold">Завтра</h2>
              </div>

              <div className="space-y-3">
                {mockStudentSchedule.map((lesson, index) => (
                  <div
                    key={lesson.id}
                    className="p-3 border rounded-lg hover:bg-muted/50 transition-colors animate-fade-in"
                    style={{ animationDelay: `${300 + index * 50}ms` }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="font-semibold text-sm">{lesson.subject}</div>
                        <div className="text-xs text-muted-foreground flex items-center gap-2 mt-1">
                          <span className="flex items-center gap-1">
                            <Icon name="Clock" size={12} />
                            {lesson.time}
                          </span>
                          <span className="flex items-center gap-1">
                            <Icon name="DoorOpen" size={12} />
                            {lesson.room}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-xs bg-muted p-2 rounded mt-2">
                      <div className="flex items-start gap-1">
                        <Icon name="FileText" size={12} className="mt-0.5 flex-shrink-0" />
                        <span>{lesson.homework}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </main>
      </div>
    );
  }

  return null;
};

export default Index;