import { useQuery } from "@tanstack/react-query";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

interface SidebarProps {
  selectedLanguages: string[];
  onLanguageToggle: (language: string) => void;
}

export function Sidebar({ selectedLanguages, onLanguageToggle }: SidebarProps) {
  const { data: languageStats = {} } = useQuery({
    queryKey: ["/api/languages/stats"],
  });

  const languages = [
    { key: "javascript", label: "JavaScript" },
    { key: "python", label: "Python" },
    { key: "react", label: "React" },
    { key: "css", label: "CSS" },
    { key: "html", label: "HTML" },
    { key: "typescript", label: "TypeScript" },
  ];

  return (
    <aside className="lg:col-span-1">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 sticky top-24">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Languages</h3>
        <div className="space-y-3">
          {languages.map((language) => (
            <label
              key={language.key}
              className="flex items-center space-x-3 cursor-pointer"
            >
              <Checkbox
                checked={selectedLanguages.includes(language.key)}
                onCheckedChange={() => onLanguageToggle(language.key)}
                className="w-4 h-4"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300 flex-1">
                {language.label}
              </span>
              <Badge variant="secondary" className="text-xs">
                {languageStats[language.key] || 0}
              </Badge>
            </label>
          ))}
        </div>
        
        <hr className="my-6 border-gray-200 dark:border-gray-700" />
        
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Collections</h3>
        <div className="space-y-2">
          <a href="#" className="block text-sm text-gray-700 dark:text-gray-300 hover:text-blue-500 transition-colors">Utilities</a>
          <a href="#" className="block text-sm text-gray-700 dark:text-gray-300 hover:text-blue-500 transition-colors">Components</a>
          <a href="#" className="block text-sm text-gray-700 dark:text-gray-300 hover:text-blue-500 transition-colors">Animations</a>
          <a href="#" className="block text-sm text-gray-700 dark:text-gray-300 hover:text-blue-500 transition-colors">API Helpers</a>
        </div>
      </div>
    </aside>
  );
}
