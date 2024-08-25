"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Send } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

export default function Component() {
  const [messages, setMessages] = useState([
    { text: "Hello! How can I assist you today?", isBot: true },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [leftPanelWidth, setLeftPanelWidth] = useState(256);
  const [templateHeight, setTemplateHeight] = useState(300);
  const [isResizingWidth, setIsResizingWidth] = useState(false);
  const [isResizingHeight, setIsResizingHeight] = useState(false);

  const sendMessage = () => {
    if (inputMessage.trim() !== "") {
      setMessages([...messages, { text: inputMessage, isBot: false }]);
      setInputMessage("");
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            text: "Thank you for your question. How may I help you with that?",
            isBot: true,
          },
        ]);
      }, 1000);
    }
  };

  const sharedTemplates = [
    {
      title: "Extract from Receipt",
      subtitle: "Team Lunch Expenses",
      author: "john.doe",
    },
    {
      title: "AI Studio Feature Check v0.1",
      subtitle: "Security Whitepaper Content Only",
      author: "jane.smith",
    },
    {
      title: "Security Checklist",
      subtitle:
        "Internal checklist in first sheet, client questions in second sheet",
      author: "alex.johnson",
    },
  ];

  const personalTemplates = [
    {
      title: "Test: Security Checklist Response",
      subtitle:
        "Template for generating initial responses to security checklist. [How to use] 1. In a new Excel sheet, column A...",
      author: "",
    },
    {
      title: "Inquiry Analysis",
      subtitle: "Analyze customer inquiries",
      author: "",
    },
    {
      title: "Excel Usage Guide",
      subtitle: "Reverse engineer from specific outputs",
      author: "",
    },
  ];

  const allTemplates = [...sharedTemplates, ...personalTemplates];

  const getTemplates = () => {
    switch (activeTab) {
      case "all":
        return allTemplates;
      case "shared":
        return sharedTemplates;
      case "personal":
        return personalTemplates;
      default:
        return allTemplates;
    }
  };

  const TabButton = ({ id, label }: { id: string; label: string }) => (
    <button
      className={`text-sm font-semibold pb-2 px-4 ${
        activeTab === id
          ? "bg-blue-100 text-blue-600 rounded-t-lg"
          : "text-gray-600"
      }`}
      onClick={() => setActiveTab(id)}>
      {label}
    </button>
  );

  const startResizingWidth = useCallback((mouseDownEvent: any) => {
    setIsResizingWidth(true);
  }, []);

  const stopResizingWidth = useCallback(() => {
    setIsResizingWidth(false);
  }, []);

  const resizeWidth = useCallback(
    (mouseMoveEvent: any) => {
      if (isResizingWidth) {
        const newWidth = mouseMoveEvent.clientX - 64;
        if (newWidth > 200 && newWidth < 400) {
          setLeftPanelWidth(newWidth);
        }
      }
    },
    [isResizingWidth]
  );

  const startResizingHeight = useCallback((mouseDownEvent: any) => {
    setIsResizingHeight(true);
  }, []);

  const stopResizingHeight = useCallback(() => {
    setIsResizingHeight(false);
  }, []);

  const resizeHeight = useCallback(
    (mouseMoveEvent: any) => {
      if (isResizingHeight) {
        const newHeight = mouseMoveEvent.clientY - 64;
        if (newHeight > 200 && newHeight < window.innerHeight - 200) {
          setTemplateHeight(newHeight);
        }
      }
    },
    [isResizingHeight]
  );

  useEffect(() => {
    window.addEventListener("mousemove", resizeWidth);
    window.addEventListener("mouseup", stopResizingWidth);
    window.addEventListener("mousemove", resizeHeight);
    window.addEventListener("mouseup", stopResizingHeight);
    return () => {
      window.removeEventListener("mousemove", resizeWidth);
      window.removeEventListener("mouseup", stopResizingWidth);
      window.removeEventListener("mousemove", resizeHeight);
      window.removeEventListener("mouseup", stopResizingHeight);
    };
  }, [resizeWidth, stopResizingWidth, resizeHeight, stopResizingHeight]);

  return (
    <div className="flex h-screen bg-background">
      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Content */}
        <main className="flex-1 flex overflow-hidden">
          {/* Left panel */}
          <div
            className="border-r flex flex-col"
            style={{ width: `${leftPanelWidth}px` }}>
            <div className="p-4">
              <Button className="w-full mb-4">New Chat</Button>
              <div className="flex space-x-2 text-sm text-muted-foreground mb-4">
                <span>My Chats</span>
                <span>Shared Chats</span>
              </div>
              <Input type="search" placeholder="Search" className="mb-4" />
            </div>
            <ScrollArea className="flex-1">
              <div className="space-y-2 p-4">
                <div className="text-sm text-muted-foreground">2024/08/16</div>
                <div className="text-sm">
                  Government Product Development Challenges
                </div>
                <div className="text-sm text-muted-foreground">2024/08/15</div>
                <div className="text-sm">Importance of Product Development</div>
                <div className="text-sm">Product Development Elements</div>
                <div className="text-sm">Product Development Appro...</div>
              </div>
            </ScrollArea>
          </div>

          {/* Vertical Resizer */}
          <div
            className="w-1 bg-gray-200 cursor-col-resize"
            onMouseDown={startResizingWidth}></div>

          {/* Right panel */}
          <div className="flex-1 flex flex-col">
            {/* Template selection area */}
            <div
              className="p-6 overflow-auto"
              style={{ height: `${templateHeight}px` }}>
              <h2 className="text-2xl font-semibold mb-4">Start a New Chat</h2>
              <div className="mb-6">
                <Input
                  placeholder="Model: Kindergarten Application Inquiry"
                  className="w-full"
                />
              </div>
              <div className="flex space-x-4 mb-4">
                <TabButton id="all" label="All Templates" />
                <TabButton id="shared" label="Shared Templates" />
                <TabButton id="personal" label="My Templates" />
              </div>
              <Select>
                <SelectTrigger className="w-[300px] mb-4">
                  <SelectValue placeholder="AI Studio Internal Use" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">AI Studio Internal Use</SelectItem>
                </SelectContent>
              </Select>
              <div className="grid grid-cols-3 gap-4">
                <Card>
                  <CardContent className="pt-4 flex items-center justify-center h-full">
                    <div className="text-center">
                      <Plus className="mx-auto mb-2" size={24} />
                      <p className="text-sm font-semibold">New Template</p>
                    </div>
                  </CardContent>
                </Card>
                {getTemplates().map((card, index) => (
                  <Card key={index}>
                    <CardContent className="pt-4">
                      <h4 className="font-semibold mb-2">{card.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {card.subtitle}
                      </p>
                    </CardContent>
                    <CardFooter>
                      <p className="text-sm text-muted-foreground">
                        {card.author}
                      </p>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>

            {/* Horizontal Resizer */}
            <div
              className="h-1 bg-gray-200 cursor-row-resize"
              onMouseDown={startResizingHeight}></div>

            {/* Chat area */}
            <div className="flex-1 flex flex-col p-4 border-t overflow-hidden">
              <ScrollArea className="flex-1">
                <div className="space-y-4">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`${
                        message.isBot ? "text-left" : "text-right"
                      }`}>
                      <div
                        className={`inline-block p-2 rounded-lg ${
                          message.isBot
                            ? "bg-muted text-muted-foreground"
                            : "bg-primary text-primary-foreground"
                        }`}>
                        {message.text}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              <div className="flex items-center mt-4">
                <Input
                  type="text"
                  placeholder="Type your message..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                  className="flex-1 mr-2"
                />
                <Button onClick={sendMessage} size="icon">
                  <Send size={20} />
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
