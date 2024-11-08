{/* Same content as previous attempts/SubjectFilter.tsx */}
'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { sampleExams } from "@/lib/sampleExams";

interface SubjectFilterProps {
  selectedSubject: string;
  onSubjectChange: (value: string) => void;
}

export function SubjectFilter({ selectedSubject, onSubjectChange }: SubjectFilterProps) {
  const subjects = ['all', ...new Set(sampleExams.map(exam => exam.subject))];

  return (
    <Select value={selectedSubject} onValueChange={onSubjectChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select subject" />
      </SelectTrigger>
      <SelectContent>
        {subjects.map((subject) => (
          <SelectItem key={subject} value={subject}>
            {subject === 'all' ? 'All Subjects' : subject}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}