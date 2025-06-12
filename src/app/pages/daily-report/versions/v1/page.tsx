"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  ChevronLeftIcon,
  ChevronRightIcon,
  PlusIcon,
  UserGroupIcon,
  ClockIcon
} from "@heroicons/react/24/outline";

const STUDENTS = [
  { id: 1, name: "Everyone", avatar: "👥", active: true },
  { id: 2, name: "Jake", avatar: "👦", active: false },
  { id: 3, name: "Alice", avatar: "👧", active: false },
  { id: 4, name: "Bob", avatar: "🧑", active: false },
  { id: 5, name: "James", avatar: "👨", active: false },
];

const DAILY_SCHEDULE = [
  {
    date: "Monday",
    dateNum: 11,
    total: 10,
    completed: 8,
    activities: [
      { category: "red", height: 20 },
      { category: "blue", height: 35 },
      { category: "green", height: 45 },
      { category: "yellow", height: 25 },
    ]
  },
  {
    date: "Tuesday", 
    dateNum: 12,
    total: 7,
    completed: 7,
    activities: [
      { category: "green", height: 40 },
      { category: "blue", height: 30 },
      { category: "yellow", height: 20 },
    ]
  },
  {
    date: "Wednesday",
    dateNum: 13,
    total: 4,
    completed: 3,
    isToday: true,
    activities: [
      { category: "red", height: 15 },
      { category: "blue", height: 25 },
      { category: "green", height: 35 },
      { category: "yellow", height: 20 },
    ]
  },
  {
    date: "Thursday",
    dateNum: 14,
    total: 6,
    completed: 0,
    activities: [
      { category: "blue", height: 30 },
      { category: "green", height: 25 },
      { category: "red", height: 20 },
      { category: "yellow", height: 15 },
    ]
  },
  {
    date: "Friday",
    dateNum: 15,
    total: 3,
    completed: 0,
    activities: [
      { category: "green", height: 35 },
      { category: "blue", height: 25 },
    ]
  },
];

const TODAY_LESSONS = [
  { id: 1, time: "08:30", title: "Drawings with Alice", completed: true, category: "art" },
  { id: 2, time: "09:00", title: "Dive into Egypt, Rome, and Greece", completed: true, category: "history" },
  { id: 3, time: "10:00", title: "Exploring seasons and natural phenomena", completed: true, category: "science" },
  { id: 4, time: "12:30", title: "Hiking with Jack and Bob", completed: false, category: "outdoor", isNext: true },
];

export default function DailyReport() {
  const [selectedStudent, setSelectedStudent] = useState(0);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <PlusIcon className="w-5 h-5 text-orange-500" />
            </button>
            <span className="text-orange-500 font-medium">Add lesson</span>
          </div>
          
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <ChevronLeftIcon className="w-4 h-4" />
            </button>
            <div className="text-center px-4">
              <div className="font-semibold text-gray-900">Oct 9 - Oct 15</div>
              <div className="text-sm text-gray-500">Current week</div>
            </div>
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <ChevronRightIcon className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-gray-600 text-sm">Create report</span>
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <div className="w-4 h-4 border border-gray-400"></div>
            </button>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Left Sidebar */}
          <div className="w-64">
            {/* Students */}
            <div className="bg-white rounded-lg p-4 mb-6">
              <h3 className="text-gray-600 text-sm font-medium mb-3">Students</h3>
              <div className="space-y-2">
                {STUDENTS.map((student, index) => (
                  <div
                    key={student.id}
                    onClick={() => setSelectedStudent(index)}
                    className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors ${
                      index === selectedStudent ? 'bg-orange-50 border border-orange-200' : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-sm">
                      {student.avatar}
                    </div>
                    <span className="text-gray-700">{student.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Categories */}
            <div className="bg-white rounded-lg p-6 mb-6">
              <div className="text-sm text-gray-600 mb-4">
                This week's focus is <span className="font-medium">Nature</span>.
              </div>
              
              {/* Weekly Chart */}
              <div className="flex items-end justify-between gap-4 h-32 mb-6">
                {DAILY_SCHEDULE.map((day) => (
                  <div key={day.date} className="flex-1 text-center">
                    <div className="text-xs text-gray-500 mb-2">{day.date.slice(0, 2)}</div>
                    <div className="relative h-20 flex items-end justify-center">
                      <div className="w-12 flex flex-col items-center gap-1">
                        {day.isToday && (
                          <div className="w-3 h-3 bg-orange-500 rounded-full mb-1"></div>
                        )}
                        {day.activities.map((activity, idx) => (
                          <div
                            key={idx}
                            className={`w-full rounded-sm ${
                              activity.category === 'red' ? 'bg-red-400' :
                              activity.category === 'blue' ? 'bg-blue-400' :
                              activity.category === 'green' ? 'bg-green-500' :
                              'bg-yellow-400'
                            }`}
                            style={{ height: `${activity.height}px` }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Progress */}
              <div className="mb-6">
                <div className="text-sm text-gray-600 mb-2">Progress</div>
                <div className="text-sm text-gray-500">You are half through the week. Nice work!</div>
                <div className="flex items-center gap-4 mt-3">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '55%' }}></div>
                  </div>
                  <span className="text-sm font-medium">55%</span>
                  <span className="text-xs text-gray-500">10%</span>
                  <span className="text-xs text-gray-500">34%</span>
                </div>
              </div>
            </div>

            {/* Today's Schedule */}
            <div className="space-y-4">
              {DAILY_SCHEDULE.filter(day => day.isToday).map((day) => (  
                <div key={day.date} className="bg-white rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium text-gray-500">{day.dateNum}</span>
                      <span className="font-medium text-gray-900">{day.date}</span>
                      <span className="text-sm text-orange-500 bg-orange-50 px-2 py-1 rounded">Today</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <span>{day.completed} of {day.total}</span>
                      <PlusIcon className="w-4 h-4" />
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    {TODAY_LESSONS.map((lesson) => (
                      <div key={lesson.id} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg">
                        <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                          lesson.completed 
                            ? 'bg-green-500 border-green-500' 
                            : lesson.isNext 
                              ? 'border-orange-500 bg-orange-50' 
                              : 'border-gray-300'
                        }`}>
                          {lesson.completed && <div className="w-2 h-2 bg-white rounded-full"></div>}
                          {lesson.isNext && <div className="w-2 h-2 bg-orange-500 rounded-full"></div>}
                        </div>
                        
                        <div className="text-sm text-gray-500 font-mono">{lesson.time}</div>
                        
                        <div className="flex-1">
                          <div className={`font-medium ${lesson.completed ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                            {lesson.title}
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <UserGroupIcon className="w-4 h-4 text-gray-400" />
                          <ClockIcon className="w-4 h-4 text-gray-400" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              
              {/* Other Days */}
              {DAILY_SCHEDULE.filter(day => !day.isToday).map((day) => (
                <div key={day.date} className="bg-white rounded-lg p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium text-gray-500">{day.dateNum}</span>
                      <span className="font-medium text-gray-900">{day.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <span>{day.completed} of {day.total}</span>
                      <PlusIcon className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

